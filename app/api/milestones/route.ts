import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const action = searchParams.get("action");

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    switch (action) {
      case "requests":
        // Get milestone requests (requested status)
        const requestedMilestones = await prisma.milestone.findMany({
          where: {
            projectId: parseInt(projectId),
            status: "requested",
          },
          include: {
            project: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    profile_picture: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json(
          requestedMilestones.map((milestone) => ({
            id: milestone.id,
            description: milestone.description,
            amount: milestone.amount,
            status: "PENDING",
            createdAt: milestone.createdAt.toISOString(),
            userId: milestone.project.user.id,
          }))
        );

      case "user":
        // Get user milestones (requested status)
        const userMilestones = await prisma.milestone.findMany({
          where: {
            projectId: parseInt(projectId),
            status: "requested",
          },
          include: {
            project: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    profile_picture: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json(
          userMilestones.map((milestone) => ({
            id: milestone.id,
            description: milestone.description,
            amount: milestone.amount,
            status:
              milestone.status === "requested"
                ? "PENDING"
                : milestone.status.toUpperCase(),
            createdAt: milestone.createdAt.toISOString(),
            userId: milestone.project.user.id,
          }))
        );

      default:
        // Get all milestones for project
        const allMilestones = await prisma.milestone.findMany({
          where: {
            projectId: parseInt(projectId),
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return NextResponse.json(allMilestones);
    }
  } catch (error) {
    console.error("Error fetching milestones:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case "create":
        return await createMilestone(body);
      case "approve":
        return await approveMilestone(body);
      case "decline":
        return await declineMilestone(body);
      case "complete":
        return await completeMilestone(body);
      case "update":
        return await updateMilestone(body);
      case "delete":
        return await deleteMilestone(body);
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing milestone action:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function createMilestone(body: any) {
  const { projectId, description, amount, userId } = body;

  if (!projectId || !description || !amount || !userId) {
    return NextResponse.json(
      { error: "Project ID, description, amount, and user ID are required" },
      { status: 400 }
    );
  }

  // Verify that the project exists and the user has access to it
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId) },
    include: {
      projectMembers: {
        where: { userId: parseInt(userId) },
      },
    },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // Check if user is project owner or member
  const isOwner = project.userId === parseInt(userId);
  const isMember = project.projectMembers.length > 0;

  if (!isOwner && !isMember) {
    return NextResponse.json(
      { error: "User does not have access to this project" },
      { status: 403 }
    );
  }

  const milestone = await prisma.milestone.create({
    data: {
      title: `Milestone Request - ${description.substring(0, 50)}...`,
      description,
      amount: parseFloat(amount),
      status: "requested",
      projectId: parseInt(projectId),
      plannedAt: new Date().toISOString(),
    },
    include: {
      project: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile_picture: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(
    {
      id: milestone.id,
      description: milestone.description,
      amount: milestone.amount,
      status: "PENDING",
      createdAt: milestone.createdAt.toISOString(),
      userId: milestone.project.user.id,
    },
    { status: 201 }
  );
}

async function approveMilestone(body: any) {
  const { milestoneId, adminId } = body;

  if (!adminId || !milestoneId) {
    return NextResponse.json(
      { error: "Admin ID and Milestone ID are required" },
      { status: 400 }
    );
  }

  // Verify the milestone exists and is in requested status
  const milestone = await prisma.milestone.findUnique({
    where: { id: parseInt(milestoneId) },
    include: {
      project: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!milestone) {
    return NextResponse.json({ error: "Milestone not found" }, { status: 404 });
  }

  if (milestone.status !== "requested") {
    return NextResponse.json(
      { error: "Milestone is not in requested status" },
      { status: 400 }
    );
  }

  // Update milestone status to approved/in_progress
  const updatedMilestone = await prisma.milestone.update({
    where: { id: parseInt(milestoneId) },
    data: {
      status: "in_progress",
      updatedAt: new Date(),
    },
    include: {
      project: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile_picture: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    id: updatedMilestone.id,
    description: updatedMilestone.description,
    amount: updatedMilestone.amount,
    status: "APPROVED",
    createdAt: updatedMilestone.createdAt.toISOString(),
    userId: updatedMilestone.project.user.id,
  });
}

async function declineMilestone(body: any) {
  const { milestoneId, adminId, reason } = body;

  if (!adminId || !milestoneId) {
    return NextResponse.json(
      { error: "Admin ID and Milestone ID are required" },
      { status: 400 }
    );
  }

  // Verify the milestone exists and is in requested status
  const milestone = await prisma.milestone.findUnique({
    where: { id: parseInt(milestoneId) },
    include: {
      project: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!milestone) {
    return NextResponse.json({ error: "Milestone not found" }, { status: 404 });
  }

  if (milestone.status !== "requested") {
    return NextResponse.json(
      { error: "Milestone is not in requested status" },
      { status: 400 }
    );
  }

  // Update milestone status to declined
  const updatedMilestone = await prisma.milestone.update({
    where: { id: parseInt(milestoneId) },
    data: {
      status: "declined",
      description: reason
        ? `${milestone.description}\n\nDecline Reason: ${reason}`
        : milestone.description,
      updatedAt: new Date(),
    },
    include: {
      project: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile_picture: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    id: updatedMilestone.id,
    description: updatedMilestone.description,
    amount: updatedMilestone.amount,
    status: "DECLINED",
    createdAt: updatedMilestone.createdAt.toISOString(),
    userId: updatedMilestone.project.user.id,
  });
}

async function completeMilestone(body: any) {
  const { milestoneId, adminId } = body;

  if (!adminId || !milestoneId) {
    return NextResponse.json(
      { error: "Admin ID and Milestone ID are required" },
      { status: 400 }
    );
  }

  // Verify the milestone exists and is in progress
  const milestone = await prisma.milestone.findUnique({
    where: { id: parseInt(milestoneId) },
    include: {
      project: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!milestone) {
    return NextResponse.json({ error: "Milestone not found" }, { status: 404 });
  }

  if (milestone.status !== "in_progress") {
    return NextResponse.json(
      { error: "Milestone is not in progress" },
      { status: 400 }
    );
  }

  // Update milestone status to completed
  const updatedMilestone = await prisma.milestone.update({
    where: { id: parseInt(milestoneId) },
    data: {
      status: "completed",
      completedAt: new Date().toISOString(),
      progress: 100,
      updatedAt: new Date(),
    },
    include: {
      project: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile_picture: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    id: updatedMilestone.id,
    title: updatedMilestone.title,
    description: updatedMilestone.description,
    amount: updatedMilestone.amount,
    status: "completed",
    completedAt: updatedMilestone.completedAt,
    progress: updatedMilestone.progress,
    createdAt: updatedMilestone.createdAt.toISOString(),
    userId: updatedMilestone.project.user.id,
  });
}

async function updateMilestone(body: any) {
  const { milestoneId, title, description, amount, adminId } = body;

  if (!milestoneId) {
    return NextResponse.json(
      { error: "Milestone ID is required" },
      { status: 400 }
    );
  }

  // Verify the milestone exists
  const milestone = await prisma.milestone.findUnique({
    where: { id: parseInt(milestoneId) },
  });

  if (!milestone) {
    return NextResponse.json({ error: "Milestone not found" }, { status: 404 });
  }

  // Prepare update data
  const updateData: any = {
    updatedAt: new Date(),
  };

  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (amount) updateData.amount = parseFloat(amount);

  const updatedMilestone = await prisma.milestone.update({
    where: { id: parseInt(milestoneId) },
    data: updateData,
    include: {
      project: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile_picture: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    id: updatedMilestone.id,
    title: updatedMilestone.title,
    description: updatedMilestone.description,
    amount: updatedMilestone.amount,
    status: updatedMilestone.status.toUpperCase(),
    createdAt: updatedMilestone.createdAt.toISOString(),
    userId: updatedMilestone.project.user.id,
  });
}

async function deleteMilestone(body: any) {
  const { milestoneId, adminId, userId } = body;

  if (!milestoneId) {
    return NextResponse.json(
      { error: "Milestone ID is required" },
      { status: 400 }
    );
  }

  // Verify the milestone exists
  const milestone = await prisma.milestone.findUnique({
    where: { id: parseInt(milestoneId) },
    include: {
      project: true,
    },
  });

  if (!milestone) {
    return NextResponse.json({ error: "Milestone not found" }, { status: 404 });
  }

  // Check if user has permission to delete (admin or project owner)
  const canDelete =
    adminId || (userId && milestone.project.userId === parseInt(userId));

  if (!canDelete) {
    return NextResponse.json(
      { error: "Unauthorized to delete milestone" },
      { status: 403 }
    );
  }

  // Only allow deletion of requested or declined milestones
  if (!["requested", "declined"].includes(milestone.status)) {
    return NextResponse.json(
      { error: "Cannot delete milestone in current status" },
      { status: 400 }
    );
  }

  await prisma.milestone.delete({
    where: { id: parseInt(milestoneId) },
  });

  return NextResponse.json({
    message: "Milestone deleted successfully",
    id: milestoneId,
  });
}
