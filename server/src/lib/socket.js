import { Server } from "socket.io";
import http from "http"; // Built-in Node module to create HTTP server
import express from "express";

const app = express(); // Initialize Express app
const server = http.createServer(app); // Wrap Express in HTTP server

// Attach Socket.IO to the HTTP server with CORS configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Allow frontend running at this origin
  },
});

export function getRecieverId(userId) {
  return userSocketMap[userId];
}

// Used to store which socket ID belongs to which user
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Get userId from socket query (sent by client during connection)
  const userId = socket.handshake.query.userId;

  // If userId exists, map it to the socket ID
  if (userId) userSocketMap[userId] = socket.id;

  // Broadcast current online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle when a user disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);

    // Remove user from map and broadcast updated list
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server }; // Export server, app, and io for use elsewhere
