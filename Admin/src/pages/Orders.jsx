import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import {
  Package,
  CreditCard,
  MapPin,
  Phone,
  IndianRupee,
} from "lucide-react";
import { Title } from "../components/Title.jsx";

const Orders = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated!", {autoClose: 500});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // 🔴 Cancel Order (by Admin)
  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: "Cancelled" },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order cancelled successfully!", {autoClose: 1000});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
      {/* Page Title */}
      <Title text1={"All"} text2={"Orders"} textSize={"text-xl md:text-2xl"} />

      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No orders found.</p>
      ) : (
        <div className="space-y-6 pt-6">
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 transition hover:shadow-xl"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="font-semibold text-xs sm:text-lg flex items-center gap-2">
                      <Package className="w-5 h-5 text-green-600" />
                      Order ID:{" "}
                      <span className="text-gray-600 dark:text-gray-300 font-normal">
                        {order._id}
                      </span>
                    </p>

                    {/* 🕒 Order Date + Time */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Placed On:{" "}
                      <span className="font-medium">
                        {new Date(order.date).toLocaleDateString()}{" "}
                        {new Date(order.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </p>

                    {/* Status */}
                    {order.status === "Cancelled" ? (
                      <p className="mt-2 text-red-600 font-medium">
                        This order was cancelled
                      </p>
                    ) : (
                      <div className="mt-2 flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Status:
                        </label>
                        <select
                          className="border rounded-lg px-3 py-1 text-sm bg-gray-50 dark:bg-gray-700 dark:text-white"
                          value={order.status}
                          onChange={(event) => {
                            updateStatus(event, order._id);
                          }}
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Packing">Packing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>

                        {/* 🔴 Cancel Button (admin) */}
                        {order.status !== "Delivered" && (
                          <button
                            onClick={() => cancelOrder(order._id)}
                            className="ml-3 px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Order Amount */}
                  <p className="font-bold text-lg flex items-center gap-1 text-gray-900 dark:text-white">
                    <IndianRupee className="w-5 h-5" />
                    {order.amount}
                  </p>
                </div>

                {/* Items */}
                <div className="mt-4 grid gap-4">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 border border-gray-200 dark:border-gray-700 rounded-xl p-3 bg-gray-50 dark:bg-gray-700"
                    >
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          Size: {item.size} | Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />
                          {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Address & Payment */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2 text-sm text-gray-700 dark:text-gray-300">
                  {/* Delivery Address */}
                  <div className="flex flex-col gap-1 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                      <MapPin className="w-4 h-4 text-red-500" />
                      Delivery Address
                    </p>
                    <p>
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p>
                      {order.address.street}, {order.address.city}
                    </p>
                    <p>
                      {order.address.state} - {order.address.zipcode}
                    </p>
                    <p>{order.address.country}</p>
                    <p className="flex items-center gap-1">
                      <Phone className="w-4 h-4" /> {order.address.phone}
                    </p>
                  </div>

                  {/* Payment Info */}
                  <div className="flex flex-col gap-1 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                      <CreditCard className="w-4 h-4 text-purple-500" />
                      Payment
                    </p>
                    <p>Method: {order.paymentMethod}</p>
                    <p>
                      Status:{" "}
                      <span
                        className={`font-medium ${order.payment ? "text-green-600" : "text-red-600"
                          }`}
                      >
                        {order.payment ? "Paid" : "Pending"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
