import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import { Title } from "../components/Title.jsx";

const AllProductList = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        setProducts(products.filter((p) => p._id !== id));
        toast.success(res.data.message, {autoClose: 1000});
      } else {
        toast.error(res.data.message, {autoClose: 1000});
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Shimmer Loader for Desktop (table)
  const TableShimmer = () => (
    <div className="hidden md:block mt-6 overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-sky-700 text-white text-left">
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="animate-pulse">
              <td className="p-3 border">
                <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
              </td>
              <td className="p-3 border">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </td>
              <td className="p-3 border">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </td>
              <td className="p-3 border">
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </td>
              <td className="p-3 border text-center">
                <div className="h-6 w-6 bg-gray-300 rounded-full mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // 🔹 Shimmer Loader for Mobile (cards)
  const CardShimmer = () => (
    <div className="md:hidden grid gap-4 mt-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-full border rounded-xl p-4 flex items-center gap-4 bg-white shadow animate-pulse"
        >
          <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-32"></div>
            <div className="h-3 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
      ))}
    </div>
  );

  // Loading State
  if (loading) {
    return (
      <div className="w-full px-2 sm:px-4 md:px-6 py-6">
        <Title text1={"All"} text2={"Products"} textSize={"text-xl md:text-2xl"} />
        <TableShimmer />
        <CardShimmer />
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-6">
      <Title text1={"All"} text2={"Products"} textSize={"text-xl md:text-2xl"} />

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block mt-6 overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-sky-700 text-white text-left">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-sky-100 transition"
                >
                  <td className="p-3 border">
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="p-3 border font-medium">{product.name}</td>
                  <td className="p-3 border capitalize">{product.category}</td>
                  <td className="p-3 border font-semibold">₹{product.price}</td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden grid gap-4 mt-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="w-full border rounded-xl p-4 flex items-center gap-4 bg-white shadow"
            >
              <img
                src={product.image?.[0]}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                <p className="font-bold">₹{product.price}</p>
              </div>
              <button
                onClick={() => handleDelete(product._id)}
                className="text-red-500 hover:text-red-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default AllProductList;
