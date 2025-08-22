// routes/dashboardRoutes.js
import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { getDashboardStats } from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/stats", adminAuth, getDashboardStats);

export default dashboardRouter;
