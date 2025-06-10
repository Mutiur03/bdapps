import { createServer } from "http";
// Remove: import * as next from "next";
import { Server } from "socket.io";
import { MessageRole } from "@prisma/client";

// Dynamic import for prisma to avoid module loading issues
let prisma: any;

const initPrisma = async () => {
  if (!prisma) {
    try {
      const { default: prismaClient } = await import("./lib/prisma.js");
      prisma = prismaClient;
    } catch (error) {
      console.error("Failed to load Prisma client:", error);
      process.exit(1);
    }
  }
  return prisma;
};

const dev = process.env.NODE_ENV !== "production";
const host = process.env.HOST || "localhost";

// Simple Next.js configuration for App Router
let app: any;
let handle: any;

const prepareNext = async () => {
  const nextModule = await import("next");
  // Use Next constructor directly
  app = nextModule.default({ dev });
  handle = app.getRequestHandler();
};

const startServer = async () => {
  try {
    // Initialize Prisma
    await initPrisma();

    // Prepare Next.js app
    await prepareNext();
    await app.prepare();

    const server = createServer(async (req, res) => {
      try {
        await handle(req, res);
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("internal server error");
      }
    });

    const io = new Server(server, {
      cors: {
        origin: dev
          ? ["http://localhost:3000", "http://127.0.0.1:3000"]
          : false,
        methods: ["GET", "POST"],
        credentials: true,
      },
      transports: ["websocket", "polling"],
    });

    io.on("connection", (socket) => {
      console.log(`${socket.id} connected`);

      socket.on("join", ({ userId, adminId }) => {
        if (userId) {
          socket.join(`user-${userId}`);
          console.log(`User joined room: user-${userId}`);
        }

        if (adminId) {
          socket.join(`admin-${adminId}`);
          console.log(`Admin joined room: admin-${adminId}`);
        }
      });

      socket.on("message", async (msg) => {
        try {
          console.log("Received message:", msg);

          const messageData = {
            content: msg.content,
            senderType: msg.senderType as MessageRole,
            receiverType: msg.receiverType as MessageRole,
            isRead: false,
            ...(msg.projectId && {
              project: { connect: { id: Number(msg.projectId) } },
            }),
            ...(msg.senderUserId && {
              senderUser: { connect: { id: Number(msg.senderUserId) } },
            }),
            ...(msg.senderAdminId && {
              senderAdmin: { connect: { id: Number(msg.senderAdminId) } },
            }),
            ...(msg.receiverUserId && {
              receiverUser: { connect: { id: Number(msg.receiverUserId) } },
            }),
            ...(msg.receiverAdminId && {
              receiverAdmin: { connect: { id: Number(msg.receiverAdminId) } },
            }),
          };

          const message = await prisma.message.create({
            data: messageData,
            include: {
              senderUser: {
                select: { id: true, name: true, profile_picture: true },
              },
              senderAdmin: {
                select: { id: true, name: true, profile_picture: true },
              },
              receiverUser: { select: { name: true, profile_picture: true } },
              receiverAdmin: { select: { name: true, profile_picture: true } },
              project: { select: { id: true, title: true } },
            },
          });

          // Update project.adminId and status for any admin involved in the conversation
          if (msg.senderAdminId || msg.receiverAdminId) {
            // First get the current project status
            const currentProject = await prisma.project.findUnique({
              where: { id: Number(msg.projectId) },
              select: { status: true },
            });

            const updateData: any = {
              adminId: Number(msg.senderAdminId || msg.receiverAdminId),
            };

            // Only update status to ACTIVE if current status is PENDING
            if (currentProject?.status === "pending") {
              updateData.status = "active";
            }

            await prisma.project.update({
              where: { id: Number(msg.projectId) },
              data: updateData,
            });
          }

          // Format the message for client consumption
          const formattedMessage = {
            id: message.id.toString(),
            content: message.content,
            sender: message.senderType.toLowerCase(),
            receiver: message.receiverType.toLowerCase(),
            createdAt: message.createdAt.toISOString(),
            projectId: msg.projectId,
          };

          // Format message for message list updates
          const messageListUpdate = {
            projectId: msg.projectId,
            lastMessage: {
              text: message.content,
              timestamp: message.createdAt.toISOString(),
              isRead: false,
              sentByMe: false,
            },
            hasUnread: true,
            sender: message.senderType.toLowerCase(),
            receiver: message.receiverType.toLowerCase(),
            senderUser: message.senderUser,
            senderAdmin: message.senderAdmin,
            receiverUser: message.receiverUser,
            receiverAdmin: message.receiverAdmin,
            project: message.project,
          };

          // Check if this is a new conversation
          const existingMessagesCount = await prisma.message.count({
            where: {
              projectId: Number(msg.projectId),
            },
          });

          // Send to chat interface participants
          if (msg.senderUserId) {
            io.to(`user-${msg.senderUserId}`).emit(
              "newMessage",
              formattedMessage
            );
          }
          if (msg.senderAdminId) {
            io.to(`admin-${msg.senderAdminId}`).emit(
              "newMessage",
              formattedMessage
            );
          }
          if (msg.receiverUserId) {
            io.to(`user-${msg.receiverUserId}`).emit(
              "newMessage",
              formattedMessage
            );
          }
          if (msg.receiverAdminId) {
            io.to(`admin-${msg.receiverAdminId}`).emit(
              "newMessage",
              formattedMessage
            );
          }

          // Send message list updates to all connected users/admins
          if (msg.receiverUserId) {
            const updateForUser = {
              ...messageListUpdate,
              lastMessage: {
                ...messageListUpdate.lastMessage,
                sentByMe: false,
              },
              receiverUserId: msg.receiverUserId,
            };

            io.to(`user-${msg.receiverUserId}`).emit(
              "messageListUpdate",
              updateForUser
            );

            // If this is a new conversation, emit newConversation event
            if (existingMessagesCount === 1) {
              io.to(`user-${msg.receiverUserId}`).emit(
                "newConversation",
                updateForUser
              );
            }
          }

          if (msg.receiverAdminId) {
            const updateForAdmin = {
              ...messageListUpdate,
              lastMessage: {
                ...messageListUpdate.lastMessage,
                sentByMe: false,
              },
              receiverAdminId: msg.receiverAdminId,
            };

            io.to(`admin-${msg.receiverAdminId}`).emit(
              "messageListUpdate",
              updateForAdmin
            );

            // If this is a new conversation, emit newConversation event
            if (existingMessagesCount === 1) {
              io.to(`admin-${msg.receiverAdminId}`).emit(
                "newConversation",
                updateForAdmin
              );
            }
          }

          // When a user sends a message, notify ALL connected admins
          if (msg.senderUserId) {
            // Emit to sender for their own message list
            io.to(`user-${msg.senderUserId}`).emit("messageListUpdate", {
              ...messageListUpdate,
              lastMessage: { ...messageListUpdate.lastMessage, sentByMe: true },
              hasUnread: false,
              senderUserId: msg.senderUserId,
            });

            // Emit to ALL connected admins when user sends message
            const updateForAllAdmins = {
              ...messageListUpdate,
              lastMessage: {
                ...messageListUpdate.lastMessage,
                sentByMe: false,
              },
              senderUserId: msg.senderUserId,
              receiverAdminId: null, // This ensures all admins can see it
            };

            // Broadcast to all admin rooms
            const adminRooms = Array.from(
              io.sockets.adapter.rooms.keys()
            ).filter((room) => room.startsWith("admin-"));

            console.log("Broadcasting to admin rooms:", adminRooms);
            adminRooms.forEach((room) => {
              io.to(room).emit("messageListUpdate", updateForAllAdmins);
            });

            // If this is a new conversation, also broadcast to all admins
            if (existingMessagesCount === 1) {
              adminRooms.forEach((room) => {
                io.to(room).emit("newConversation", updateForAllAdmins);
              });
            }
          }

          // When an admin sends a message, notify the specific user
          if (msg.senderAdminId) {
            // Emit to admin sender for their own message list
            io.to(`admin-${msg.senderAdminId}`).emit("messageListUpdate", {
              ...messageListUpdate,
              lastMessage: { ...messageListUpdate.lastMessage, sentByMe: true },
              hasUnread: false,
              senderAdminId: msg.senderAdminId,
            });

            // Emit to the specific user if they're connected
            if (msg.receiverUserId) {
              const updateForUser = {
                ...messageListUpdate,
                lastMessage: {
                  ...messageListUpdate.lastMessage,
                  sentByMe: false,
                },
                receiverUserId: msg.receiverUserId,
                senderAdminId: msg.senderAdminId,
                sender: "admin",
                receiver: "user",
              };

              console.log(
                "Sending message update to user:",
                msg.receiverUserId,
                updateForUser
              );
              io.to(`user-${msg.receiverUserId}`).emit(
                "messageListUpdate",
                updateForUser
              );

              // If this is a new conversation, also emit newConversation
              if (existingMessagesCount === 1) {
                io.to(`user-${msg.receiverUserId}`).emit(
                  "newConversation",
                  updateForUser
                );
              }
            }

            // Also broadcast to all users in general for new conversations
            if (existingMessagesCount === 1) {
              const generalUserUpdate = {
                ...messageListUpdate,
                lastMessage: {
                  ...messageListUpdate.lastMessage,
                  sentByMe: false,
                },
                senderAdminId: msg.senderAdminId,
                sender: "admin",
                receiver: "user",
              };

              // Find all user rooms and broadcast
              const userRooms = Array.from(
                io.sockets.adapter.rooms.keys()
              ).filter((room) => room.startsWith("user-"));

              userRooms.forEach((room) => {
                const userId = room.replace("user-", "");
                if (userId === msg.receiverUserId?.toString()) {
                  io.to(room).emit("newConversation", generalUserUpdate);
                }
              });
            }
          }

          if (msg.senderAdminId) {
            await prisma.project.update({
              where: { id: Number(msg.projectId) },
              data: {
                adminId: Number(msg.senderAdminId),
              },
            });
          }

          console.log("Message sent successfully:", formattedMessage);
        } catch (error) {
          console.error("Failed to save message:", error);
          socket.emit("messageError", {
            message: "Failed to save message",
            error: String(error),
          });
        }
      });

      // Add milestone socket events
      socket.on("milestoneRequest", async (data) => {
        try {
          console.log("Received milestone request:", data);

          // Broadcast to all users in the project
          if (data.projectId) {
            socket.broadcast.emit("milestoneUpdate", {
              type: "request",
              projectId: data.projectId,
              ...data,
            });
          }
        } catch (error) {
          console.error("Failed to handle milestone request:", error);
        }
      });

      socket.on("milestoneApproval", async (data) => {
        try {
          console.log("Received milestone approval:", data);

          // Broadcast to all users in the project
          if (data.projectId) {
            socket.broadcast.emit("milestoneUpdate", {
              type: "approval",
              projectId: data.projectId,
              ...data,
            });
          }
        } catch (error) {
          console.error("Failed to handle milestone approval:", error);
        }
      });

      socket.on("milestoneCompletion", async (data) => {
        try {
          console.log("Received milestone completion:", data);

          // Broadcast to all users in the project
          if (data.projectId) {
            socket.broadcast.emit("milestoneUpdate", {
              type: "completion",
              projectId: data.projectId,
              ...data,
            });
          }
        } catch (error) {
          console.error("Failed to handle milestone completion:", error);
        }
      });

      socket.on("milestoneDecline", async (data) => {
        try {
          console.log("Received milestone decline:", data);

          // Broadcast to all users in the project
          if (data.projectId) {
            socket.broadcast.emit("milestoneUpdate", {
              type: "decline",
              projectId: data.projectId,
              ...data,
            });
          }
        } catch (error) {
          console.error("Failed to handle milestone decline:", error);
        }
      });

      socket.on("markMessagesRead", async (data) => {
        try {
          console.log("Marking messages as read:", data);
          const { projectId, userId, adminId } = data;

          // Update read status in database
          if (userId) {
            await prisma.message.updateMany({
              where: {
                projectId: parseInt(projectId),
                receiverUserId: parseInt(userId),
                isRead: false,
              },
              data: {
                isRead: true,
              },
            });

            // Emit read status update to sender (admin)
            const senderAdmin = await prisma.message.findFirst({
              where: {
                projectId: parseInt(projectId),
                senderAdminId: { not: null },
              },
              select: {
                senderAdminId: true,
              },
            });

            if (senderAdmin?.senderAdminId) {
              io.to(`admin-${senderAdmin.senderAdminId}`).emit(
                "messagesMarkedRead",
                {
                  projectId: projectId,
                  readByUserId: userId,
                }
              );
            }
          } else if (adminId) {
            await prisma.message.updateMany({
              where: {
                projectId: parseInt(projectId),
                receiverAdminId: parseInt(adminId),
                isRead: false,
              },
              data: {
                isRead: true,
              },
            });

            // Emit read status update to sender (user)
            const senderUser = await prisma.message.findFirst({
              where: {
                projectId: parseInt(projectId),
                senderUserId: { not: null },
              },
              select: {
                senderUserId: true,
              },
            });

            if (senderUser?.senderUserId) {
              io.to(`user-${senderUser.senderUserId}`).emit(
                "messagesMarkedRead",
                {
                  projectId: projectId,
                  readByAdminId: adminId,
                }
              );
            }
          }

          console.log("Messages marked as read successfully");
        } catch (error) {
          console.error("Failed to mark messages as read:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
      });
    });

    server.listen(process.env.PORT || 3000, () => {
      console.log(`> Ready on http://${host}:${process.env.PORT || 3000}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Start the server
startServer();
