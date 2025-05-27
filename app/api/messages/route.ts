import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Get project ID from the URL query parameters
    const searchParams = req.nextUrl.searchParams;
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const messages = await prisma.message.findMany({
      where: {
        projectId: Number(projectId),
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        senderUser: {
          select: {
            id: true,
            name: true,
          },
        },
        receiverUser: {
          select: {
            id: true,
            name: true,
          },
        },
        senderAdmin: {
          select: {
            id: true,
            name: true,
          },
        },
        receiverAdmin: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!messages || messages.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Format messages for export
    const formattedMessages = messages.map((message) => {
      // Determine sender and receiver names
      const sender = message.senderType;
      // message.senderUser?.name || message.senderInvestor?.name || "Unknown";

      const receiver = message.receiverType;
      // message.receiverUser?.name ||
      // message.receiverInvestor?.name ||
      // "Unknown";

      return {
        id: message.id,
        content: message.content,
        sender: sender,
        receiver: receiver,
        createdAt: message.createdAt.toISOString(),
        projectId: message.projectId,
      };
    });

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("Error exporting messages:", error);
    return NextResponse.json(
      { error: "Failed to export messages" },
      { status: 500 }
    );
  }
}
