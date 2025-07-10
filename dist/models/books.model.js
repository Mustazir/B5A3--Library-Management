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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
/*
title (string) — Mandatory.
author (string) — Mandatory.
genre (string) — Mandatory. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
isbn (string) — Mandatory and unique.
description (string) — Optional.
copies (number) — Mandatory.
available (boolean) — Defaults to true. Indicates if the book is currently available for borrowing.
*/
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "{VALUE} is not a valid genre",
        },
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, "ISBN must be at least 4 characters long"],
    },
    description: {
        type: String,
        default: "",
    },
    copies: {
        type: Number,
        required: true,
        min: [0, "Copies must be a positive number"],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
bookSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = this;
        book.available = book.copies > 0;
        next();
    });
});
bookSchema.post("save", function (doc) {
    console.log(`Book saved: ${doc.title}`);
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
