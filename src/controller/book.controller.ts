import express, { Request, Response } from "express";
import { Book } from './../models/books.model';


export const bookRoutes = express.Router();


bookRoutes.post("/create-Book",async (req: Request, res: Response) => { 
    try {
        const body = req.body;
        const book = await Book.create(body);
        res.status(201).json({
            message: "Book created successfully",
            book
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error,
            
        });
        console.log(error);
    }
})

bookRoutes.get("/",async (req :Request,res :Response)=>{
    const body= req.body

    const books =await Book.find();
    res.status(200).json({
        books
    });

})

