import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import {
  Package,
  ShoppingBag,
  CreditCard,
  MapPin,
  Phone,
  IndianRupee,
} from "lucide-react";

const Orders = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
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
    }
  };

  const updateStatus = async (event,orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders()
        toast.success("Order status updated!");
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
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-blue-600" />
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4 ">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-2xl p-4 sm:p-6 space-y-2 border w-[calc(100vw-25vw)]"
            >
              {/* Order Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <p className="font-semibold text-lg flex items-center gap-1">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    Order ID:{" "}
                    <span className="text-gray-600">{order._id}</span>
                  </p>

                  {/* Status dropdown */}
                  <div className="mt-2">
                    <label className="text-sm font-medium text-gray-600 mr-2">
                      Status:
                    </label>
                    <select
                      className="border rounded px-3 py-1 text-sm"
                      value={order.status}
                      onChange={(event) =>
                        updateStatus(event,order._id)
                      }
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
                <p className="font-semibold flex items-center ">
                  <IndianRupee className="w-4 h-4" />
                  {order.amount}
                </p>
              </div>

              {/* Items */}
              <div className="grid gap-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border rounded-xl p-3"
                  >
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <IndianRupee className="w-3 h-3" />
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address & Payment */}
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold flex items-center gap-2">
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
                <div className="flex flex-col gap-1">
                  <p className="font-semibold flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-purple-500" />
                    Payment
                  </p>
                  <p>Payment Method: {order.paymentMethod}</p>
                  <p>
                    Payment Status:{" "}
                    <span
                      className={`font-medium ${
                        order.payment ? "text-green-600" : "text-red-600"
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
