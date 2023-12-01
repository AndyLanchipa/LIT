import mongoose from "mongoose";
const User = require("../types/user");

const { Schema } = mongoose;

const postSchema = new Schema({
  content: { type: String, required: true },
  likes: { type: Number, required: true },
  retweet: { type: Number, required: true },
  creator: { type: User, required: true },
});
const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;
