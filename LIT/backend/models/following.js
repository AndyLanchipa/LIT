import mongoose from "mongoose";

const { Schema } = mongoose;

const followingSchema = new Schema({
  user_id: { type: String, required: true },
  following_id: { type: String, required: true },
});
