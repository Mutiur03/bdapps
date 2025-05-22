import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const host = process.env.HOST || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname: host, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(
    server
    // {
    // cors: {
    //   origin: "*",
    //   methods: ["GET", "POST"],
    // },
    //   }
  );

  io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);
    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnected`);
    });
  });
 

  server.listen(port, () => {
    console.log(`> Ready on http://${host}:${port}`);
  });
});
