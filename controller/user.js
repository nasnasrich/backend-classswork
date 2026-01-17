//user registration
import cohortFour from "../model/user.js"
import bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken"

//REGISTER STUDENT
export const registerStudents = async (req,res)=>{
const{
  name,email,phone,password,country,state
} = req.body
try {
  //check if email exist
  
  const exist = await cohortFour.findOne({email})
  if(exist) return res.status(400).json
  ({message:"Email Already Exist"})

  //HASH PASSWORD
const salt = await bcrypt.genSalt(10)
const hashPassword = await bcrypt.hash(password,salt)

 //create user
  const students = await cohortFour.create({
    name,
    email,
   phone,
   password:hashPassword,
   country,
   state 
  }) 
  return res.status(201).json({
    message:"Registration Successful",students
  })
  
} catch (error) {
  console.error(error)
  res.status(500).json({message:"Server Error",error})
  
}
}



//GET ALL REGISTERED STUDENTS
export const getAllStudents = async (req, res) => {
  try {
    console.log("Request user (from token):", req.user);

    // Query all users from database
    const users = await cohortFour.find({}).select("-password"); // exclude passwords
    console.log("Users found:", users.length);

    res.status(200).json(users); // send array directly
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Server error fetching users" });
  }
};


//Login REGISTERED STUDENT
export const loginUser = async(req,res) =>{
  //create payload
const {email,password} = req.body
try {
 //check user exist
  const user = await cohortFour.findOne({email})
  if(!user) return res.status(404).json({message:"email not registered"})

    //compare password
    const isMatch = await bcrypt.compare(password,user.password)
 if(!isMatch) return res.status(400).json ({message:"Incorrect Password"})
      const token = jwt.sign({id:user._id}, process.env.SECRET_KEY,{expiresIn:'1hr'})
    res.status(200).json({message:"login Successful",token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone
      }
})
} catch (error) {
    res.status(500).json({message:error.message})
  }
}



//GET USERS BY ID
export const getUserById = async (req,res) =>{
const userId = req.params.id
try {
  const user = await cohortFour.findById(userId).select('-password')
  if(!user) return res.status(404).json({message:"user not found"})
    res.status(200).json(user)
} catch (error) {
  res.status(500).json({message:error.message})
  }
}

//Update Users
export const updateUser = async (req,res) =>{
let userId = req.params.id
const{name,email,phone,password,country,state}=req.body
try {
  let user = await cohortFour.findByIdAndUpdate(userId)
  if(!user) return res.status(404).json({message:"user not found"})
    //update only provided fields
  user.name = name|| user.name
  user.email = email|| user.email
  user.phone = phone|| user.phone
  user.password = password|| user.password
  user.country = country|| user.country
  user.state = state|| user.state;
  await user.save();
  res.status(200).json({message:"user updated successfully",
    user:{
      id:user._id,
      name:user.name,
      password:user.password,
      email:user.email,
      phone:user.phone,
      country:user.country,
      state:user.state
      
    }
  })
  
} catch (error) {
 res.status(500).json({message:error.message}) 
}

}

//delete user
export const deleteUser
 = async (req,res) =>{
  const userId = req.params.id
  try {
    const user = await cohortFour.findByIdAndDelete(userId)
    if(!user) return res.status(404).json({message:"user does not exist"})
      await user.deleteOne()
    res.status(200).json({message:"user deleted successfully"})
    } catch (error) {
    res.status(500).json({message:error.message})
  }
}