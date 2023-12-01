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
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, phoneNumber, name } = req.body;
    // Check if the username and password are present in the request
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and password are required" });
    }
    // Check if the username already exists in the database
    const existingUser = yield User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }
    try {
        // Hash the password using bcrypt
        const hashedPassword = yield bcrypt.hash(password, 10);
        // Create a new user with the hashed password
        const user = new User({
            username,
            name,
            phoneNumber,
            password: hashedPassword,
        });
        // Save the new user to the database
        const savedUser = yield user.save();
        console.log(savedUser);
        if (!savedUser) {
            return res.status(500).json({ message: "User could not be saved" });
        }
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
        console.log("break");
        // res.redirect("/");
        // Send a success response with a 201 status code
        // res.status(201).json({ message: "User created" });
        // Redirect with a 200 OK status code and the message in the response body
        res.status(200).send({ message: "User Created" });
    }
    catch (error) {
        console.log(error);
        // Send an error response with a 500 status code if an error occurs
        res.status(500).json({ message: "An error occurred" });
    }
}));
router.post("/follow", (req, res) => {
    //in the request we want the body to send the username for which we can do a quikc look up
    /**
     * once we have the user we store a username and id into the collection following
     * where userid is the current user logged in AND
     * following_id is the user we are following aka body of the request
     *
     * on Success send a 200 ok
     */
});
router.delete("unfollow", (req, res) => { });
exports.default = router;
