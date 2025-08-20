import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success("Payment successful! 🎉");
        navigate("/orders");
      } else {
        toast.error("Payment failed, try again.");
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      ) : (
        <p className="text-gray-600">Redirecting...</p>
      )}
    </div>
  );
};

export default Verify;
