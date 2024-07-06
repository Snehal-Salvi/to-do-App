import express from "express";
import { connectToDb } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3002;

connectToDb();

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);

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

app.get("/", (req, res) => {
  res.send("Welcome to my App!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
