import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import sharp from "sharp";
import stream from "stream";
import { promisify } from "util";

// Helper to stream buffer to Cloudinary
const streamUpload = (buffer: Buffer, field: string) => {
  return new Promise<string>((resolve, reject) => {
    const passthrough = new stream.PassThrough();
    passthrough.end(buffer);
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: "udayee/verification_data",
        },
        (error, result) => {
          if (error) {
            console.error(`Error uploading ${field}:`, error);
            reject(error);
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject(new Error("Upload result is undefined"));
          }
        }
      )
      .end(buffer);
  });
};

// Add image compression function (streamlined, single pass)
async function compressImage(file: File): Promise<Buffer> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const isJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
  const isPng = file.type === "image/png";
  // Limit file size to 5MB
  if (buffer.length > 5 * 1024 * 1024) {
    throw new Error("File too large. Max 5MB allowed.");
  }
  let compressed = sharp(buffer);
  if (isJpeg) {
    compressed = compressed.jpeg({ quality: 70 });
  } else if (isPng) {
    compressed = compressed.png({ quality: 70 });
  } else {
    compressed = compressed.jpeg({ quality: 70 });
  }
  return await compressed.toBuffer();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    // Debug: log all form entries
    const entries = Object.fromEntries(body.entries());
    console.log("Form entries:", entries);

    // Validate required fields
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
      // Check if file is a file-like object (has arrayBuffer and type)
      if (
        file &&
        typeof file === "object" &&
        typeof (file as any).arrayBuffer === "function" &&
        typeof (file as any).type === "string"
      ) {
        try {
          // Only compress and upload if file is not too large
          const compressedBuffer = await compressImage(file as any);
          const url = await streamUpload(compressedBuffer, field);
          uploadedFiles[field] = url;
        } catch (uploadError) {
          console.error(`Failed to process file field ${field}:`, uploadError);
          return NextResponse.json(
            { error: `Failed to upload ${field}: ${uploadError instanceof Error ? uploadError.message : String(uploadError)}` },
            { status: 500 }
          );
        }
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
    // Validate phone
    if (!phone || typeof phone !== "string" || phone.length < 10) {
      console.error("Invalid phone number:", phone);
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }
    phone = "0" + phone.slice(-10);

    // Hash password
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
