import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"


// placing order using cash on delivery method
export const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// placing order using stripe method
export const placeOrderStripe = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// placing order using razorpay method
export const placeOrderRazorpay = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}



// all order data for admin panel
export const allOrders = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// User order data for frontend
export const userOrders = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// update order status from admin panel
export const updateOrders = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
