import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
    //     status: 401,
    //   });
    // }
    // const userId = (session.user as { id?: string })?.id;
    const userId = 31; // Replace with actual user ID
    const body = await request.formData();
    const { title, description, budget, category } = Object.fromEntries(
      body.entries()
    );

    // const newPost = await prisma.project.create({
    //   data: {
    //     userId: parsedUserId,
    //   },
    // });
    console.log("Creating new post with data:", {
      title,
      description,
      budget,
      category,
    });

    // return NextResponse.json(newPost, { status: 201 });
    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
