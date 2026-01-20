// server.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoute from "./route/user.js";
import productRoute from "./route/product.js";

dotenv.config();

const server = express();

/* ------------------ CORS ------------------ */
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://your-frontend-production-url.vercel.app" // live frontend
];

server.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* ------------------ Body Parser ------------------ */
server.use(express.json());

/* ------------------ Routes ------------------ */
server.use("/api/users", userRoute);
server.use("/api/product", productRoute);

/* ------------------ Health Check ------------------ */
server.get("/", (req, res) => {
  res.send("API is running...");
});

/* ------------------ MongoDB Connection ------------------ */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection failed:", err));

/* ------------------ Server Listening ------------------ */
const PORT = process.env.PORT || 5000; // dynamic port for Render
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
