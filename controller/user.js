import cohortFour from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =======================
   REGISTER USER
======================= */
export const createStudents = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, country, state, address } = req.body;

    // 1️⃣ Validate required fields
    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // 2️⃣ Check if email already exists
    const existEmail = await cohortFour.findOne({ email });
    if (existEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create student
    const student = await cohortFour.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      country: country || "",
      state: state || "",
      address: address || "",
    });

    return res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    console.error("CREATE STUDENT ERROR:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =======================
   GET ALL USERS
======================= */
export const getAllStudents = async (req, res) => {
  try {
    const students = await cohortFour.find().select("-password");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* =======================
   LOGIN USER
======================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await cohortFour.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not registered" });

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    // 3️⃣ Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country,
        state: user.state,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   GET USER BY ID
======================= */
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await cohortFour.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User Not Found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   UPDATE USER
======================= */
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phoneNumber, password, country, state, address } = req.body;

    let user = await cohortFour.findById(userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });

    // Update only provided fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.password = password ? await bcrypt.hash(password, 10) : user.password;
    user.country = country || user.country;
    user.state = state || user.state;
    user.address = address || user.address;

    await user.save();

    res.status(200).json({
      message: "User Successfully Updated",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country,
        state: user.state,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   DELETE USER
======================= */
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await cohortFour.findById(userId);
    if (!user) return res.status(404).json({ message: "User does not exist" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
