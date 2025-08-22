import React, { useContext, useState } from "react";
import { Lock, User } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from 'axios'
const Login = () => {
  const {backendUrl,setToken} = useContext(AppContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${backendUrl}/api/user/admin`,{email,password})
      if(response.data.success){
        setToken(response.data.token)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          PrimeChoice Admin
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-600 dark:text-gray-200 mb-1 text-sm font-medium">
              Email Address
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700">
              <User className="text-gray-400 mr-2" size={18} />
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 dark:text-gray-200 mb-1 text-sm font-medium">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700">
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
          © {new Date().getFullYear()} PrimeChoice Admin
        </p>
      </div>
    </div>
  );
};

export default Login;
