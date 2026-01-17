import express from "express";
import { createStudents, getAllStudents, getUserById, loginUser, updateUser,deleteUser } from "../controller/user.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router()

router.post("/register", createStudents)
router.post("/login", loginUser);
router.get('/',protect, getAllStudents)
  
router.get("/:id", getUserById);   
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

export default router


