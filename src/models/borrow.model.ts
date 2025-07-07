import { model, Schema } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    books: {
      type: Schema.Types.ObjectId,
      ref: "Book", // Assuming you have a Book model
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
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
