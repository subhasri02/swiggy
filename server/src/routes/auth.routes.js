

import express from "express";
import {
  resetPassword,
  sendOtp,
  signIn,
  signOut,
  signUp,
  verifyOtp,
} from "../controllers/auth.controller.js";

import User from "../models/user.model.js";
import genToken from "../utils/token.js";

const authRouter = express.Router();

/*  NORMAL AUTH  */
authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);

/* GOOGLE LOGIN */
authRouter.post("/google-login", async (req, res) => {
  try {
    const { email, fullName } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    // Create user if first-time Google login
    if (!user) {
      user = await User.create({
        fullName,
        email,
        password: "GOOGLE_AUTH",
        role: "user",
      });
    }

    const token = genToken(user);

    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Google login failed" });
  }
});

export default authRouter;
