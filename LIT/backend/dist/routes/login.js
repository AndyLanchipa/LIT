"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const Users = require("../models/user");
const ramda_1 = require("ramda");
// Mock user data with hashed passwords
// const users = [
//   {
//     username: "myuser",
//     passwordHash:
//       "$2b$10$uZCxtbVJcXTZ5X9v/A8uKulfd2zSxFLJshdFWvVi/kKwW4OnB4ycO", // Hashed version of 'mypassword'
//   },
// ];
// Login endpoint
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the user credentials from the request body
        const { username, password } = req.body;
        // Find the user with the matching username
        const user = yield Users.findOne({ username });
        // Check if the user exists and the password is valid
        if (user && (yield bcrypt.compare(password, user.password))) {
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
            // // Redirect the user to a sample page on successful login
            // res.redirect("/sample-page");
            res.status(200).json((0, ramda_1.omit)(["password"], user.toObject()));
        }
        else {
            // Return an error response if the username or password is invalid
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
        // Return an error response if an error occurs
        res.status(500).json({ message: "An error occurred" });
    }
}));
exports.default = router;
