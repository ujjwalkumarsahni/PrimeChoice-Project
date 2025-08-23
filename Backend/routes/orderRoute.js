import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import { allOrders, cancelOrder, placeOrder, placeOrderRazorpay, placeOrderStripe, updateOrders, userOrders, verifyRazorpay, verifyStripe } from '../controllers/orderController.js';
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
orderRouter.post('/cancel', userAuth, cancelOrder)


// verify Stripe
orderRouter.post('/verifyStripe', userAuth, verifyStripe)

// verify razorpay
orderRouter.post('/verifyRazorpay', userAuth, verifyRazorpay)

export default orderRouter;