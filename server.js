import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoute from "./route/user.js";
import productRoute from "./route/product.js";

dotenv.config();

const server = express();

/* Allowed origins */
const allowedOrigins = [
  "http://localhost:5173",
  "https://backend-classswork-project-2.onrender.com"
];

/* CORS middleware */
server.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* Body parser */
server.use(express.json());

/* Routes */
server.use("/api/users", userRoute);
server.use("/api/product", productRoute);

/* Health check */
server.get("/", (req, res) => {
  res.send("API is running...");
});

/* Temporary test route to check logs */
server.get("/test", (req, res) => {
  console.log("Test route accessed!");
  res.send("Test route works!");
});

/* MongoDB connection */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection failed:", err));

/* Server listening */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
