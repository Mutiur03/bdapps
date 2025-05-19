import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Extract user ID from session and ensure it's valid
    const userId = session.user.id;
    if (!userId) {
      return new Response("User ID not found in session", { status: 400 });
    }
    console.log("Session:", userId);

    const formData = await request.formData();
    const {
      name,
      date_of_birth,
      address,
      bio,
      department,
      year_of_study,
      graduation_year,
      cgpa,
      skills,
      interests,
      career_goals,
      social_links,
      profile_picture,
    } = Object.fromEntries(formData.entries());
    let parsedSocialLinks: { url: string }[] = [];
    console.log(Object.fromEntries(formData.entries()));

    try {
      if (social_links) {
        if (typeof social_links === "string") {
          console.log("social_links is a string:", social_links);
          parsedSocialLinks = JSON.parse(social_links);
        } else if (Array.isArray(social_links)) {
          console.log("social_links is already an array:", social_links);
          parsedSocialLinks = social_links;
        } else {
          console.warn("Unrecognized format. Attempting fallback...");
          throw new Error("Invalid format");
        }
      }
    } catch (error) {
      console.warn("Failed to parse social_links:", error);
    }
    let profilePicturePath = "";
    const updatedData: any = {
      name: name.toString(),
      date_of_birth: date_of_birth?.toString(),
      address: address?.toString(),
      bio: bio?.toString(),
      department: department?.toString(),
      year_of_study: year_of_study?.toString(),
      graduation_year: graduation_year?.toString(),
      cgpa: parseFloat(cgpa?.toString()),
      skills: skills?.toString(),
      interests: interests?.toString(),
      career_goals: career_goals?.toString(),
      social_links: parsedSocialLinks,
    };

    // Only process profile picture if it exists and is a File
    if (profile_picture && profile_picture instanceof File) {
      const uploadDir = path.join(
        process.cwd(),
        "public/uploads/profile_pictures"
      );
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const profilePictureFile = profile_picture as File;
      const uniqueFilename = `${Date.now()}-${profilePictureFile.name}`;
      const filePath = `public/uploads/profile_pictures/${uniqueFilename}`;
      const fileBuffer = Buffer.from(await profilePictureFile.arrayBuffer());
      fs.writeFileSync(filePath, fileBuffer);
      profilePicturePath = `/uploads/profile_pictures/${uniqueFilename}`;

      // Only add profile_picture to updatedData if a new image was uploaded
      updatedData.profile_picture = profilePicturePath;
      console.log("Profile picture path:", profilePicturePath);
    }

    console.log("Updated data:", updatedData);

    // Update user data with proper ID validation
    const parsedUserId = parseInt(userId.toString());
    if (isNaN(parsedUserId)) {
      return new Response("Invalid user ID format", { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: parsedUserId,
      },
      data: updatedData,
    });

    return new Response("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response("Error updating profile", { status: 500 });
  }
}
