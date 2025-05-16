import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
export async function POST(request: NextRequest) {
  try {
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

    try {
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
    } catch (error) {
      console.warn("Failed to parse social_links:", error);
    }

    console.log("Parsed social links:", parsedSocialLinks);

    let profilePicturePath = "";
    console.log("profile_picture:", profile_picture);

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
    }

    // Update user data
    await prisma.user.update({
      where: {
        id: 31,
      },
      data: {
        name: name.toString(),
        ...(profilePicturePath ? { profile_picture: profilePicturePath } : {}),
        date_of_birth: date_of_birth.toString(),
        address: address.toString(),
        bio: bio.toString(),
        department: department.toString(),
        year_of_study: year_of_study.toString(),
        graduation_year: graduation_year.toString(),
        cgpa: parseFloat(cgpa.toString()),
        skills: skills.toString(),
        interests: interests.toString(),
        career_goals: career_goals.toString(),
        social_links: parsedSocialLinks,
      },
    });
    return new Response("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response("Error updating profile", { status: 500 });
  }
}
