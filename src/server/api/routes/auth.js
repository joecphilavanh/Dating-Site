const express = require("express");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../auth/utils.js");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const prisma = new PrismaClient();


router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the username already exists
    const existingUser = await prisma.users.findUnique({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.users.create({
      data: { username, email, password_hash: hashedPassword },
    });
    const token = generateToken(user.user_id);
    res.status(201).json({
      message: "User created successfully",
      token,
      userId: user.user_id,
    });
  } catch (error) {
    console.error("Register API Error:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
});




router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.user_id);
    res.json({ message: "Login successful", token, userId: user.user_id });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

module.exports = router;
