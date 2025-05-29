import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// New code for user messages API endpoint
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const userId = (session.user as { id?: string })?.id;

    // Get all projects where this user has exchanged messages (either as sender or receiver)
    const conversations = await prisma.project.findMany({
      where: {
        OR: [
          // Projects owned by this user that have messages
          {
            userId: Number(userId),
            message: {
              some: {},
            },
          },
          // Projects where this user has sent or received messages
          {
            message: {
              some: {
                OR: [
                  { senderUserId: Number(userId) },
                  { receiverUserId: Number(userId) },
                ],
              },
            },
          },
        ],
      },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            profile_picture: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            profile_picture: true,
          },
        },
        message: {
          where: {
            OR: [
              { senderUserId: Number(userId) },
              { receiverUserId: Number(userId) },
              { senderAdminId: { not: null } },
              { receiverAdminId: { not: null } },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
          include: {
            senderUser: { select: { name: true } },
            senderAdmin: { select: { name: true } },
          },
        },
      },
    });

    // Format conversations with unread counts and last messages
    const formattedConversations = await Promise.all(
      conversations.map(async (project) => {
        // Get unread message count for this user
        const unreadCount = await prisma.message.count({
          where: {
            projectId: project.id,
            receiverUserId: Number(userId),
            isRead: false,
          },
        });

        const lastMessage = project.message[0];

        // Determine the admin - could be from project.admin or from message senders
        let admin = project.admin;

        // If no admin assigned to project, try to find admin from messages
        if (!admin && lastMessage) {
          if (lastMessage.senderAdmin) {
            admin = {
              id: lastMessage.senderAdmin.id,
              name: lastMessage.senderAdmin.name,
              profile_picture: null,
            };
          }
        }

        return {
          id: project.id.toString(),
          admin: admin
            ? {
                id: admin.id.toString(),
                name: admin.name || "Admin",
                profile_picture: admin.profile_picture || "",
              }
            : {
                id: "unknown",
                name: "Admin",
                profile_picture: "",
              },
          lastMessage: lastMessage
            ? {
                text: lastMessage.content,
                timestamp: lastMessage.createdAt.toISOString(),
                isRead: lastMessage.isRead,
                sentByMe: lastMessage.senderUserId === Number(userId),
              }
            : null,
          hasUnread: unreadCount > 0,
          unreadCount: unreadCount,
        };
      })
    );

    // Sort by last message timestamp
    formattedConversations.sort((a, b) => {
      const aTime = a.lastMessage
        ? new Date(a.lastMessage.timestamp).getTime()
        : 0;
      const bTime = b.lastMessage
        ? new Date(b.lastMessage.timestamp).getTime()
        : 0;
      return bTime - aTime;
    });

    return NextResponse.json(formattedConversations);
  } catch (error) {
    console.error("Error fetching user conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}
