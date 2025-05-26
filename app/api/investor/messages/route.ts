import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  // Get the URL and check if there's a project ID parameter
  const url = new URL(request.url);
  const projectId = url.searchParams.get("projectId");

  try {
    // If projectId is provided, return data for a single project
    if (projectId) {
      const project = await prisma.project.findUnique({
        where: {
          id: Number(projectId),
        },
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
          message: {
            include: {
              senderUser: {
                select: {
                  id: true,
                  name: true,
                  profile_picture: true,
                },
              },
              receiverUser: {
                select: {
                  id: true,
                  name: true,
                  profile_picture: true,
                },
              },
              senderInvestor: {
                select: {
                  id: true,
                  name: true,
                  profile_picture: true,
                  company_name: true,
                },
              },
              receiverInvestor: {
                select: {
                  id: true,
                  name: true,
                  profile_picture: true,
                  company_name: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      if (!project) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }

      // Transform the project data
      const transformedProject = {
        ...project,
        message: project.message.map((msg) => {
          const sender =
            msg.senderType === "user" ? msg.senderUser : msg.senderInvestor;
          const receiver =
            msg.receiverType === "user"
              ? msg.receiverUser
              : msg.receiverInvestor;

          return {
            ...msg,
            sender: {
              id: sender?.id,
              name: sender?.name,
              profile_picture: sender?.profile_picture,
              company_name:
                msg.senderType === "investor"
                  ? msg.senderInvestor?.company_name || null
                  : null,
              type: msg.senderType,
            },
            receiver: {
              id: receiver?.id,
              name: receiver?.name,
              profile_picture: receiver?.profile_picture,
              company_name:
                msg.receiverType === "investor"
                  ? msg.receiverInvestor?.company_name || null
                  : null,
              type: msg.receiverType,
            },
          };
        }),
      };

      return NextResponse.json(transformedProject);
    }

    // Original code for getting all projects
    const projects = await prisma.project.findMany({
      where: {
        message: {
          some: {
            OR: [{ senderType: "user" }, { receiverType: "user" }],
          },
        },
      },
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
        message: {
          include: {
            senderUser: {
              select: {
                id: true,
                name: true,
                profile_picture: true,
              },
            },
            receiverUser: {
              select: {
                id: true,
                name: true,
                profile_picture: true,
              },
            },
            senderInvestor: {
              select: {
                id: true,
                name: true,
                profile_picture: true,
                company_name: true,
              },
            },
            receiverInvestor: {
              select: {
                id: true,
                name: true,
                profile_picture: true,
                company_name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // Filter projects again to ensure they have at least one message with a user
    const filteredProjects = projects.filter((project) =>
      project.message.some(
        (msg) => msg.senderType === "user" || msg.receiverType === "user"
      )
    );

    const transformedProjects = filteredProjects.map((project) => {
      return {
        ...project,
        message: project.message.map((msg) => {
          const sender =
            msg.senderType === "user" ? msg.senderUser : msg.senderInvestor;
          const receiver =
            msg.receiverType === "user"
              ? msg.receiverUser
              : msg.receiverInvestor;

          return {
            ...msg,
            sender: {
              id: sender?.id,
              name: sender?.name,
              profile_picture: sender?.profile_picture,
              company_name:
                msg.senderType === "investor"
                  ? msg.senderInvestor?.company_name || null
                  : null,
              type: msg.senderType,
            },
            receiver: {
              id: receiver?.id,
              name: receiver?.name,
              profile_picture: receiver?.profile_picture,
              company_name:
                msg.receiverType === "investor"
                  ? msg.receiverInvestor?.company_name || null
                  : null,
              type: msg.receiverType,
            },
          };
        }),
      };
    });
    return NextResponse.json(transformedProjects);
  } catch (error) {
    console.error("Error retrieving projects:", error);
    return NextResponse.json(
      { error: "Failed to retrieve projects" },
      { status: 500 }
    );
  }
}
