import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import expenseRoutes from "./routes/expense.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// DB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
