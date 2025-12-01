import express from "express";
import { createStudents, getAllStudents, getUserById, loginUser, updateUser,deleteUser } from "../controller/user.js";
const router = express.Router()
router.post("/register", createStudents)
router.get('/', getAllStudents)
router.get('/:id', getUserById)
router.post('/login', loginUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
export default router