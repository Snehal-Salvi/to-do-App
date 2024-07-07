import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../middleware/errorHandler.js";
import nodemailer from 'nodemailer';

// Register User
export const registerUser = async (req, res, next) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      throw errorHandler(400, "Email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error); 
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });

    // If user not found, throw error
    if (!user) {
      throw errorHandler(401, "Invalid credentials");
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // If passwords do not match, throw error
    if (!passwordMatch) {
      throw errorHandler(401, "Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Construct user info object to send in response
    const userInfo = {
      userId: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Send token and user info in response
    res.status(200).json({ token, user: userInfo });
  } catch (error) {
    next(error); 
  }
};

// Request Password Reset - Send OTP
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // If user not found, throw error
    if (!user) {
      throw errorHandler(404, "User with this email not found");
    }

    // Generate OTP and set expiration time (1 hour)
    const otp = generateOTP();
    const otpExpires = Date.now() + 3600000; // 1 hour

    // Update user with OTP and expiration
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = otpExpires;
    await user.save();

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your password reset OTP is ${otp}. It is valid for 1 hour.`,
    };

    // Send email with OTP
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return next(error); 
      }
      res.status(200).json({ message: "OTP sent to your email address" });
    });
  } catch (error) {
    next(error); 
  }
};

// Reset Password using OTP
export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    // If user not found, throw error
    if (!user) {
      throw errorHandler(404, "User not found");
    }

    // Check if OTP is valid and not expired
    if (
      user.resetPasswordOTP !== otp ||
      Date.now() > user.resetPasswordExpires
    ) {
      throw errorHandler(400, "Invalid or expired OTP");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the OTP fields
    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error); 
  }
};

// Generate OTP function
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
