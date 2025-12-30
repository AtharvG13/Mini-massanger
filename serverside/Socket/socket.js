import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (!userId) return;

  userSocketMap[String(userId)] = socket.id;

  // ✅ broadcast online users
  io.emit("onlineUsers", Object.keys(userSocketMap));

  // ✅ RECEIVE message from sender
  socket.on("newMessage", ({ senderId, receiverId, message, messageId }) => {
    const receiverSocketId = userSocketMap[String(receiverId)];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        senderId,
        receiverId,
        message,
        _id: messageId,
        status: "delivered",
      });
    }
  });

  socket.on("disconnect", () => {
    delete userSocketMap[String(userId)];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

const getSocketId = (userId) => {
  return userSocketMap[String(userId)];
};

export { io, app, server, getSocketId };
