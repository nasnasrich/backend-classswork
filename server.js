import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoute from "./route/user.js";
import productRoute from "./route/product.js";

dotenv.config();

const server = express();

/* 🔴 CORS MUST COME BEFORE ROUTES */
const allowedOrigins = [
  "http://localhost:5173",
  "https://backend-classswork-project-2.onrender.com"
];

server.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* 🔴 THIS FIXES THE ERROR */
server.options("*", cors());

server.use(express.json());

/* Routes */
server.use("/api/users", userRoute);
server.use("/api/product", productRoute);

/* Health check */
server.get("/", (req, res) => {
  res.send("API is running...");
});

/* MongoDB */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection failed", err));

/* 🔴 DO NOT FORCE PORT */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
