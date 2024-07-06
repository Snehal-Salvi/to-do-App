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


router.post('/register', registerValidationRules, validate, registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
