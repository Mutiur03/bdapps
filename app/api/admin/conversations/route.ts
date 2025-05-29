import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminId = parseInt(session.user.id);

    // Get all conversations where this admin is involved
    const conversations = await prisma.message.findMany({
      where: {
        OR: [{ senderAdminId: adminId }, { receiverAdminId: adminId }],
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            user: {
              select: {
                id: true,
                name: true,
                profile_picture: true,
              },
            },
          },
        },
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`Found ${conversations.length} messages for admin ${adminId}`);

    // Group messages by project and get the latest message for each conversation
    const conversationMap = new Map();

    for (const message of conversations) {
      const projectId = message.projectId.toString();

      if (!conversationMap.has(projectId)) {
        // Determine the other participant (user)
        let otherUser;
        if (message.senderAdminId === adminId) {
          // This admin sent the message, so the other participant is the receiver
          otherUser = message.receiverUser || message.project.user;
        } else {
          // This admin received the message, so the other participant is the sender
          otherUser = message.senderUser || message.project.user;
        }

        conversationMap.set(projectId, {
          id: projectId,
          title: message.project.title,
          user: {
            id: otherUser?.id?.toString() || "unknown",
            name: otherUser?.name || "User",
            startup: message.project.title,
            profile_picture: otherUser?.profile_picture || "",
          },
          lastMessage: {
            text: message.content,
            timestamp: message.createdAt.toISOString(),
            isRead: message.isRead || false,
            sentByMe: message.senderAdminId === adminId,
          },
          hasUnread: false,
          unreadCount: 0,
        });
      } else {
        // Update if this message is newer
        const existing = conversationMap.get(projectId);
        const existingTime = new Date(existing.lastMessage.timestamp).getTime();
        const currentTime = new Date(message.createdAt).getTime();

        if (currentTime > existingTime) {
          existing.lastMessage = {
            text: message.content,
            timestamp: message.createdAt.toISOString(),
            isRead: message.isRead || false,
            sentByMe: message.senderAdminId === adminId,
          };
        }
      }
    }

    // Calculate unread counts for each conversation
    const conversationsArray = Array.from(conversationMap.values());

    for (const conversation of conversationsArray) {
      const unreadCount = await prisma.message.count({
        where: {
          projectId: parseInt(conversation.id),
          receiverAdminId: adminId,
          isRead: false,
        },
      });

      conversation.unreadCount = unreadCount;
      conversation.hasUnread = unreadCount > 0;
    }

    // Sort by last message timestamp
    conversationsArray.sort((a, b) => {
      const aTime = new Date(a.lastMessage.timestamp).getTime();
      const bTime = new Date(b.lastMessage.timestamp).getTime();
      return bTime - aTime;
    });

    console.log(`Returning ${conversationsArray.length} conversations for admin`);
    return NextResponse.json(conversationsArray);
  } catch (error) {
    console.error("Error fetching admin conversations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
