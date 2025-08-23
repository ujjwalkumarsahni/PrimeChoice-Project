import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'
import razorpay from 'razorpay';
import Newsletter from "../models/newsletterModel.js";
import transporter from "../config/nodeMailer.js";
import { ORDER_STATUS_TEMPLATE } from "../config/EmailTempletes.js";

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
    const { userId, items, address } = req.body;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let discountedSubtotal = subtotal;

    const newsletterSub = await Newsletter.findOne({ userId });
    if (newsletterSub && newsletterSub.discountUsed) {
      discountedSubtotal = subtotal - subtotal * 0.05;
    }

    const finalAmount = Math.round(discountedSubtotal + deliveryCharge);

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount: finalAmount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      status: "Order Placed",
    });
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // ✅ Email
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Your Order Status: Order Placed ✅`,
      html: ORDER_STATUS_TEMPLATE(user.name, newOrder._id.toString(), finalAmount, "Order Placed"),
    });

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
    const discountRatio = subtotal > 0 ? discountedSubtotal / subtotal : 1;

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
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}&userId=${userId}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}&userId=${userId}`,
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
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      const order = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      // ✅ User fetch
      const user = await userModel.findById(userId);

      if (user) {
        await transporter.sendMail({
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: "Payment Successful 🎉",
          html: ORDER_STATUS_TEMPLATE(user.name, order._id.toString(), order.amount, "Order Placed"),
        });
      }

      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



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
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const order = await orderModel.findByIdAndUpdate(
        orderInfo.receipt,
        { payment: true },
        { new: true }
      );
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      const user = await userModel.findById(userId);

      if (user) {
        await transporter.sendMail({
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: "Payment Successful 🎉",
          html: ORDER_STATUS_TEMPLATE(user.name, order._id.toString(), order.amount, "Order Placed"),
        });
      }

      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



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
    const { orderId, status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status, ...(status === "Delivered" ? { payment: true } : {}) },
      { new: true }
    );

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    const user = await userModel.findById(order.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Your Order Status: ${status}`,
      html: ORDER_STATUS_TEMPLATE(user.name, order._id.toString(), order.amount, status),
    });

    res.json({ success: true, message: "Status Updated & Email Sent" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// user cancel the order
export const cancelOrder = async (req, res) => {
  try {
    const { orderId, userId } = req.body;
    const order = await orderModel.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Delivered order cannot be cancelled",
      });
    }

    order.status = "Cancelled";
    await order.save();

    const user = await userModel.findById(userId);
    if (user) {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Your Order Status: Cancelled ❌",
        html: ORDER_STATUS_TEMPLATE(user.name, order._id.toString(), order.amount, "Cancelled"),
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};