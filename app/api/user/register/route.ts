import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import sharp from "sharp";

// Add image compression function
async function compressImage(file: File): Promise<Buffer> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const isJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
  const isPng = file.type === "image/png";

  let compressed = sharp(buffer);

  // Start with high quality and reduce only if needed
  if (isJpeg) {
    compressed = compressed.jpeg({ quality: 85 });
  } else if (isPng) {
    compressed = compressed.png({ quality: 85 });
  } else {
    // Convert other formats to JPEG
    compressed = compressed.jpeg({ quality: 85 });
  }

  let result = await compressed.toBuffer();

  // If still too large, reduce quality further
  if (result.length > 500 * 1024) {
    if (isJpeg || !isPng) {
      result = await sharp(buffer).jpeg({ quality: 70 }).toBuffer();
    } else {
      result = await sharp(buffer).png({ quality: 70 }).toBuffer();
    }
  }

  // Final check - if still too large, use lower quality
  if (result.length > 500 * 1024) {
    if (isJpeg || !isPng) {
      result = await sharp(buffer).jpeg({ quality: 50 }).toBuffer();
    } else {
      result = await sharp(buffer).png({ quality: 50 }).toBuffer();
    }
  }

  // Last resort - very low quality
  if (result.length > 500 * 1024) {
    result = await sharp(buffer).jpeg({ quality: 30 }).toBuffer();
  }

  return result;
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
          // Compress image before upload
          const compressedBuffer = await compressImage(file as any);

          await new Promise<void>((resolve, reject) => {
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
                    console.log(`Uploaded ${field} successfully:`, result);
                    uploadedFiles[field] = result.secure_url;
                    resolve();
                  } else {
                    reject(new Error("Upload result is undefined"));
                  }
                }
              )
              .end(compressedBuffer);
          });
        } catch (uploadError) {
          console.error(`Failed to process file field ${field}:`, uploadError);
          return NextResponse.json(
            { error: `Failed to upload ${field}` },
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
