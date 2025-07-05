import express, { NextFunction, Request, Response } from "express";
import { Book } from './../models/books.model';


export const bookRoutes = express.Router();


bookRoutes.post("/books",async (req: Request, res: Response,next:NextFunction) => { 
    try {
        const body = req.body;
        const book = await Book.create(body);
        res.status(201).json({
            message: "Book created successfully",
            book
        });
    } catch (error) {
        next(error); // Pass the error to the global error handler
       
    }
})

bookRoutes.get("/books",async (req :Request,res :Response,next:NextFunction)=>{
   try {
     const body= req.body

    const books =await Book.find();
    res.status(200).json({
        books
    });
   } catch (error) {
    next(error); 
   }

})




