import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email", { autoClose: 1500 });
      return;
    }

    try {
      // Example: call backend API if available
      // await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/newsletter/subscribe`, { email });

      toast.success("Subscribed successfully 🎉", { autoClose: 1500 });
      setEmail(""); // clear input after success
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Subscription failed", {
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="text-center pb-10">
      <p className="text-2xl lg:text-3xl font-medium text-gray-800">
        Subscribe now & get 20% off
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
