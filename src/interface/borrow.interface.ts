import { Types } from "mongoose";



export interface IBorrow {
    book : string; 
    quantity: number;
    dueDate: Date;

    books :Types.ObjectId;
}