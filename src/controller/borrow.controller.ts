
import express from "express";


export const borrowRoutes = express.Router();



borrowRoutes.get(  "/",
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    console.log("Borrow route hit");
    res.status(200).json({
        message : "Borrow route is working",
    })
  })