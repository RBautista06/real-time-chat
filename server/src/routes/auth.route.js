import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);

// you should use "post" for login so it will use request body so the password and other important information in the database will not be fetched since if you use "get" it will fetch all the data
router.post("/login", login);

router.post("/logout", logout);

export default router;
