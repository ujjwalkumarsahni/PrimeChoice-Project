import React, { useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // Import icons

const ResetPassword = () => {
  const { backendUrl, navigate } = useContext(ShopContext);
  const { state } = useLocation();
  const [form, setForm] = useState({ otp: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // password visibility state

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state?.email) {
      toast.error("Email is missing! Go back to forgot password page.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/user/reset-password`, {
        ...form,
        email: state.email,
      });

      if (res.data.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="otp"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input with Show/Hide */}
          <div className="relative">
            <input
              name="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
