import express, { NextFunction, Request, Response } from "express";
import { Book } from "./../models/books.model";

export const bookRoutes = express.Router();

bookRoutes.post(
  "/books",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const book = await Book.create(body);

      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book, // ✅ Matches your required response
      });
    } catch (error) {
      next(error); // 🔄 Passes error to your global error handler
    }
  }
);

bookRoutes.get(
  "/books",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const books = await Book.find();
      res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        books,
      });
    } catch (error) {
      next(error);
    }
  }
);

// get book by id
bookRoutes.get(
  "/books/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(200).json({
      success: true,
        message: "Book retrieved successfully",
        data: book,
    });
  }
);

// update book
bookRoutes.put(
  "/books/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    const body = req.body;
    const book = await Book.findByIdAndUpdate(bookId, body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
        message: "Book updated successfully",
        data: book, 
    })
  }
);

// delete book
bookRoutes.delete("/books/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {

    const bookId = req.params.bookId;
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
        message: "Book created successfully",
        data: null,
    })

  })
