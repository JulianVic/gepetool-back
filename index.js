import express from "express";
import http from "http";
import cors from "cors";
import { Server as SocketServer } from "socket.io";
import { config } from "dotenv";
import connectDB from "./src/db/connection.js";
import channelsRouter from "./src/routes/channels.routes.js";
import * as socketHandlers from "./src/handlers/socketHandlers.js";

config();
connectDB();

const app = express();
const PORT = process.env.SERVER_PORT;
const origin = process.env.CLIENT_URL;

const corsOptions = {
  origin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/channels", channelsRouter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  socket.on("joinChannel", (data) => socketHandlers.handleJoinChannel(socket, data));
  socket.on("sendMessage", (data) => socketHandlers.handleSendMessage(socket, data, io));
  socket.on("leaveChannel", (data) => socketHandlers.handleLeaveChannel(socket, data));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
