import { createServer } from "http";
import next from "next";
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
const port = parseInt(process.env.PORT || "3000", 10);

// Simple Next.js configuration for App Router
const app = next({
  dev,
  hostname: host,
  port,
});
const handle = app.getRequestHandler();

const startServer = async () => {
  try {
    // Initialize Prisma
    await initPrisma();

    // Prepare Next.js app
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

          console.log(
            "Creating message with data:",
            JSON.stringify(messageData, null, 2)
          );

          const message = await prisma.message.create({
            data: messageData,
            include: {
              senderUser: { select: { name: true, profile_picture: true } },
              senderAdmin: { select: { name: true, profile_picture: true } },
              receiverUser: { select: { name: true, profile_picture: true } },
              receiverAdmin: { select: { name: true, profile_picture: true } },
            },
          });

          // Format the message for client consumption
          const formattedMessage = {
            id: message.id.toString(),
            content: message.content,
            sender: message.senderType.toLowerCase(),
            receiver: message.receiverType.toLowerCase(),
            createdAt: message.createdAt.toISOString(),
          };

          console.log("Sending to user room:", `user-${msg.receiverUserId}`);
          console.log("Sending to admin room:", `admin-${msg.receiverAdminId}`);

          // Send to sender as confirmation
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

          // Send to recipient
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

      socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
      });
    });

    server.listen(port, () => {
      console.log(`> Ready on http://${host}:${port}`);
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
