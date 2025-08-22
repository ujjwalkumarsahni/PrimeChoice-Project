import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'
import razorpay from 'razorpay';
import Newsletter from "../models/newsletterModel.js";

const currency = 'inr'
const deliveryCharge = 20

// stripe payment integration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Razorpay payment integration
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// placing order using cash on delivery method
export const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Calculate subtotal from items
        const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        let discountedSubtotal = subtotal;

        const newsletterSub = await Newsletter.findOne({ userId });

        if (newsletterSub && newsletterSub.discountUsed) {
            discountedSubtotal = subtotal - subtotal * 0.05; // 5% discount only on items
        }

        const delivery_fee = 20; // ✅ same as frontend
        const finalAmount = Math.round(discountedSubtotal + delivery_fee);

        const orderData = {
            userId,
            items,
            address,
            amount: finalAmount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed", finalAmount });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// placing order using stripe method
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        // Calculate subtotal
        const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        let discountedSubtotal = subtotal;

        const newsletterSub = await Newsletter.findOne({ userId });
        if (newsletterSub && newsletterSub.discountUsed) {
            discountedSubtotal = subtotal - subtotal * 0.05; // 5% discount
        }

        const delivery_fee = 20;
        const finalAmount = Math.round(discountedSubtotal + delivery_fee);


        const orderData = {
            userId,
            items,
            address,
            amount: finalAmount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // ✅ Apply discount proportionally on items
        const discountRatio = discountedSubtotal / subtotal;

        const line_items = items.map((item) => {
            const discountedPrice = Math.round(item.price * discountRatio * 100); // paise
            return {
                price_data: {
                    currency: currency,
                    product_data: { name: item.name },
                    unit_amount: discountedPrice,
                },
                quantity: item.quantity,
            };
        });

        // ✅ Delivery fee (no discount)
        line_items.push({
            price_data: {
                currency: currency,
                product_data: { name: "Delivery Charges" },
                unit_amount: delivery_fee * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// verify stripe
export const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body
    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// placing order using razorpay method
export const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, address } = req.body;

        // 🔹 Calculate subtotal
        const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        let discountedSubtotal = subtotal;
        const newsletterSub = await Newsletter.findOne({ userId });

        if (newsletterSub && newsletterSub.discountUsed) {
            discountedSubtotal = subtotal - subtotal * 0.05; // 5% discount
        }

        const delivery_fee = 20;
        const finalAmount = Math.round(discountedSubtotal + delivery_fee);



        const orderData = {
            userId,
            items,
            address,
            amount: finalAmount, // ✅ Save correct final total
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // ✅ Razorpay expects amount in paise
        const options = {
            amount: finalAmount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// verify razorpay
export const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: "Payment Successfull" })
        } else {
            res.json({ success: false, message: "Payment Failed" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// all order data for admin panel
export const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// User order data for frontend
export const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        // console.log("all orders",orders);

        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// update order status from admin panel
export const updateOrders = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
