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

app.use(express.json());

// Routes
app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App!");
});

// 404 Handler — For all routes not matched above
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler Middleware — For errors thrown/passed with next(err)
const errorHandler: ErrorRequestHandler = (error :any, req:Request, res:Response, next:NextFunction): void => {
  console.error(error); // optional logging

  if (error.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error.errors ? error.errors : error.message,
    });
    return; // exit without returning res object
  }

  if (error.name === "CastError") {
    res.status(400).json({
      success: false,
      message: "Invalid ID format",
      error: error.message,
    });
    return;
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    res.status(400).json({
      success: false,
      message: `Duplicate value for field: ${field}`,
      error: error,
    });
    return;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    error: error,
  });
};


app.use(errorHandler);

export default app;
