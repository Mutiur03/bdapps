import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";
import prisma from "./lib/prisma.ts";
import { MessageRole } from "@prisma/client"; // Import MessageRole enum

const dev = process.env.NODE_ENV !== "production";
const host = process.env.HOST || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname: host, port });
const handle = app.getRequestHandler();

// Track online users
const onlineUsers = new Map(); // userId/investorId -> socket.id
const userTypes = new Map(); // socket.id -> { type: 'user'/'investor', id: userId/investorId }

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      handle(req, res);
    });

    const io = new Server(server);

    io.on("connection", (socket) => {
      console.log(`${socket.id} connected`);

      socket.on("join", ({ userId, investorId }) => {
        if (userId) {
          socket.join(`user-${userId}`);
          onlineUsers.set(`user-${userId}`, socket.id);
          userTypes.set(socket.id, { type: "user", id: userId });
          console.log(`User joined room: user-${userId}`);

          // Broadcast user online status
          io.emit("userStatus", { type: "user", id: userId, status: "online" });
        }

        if (investorId) {
          socket.join(`investor-${investorId}`);
          onlineUsers.set(`investor-${investorId}`, socket.id);
          userTypes.set(socket.id, { type: "investor", id: investorId });
          console.log(`Investor joined room: investor-${investorId}`);

          // Broadcast investor online status
          io.emit("userStatus", {
            type: "investor",
            id: investorId,
            status: "online",
          });
        }
      });

      // Handle user requesting status of another user
      socket.on("checkUserStatus", ({ userType, userId }) => {
        const isOnline = onlineUsers.has(`${userType}-${userId}`);
        socket.emit("userStatusResponse", {
          type: userType,
          id: userId,
          status: isOnline ? "online" : "offline",
        });
      });

      socket.on("message", async (msg) => {
        try {
          console.log("Received message:", msg);
          const projectId = Number(msg.projectId);
          if (isNaN(projectId)) {
            throw new Error("Invalid project ID");
          }
          await prisma.project.update({
            where: { id: projectId },
            data: {
              invesrorId: msg.senderInvestorId
                ? Number(msg.senderInvestorId)
                : undefined,
            },
          });

          const messageData = {
            content: msg.content,
            senderType: msg.senderType as MessageRole,
            receiverType: msg.receiverType as MessageRole,
            project: {
              connect: { id: projectId },
            },
            ...(msg.senderUserId && {
              senderUser: { connect: { id: Number(msg.senderUserId) } },
            }),
            ...(msg.senderInvestorId && {
              senderInvestor: { connect: { id: Number(msg.senderInvestorId) } },
            }),
            ...(msg.receiverUserId && {
              receiverUser: { connect: { id: Number(msg.receiverUserId) } },
            }),
            ...(msg.receiverInvestorId && {
              receiverInvestor: {
                connect: { id: Number(msg.receiverInvestorId) },
              },
            }),
          };

          console.log(
            "Creating message with data:",
            JSON.stringify(messageData, null, 2)
          );

          const message = await prisma.message.create({
            data: messageData,
            // Include all related data needed by the client
            include: {
              senderUser: { select: { name: true, profile_picture: true } },
              senderInvestor: { select: { name: true, profile_picture: true } },
              receiverUser: { select: { name: true, profile_picture: true } },
              receiverInvestor: {
                select: { name: true, profile_picture: true },
              },
            },
          });

          // Format the message for client consumption
          const formattedMessage = {
            id: message.id.toString(),
            content: message.content,
            sender: message.senderType.toLowerCase(),
            receiver: message.receiverType.toLowerCase(),
            createdAt: message.createdAt.toISOString(),
            // Add any other fields your client needs
          };

          console.log("Sending to user room:", `user-${msg.receiverUserId}`);
          console.log(
            "Sending to investor room:",
            `investor-${msg.receiverInvestorId}`
          );

          // Send to sender as confirmation
          if (msg.senderUserId) {
            io.to(`user-${msg.senderUserId}`).emit(
              "newMessage",
              formattedMessage
            );
          }
          if (msg.senderInvestorId) {
            io.to(`investor-${msg.senderInvestorId}`).emit(
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
          if (msg.receiverInvestorId) {
            io.to(`investor-${msg.receiverInvestorId}`).emit(
              "newMessage",
              formattedMessage
            );
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

      socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);

        // Handle user going offline
        if (userTypes.has(socket.id)) {
          const { type, id } = userTypes.get(socket.id);
          const key = `${type}-${id}`;

          if (onlineUsers.get(key) === socket.id) {
            onlineUsers.delete(key);

            // Broadcast offline status
            io.emit("userStatus", { type, id, status: "offline" });
            console.log(`${type} ${id} is now offline`);
          }

          userTypes.delete(socket.id);
        }
      });
    });

    server.listen(port, () => {
      console.log(`> Ready on http://${host}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
