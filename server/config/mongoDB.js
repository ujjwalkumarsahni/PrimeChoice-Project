import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // attach listeners first
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("Database disconnected");
    });

    // then connect
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
    });
    
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
};

export default connectDB;
