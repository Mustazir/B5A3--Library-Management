import express, {
  ErrorRequestHandler,
  Application,
  NextFunction,
  Request,
  Response,
} from "express";
import { bookRoutes } from "../controller/book.controller";
import { borrowRoutes } from "../controller/borrow.controller";

const app: Application = express();

app.use(express.json()); //to parse json data from request body

// All Routes for notes and users declared

app.use("/books", bookRoutes); // /notes is the rote then redirect to noteRoutes folder
// app.use("/users", userRoutes); // /users is the rote then redirect to noteRoutes folder

app.use("/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App!");
});

// Global error handler && always cretae the samme structure for error handler 1st the 404 error handler for rote not and the the other error handler 500 for all error

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(((error: any, req: Request, res: Response, next: NextFunction) => {
  // handler code

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error, // ✅ Full error object
    });
  }

  // Mongoose Duplicate Key Error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      message: `Duplicate value for field: ${field}`,
      success: false,
      error: error,
    });
  }

  // Default error response
  res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
    success: false,
    error: error,
  });
}) as ErrorRequestHandler); // ✅ force-cast the type

export default app;
