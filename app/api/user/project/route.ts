import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadFileToCloudinary } from "@/lib/udloadFile";


function getFileSize(file: File): number {
  return file.size;
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

    const res = await prisma.project.create({
      data: {
        title: title?.toString(),
        description: description?.toString(),
        budget: parseFloat(budget?.toString() || "0"),
        categoryId: category ? Number(category) : null,
        userId: Number(userId),
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
    if (profile_picture) {
      try {
        const profileSize = getFileSize(profile_picture as File);
        const upload = await uploadFileToCloudinary(
          profile_picture as File,
          `udayee/project_documents/${userId}`
        );
        updateData.profile_picture = upload.url;
        // Store size if needed in a separate field or log it
        console.log("Profile picture size:", profileSize, "bytes");
      } catch (error) {
        console.error("Error processing profile picture:", error);
      }
    }

    const cover_image = body.get("cover_image");
    if (
      cover_image &&
      typeof cover_image === "object" &&
      "stream" in cover_image
    ) {
      try {
        const coverSize = getFileSize(cover_image as File);
        const upload = await uploadFileToCloudinary(
          cover_image as File,
          `udayee/project_documents/${userId}`
        );
        updateData.cover_image = upload.url;
        console.log("Cover image size:", coverSize, "bytes");
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
          if (!document) {
            return null;
          }

          try {
            const documentSize = getFileSize(document as File);
            const upload = await uploadFileToCloudinary(
              document as File,
              `udayee/project_documents/${userId}`
            );
            return {
              url: upload.url,
              size: documentSize,
            };
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
            document: fileInfo.url,
            size: fileInfo.size,
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
        documents: true, 
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
