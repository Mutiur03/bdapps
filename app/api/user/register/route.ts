import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();

    // const uploadDir = path.join(
    //   process.cwd(),
    //   "public/uploads/verification_data"
    // );
    // if (!fs.existsSync(uploadDir)) {
    //   fs.mkdirSync(uploadDir, { recursive: true });
    // }
    console.log(Object.fromEntries(body.entries()));
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { university_email: body.get("university_email")?.toString() },
          { phone: "0" + body.get("phone")?.toString().slice(-10) },
        ],
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const fileFields = [
      "nid_front",
      "nid_back",
      "student_id_front",
      "student_id_back",
    ];
    const uploadedFiles: Record<string, string> = {};

    for (const field of fileFields) {
      const file = body.get(field) as File;
      if (file && file instanceof File) {
        await new Promise<void>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              resource_type: "auto",
              folder: "udayee/verification_data",
            },
            (error, result) => {
              if (error) {
                console.error(`Error uploading ${field}:`, error);
                reject(error);
              } else if (result) {
                console.log(`Uploaded ${field} successfully:`, result);
                uploadedFiles[field] = result.secure_url;
                resolve();
              } else {
                reject(new Error('Upload result is undefined'));
              }
            }
          ).end(file.stream());
        });
        // const uniqueFilename = `${Date.now()}-${file.name}`;
        // const filePath = path.join(uploadDir, uniqueFilename);

        // const fileBuffer = Buffer.from(await file.arrayBuffer());
        // fs.writeFileSync(filePath, fileBuffer);

        // uploadedFiles[field] = `/uploads/verification_data/${uniqueFilename}`;
      }
    }

    console.log("Uploaded files:", uploadedFiles);

    const {
      password,
      university,
      name,
      department,
      student_id,
      university_email,
    } = Object.fromEntries(body.entries());
    let { phone } = Object.fromEntries(body.entries());
    console.log({
      password,
      university,
      name,
      department,
      student_id,
      university_email,
      phone,
      ...uploadedFiles,
    });
    phone = "0" + phone.slice(-10);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.toString(), salt);
    const user = await prisma.user.create({
      data: {
        name: String(name),
        university: String(university),
        department: department.toString(),
        student_id: student_id.toString(),
        university_email: university_email.toString(),
        phone: phone.toString(),
        password: hashedPassword,
        ...uploadedFiles,
      },
    });
    return NextResponse.json(
      {
        message: "User registered successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}
