import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Attach Socket.IO to HTTP server with CORS
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://your-app.onrender.com"], // Allow local + deployed frontend
  },
});

// Used to store which socket ID belongs to which user
const userSocketMap = {};

// Helper to get socket ID by user ID
export function getRecieverId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  const rawUserId = socket.handshake.query.userId;

  // Validate userId (alphanumeric, underscore, hyphen)
  if (rawUserId && /^[\w-]+$/.test(rawUserId)) {
    userSocketMap[rawUserId] = socket.id;
    console.log("✅ User connected:", rawUserId, socket.id);
  } else {
    console.warn("⚠️ Invalid or missing userId in handshake:", rawUserId);
    socket.disconnect(); // Prevent broken connections
    return;
  }

  // Send list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("⛔ User disconnected:", rawUserId);
    delete userSocketMap[rawUserId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
