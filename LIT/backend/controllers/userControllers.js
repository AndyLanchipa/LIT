const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const generateToken = require("../config/generateToken");

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, username } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    name,
    email,
    password,
    pic,
  });
  console.log(user);

  if (user) {
    // Set the token as an HTTP cookie with secure and httpOnly flags
    const tempToken = generateToken(user._id);
    console.log(tempToken);
    res.cookie("token", tempToken, {
      maxAge: 3 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    const tempToken = generateToken(user._id);

    res.cookie("token", tempToken, {
      maxAge: 3 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
module.exports = { registerUser, authUser, allUsers };
