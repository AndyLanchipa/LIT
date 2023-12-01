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
const mongoose_1 = __importDefault(require("mongoose"));
const user_js_1 = __importDefault(require("../routes/user.js"));
const login_js_1 = __importDefault(require("../routes/login.js"));
const posts_js_1 = __importDefault(require("../routes/posts.js"));
const path_1 = __importDefault(require("path"));
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: "http://localhost:3001",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/users", user_js_1.default);
app.use("/login", login_js_1.default);
app.use("/posts", posts_js_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../../lit/public")));
const url = "mongodb://127.0.0.1:27017/LIT";
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(url);
            console.log("connected");
        }
        catch (error) {
            console.error(error);
        }
    });
}
connect();
const port = process.env.PORT || 3000;
// app.use((req, res, next) => {
//   res.redirect("/");
// });
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
