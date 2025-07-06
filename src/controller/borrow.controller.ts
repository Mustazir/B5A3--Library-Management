import express, { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

borrowRoutes.get(
  "/a",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log("Borrow route hit");
    res.status(200).json({
      message: "Borrow route is working",
    });
  }
);
borrowRoutes.post("/",async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const body = req.body;
    // Assuming you have a Borrow model to create a borrow entry
    const borrow = await Borrow.create(body);

    res.status(201).json({
      success: true,
      message: "Borrow created successfully",
      borrow
    });
  } catch (error) {
    next(error); // 🔄 Passes error to your global error handler
  }
})


borrowRoutes.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Fetch all borrow entries
      const borrows = await Borrow.find();

      res.status(200).json({
        success: true,
        message: "Borrows fetched successfully",
        data: borrows, // use 'data' not 'books'
      });
    } catch (error) {
      next(error);
    }
  }
);