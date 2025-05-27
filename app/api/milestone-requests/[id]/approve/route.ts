import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    // Verify the milestone exists and is in requested status
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

    if (milestone.status !== "requested") {
      return NextResponse.json(
        { error: "Milestone is not in requested status" },
        { status: 400 }
      );
    }

    // Update milestone status to approved/in_progress
    const updatedMilestone = await prisma.milestone.update({
      where: { id: milestoneId },
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
  } catch (error) {
    console.error("Error approving milestone:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
