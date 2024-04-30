const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  likes: { type: Number, required: true },
  retweet: { type: Number, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
