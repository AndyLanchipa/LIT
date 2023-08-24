const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are present in the request
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check if the username already exists in the database
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = new User({
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await user.save();

    // Generate a JWT token with a 3-hour expiration time
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    // Set the token as an HTTP cookie with secure and httpOnly flags
    res.cookie("token", token, {
      maxAge: 3 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    res.redirect("/");
    // Send a success response with a 201 status code
    res.status(201).json({ message: "User created" });
  } catch (error) {
    // Send an error response with a 500 status code if an error occurs
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
