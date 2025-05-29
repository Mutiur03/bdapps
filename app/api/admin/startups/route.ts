import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const startups = await prisma.project.findMany({
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
        category: {
          select: {
            name: true,
          },
        },
        documents: {
          select: {
            document: true,
            size: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        milestones: {
          select: {
            title: true,
            description: true,
            status: true,
            amount: true,
            raised_amount: true,
            deadlineAt: true,
            createdAt: true,
            updatedAt: true,
            completedAt: true,
            plannedAt: true,
            progress: true,
          },
        },
        projectMembers: {
          select: {
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
        admin: {
          select: {
            id: true,
            name: true,
            profile_picture: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(startups), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching startups:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
