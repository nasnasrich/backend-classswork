 /*import dotenv from 'dotenv';
import mongoose from 'mongoose'
import express from "express";
import userRoute from "./route/user.js"
//const { default: mongoose } = require('mongoose');

const server = express()
server.use(express.json());
dotenv.config()
server.listen(5000,()=>{
  console.log(server is running in port${process.env.PORT})
})
//Routes
server.use('api/users',userRoute)

console.log("my Name is OCJ")

//server.get('/',(req,res)=>{
  //res.send('Hello world')
//})
mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("connection successful")
}).catch(()=>{
  console.log('not connected')
})*/

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from "express";
import cors from "cors";
import userRoute from "./route/user.js";
import productRoute from "./route/product.js"

dotenv.config();
const server = express();
server.use(express.json());

// FIX: Enable CORS
const allowedOrigins = [
  
"http://localhost:5173",
      "https://your-vercel-frontend.vercel.app",
    ];

server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // mobile apps, Postman
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
server.use('/api/users', userRoute);
server.use('/api/product',productRoute );

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log("not connected", err));

// Start server
server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});