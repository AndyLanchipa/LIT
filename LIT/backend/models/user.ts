const mongoose = require("mongoose");

const { Schema } = mongoose; // Destructure the Schema object from mongoose

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User; // Export just the User model
