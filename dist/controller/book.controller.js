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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("./../models/books.model");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield books_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book, // ✅ Matches your required response
        });
    }
    catch (error) {
        next(error); // 🔄 Passes error to your global error handler
    }
}));
exports.bookRoutes.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query params
        const filter = req.query.filter; // e.g. FANTASY
        const sortBy = req.query.sortBy || "createdAt"; // default
        const sortOrder = req.query.sort === "asc" ? 1 : -1; // asc or desc
        const limit = parseInt(req.query.limit) || 10;
        const filterObj = filter ? { genre: filter } : {};
        const books = yield books_model_1.Book.find(filterObj)
            .sort({ [sortBy]: sortOrder })
            .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            data: books, // use 'data' not 'books'
        });
    }
    catch (error) {
        next(error);
    }
}));
// get book by id
exports.bookRoutes.get("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Book.findById(bookId);
        if (!book) {
            // Create a 404 error and pass to next()
            const error = new Error("Book not found");
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// update book
exports.bookRoutes.put("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        if ("copies" in body) {
            body.available = body.copies > 0;
        }
        const book = yield books_model_1.Book.findByIdAndUpdate(bookId, body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// delete book
exports.bookRoutes.delete("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        yield books_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
}));
