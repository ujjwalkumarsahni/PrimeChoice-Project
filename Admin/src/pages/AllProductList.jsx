import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

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
        toast.error(res.data.message)
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error(err.message)
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await axios.post(`${backendUrl}/api/product/remove`, { id }, {headers: {token}});
      if (res.data.success) {
        setProducts(products.filter((p) => p._id !== id));
        toast.success(res.data.message)
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error(err.message)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-6">Loading products...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Products List</h2>

      <div className="">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="p-2 border">
                    <img
                      src={product.image?.[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">₹{product.price}</td>
                  <td className="p-2 border text-center">
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
    </div>
  );
};

export default AllProductList;
