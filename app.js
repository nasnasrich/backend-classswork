import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./route/user.js";
import ProductRouter from "./route/product.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoute);
app.use("/api/product", ProductRouter);

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Backend is live 🚀");
});

const PORT = process.env.PORT || 3000;

// 🔥 START SERVER FIRST (IMPORTANT FOR RENDER)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 🔥 CONNECT DB AFTER SERVER IS UP
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) =>
    console.error("MongoDB connection failed:", err.message)
  );
