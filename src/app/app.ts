import express, { Application, Request, Response } from "express";
import { bookRoutes } from "../controller/book.controller";



const app: Application = express();

app.use(express.json()); //to parse json data from request body

// All Routes for notes and users declared

app.use("/books",bookRoutes); // /notes is the rote then redirect to noteRoutes folder
// app.use("/users", userRoutes); // /users is the rote then redirect to noteRoutes folder

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App!");
});

export default app;
