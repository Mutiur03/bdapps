import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import path from "path";
import fs from "fs";
import cloudinary from "@/lib/cloudinary";
import sharp from "sharp";

// Helper function to compress image to max 500KB
async function compressImage(buffer: ArrayBuffer): Promise<Buffer> {
  let quality = 90;
  let compressedBuffer: Buffer;

  do {
    compressedBuffer = await sharp(Buffer.from(buffer))
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    if (compressedBuffer.length <= 500 * 1024 || quality <= 10) {
      break;
    }

    quality -= 10;
  } while (compressedBuffer.length > 500 * 1024);

  return compressedBuffer;
}

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
      status,
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
      documents?.map(async (document: FormDataEntryValue) => {
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

    // Compress profile picture
    const profileBuffer = await profile?.arrayBuffer();
    const compressedProfileBuffer = profileBuffer
      ? await compressImage(profileBuffer)
      : null;

    // Compress cover image
    const coverBuffer = await cover?.arrayBuffer();
    const compressedCoverBuffer = coverBuffer
      ? await compressImage(coverBuffer)
      : null;

    let profile_picture_url = "";
    let cover_image_url = "";

    // Upload compressed profile picture to Cloudinary
    if (compressedProfileBuffer) {
      await new Promise<void>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: `udayee/project_documents/${userId}`,
              timeout: 60000,
            },
            (error, result) => {
              if (error) {
                console.error("Error uploading profile picture:", error);
                reject(error);
              } else if (result) {
                profile_picture_url = result.secure_url;
                resolve();
              } else {
                reject(new Error("Upload result is undefined"));
              }
            }
          )
          .end(compressedProfileBuffer);
      });
    }

    // Upload compressed cover image to Cloudinary
    if (compressedCoverBuffer) {
      await new Promise<void>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: `udayee/project_documents/${userId}`,
              timeout: 60000,
            },
            (error, result) => {
              if (error) {
                console.error("Error uploading cover image:", error);
                reject(error);
              } else if (result) {
                cover_image_url = result.secure_url;
                resolve();
              } else {
                reject(new Error("Upload result is undefined"));
              }
            }
          )
          .end(compressedCoverBuffer);
      });
    }
    const res = await prisma.project.create({
      data: {
        title: title?.toString(),
        description: description?.toString(),
        budget: parseFloat(budget?.toString() || "0"),
        categoryId: category ? Number(category) : null,
        userId: Number(userId),
        profile_picture: profile_picture_url,
        cover_image: cover_image_url,
        pitch_video: pitch_video?.toString(),
        documents: {
          createMany: {
            data: fileNames?.map((fileName) => ({
              document: fileName as string,
              size: null,
            })),
          },
        },
        location: location?.toString(),
        start_date: start_date?.toString(),
        status: status.toString(),
        raised_amount: 0,
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
      status,
    });
    await prisma.projectMember.create({
      data: {
        userId: Number(userId),
        projectId: res.id,
      },
    });
    return NextResponse.json(res);
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
      include: {
        user: {
          select: {
            id: true,
            name: true,
            university_email: true,
            profile_picture: true,
            university: true,
            department: true,
          },
        },
        milestones: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        projectMembers: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                university_email: true,
                profile_picture: true,
                university: true,
                department: true,
              },
            },
          },
        },
        documents: true,
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
    console.log("Form data received:", body);

    const { projectId, title, description, budget, category, status, tags } =
      Object.fromEntries(body.entries());

    const existingProject = await prisma.project.findUnique({
      where: {
        id: Number(projectId),
        userId: Number(userId),
      },
      include: {
        documents: true,
      },
    });
    const milestones = body.get("milestones");
    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // const filePaths = path.join(
    //   process.cwd(),
    //   `public/uploads/project_documents/${userId}`
    // );
    // if (!fs.existsSync(filePaths)) {
    //   fs.mkdirSync(filePaths, { recursive: true });
    // }

    interface Milestone {
      title: string;
      description: string;
      amount: number;
      status: string;
      progress?: number;
      raised_amount?: number;
    }

    interface MilestoneInput {
      title: string;
      description: string;
      amount: number;
      status: string;
      progress?: number;
      raised_amount?: number;
      completedAt?: string;
      plannedAt?: string;
      deadlineAt?: string;
    }
    let parsedMilestones: Milestone[] = [];
    if (milestones) {
      parsedMilestones = JSON.parse(milestones as string);
      console.log("Parsed milestones:", parsedMilestones);
    }
    await prisma.milestone.deleteMany({
      where: {
        projectId: Number(projectId),
      },
    });
    console.log(parsedMilestones.length);

    if (parsedMilestones.length > 0) {
      await prisma.milestone.createMany({
        data: parsedMilestones.map((milestone: MilestoneInput) => ({
          title: milestone?.title ? milestone.title.toString() : "",
          description: milestone?.description
            ? milestone.description.toString()
            : "",
          amount: Number(milestone?.amount) || 0,
          status: milestone?.status ? milestone.status.toString() : "planned",
          completedAt:
            milestone?.status === "completed"
              ? milestone.completedAt?.toString()
              : null,
          plannedAt:
            milestone?.status === "planned"
              ? milestone.plannedAt?.toString()
              : null,
          deadlineAt:
            milestone?.status === "in-progress"
              ? milestone.deadlineAt?.toString()
              : null,
          // progress:
          //   milestone?.status === "in-progress" && milestone?.progress
          //     ? Number(milestone.progress)
          //     : 0,
          // raised_amount:
          //   milestone?.status !== "planned" && milestone?.raised_amount
          //     ? Number(milestone.raised_amount)
          //     : null,
          projectId: Number(projectId),
        })),
      });
    }
    const raised_amount = parsedMilestones.reduce((acc, milestone) => {
      if (
        milestone.status !== "planned" &&
        milestone.status !== "declined" &&
        milestone.amount
      ) {
        return acc + Number(milestone.amount);
      }
      return acc;
    }, 0);
    console.log("Total raised amount:", raised_amount);

    const updateData: any = {
      title: title?.toString(),
      description: description?.toString(),
      budget: Number(budget) || 0,
      categoryId: Number(category),
      status: status?.toString(),
      tags: tags?.toString(),
      raised_amount: raised_amount || 0,
    };

    const profile_picture = body.get("profile_picture");
    if (
      profile_picture &&
      typeof profile_picture === "object" &&
      "stream" in profile_picture
    ) {
      try {
        const buffer = await profile_picture.arrayBuffer();
        const compressedBuffer = await compressImage(buffer);

        await new Promise<void>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "auto",
                folder: `udayee/project_documents/${userId}`,
                timeout: 60000, // 60 seconds timeout
              },
              (error, result) => {
                if (error) {
                  console.error("Error uploading profile picture:", error);
                  reject(error);
                } else if (result) {
                  console.log("Profile picture uploaded successfully:", result);
                  updateData.profile_picture = result.secure_url;
                  resolve();
                } else {
                  reject(new Error("Upload result is undefined"));
                }
              }
            )
            .end(compressedBuffer);
        });
      } catch (error) {
        console.error("Error processing profile picture:", error);
        // Continue without updating profile picture if upload fails
      }
    }

    const cover_image = body.get("cover_image");
    if (
      cover_image &&
      typeof cover_image === "object" &&
      "stream" in cover_image
    ) {
      try {
        const buffer = await cover_image.arrayBuffer();
        const compressedBuffer = await compressImage(buffer);

        await new Promise<void>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "auto",
                folder: `udayee/project_documents/${userId}`,
                timeout: 60000, // 60 seconds timeout
              },
              (error, result) => {
                if (error) {
                  console.error("Error uploading cover image:", error);
                  reject(error);
                } else if (result) {
                  console.log("Cover image uploaded successfully:", result);
                  updateData.cover_image = result.secure_url;
                  resolve();
                } else {
                  reject(new Error("Upload result is undefined"));
                }
              }
            )
            .end(compressedBuffer);
        });
      } catch (error) {
        console.error("Error processing cover image:", error);
        // Continue without updating cover image if upload fails
      }
    }

    const pitch_video = body.get("pitch_video");
    updateData.pitch_video = pitch_video?.toString();

    const location = body.get("location");
    updateData.location = location?.toString();

    const start_date = body.get("start_date");
    updateData.start_date = start_date?.toString();

    const newDocuments = body.getAll("documents");
    if (newDocuments && newDocuments.length > 0) {
      const newFileNames = await Promise.all(
        newDocuments.map(async (document: FormDataEntryValue) => {
          if (
            !(document && typeof document === "object" && "stream" in document)
          ) {
            return null;
          }

          try {
            const buffer = await document.arrayBuffer();
            const uint8Array = new Uint8Array(buffer);

            return new Promise<{ path: string; size: number } | null>(
              (resolve, reject) => {
                cloudinary.uploader
                  .upload_stream(
                    {
                      resource_type: "auto",
                      folder: `udayee/project_documents/${userId}`,
                      timeout: 60000, // 60 seconds timeout
                    },
                    (error, result) => {
                      if (error) {
                        console.error("Error uploading document:", error);
                        reject(error);
                      } else if (result) {
                        console.log("Document uploaded successfully:", result);
                        resolve({
                          path: result.secure_url,
                          size: document.size,
                        });
                      } else {
                        reject(new Error("Upload result is undefined"));
                      }
                    }
                  )
                  .end(uint8Array);
              }
            );
          } catch (error) {
            console.error("Error processing document:", error);
            return null;
          }
        })
      ).then((items) => items.filter((item) => item !== null));

      // Create new document records in database
      if (newFileNames.length > 0) {
        await prisma.documents.createMany({
          data: newFileNames.map((fileInfo) => ({
            projectId: Number(projectId),
            document: fileInfo.path as string,
            size: fileInfo.size, // Store the file size in database
          })),
        });
      }
    }

    const documentsToDelete = body.get("documentsToDelete");
    if (documentsToDelete) {
      const deleteIds = JSON.parse(documentsToDelete as string);
      if (deleteIds.length > 0) {
        await prisma.documents.deleteMany({
          where: {
            id: {
              in: deleteIds.map((id: string) => Number(id)),
            },
          },
        });
      }
    }
    if (parsedMilestones.length > 0) {
      updateData.status = "active";
    } else {
      updateData.status = "pending";
    }
    const updatedProject = await prisma.project.update({
      where: {
        id: Number(projectId),
        userId: Number(userId),
      },
      data: updateData,
      include: {
        milestones: true,
        documents: true, // Include documents in the response
      },
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
