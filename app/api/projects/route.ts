import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            university: true,
            department: true,
            university_email: true,
            profile_picture: true,
          },
        },
        documents: {
          select: {
            id: true,
            projectId: true,
            document: true,
            size: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        projectMembers: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                university: true,
                university_email: true,
                profile_picture: true,
              },
            },
          },
        },
        milestones: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            amount: true,
            progress: true,
            raised_amount: true,
            deadlineAt: true,
            createdAt: true,
            updatedAt: true,
            projectId: true,
            completedAt: true,
            plannedAt: true,
          },
        },
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error retrieving projects:", error);
    return NextResponse.json(
      { error: "Failed to retrieve projects" },
      { status: 500 }
    );
  }
}
