import express, { Request, Response } from "express";







export const bookRoutes = express.Router();



bookRoutes.get("/",(req :Request,res :Response)=>{
    console.log("Get all books");
    res.status(200).json({
        message: "Get all books"
    });

})