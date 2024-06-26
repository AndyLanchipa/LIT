import express from "express";
const mongoose = require("mongoose");
const userRoutes = require("./models/users");
const loginRoute = require("./routes/login.ts");
//generate secretKey
// const crypto = require("crypto");
// const secretKey = crypto.randomBytes(32).toString("hex");
// console.log(secretKey);

const app = express();

const url =
  "mongodb+srv://AndyLanchipa:yamNJk60zlfoM22O@lit.haz4esk.mongodb.net/test";

async function connect() {
  try {
    await mongoose.connect(url);
    console.log("connected");
  } catch (error) {
    console.error(error);
  }
}
app.use(express.json());
app.use(userRoutes);
// Register the login route with the app
app.use("/login", loginRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
connect();

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
//yamNJk60zlfoM22O
