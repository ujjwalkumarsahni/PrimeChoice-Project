import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Count total products
    const products = await productModel.countDocuments();

    // Count total orders (number of order documents)
    // const orders = await orderModel.countDocuments();

    // Count total users
    const customers = await userModel.countDocuments();

    // Calculate total revenue
    const revenueAgg = await orderModel.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const revenue = revenueAgg[0]?.total || 0;

    // Calculate total items ordered (sum of all items.length per order)
    const itemsAgg = await orderModel.aggregate([
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
