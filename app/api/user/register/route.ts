import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { uploadFileToCloudinary } from "@/lib/udloadFile";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const entries = Object.fromEntries(body.entries());
    console.log("Form entries:", entries);
    const requiredFields = [
      "password",
      "university",
      "name",
      "department",
      "student_id",
      "university_email",
      "phone",
    ];
    for (const field of requiredFields) {
      if (!body.get(field)) {
        console.error(`Missing required field: ${field}`);
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

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
      const file = body.get(field);
      try {
        const uploadResult = await uploadFileToCloudinary(
          file as File,
          `user/${field}`
        );
        uploadedFiles[field] = uploadResult.url;
      } catch (uploadError) {
        console.error(`Failed to process file field ${field}:`, uploadError);
        return NextResponse.json(
          {
            error: `Failed to upload ${field}: ${
              uploadError instanceof Error
                ? uploadError.message
                : String(uploadError)
            }`,
          },
          { status: 500 }
        );
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
    } = entries;
    let { phone } = entries;
    if (!phone || typeof phone !== "string" || phone.length < 10) {
      console.error("Invalid phone number:", phone);
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }
    phone = "0" + phone.slice(-10);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.toString(), salt);

    let user;
    try {
      user = await prisma.user.create({
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
    } catch (dbError) {
      console.error("Database error during user creation:", dbError);
      return NextResponse.json(
        { error: "Database error during user creation" },
        { status: 500 }
      );
    }

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
      { error: "Failed to process registration", details: String(error) },
      { status: 500 }
    );
  }
}
