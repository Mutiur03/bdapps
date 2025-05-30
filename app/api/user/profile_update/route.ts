import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
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
    let avatar = "";
    if (
      profile_picture &&
      typeof profile_picture === "object" &&
      "stream" in profile_picture
    ) {
      // const uploadDir = path.join(
      //   process.cwd(),
      //   "public/uploads/profile_pictures"
      // );
      // if (!fs.existsSync(uploadDir)) {
      //   fs.mkdirSync(uploadDir, { recursive: true });
      // }
      // const profile_picture_name = `${Date.now()}-${profile_picture.name}`;
      // const profile_picture_path = `public/uploads/profile_pictures/${profile_picture_name}`;
      // const fileBuffer = Buffer.from(await profile_picture.arrayBuffer());
      // fs.writeFileSync(profile_picture_path, fileBuffer);
      // avatar = `/uploads/profile_pictures/${profile_picture_name}`;
      await new Promise<void>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: "udayee/profile_pictures",
            },
            (error, result) => {
              if (error) {
                console.error("Error uploading profile picture:", error);
                reject(error);
              } else if (result) {
                console.log("Profile picture uploaded successfully:", result);
                avatar = result.secure_url;
                resolve();
              } else {
                reject(new Error("Upload result is undefined"));
              }
            }
          )
          .end(profile_picture.stream());
      });
    }

    // Update user data with proper ID validation
    const parsedUserId = parseInt(userId.toString());
    if (isNaN(parsedUserId)) {
      return new Response("Invalid user ID format", { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: parsedUserId,
      },
      data: {
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
        ...(avatar && { profile_picture: avatar }),
      },
    });

    return new Response("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response("Error updating profile", { status: 500 });
  }
}
