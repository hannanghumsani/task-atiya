const RegisterUser = require("../model/RegisterSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const getAll = async (req, res) => {
  try {
    // Fetch all users from DB except passwords
    const users = await RegisterUser.find().select("-password -__v");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { address } = req.body;
    console.log(address);

    const user = await RegisterUser.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.address = address;

    await user.save();
    res.status(200).json({
      message: "User address updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await RegisterUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new RegisterUser({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await RegisterUser.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAll,
  addAddress,
  createRegister,
  loginUser,
};
