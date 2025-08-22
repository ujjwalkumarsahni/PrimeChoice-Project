import { useState } from "react";
import { ShoppingBag, Package, Users, DollarSign, X } from "lucide-react"; // icons

const Dashboard = () => {
  // 🔹 Mock Dashboard Data (replace with API data later)
  const DashboardData = {
    products: 128,
    orders: 452,
    customers: 312,
    revenue: 12990,
    latestOrders: [
      {
        id: "ORD-1001",
        customer: "Alice Johnson",
        date: "2025-08-10",
        total: 199.99,
        status: "Pending",
      },
      {
        id: "ORD-1002",
        customer: "Michael Brown",
        date: "2025-08-09",
        total: 89.5,
        status: "Shipped",
      },
      {
        id: "ORD-1003",
        customer: "Sophia Lee",
        date: "2025-08-07",
        total: 45.0,
        status: "Delivered",
      },
    ],
  };

  // 🔹 Helper for status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Shipped":
        return "bg-blue-100 text-blue-600";
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="m-5">
      {/* Stats Cards */}
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-5 rounded-xl shadow hover:scale-105 transition">
          <Package className="w-10 h-10 text-blue-500" />
          <div>
            <p className="text-2xl font-bold">{DashboardData.products}</p>
            <p className="text-gray-500 dark:text-gray-200">Products</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-5 rounded-xl shadow hover:scale-105 transition">
          <ShoppingBag className="w-10 h-10 text-green-500" />
          <div>
            <p className="text-2xl font-bold">{DashboardData.orders}</p>
            <p className="text-gray-500 dark:text-gray-200">Orders</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-5 rounded-xl shadow hover:scale-105 transition">
          <Users className="w-10 h-10 text-purple-500" />
          <div>
            <p className="text-2xl font-bold">{DashboardData.customers}</p>
            <p className="text-gray-500 dark:text-gray-200">Customers</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-5 rounded-xl shadow hover:scale-105 transition">
          <DollarSign className="w-10 h-10 text-orange-500" />
          <div>
            <p className="text-2xl font-bold">${DashboardData.revenue.toLocaleString()}</p>
            <p className="text-gray-500 dark:text-gray-200">Revenue</p>
          </div>
        </div>
      </div>

      {/* Latest Orders */}
      <div className="bg-white dark:bg-gray-900 rounded-xl mt-10 shadow overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b">
          <ShoppingBag className="text-gray-600" />
          <p className="font-semibold">Latest Orders</p>
        </div>

        <div className="divide-y">
          {DashboardData.latestOrders.length > 0 ? (
            DashboardData.latestOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{order.customer}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {order.date} • {order.id}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-6 text-gray-500 dark:text-white">
              No recent orders available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
