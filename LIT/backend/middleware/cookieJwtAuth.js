const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.cookies);

  // Check for the JWT token in the cookies
  if (req.cookies && req.cookies.token) {
    try {
      console.log("sasd");
      token = req.cookies.token;

      // Decode token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);
      // Fetch user from the database and exclude the password
      req.user = await User.findById(decoded.id).select("-password");
      console.log("here");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // If no token is found in cookies
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
