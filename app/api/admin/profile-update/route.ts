import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const adminId = parseInt(session.user.id);

    // Extract form fields
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;
    const bio = formData.get("bio") as string;
    const company = formData.get("company") as string;
    const companyRole = formData.get("companyRole") as string;
    const experienceYears = formData.get("experienceYears") as string;
    const customSocialsStr = formData.get("customSocials") as string;
    const profilePicture = formData.get("profile_picture") as File;

    // Parse JSON fields
    let customSocials = [];
    if (customSocialsStr) {
      try {
        customSocials = JSON.parse(customSocialsStr);
      } catch (error) {
        console.error("Error parsing customSocials:", error);
      }
    }

    // Prepare update data
    const updateData: any = {
      name,
      email,
      phone: phone || null,
      location: location || null,
      bio: bio || null,
      company: company || null,
      companyRole: companyRole || null,
      experienceYears: experienceYears || null,
      customSocials,
      updatedAt: new Date(),
    };
    console.log(profilePicture);

    // Handle profile picture upload
    if (
      profilePicture &&
      profilePicture instanceof File &&
      profilePicture.size > 0
    ) {
      try {
        const arrayBuffer = await profilePicture.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Save file to public directory
        const fileExt = profilePicture.name.split(".").pop() || "jpg";
        const fileName = `admin-${adminId}-${Date.now()}.${fileExt}`;
        const filePath = `./public/uploads/admin-profiles/${fileName}`;

        // Ensure directory exists
        const uploadDir = path.dirname(filePath);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write the file
        fs.writeFileSync(filePath, buffer);

        const uploadResult = {
          secure_url: `/uploads/admin-profiles/${fileName}`,
        };

        updateData.profile_picture = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Error uploading profile picture:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload profile picture" },
          { status: 500 }
        );
      }
    }

    // Update admin profile using Prisma
    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        location: true,
        bio: true,
        profile_picture: true,
        company: true,
        companyRole: true,
        experienceYears: true,
        customSocials: true,
        role: true,
        permissions: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const adminId = parseInt(session.user.id);

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      include: {
        Project: {
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            status: true,
            category: true,
            raised_amount: true,
          },
        },
      },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const adminData = {
      ...admin,
      customSocials: Array.isArray(admin.customSocials)
        ? admin.customSocials
        : [],
    };

    return NextResponse.json({
      success: true,
      data: adminData,
    });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
