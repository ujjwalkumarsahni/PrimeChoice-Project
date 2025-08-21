// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./config/mongoDB.js";
// import connectCloudinary from "./config/cloudinary.js";
// import userRouter from "./routes/userRoute.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import newsletterRouter from "./routes/newsletterRoute.js";

// // app config
// const app = express();
// const port = process.env.PORT || 3000;

// // middleware
// app.use(cors());
// app.use(express.json());

// // routes endpoint
// app.use('/api/user', userRouter)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/order', orderRouter)
// app.use('/api/newsletter', newsletterRouter)
// app.get("/", (req, res) => res.send("API Working fine"));

// // start server
// const startServer = async () => {
//   try {
//     // connect to database
//     await connectDB();
//     connectCloudinary()

//     app.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });
//   } catch (err) {
//     console.error("Failed to start server:", err);
//     process.exit(1);
//   }
// };

// startServer();


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

// REST routes
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

    // Optional: in-memory latest positions (for late joiners)
    const latestLocationByOrder = new Map();

    io.on("connection", (socket) => {
      // Customer/Admin joins a room to receive updates for an order
      socket.on("joinOrderRoom", ({ orderId }) => {
        if (!orderId) return;
        socket.join(`order:${orderId}`);
        // if we have a last known location, send immediately
        const last = latestLocationByOrder.get(orderId);
        if (last) socket.emit("orderLocation", last);
      });

      // Delivery app sends updates
      socket.on("driverLocation", ({ orderId, lat, lng, heading }) => {
        if (!orderId || typeof lat !== "number" || typeof lng !== "number") return;
        const payload = { lat, lng, heading: heading ?? null, at: Date.now() };
        latestLocationByOrder.set(orderId, payload);
        io.to(`order:${orderId}`).emit("orderLocation", payload);
      });

      // Optional: leave room
      socket.on("leaveOrderRoom", ({ orderId }) => {
        if (!orderId) return;
        socket.leave(`order:${orderId}`);
      });
    });

    server.listen(port, () => console.log(`Server running on ${port}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
