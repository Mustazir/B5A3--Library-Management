import { model, Schema } from "mongoose";
import { IBorrow, IBorrowMethods, IBorrowModel } from "../interface/borrow.interface";
import { Book } from "./books.model"; // ✅ Import the Book model

const borrowSchema = new Schema<IBorrow, IBorrowModel, IBorrowMethods>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

borrowSchema.method("checkAvailibility", async function () {
  const borrow = this as IBorrow;

  const book = await Book.findById(borrow.book); 
  if (!book) throw new Error("Book not found");

  if (book.copies < borrow.quantity) {
    throw new Error("Not enough copies available");
  }
  book.copies -= borrow.quantity;

  if (book.copies <= 0){
    book.available = false;
    book.copies = 0;
  }
  await book.save();

  return true;
});

export const Borrow = model<IBorrow, IBorrowModel>("Borrow", borrowSchema);
