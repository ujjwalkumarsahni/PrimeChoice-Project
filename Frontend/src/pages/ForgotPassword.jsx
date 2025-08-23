import React, { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const { backendUrl, navigate } = useContext(ShopContext);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
            if (res.data.success) {
                toast.success("OTP sent to your email!", {autoClose: 1000} );
                navigate("/reset-password", { state: { email } });
            } else {
                toast.error(res.data.message || "Something went wrong");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Error occurred");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center py-30 bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
