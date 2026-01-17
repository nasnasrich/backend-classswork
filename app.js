/*import dotenv from 'dotenv';
import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import userRoute from "./route/user.js"



const app = express ()
app.use(express.json());
  dotenv.config()
  app.listen(3000, () => {
    console.log(`backend is running in port ${process.env.PORT}`)
  })

  //Routes
  app.use('/api/users', userRoute)

  app.get('/', (req, res)=>{
    res.send('Hello nas')
  })
   mongoose.connect(process.env.MONGO_URL).then(()=>{
   console.log("connection successful")
   }).catch(()=>{
    console.log('not connected')
   })*/
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoute from "./route/user.js";
import ProductRouter from './route/product.js';


// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoute);
app.use('/api/product', ProductRouter)

app.get('/', (req, res) => {
  res.send('Hello nas');
});

// MongoDB connection and server start
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, )
.then(() => {
  console.log("MongoDB connection successful");

  // Start server only after DB connection
  app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection failed:", err.message);
});

