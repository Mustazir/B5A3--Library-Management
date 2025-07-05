import { Server } from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
dotenv.config();

let server: Server;

const port = 5000;

async function main() {
  try {
    const uri = process.env.MONGODB_URI as string;
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      
    });
    
  } catch (error) {
    console.log(error);
  }
}

main();
