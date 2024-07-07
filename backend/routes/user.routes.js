import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import { registerValidationRules } from "../validators/userValidators.js";
import { validate } from "../middleware/validationResult.js";

const router = express.Router();

// Route for user registration
router.post("/register", registerValidationRules, validate, registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for requesting password reset (send OTP)
router.post("/forgot-password", forgotPassword);

// Route for resetting password using OTP
router.post("/reset-password", resetPassword);

export default router;
