import cohortFour from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// REGISTER USER
export const createStudents = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, country, state, address } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const existEmail = await cohortFour.findOne({ email });
    if (existEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await cohortFour.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      country: country || "",
      state: state || "",
      address: address || "",
    });

    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    console.error("CREATE STUDENT ERROR:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Get all users
 export const getAllStudents = async (req, res) => {
    try{
        const students = await cohortFour.find().select
        ('-password')
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({message:"Server Error", error})
    }
 }

     //LOGIN

     export const loginUser = async (req, res) =>{
        const {email, password} = req.body
      try{
        //check user exist
       const user = await cohortFour.findOne({email})
    if(!user) return res.status (404).json({message:"Emaill Not Registere"})

        //compare password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json
        ({message:"incorrect password"})
         const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn: '1hr'})
        
        res.status(200).json({message:"login successful",
            token,
            user:{
            id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber
            }
        })
      } catch (error) {
        res.status(500).json({message:error.message})
      }
    }
      // get ueser by id

      export const getUserById = async (req, res) =>{

        const userId = req.params.id
        try {
           const user = await cohortFour.findById(userId).select
           ("-password") 
           if(!user) return res.status(404).json({message:"User Not Found"})
        } catch (error) {
           res.status(500).json({message:error.message}) 
        }
      }
     


      // update user

      export const updateUser = async ( req, res)=> {
         let userId = req.params.id
         const {name, email, phoneNumber, password, country,
            state} = req.body
         try {
            let user = await cohortFour.findById(userId)
            if(!user) return res.status(404).json({message: "User Not Found"})
                //upate only provided fields
            user.name = name || user.name
            user.email = email || user.email
            user.phoneNumber = phoneNumber || user.phoneNumber
            user.password = password || user.password
            user.country = country || user.country
            user.state = state || user.state
            await user.save()
            res.status (200).json({

                message: "User Successfully Updated",
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    phoneNumber:user.phoneNumber,
                    country:user.country,
                    state:user.state
                }
            })

         } catch (error) {
            res.status(500).json({message:error.message})
         }
      }

      //delete

      export const deleteUser = async (req, res) =>{
        const userId = req.params.id
        try {
            const user = await cohortFour.findById(userId)
            if (!user) return res.status (404).json({message: "user doesnt exist"})
            await user.deleteOne()
        res.status(200).json({message: "user deleted successfully"})

        } catch (error) {
            res.status(500).json({message:error.message})
        }
      }