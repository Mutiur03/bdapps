import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const milestones = await prisma.milestone.findMany({
      where: {
        projectId: parseInt(projectId),
        status: "requested", // Filter for requested milestones
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

    // Transform to match frontend expectations
    const transformedMilestones = milestones.map((milestone) => ({
      id: milestone.id,
      description: milestone.description,
      amount: milestone.amount,
      status:
        milestone.status === "requested"
          ? "PENDING"
          : milestone.status.toUpperCase(),
      createdAt: milestone.createdAt.toISOString(),
      userId: milestone.project.user.id,
    }));

    return NextResponse.json(transformedMilestones);
  } catch (error) {
    console.error("Error fetching milestone requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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

    // Transform to match frontend expectations
    const transformedMilestone = {
      id: milestone.id,
      description: milestone.description,
      amount: milestone.amount,
      status: "PENDING",
      createdAt: milestone.createdAt.toISOString(),
      userId: milestone.project.user.id,
    };

    return NextResponse.json(transformedMilestone, { status: 201 });
  } catch (error) {
    console.error("Error creating milestone request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
