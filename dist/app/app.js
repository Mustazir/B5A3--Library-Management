"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controller/book.controller");
const borrow_controller_1 = require("../controller/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
app.use("/api/books", book_controller_1.bookRoutes);
app.use("/api/borrow", borrow_controller_1.borrowRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to Note App!");
});
// 404 Handler — For all routes not matched above
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
// Global Error Handler Middleware — For errors thrown/passed with next(err)
const errorHandler = (error, req, res, next) => {
    console.error(error); // optional logging
    if (error.name === "ValidationError") {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: error.errors ? error.errors : error.message,
        });
        return; // exit without returning res object
    }
    if (error.name === "CastError") {
        res.status(400).json({
            success: false,
            message: "Invalid ID format",
            error: error.message,
        });
        return;
    }
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        res.status(400).json({
            success: false,
            message: `Duplicate value for field: ${field}`,
            error: error,
        });
        return;
    }
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
        error: error,
    });
};
app.use(errorHandler);
exports.default = app;
