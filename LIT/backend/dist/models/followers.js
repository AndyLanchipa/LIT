"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const followerSchema = new Schema({
    follower_id: { type: String, required: true },
    user_id: { type: String, required: true },
});
const Followers = mongoose_1.default.model("Followers", followerSchema);
module.exports = Followers;
