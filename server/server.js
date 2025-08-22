// server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import newsletterRouter from "./routes/newsletterRoute.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// REST API routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/newsletter", newsletterRouter);

app.get("/", (req, res) => res.send("API Working fine"));

// ---- Start HTTP+WS server
const startServer = async () => {
  try {
    await connectDB();
    connectCloudinary();

    const server = createServer(app);
    const io = new Server(server, {
      cors: { origin: "*", methods: ["GET", "POST"] },
    });

    // In-memory latest locations
    const latestLocationByOrder = new Map();

    io.on("connection", (socket) => {
      console.log("⚡ client connected");

      // Customer/Admin joins order room
      socket.on("joinOrderRoom", ({ orderId }) => {
        if (!orderId) return;
        socket.join(`order:${orderId}`);
        const last = latestLocationByOrder.get(orderId);
        if (last) socket.emit("orderLocation", last);
      });

      // Driver shares live location
      socket.on("driverLocation", ({ orderId, lat, lng, heading }) => {
        if (!orderId || typeof lat !== "number" || typeof lng !== "number") return;
        const payload = { lat, lng, heading: heading ?? null, at: Date.now() };
        latestLocationByOrder.set(orderId, payload);
        io.to(`order:${orderId}`).emit("orderLocation", payload);
      });

      socket.on("leaveOrderRoom", ({ orderId }) => {
        if (!orderId) return;
        socket.leave(`order:${orderId}`);
      });

      socket.on("disconnect", () => {
        console.log("❌ client disconnected");
      });
    });

    server.listen(port, () => console.log(`🚀 Server running on ${port}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
