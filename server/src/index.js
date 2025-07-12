import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectionDB } from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // converts the request body to json
app.use(cookieParser());

app.use("/api/auth", authRoutes); // routes for signup, login, logout
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`server running in Port: ${PORT}`);
  connectionDB();
});
