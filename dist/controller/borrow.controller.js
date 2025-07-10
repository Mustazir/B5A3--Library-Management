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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
exports.borrowRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Create a new Borrow instance but don't save yet
        const borrow = new borrow_model_1.Borrow(body);
        // Check availability & update book copies
        yield borrow.checkAvailibility();
        // Save borrow only if checkAvailibility passes
        yield borrow.save();
        res.status(201).json({
            success: true,
            message: "Borrow created successfully",
            data: borrow,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.borrowRoutes.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo",
                },
            },
            {
                $unwind: "$bookInfo",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        const formattedSummary = summary.map(item => ({
            book: item.book,
            totalQuantity: item.totalQuantity,
        }));
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: formattedSummary,
        });
    }
    catch (error) {
        next(error);
    }
}));
