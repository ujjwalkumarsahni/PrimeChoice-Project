import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Count total products
    const products = await productModel.countDocuments();

    // Count total users
    const customers = await userModel.countDocuments();

    // ✅ Revenue (only paid & not cancelled orders)
    const revenueAgg = await orderModel.aggregate([
      { $match: { status: { $ne: "Cancelled" }, payment: true } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const revenue = revenueAgg[0]?.total || 0;

    // ✅ Orders count (only paid & not cancelled)
    const itemsAgg = await orderModel.aggregate([
      { $match: { status: { $ne: "Cancelled" }, payment: true } },
      { $project: { itemCount: { $size: "$items" } } },
      { $group: { _id: null, orders: { $sum: "$itemCount" } } },
    ]);
    const orders = itemsAgg[0]?.orders || 0;

    return res.json({
      success: true,
      data: {
        products,
        customers,
        revenue,
        orders,
      },
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};
