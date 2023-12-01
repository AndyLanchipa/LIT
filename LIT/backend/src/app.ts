import express from "express";
import mongoose from "mongoose";
import users from "../routes/user.js";
import login from "../routes/login.js";
import posts from "../routes/posts.js";
import path from "path";
require("dotenv").config();
import cors from "cors";

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3001", // Specify the allowed origin
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);
app.use("/login", login);
app.use("/posts", posts);
app.use(express.static(path.join(__dirname, "../../../lit/public")));

const url = "mongodb://127.0.0.1:27017/LIT";

async function connect() {
  try {
    await mongoose.connect(url);
    console.log("connected");
  } catch (error) {
    console.error(error);
  }
}

connect();

const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   res.redirect("/");
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
