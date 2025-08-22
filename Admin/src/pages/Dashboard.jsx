import { useEffect, useState, useContext } from "react";
import { ShoppingBag, Package, Users, DollarSign } from "lucide-react";
import { Title } from "../components/Title.jsx";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/dashboard/stats`, {
        headers: { token },
      });
      if (res.data.success) {
        setStats(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch stats");
      }
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Shimmer loader for numbers
  const ShimmerBox = () => (
    <div className="w-16 h-8 bg-white/30 rounded animate-pulse"></div>
  );

  return (
    <div className="min-h-screen w-full p-8 bg-gray-100 dark:bg-gray-950">
      {/* Page Title */}
      <Title
        text1={"PrimeChoice"}
        text2={"Dashboard"}
        textSize={"text-xl md:text-2xl"}
      />

      {/* Stats Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pt-10">
        {/* Products */}
        <div className="flex flex-col items-start justify-between p-8 rounded-2xl shadow-lg hover:scale-105 transition bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/20">
            <Package className="w-8 h-8" />
          </div>
          <div className="mt-5">
            {loading ? (
              <ShimmerBox />
            ) : (
              <p className="text-3xl font-extrabold">{stats.products}</p>
            )}
            <p className="opacity-80">Products</p>
          </div>
        </div>

        {/* Orders */}
        <div className="flex flex-col items-start justify-between p-8 rounded-2xl shadow-lg hover:scale-105 transition bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/20">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="mt-5">
            {loading ? (
              <ShimmerBox />
            ) : (
              <p className="text-3xl font-extrabold">{stats.orders}</p>
            )}
            <p className="opacity-80">Orders</p>
          </div>
        </div>

        {/* Customers */}
        <div className="flex flex-col items-start justify-between p-8 rounded-2xl shadow-lg hover:scale-105 transition bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/20">
            <Users className="w-8 h-8" />
          </div>
          <div className="mt-5">
            {loading ? (
              <ShimmerBox />
            ) : (
              <p className="text-3xl font-extrabold">{stats.customers}</p>
            )}
            <p className="opacity-80">Customers</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="flex flex-col items-start justify-between p-8 rounded-2xl shadow-lg hover:scale-105 transition bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/20">
            <DollarSign className="w-8 h-8" />
          </div>
          <div className="mt-5">
            {loading ? (
              <ShimmerBox />
            ) : (
              <p className="text-3xl font-extrabold">
                ₹{stats.revenue.toLocaleString("en-IN")}
              </p>
            )}
            <p className="opacity-80">Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
