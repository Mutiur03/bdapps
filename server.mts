import { createServer } from "http";
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

// Next.js configuration
let app: any;
let handle: any;

const prepareNext = async () => {
  const nextModule = await import("next");
  app = nextModule.default({ dev: process.env.NODE_ENV !== "production" });
  handle = app.getRequestHandler();
};

const startServer = async () => {
  try {
    // Initialize Prisma
    console.log("Initializing Prisma...");
    await initPrisma();
    console.log("Prisma initialized successfully");

    // Prepare Next.js app
    console.log("Preparing Next.js app...");
    await prepareNext();
    console.log("Next.js app prepared, starting...");
    await app.prepare();
    console.log("Next.js app started successfully");

    const server = createServer(async (req, res) => {
      try {
        // Handle CORS in a flexible way
        const origin = req.headers.origin;
        if (origin) {
          res.setHeader("Access-Control-Allow-Origin", origin);
        }
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, OPTIONS"
        );
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization"
        );
        res.setHeader("Access-Control-Allow-Credentials", "true");

        if (req.method === "OPTIONS") {
          res.writeHead(200);
          res.end();
          return;
        }

        await handle(req, res);
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("internal server error");
      }
    });

    // Socket.IO server configuration
    console.log("Creating Socket.IO server...");
    const io = new Server(server, {
      cors: {
        origin: (origin, callback) => {
          // Allow all origins in development, check in production
          if (process.env.NODE_ENV !== "production") {
            callback(null, true);
          } else {
            // In production, you might want to validate origins
            // Here we allow any origin but you could add validation logic
            callback(null, true);
          }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      },
      transports: ["websocket", "polling"],
      allowEIO3: true,
      pingTimeout: 60000,
      pingInterval: 25000,
      upgradeTimeout: 30000,
      maxHttpBufferSize: 1e6,
      connectTimeout: 45000,
      perMessageDeflate: {
        threshold: 1024,
        concurrencyLimit: 10,
      },
      httpCompression: true,
      serveClient: false,
      cookie: false,
    });

    // Enhanced error handling
    io.engine.on("connection_error", (err) => {
      console.error("Socket.IO connection error:", {
        code: err.code,
        message: err.message,
        context: err.context,
        req: {
          url: err.req?.url,
          method: err.req?.method,
          headers: err.req?.headers,
        },
      });
    });

    // Connection monitoring
    let connectionCount = 0;
    io.engine.on("connection", () => {
      connectionCount++;
      console.log(`New connection. Total: ${connectionCount}`);
    });

    io.engine.on("disconnect", () => {
      connectionCount--;
      console.log(`Disconnection. Total: ${connectionCount}`);
    });

    // Socket.IO event handlers
    io.on("connection", (socket) => {
      const clientInfo = {
        id: socket.id,
        ip: socket.handshake.address,
        userAgent: socket.handshake.headers["user-agent"] || "unknown",
        transport: socket.conn.transport.name,
      };

      console.log(`Client connected:`, clientInfo);

      // Error handling
      socket.on("error", (error) => {
        console.error(`Socket error:`, { ...clientInfo, error });
      });

      socket.on("connect_error", (error) => {
        console.error(`Socket connection error:`, { ...clientInfo, error });
      });

      socket.on("disconnect", (reason) => {
        console.log(`Client disconnected:`, { ...clientInfo, reason });
      });

      // Connection timeout
      const connectionTimeout = setTimeout(() => {
        if (socket.connected) {
          console.warn(`Connection timeout for socket ${socket.id}`);
          socket.disconnect(true);
        }
      }, 300000); // 5 minutes

      socket.on("disconnect", () => {
        clearTimeout(connectionTimeout);
      });

      // Room joining
      socket.on("join", ({ userId, adminId }) => {
        if (userId) {
          socket.join(`user-${userId}`);
          console.log(`User ${userId} joined room`);
        }
        if (adminId) {
          socket.join(`admin-${adminId}`);
          console.log(`Admin ${adminId} joined room`);
        }
      });

      // Message handling
      socket.on("message", async (msg) => {
        try {
          console.log("Received message:", msg);

          if (!msg?.content || !msg?.projectId) {
            console.error("Invalid message data:", msg);
            socket.emit("messageError", {
              message: "Invalid message data",
              error: "Missing required fields",
            });
            return;
          }

          // Create message in database
          const message = await prisma.message.create({
            data: {
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
            },
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

          // Update project status if admin is involved
          if (msg.senderAdminId || msg.receiverAdminId) {
            const currentProject = await prisma.project.findUnique({
              where: { id: Number(msg.projectId) },
              select: { status: true },
            });

            const updateData: any = {
              adminId: Number(msg.senderAdminId || msg.receiverAdminId),
            };

            if (currentProject?.status === "pending") {
              updateData.status = "active";
            }

            await prisma.project.update({
              where: { id: Number(msg.projectId) },
              data: updateData,
            });
          }

          // Format message for clients
          const formattedMessage = {
            id: message.id.toString(),
            content: message.content,
            sender: message.senderType.toLowerCase(),
            receiver: message.receiverType.toLowerCase(),
            createdAt: message.createdAt.toISOString(),
            projectId: msg.projectId,
          };

          // Emit to relevant parties
          const emitToParticipants = () => {
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
          };

          emitToParticipants();

          // Emit messageListUpdate for both user and admin
          const lastMessage = {
            text: message.content,
            timestamp: message.createdAt.toISOString(),
            isRead: false,
            sentByMe: !!msg.senderAdminId, // true if admin sent, false if user sent
          };

          // Fetch user/admin/project info for messageListUpdate
          const project = message.project;
          const senderUser = message.senderUser;
          const senderAdmin = message.senderAdmin;
          const receiverUser = message.receiverUser;
          const receiverAdmin = message.receiverAdmin;

          // For user
          if (msg.senderUserId || msg.receiverUserId) {
            io.emit("messageListUpdate", {
              projectId: msg.projectId,
              lastMessage,
              senderUserId: msg.senderUserId,
              senderAdminId: msg.senderAdminId,
              receiverUserId: msg.receiverUserId,
              receiverAdminId: msg.receiverAdminId,
              senderUser,
              senderAdmin,
              receiverUser,
              receiverAdmin,
              user: senderUser || receiverUser,
              admin: senderAdmin || receiverAdmin,
              project,
              // Mark as unread for the receiver
              hasUnread: true,
              unreadCount: 1,
            });
          }
          // For admin
          if (msg.senderAdminId || msg.receiverAdminId) {
            io.emit("messageListUpdate", {
              projectId: msg.projectId,
              lastMessage,
              senderUserId: msg.senderUserId,
              senderAdminId: msg.senderAdminId,
              receiverUserId: msg.receiverUserId,
              receiverAdminId: msg.receiverAdminId,
              senderUser,
              senderAdmin,
              receiverUser,
              receiverAdmin,
              user: senderUser || receiverUser,
              admin: senderAdmin || receiverAdmin,
              project,
              hasUnread: true,
              unreadCount: 1,
            });
          }

          console.log("Message processed successfully");
        } catch (error) {
          console.error("Failed to process message:", error);
          socket.emit("messageError", {
            message: "Failed to process message",
            error: String(error),
          });
        }
      });

      // Milestone events
      const handleMilestoneEvent = (type: string) => async (data: any) => {
        try {
          console.log(`Received milestone ${type}:`, data);
          if (data.projectId) {
            io.emit("milestoneUpdate", {
              type,
              projectId: data.projectId,
              ...data,
            });
          }
        } catch (error) {
          console.error(`Failed to handle milestone ${type}:`, error);
        }
      };

      socket.on("milestoneRequest", handleMilestoneEvent("request"));
      socket.on("milestoneApproval", handleMilestoneEvent("approval"));
      socket.on("milestoneCompletion", handleMilestoneEvent("completion"));
      socket.on("milestoneDecline", handleMilestoneEvent("decline"));

      // Mark messages as read
      socket.on("markMessagesRead", async (data) => {
        try {
          console.log("Marking messages as read:", data);
          const { projectId, userId, adminId } = data;

          if (userId) {
            await prisma.message.updateMany({
              where: {
                projectId: parseInt(projectId),
                receiverUserId: parseInt(userId),
                isRead: false,
              },
              data: { isRead: true },
            });

            const senderAdmin = await prisma.message.findFirst({
              where: {
                projectId: parseInt(projectId),
                senderAdminId: { not: null },
              },
              select: { senderAdminId: true },
            });

            if (senderAdmin?.senderAdminId) {
              io.to(`admin-${senderAdmin.senderAdminId}`).emit(
                "messagesMarkedRead",
                { projectId, readByUserId: userId }
              );
            }
          } else if (adminId) {
            await prisma.message.updateMany({
              where: {
                projectId: parseInt(projectId),
                receiverAdminId: parseInt(adminId),
                isRead: false,
              },
              data: { isRead: true },
            });

            const senderUser = await prisma.message.findFirst({
              where: {
                projectId: parseInt(projectId),
                senderUserId: { not: null },
              },
              select: { senderUserId: true },
            });

            if (senderUser?.senderUserId) {
              io.to(`user-${senderUser.senderUserId}`).emit(
                "messagesMarkedRead",
                { projectId, readByAdminId: adminId }
              );
            }
          }

          console.log("Messages marked as read successfully");
        } catch (error) {
          console.error("Failed to mark messages as read:", error);
        }
      });
    });

    // Start server
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Graceful shutdown
    const shutdown = (signal: string) => {
      console.log(`${signal} received, shutting down gracefully`);
      server.close((err?: Error) => {
        if (err) {
          console.error("Error during shutdown:", err);
          process.exit(1);
        }
        console.log("Server closed successfully");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (err) {
    console.error("Critical error starting server:", err);
    process.exit(1);
  }
};

// Error handling
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Start the server
startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
