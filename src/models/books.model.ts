/*
title (string) — Mandatory.
author (string) — Mandatory. 
genre (string) — Mandatory. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
isbn (string) — Mandatory and unique.
description (string) — Optional.
copies (number) — Mandatory. 
available (boolean) — Defaults to true. Indicates if the book is currently available for borrowing.
*/
import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";

const bookSchema = new Schema<IBook>(
  {
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
      min: [0,"Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.pre("save", async function(next){
  const book = this as IBook;
  book.available = book.copies>0 ;
  next();
})

bookSchema.post("save", function (doc) {
  console.log(`Book saved: ${doc.title}`);
});

export const Book = model<IBook>("Book", bookSchema);
