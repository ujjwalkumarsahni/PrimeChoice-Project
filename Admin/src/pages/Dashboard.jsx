import { ShoppingBag, Package, Users, DollarSign } from "lucide-react";
import { Title } from "../components/Title.jsx";

const Dashboard = () => {
  const DashboardData = {
    products: 128,
    orders: 452,
    customers: 312,
    revenue: 12990,
  };

  return (
    <div className="min-h-screen w-full p-8 bg-gray-100 dark:bg-gray-950">
      {/* Page Title */}
      <Title text1={"PrimeChoice"} text2={"Dashboard"} textSize={"text-xl md:text-2xl"} />

      {/* Stats Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pt-10">
        {/* Products */}
        <div className="flex flex-col items-start justify-between p-8 rounded-2xl shadow-lg hover:scale-105 transition bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/20">
            <Package className="w-8 h-8" />
          </div>
          <div className="mt-5">
            <p className="text-3xl font-extrabold">{DashboardData.products}</p>
            <p className="opacity-80">Products</p>
          </div>
        </div>

        {/* Orders */}
        <div className="flex flex-col items-start justify-between p-8 rounded-2xl shadow-lg hover:scale-105 transition bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/20">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="mt-5">
            <p className="text-3xl font-extrabold">{DashboardData.orders}</p>
            <p className="opacity-80">Orders</p>
          </div>
        </div>

        {/* Customers */}
        <div className="flex flex-col items-start justify-between p-8 rounded-2xl shadow-lg hover:scale-105 transition bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/20">
            <Users className="w-8 h-8" />
          </div>
          <div className="mt-5">
            <p className="text-3xl font-extrabold">{DashboardData.customers}</p>
            <p className="opacity-80">Customers</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="flex flex-col items-start justify-between p-8 rounded-2xl shadow-lg hover:scale-105 transition bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/20">
            <DollarSign className="w-8 h-8" />
          </div>
          <div className="mt-5">
            <p className="text-3xl font-extrabold">
              ${DashboardData.revenue.toLocaleString()}
            </p>
            <p className="opacity-80">Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
