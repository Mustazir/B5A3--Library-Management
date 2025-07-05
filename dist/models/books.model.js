"use strict";
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
        min: 0,
    },
    available: {
        type: Boolean,
        default: true,
    },
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
