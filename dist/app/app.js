"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controller/book.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json()); //to parse json data from request body
// All Routes for notes and users declared
app.use("/books", book_controller_1.bookRoutes); // /notes is the rote then redirect to noteRoutes folder
// app.use("/users", userRoutes); // /users is the rote then redirect to noteRoutes folder
app.get("/", (req, res) => {
    res.send("Welcome to Note App!");
});
exports.default = app;
