import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
        investor: {
          select: {
            id: true,
            name: true,
            company_name: true,
            profile_picture: true,
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

    // Transform the messages to a more usable format
    const transformedProjects = projects.map((project) => {
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

    const projectsWithUserMessages = transformedProjects.filter((project) => {
      return project.message.some(
        (msg) =>
          (msg.senderType === "user" && msg.sender.id === Number(userId)) ||
          (msg.receiverType === "user" && msg.receiver.id === Number(userId))
      );
    });

    return NextResponse.json(projectsWithUserMessages, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
