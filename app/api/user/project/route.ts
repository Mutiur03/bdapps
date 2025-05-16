import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import path from "path";
import fs from "fs";
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const userId = (session.user as { id?: string })?.id;
    const body = await request.formData();

    const {
      title,
      description,
      budget,
      category,
      profile_picture,
      cover_image,
      pitch_video,
      location,
      start_date,
    } = Object.fromEntries(body.entries());
    const documents = body.getAll("documents");
    const filePaths = path.join(
      process.cwd(),
      `public/uploads/project_documents/${userId}`
    );
    if (!fs.existsSync(filePaths)) {
      fs.mkdirSync(filePaths, { recursive: true });
    }
    const fileNames = await Promise.all(
      documents.map(async (document: FormDataEntryValue) => {
        if (!(document instanceof File)) {
          throw new Error("Document is not a file");
        }
        const file = document as File;
        const fileName = `${Date.now()}-${file.name}`;

        const filePath = path.join(filePaths, fileName);
        const buffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);
        fs.writeFileSync(filePath, uint8Array);
        return `uploads/project_documents/${userId}/` + fileName;
      })
    );
    const profile = profile_picture as File;
    const cover = cover_image as File;
    const pitch = pitch_video as File;
    const profileName = `${Date.now()}-${profile.name}`;
    const coverName = `${Date.now()}-${cover.name}`;
    const pitchName = `${Date.now()}-${pitch.name}`;
    const profilePath = path.join(filePaths, profileName);
    const coverPath = path.join(filePaths, coverName);
    const pitchPath = path.join(filePaths, pitchName);
    const profileBuffer = await profile.arrayBuffer();
    const coverBuffer = await cover.arrayBuffer();
    const pitchBuffer = await pitch.arrayBuffer();
    const profileUint8Array = new Uint8Array(profileBuffer);
    const coverUint8Array = new Uint8Array(coverBuffer);
    const pitchUint8Array = new Uint8Array(pitchBuffer);
    fs.writeFileSync(profilePath, profileUint8Array);
    fs.writeFileSync(coverPath, coverUint8Array);
    fs.writeFileSync(pitchPath, pitchUint8Array);
    const profile_picture_url =
      `uploads/project_documents/${userId}/` + profileName;
    const cover_image_url = `uploads/project_documents/${userId}/` + coverName;
    const pitch_video_url = `uploads/project_documents/${userId}/` + pitchName;
    const res = await prisma.project.create({
      data: {
        title: title.toString(),
        description: description.toString(),
        budget: Number(budget),
        category: category.toString(),
        userId: Number(userId),
        documents: [...fileNames],
        profile_picture: profile_picture_url,
        cover_image: cover_image_url,
        pitch_video: pitch_video_url,
        location: location.toString(),
        start_date: start_date.toString(),
      },
    });
    console.log("Creating new post with data:", {
      title,
      description,
      budget,
      category,
      profile_picture,
      cover_image,
      pitch_video,
      documents,
      location,
      start_date,
    });

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const userId = (session.user as { id?: string })?.id;

    const projects = await prisma.project.findMany({
      where: {
        userId: Number(userId),
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const userId = (session.user as { id?: string })?.id;
    const body = await request.json();
    const { projectId } = body;

    await prisma.project.delete({
      where: {
        id: Number(projectId),
        userId: Number(userId),
      },
    });

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const userId = (session.user as { id?: string })?.id;
    const body = await request.formData();
    const { projectId, title, description, budget, category } =
      Object.fromEntries(body.entries());

    
    const existingProject = await prisma.project.findUnique({
      where: {
        id: Number(projectId),
        userId: Number(userId),
      },
    });

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    
    const filePaths = path.join(
      process.cwd(),
      `public/uploads/project_documents/${userId}`
    );
    if (!fs.existsSync(filePaths)) {
      fs.mkdirSync(filePaths, { recursive: true });
    }

    
    const updateData: any = {
      title: title.toString(),
      description: description.toString(),
      budget: Number(budget),
      category: category.toString(),
    };

    
    const profile_picture = body.get("profile_picture");
    if (profile_picture instanceof File) {
      const profile = profile_picture as File;
      const profileName = `${Date.now()}-${profile.name}`;
      const profilePath = path.join(filePaths, profileName);
      const profileBuffer = await profile.arrayBuffer();
      const profileUint8Array = new Uint8Array(profileBuffer);
      fs.writeFileSync(profilePath, profileUint8Array);
      updateData.profile_picture = `uploads/project_documents/${userId}/${profileName}`;
    }

    
    const cover_image = body.get("cover_image");
    if (cover_image instanceof File) {
      const cover = cover_image as File;
      const coverName = `${Date.now()}-${cover.name}`;
      const coverPath = path.join(filePaths, coverName);
      const coverBuffer = await cover.arrayBuffer();
      const coverUint8Array = new Uint8Array(coverBuffer);
      fs.writeFileSync(coverPath, coverUint8Array);
      updateData.cover_image = `uploads/project_documents/${userId}/${coverName}`;
    }

    
    const pitch_video = body.get("pitch_video");
    if (pitch_video instanceof File) {
      const pitch = pitch_video as File;
      const pitchName = `${Date.now()}-${pitch.name}`;
      const pitchPath = path.join(filePaths, pitchName);
      const pitchBuffer = await pitch.arrayBuffer();
      const pitchUint8Array = new Uint8Array(pitchBuffer);
      fs.writeFileSync(pitchPath, pitchUint8Array);
      updateData.pitch_video = `uploads/project_documents/${userId}/${pitchName}`;
    }

    
    const location = body.get("location");
    if (location) {
      updateData.location = location.toString();
    }

    const start_date = body.get("start_date");
    if (start_date) {
      updateData.start_date = start_date.toString();
    }

    
    const newDocuments = body.getAll("documents");
    if (newDocuments && newDocuments.length > 0) {
      const newFileNames = await Promise.all(
        newDocuments.map(async (document: FormDataEntryValue) => {
          if (!(document instanceof File)) {
            return null; 
          }
          const file = document as File;
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = path.join(filePaths, fileName);
          const buffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(buffer);
          fs.writeFileSync(filePath, uint8Array);
          return `uploads/project_documents/${userId}/${fileName}`;
        })
      ).then((names) => names.filter((name) => name !== null)); 

      
      const existingDocs = existingProject.documents || [];
      updateData.documents = [...existingDocs, ...newFileNames];
    }

    
    const updatedProject = await prisma.project.update({
      where: {
        id: Number(projectId),
        userId: Number(userId),
      },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "Project updated successfully",
        project: updatedProject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
