import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Title } from "../components/Title.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="px-4 sm:px-8 py-8">
      {/* Title */}
      <div className="mb-8 text-center">
        <Title text1="MY" text2="ORDERS" textSize="text-xl md:text-2xl" />
      </div>

      {/* Orders list */}
      <div className="grid gap-6 ">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            {/* Product Info */}
            <div className="flex gap-4">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-semibold text-lg">{item.name}</p>
                <div className="text-sm text-gray-600 space-y-1 mt-1">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Date: <span className="font-medium">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Payment: <span className="font-medium">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Order Status & Action */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-sm text-gray-700">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
