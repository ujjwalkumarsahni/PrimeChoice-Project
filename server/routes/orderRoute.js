import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateOrders, userOrders, verifyStripe } from '../controllers/orderController.js';
import userAuth from '../middleware/userAuth.js';

const orderRouter = express.Router()

// admin feature
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateOrders)

// payment feature
orderRouter.post('/place', userAuth, placeOrder)
orderRouter.post('/stripe', userAuth, placeOrderStripe)
orderRouter.post('/razorpay', userAuth, placeOrderRazorpay)

// user feature
orderRouter.post('/userorders', userAuth, userOrders)


// verify Stripe
orderRouter.post('/verifyStripe', userAuth, verifyStripe)

export default orderRouter;