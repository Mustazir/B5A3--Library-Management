import express, { Application, NextFunction, Request, Response } from "express";
import { bookRoutes } from "../controller/book.controller";
import { borrowRoutes } from "../controller/borrow.controller";



const app: Application = express();

app.use(express.json()); //to parse json data from request body

// All Routes for notes and users declared

app.use("/books",bookRoutes); // /notes is the rote then redirect to noteRoutes folder
// app.use("/users", userRoutes); // /users is the rote then redirect to noteRoutes folder


app.use("/borrow",borrowRoutes );

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App!");
});

// Global error handler && always cretae the samme structure for error handler 1st the 404 error handler for rote not and the the other error handler 500 for all error 

app.use((req:Request,res:Response,next:NextFunction) => {
  res.status(404).json({
    message: "Route not found"
    
  })
})

app.use((error:any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.error("Error: from gg", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });

  }
})

export default app;
