"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
//generate secretKey
// const crypto = require("crypto");
// const secretKey = crypto.randomBytes(32).toString("hex");
// console.log(secretKey);
const app = (0, express_1.default)();
const url = "mongodb://127.0.0.1:27017/LIT";
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(url);
            console.log("connected");
        }
        catch (error) {
            console.error(error);
        }
    });
}
app.use(express_1.default.json());
// app.use(userRoutes);
// // Register the login route with the app
// app.use("/login", loginRoute);
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
connect();
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//yamNJk60zlfoM22O
