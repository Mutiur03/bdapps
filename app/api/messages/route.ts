import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MessageRole } from "@prisma/client";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const {
//       content,
//       projectId,
//       senderType,
//       receiverType,
//       senderUserId,
//       senderInvestorId,
//       receiverUserId,
//       receiverInvestorId,
//     } = body;

//     // Validate required fields
//     if (!content || !projectId || !senderType || !receiverType) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const parsedProjectId = Number(projectId);
//     if (isNaN(parsedProjectId)) {
//       return NextResponse.json(
//         { error: "Invalid project ID" },
//         { status: 400 }
//       );
//     }

//     const messageData = {
//       content,
//       senderType: senderType as MessageRole,
//       receiverType: receiverType as MessageRole,
//       project: {
//         connect: { id: parsedProjectId },
//       },
//       ...(senderUserId && {
//         senderUser: { connect: { id: Number(senderUserId) } },
//       }),
//       ...(senderInvestorId && {
//         senderInvestor: { connect: { id: Number(senderInvestorId) } },
//       }),
//       ...(receiverUserId && {
//         receiverUser: { connect: { id: Number(receiverUserId) } },
//       }),
//       ...(receiverInvestorId && {
//         receiverInvestor: {
//           connect: { id: Number(receiverInvestorId) },
//         },
//       }),
//     };

//     const message = await prisma.message.create({
//       data: messageData,
//       include: {
//         senderUser: { select: { name: true, profile_picture: true } },
//         senderInvestor: { select: { name: true, profile_picture: true } },
//         receiverUser: { select: { name: true, profile_picture: true } },
//         receiverInvestor: {
//           select: { name: true, profile_picture: true },
//         },
//       },
//     });

//     // Format the response to match the socket message format
//     const formattedMessage = {
//       id: message.id.toString(),
//       content: message.content,
//       sender: message.senderType.toLowerCase(),
//       receiver: message.receiverType.toLowerCase(),
//       createdAt: message.createdAt.toISOString(),
//     };

//     return NextResponse.json(formattedMessage, { status: 201 });
//   } catch (error) {
//     console.error("Error creating message:", error);
//     return NextResponse.json(
//       { error: "Failed to create message" },
//       { status: 500 }
//     );
//   }
// }

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
        senderInvestor: {
          select: {
            id: true,
            name: true,
          },
        },
        receiverInvestor: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        [],
        { status: 200 }
      );
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
