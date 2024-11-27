import express from "express";
import {
  signin,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  resendVerificationCode,
} from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post ("/Resend-code",resendVerificationCode);
router.post("/verify-email",  verifyEmail);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", logout);
export default router;
