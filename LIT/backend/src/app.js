const express = require("express");
const mongoose = require("mongoose");
const { createAdapter } = require("@socket.io/mongo-adapter");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http"); // Added for Socket.IO
require("dotenv").config();

const { Server } = require("socket.io"); // Imported for Socket.IO
const cors = require("cors");
const userRoutes = require("../routes/userRoutes.js");
const chatRoutes = require("../routes/chatRoutes.js");
const messageRoutes = require("../routes/messageRoutes.js");
const postRoutes = require("../routes/postRoutes.js");

const app = express();
const server = http.createServer(app); // Added: Create HTTP server for Express
const io = new Server(server); // Added: Initialize Socket.IO server

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/post", postRoutes);

const { notFound, errorHandler } = require("../middleware/errorMiddleware.js");

app.use(notFound);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, "../../../lit/public")));

const url = "mongodb://127.0.0.1:27017/LIT";

async function connect() {
  try {
    const mongoClient = await mongoose.connect(url);
    console.log("connected");

    // Added: Set up MongoDB adapter for Socket.IO
    io.adapter(createAdapter(mongoClient.connection.db));
  } catch (error) {
    console.error(error);
  }
}

connect();

// Added: Socket.IO logic
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  // Modified: Listen on the HTTP server
  console.log(`Server listening on port ${port}`);
});
