<<<<<<< HEAD
// server.js
=======
>>>>>>> parent of 84420cf (integrate google map traking)
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import newsletterRouter from "./routes/newsletterRoute.js";

// app config
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// REST API routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/newsletter", newsletterRouter);

=======
// routes endpoint
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/newsletter', newsletterRouter)
>>>>>>> parent of 84420cf (integrate google map traking)
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
<<<<<<< HEAD

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
=======
>>>>>>> parent of 84420cf (integrate google map traking)
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
