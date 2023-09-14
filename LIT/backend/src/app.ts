import express from "express";
const mongoose = require("mongoose");
import users from "../routes/user.js";
import login from "../routes/login.js";
require("dotenv").config();

//generate secretKey
// const crypto = require("crypto");
// const secretKey = crypto.randomBytes(32).toString("hex");
// console.log(secretKey);

const app = express();
app.use(express.json());

app.use("/users", users);
app.use("/login", login);

const url = "mongodb://127.0.0.1:27017/LIT";

async function connect() {
  try {
    await mongoose.connect(url);
    console.log("connected");
  } catch (error) {
    console.error(error);
  }
}

// app.use(userRoutes);
// // Register the login route with the app
// app.use("/login", loginRoute);
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
connect();

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
//yamNJk60zlfoM22O