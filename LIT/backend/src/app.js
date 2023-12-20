const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// import users from "../routes/user.js";
// import login from "../routes/login.js";
// import posts from "../routes/posts.js";
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("../routes/userRoutes.js");
const chatRoutes = require("../routes/chatRoutes.js");
const messageRoutes = require("../routes/messageRoutes.js");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000", // Specify the allowed origin
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cookieParser());

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// app.use("/users", users);
// app.use("/login", login);
// app.use("/posts", posts);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
const { notFound, errorHandler } = require("../middleware/errorMiddleware.js");

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);
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

const port = process.env.PORT || 3001;

// app.use((req, res, next) => {
//   res.redirect("/");
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
