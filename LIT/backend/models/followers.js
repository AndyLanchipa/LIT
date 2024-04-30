const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
  follower_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Followers = mongoose.model("Follower", followerSchema);
module.exports = Followers;
