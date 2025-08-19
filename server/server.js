import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";

// app config
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => res.send("API Working fine"));

// start server
const startServer = async () => {
  try {
    // connect to database
    await connectDB();
    connectCloudinary()

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); 
  }
};

startServer();
