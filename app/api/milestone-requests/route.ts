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

    // Transform to match frontend expectations
    const transformedMilestones = milestones.map((milestone) => ({
      id: milestone.id,
      description: milestone.description,
      amount: milestone.amount,
      status: "PENDING",
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
