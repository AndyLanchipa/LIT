"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = require("../types/user");
const { Schema } = mongoose_1.default;
const postSchema = new Schema({
    content: { type: String, required: true },
    likes: { type: Number, required: true },
    retweet: { type: Number, required: true },
    creator: { type: User, required: true },
});
const Posts = mongoose_1.default.model("Posts", postSchema);
module.exports = Posts;
