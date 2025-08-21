import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ShopContext } from "../context/ShopContext.jsx";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const { token, backendUrl, setHasDiscount } = useContext(ShopContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login first to subscribe", { autoClose: 1500 });
      return;
    }

    if (!email) {
      toast.error("Please enter your email", { autoClose: 1500 });
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/newsletter/subscribe`,
        { email },
        { headers: { token } }
      );

      if (res.data.success) {
        setHasDiscount(res.data.hasDiscount);
        toast.success(res.data.message, { autoClose: 1500 });
        setEmail("");
      } else {
        toast.error(res.data.message || "Subscription failed", {
          autoClose: 1500,
        });
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Subscription failed";
      toast.error(msg, { autoClose: 1500 });
    }
  };

  return (
    <div className="text-center pb-10">
      <p className="text-2xl lg:text-3xl font-medium text-gray-800">
        Subscribe now & get 5% off
      </p>
      <p className="text-gray-400 mt-3">
        Join our newsletter to receive updates, offers, and more.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:flex-1 outline-none"
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4 hover:bg-gray-800 transition"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
