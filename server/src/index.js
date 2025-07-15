import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectionDB } from "./lib/db.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
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

app.listen(PORT, () => {
  console.log(`server running in Port: ${PORT}`);
  connectionDB();
});
