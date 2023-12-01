import mongoose from "mongoose";

const { Schema } = mongoose;

const followerSchema = new Schema({
  follower_id: { type: String, required: true },
  user_id: { type: String, required: true },
});

const Followers = mongoose.model("Followers", followerSchema);
module.exports = Followers;
