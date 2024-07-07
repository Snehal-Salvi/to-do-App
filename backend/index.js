import express from "express";
import { connectToDb } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from './routes/task.routes.js';
import cors from "cors";
import { verifyToken } from "./middleware/verifyToken.js";

const app = express();
const PORT = process.env.PORT || 3002;

// Connect to MongoDB database
connectToDb();

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// API routes setup
app.use("/api", userRoutes); // User-related routes
app.use('/api', verifyToken, taskRoutes); // Task-related routes protected by token verification

// Error handling middleware
app.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).json({
    error: {
      statusCode: err.statusCode,
      message: err.message,
    },
  });
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to my App!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
