import express from "express";
import { getDiscountStatus, subscribe } from "../controllers/newsletterController.js";
import userAuth from "../middleware/userAuth.js";

const newsletterRouter = express.Router();

// POST /api/newsletter/subscribe
newsletterRouter.post("/subscribe",userAuth, subscribe);
newsletterRouter.post("/status", userAuth, getDiscountStatus);

export default newsletterRouter;
