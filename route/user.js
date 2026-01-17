import express from "express"
import {registerStudents,getAllStudents, loginUser, getUserById,updateUser,deleteUser} from "../controller/user.js"
import {protect} from "../middleware/authMiddleware.js"

const router = express.Router()
router.post('/register',registerStudents)
router.get('/',protect,getAllStudents)
router.get('/:id',protect,getUserById)
router.post('/login',loginUser) 
router.put('/update/:id',updateUser) 
router.delete('/delete/:id',deleteUser) 
export default router