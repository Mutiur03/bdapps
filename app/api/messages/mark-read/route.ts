import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId, userType } = await request.json();
    const currentUserId = Number((session.user as { id?: string })?.id);

    // Mark all unread messages in this project as read for the current user
    if (userType === "user") {
      await prisma.message.updateMany({
        where: {
          projectId: Number(projectId),
          receiverUserId: currentUserId,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });
    } else if (userType === "admin") {
      await prisma.message.updateMany({
        where: {
          projectId: Number(projectId),
          receiverAdminId: currentUserId,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    return NextResponse.json(
      { error: "Failed to mark messages as read" },
      { status: 500 }
    );
  }
}
