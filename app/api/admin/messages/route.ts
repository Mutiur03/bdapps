import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const adminId = (session.user as { id?: string })?.id;

    // Find all projects where the admin has sent or received messages
    const projectsWithMessages = await prisma.project.findMany({
      where: {
        message: {
          some: {
            OR: [
              { senderType: "admin", senderAdminId: Number(adminId) },
              { receiverType: "admin", receiverAdminId: Number(adminId) },
            ],
          },
        },
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
        admin: {
          select: {
            id: true,
            name: true,
            profile_picture: true,
          },
        },
        message: {
          where: {
            OR: [
              { senderType: "admin", senderAdminId: Number(adminId) },
              { receiverType: "admin", receiverAdminId: Number(adminId) },
            ],
          },
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
            senderAdmin: {
              select: {
                id: true,
                name: true,
                profile_picture: true,
              },
            },
            receiverAdmin: {
              select: {
                id: true,
                name: true,
                profile_picture: true,
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
    const transformedProjects = projectsWithMessages.map((project) => {
      return {
        ...project,
        message: project.message.map((msg) => {
          const sender =
            msg.senderType === "user" ? msg.senderUser : msg.senderAdmin;
          const receiver =
            msg.receiverType === "user" ? msg.receiverUser : msg.receiverAdmin;

          return {
            ...msg,
            sender: {
              id: sender?.id,
              name: sender?.name,
              profile_picture: sender?.profile_picture,
              type: msg.senderType,
            },
            receiver: {
              id: receiver?.id,
              name: receiver?.name,
              profile_picture: receiver?.profile_picture,
              type: msg.receiverType,
            },
          };
        }),
      };
    });

    return NextResponse.json(transformedProjects, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin conversations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
