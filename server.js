import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoute from "./route/user.js";
import productRoute from "./route/product.js";

dotenv.config();

const server = express();
server.use(express.json());

//  Enable CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-vercel-frontend.vercel.app",
];

server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman, mobile apps
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
server.use("/api/users", userRoute);
server.use("/api/product", productRoute);

server.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(" MongoDB connection successful"))
  .catch((err) => console.log(" MongoDB not connected", err));

// FIXED PORT FOR RENDER + REDEPLOY LOG
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(" Backend redeployed at", new Date().toISOString());
  console.log(` Server is running on port ${PORT}`);
});