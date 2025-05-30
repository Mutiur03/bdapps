import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current admin ID
    const currentAdminId = Number((session.user as { id?: string })?.id);

    // Get all projects where this admin has exchanged messages
    const conversations = await prisma.project.findMany({
      where: {
        OR: [
          {
            message: {
              some: {
                OR: [
                  { senderAdminId: currentAdminId },
                  { receiverAdminId: currentAdminId },
                ],
              },
            },
          },
        ],
      },
      include: {
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
              { senderAdminId: currentAdminId },
              { receiverAdminId: currentAdminId },
              { senderUserId: { not: null } },
              { receiverUserId: { not: null } },
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
        // Get unread message count for this admin
        const unreadCount = await prisma.message.count({
          where: {
            projectId: project.id,
            receiverAdminId: currentAdminId,
            isRead: false,
          },
        });

        const lastMessage = project.message[0];

        return {
          id: project.id.toString(),
          title: project.title,
          user: {
            id: project.user.id.toString(),
            name: project.user.name || "Unknown User",
            startup: project.title,
            profile_picture: project.user.profile_picture || "",
          },
          lastMessage: lastMessage
            ? {
                text: lastMessage.content,
                timestamp: lastMessage.createdAt.toISOString(),
                isRead: lastMessage.isRead,
                sentByMe: lastMessage.senderAdminId === currentAdminId,
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
    console.error("Error fetching admin conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}
