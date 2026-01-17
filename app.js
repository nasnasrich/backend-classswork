import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoute from "./route/user.js";
import ProductRouter from "./route/product.js";

dotenv.config();

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://tesla-lgta.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman, mobile apps

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =======================
   ROUTES
======================= */
app.use("/api/users", userRoute);
app.use("/api/product", ProductRouter);

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Backend is live 🚀");
});

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* =======================
   DATABASE
======================= */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) =>
    console.error("MongoDB connection failed:", err.message)
  );
