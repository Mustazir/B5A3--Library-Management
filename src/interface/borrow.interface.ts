import { Types } from "mongoose";

export interface IBorrow {
  books: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
