import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.protectRoute.js";
const router = express.Router();

router.post("/signup", signup);

// you should use "post" for login so it will use request body so the password and other important information in the database will not be fetched since if you use "get" it will fetch all the data
router.post("/login", login);

router.post("/logout", logout);

router.patch("/user/profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);
// we call this whenever we refresh our page to check if the user is authenticated

export default router;
