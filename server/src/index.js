import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import path from "path";

import { connectionDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js"; // import app from the socket so it will be real time

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json()); // converts the request body to json
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Only allow requests from this origin (your frontend)
    credentials: true, // ✅ Allow cookies (like JWT) to be sent with the request
  })
);

app.use("/api/auth", authRoutes); // routes for signup, login, logout
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`server running in Port: ${PORT}`);
  connectionDB();
});
