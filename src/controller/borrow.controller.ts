import express, { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/books.model";

export const borrowRoutes = express.Router();


borrowRoutes.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    
    // Create a new Borrow instance but don't save yet
    const borrow = new Borrow(body);

    // Check availability & update book copies
    await borrow.checkAvailibility();

    // Save borrow only if checkAvailibility passes
    await borrow.save();

    res.status(201).json({
      success: true,
      message: "Borrow created successfully",
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
});


borrowRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    const formattedSummary = summary.map(item => ({
      book: item.book,
      totalQuantity: item.totalQuantity,
    }));

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: formattedSummary,
    });
  } catch (error) {
    next(error);
  }
});

