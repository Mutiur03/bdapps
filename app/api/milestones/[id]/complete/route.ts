import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { adminId } = body;
    const milestoneId = parseInt(params.id);

    if (!adminId) {
      return NextResponse.json(
        { error: "Admin ID is required" },
        { status: 400 }
      );
    }

    // Verify the milestone exists and is in progress
    const milestone = await prisma.milestone.findUnique({
      where: { id: milestoneId },
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
      return NextResponse.json(
        { error: "Milestone not found" },
        { status: 404 }
      );
    }

    if (milestone.status !== "in_progress") {
      return NextResponse.json(
        { error: "Milestone is not in progress" },
        { status: 400 }
      );
    }

    // Update milestone status to completed
    const updatedMilestone = await prisma.milestone.update({
      where: { id: milestoneId },
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
  } catch (error) {
    console.error("Error completing milestone:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
