import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(409).json({ error: "No user found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🔐 Middleware to protect routes that require authentication
// 1️⃣ Get the token from cookies (should be stored as 'jwt')
// 2️⃣ If no token is found, block access
// 3️⃣ Verify the token using your secret key (JWT_SECRET from .env)
// 4️⃣ If verification fails, block access
// 5️⃣ Use the decoded userId to fetch the full user from the database
// 6️⃣ If the user doesn't exist anymore (e.g., was deleted), block access
// 7️⃣ Attach the user data to `req.user` so the next route can use it
// 8️⃣ Pass control to the next middleware or route handler
// 9️⃣ Catch unexpected errors and respond with 500
