import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import { Title } from "../components/Title.jsx";

const AddProduct = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [images, setImages] = useState([null, null, null, null]);
  const [sizes, setSizes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Men",
    subCategory: "Topwear",
    price: "",
    bestseller: false,
  });

  // Handle Image Upload
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  // Toggle size selection
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("subCategory", formData.subCategory);
      data.append("bestseller", formData.bestseller);
      data.append("sizes", JSON.stringify(sizes));

      images.forEach((file, index) => {
        if (file) {
          data.append(`image${index + 1}`, file);
        }
      });

      const res = await axios.post(`${backendUrl}/api/product/add`, data, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success(res.data.message, {autoClose: 1000});
        setFormData({
          name: "",
          description: "",
          category: "Men",
          subCategory: "Topwear",
          price: "",
          bestseller: false,
        });
        setSizes([]);
        setImages([null, null, null, null]);
      }
    } catch (err) {
      console.error("Add Product Error:", err);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 lg:p-10 bg-gray-100 dark:bg-gray-950">
      {/* Page Title */}
      <Title
        text1={"Add"}
        text2={"Product"}
        textSize={"text-xl md:text-2xl"}
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white dark:bg-gray-900 p-4 sm:p-6 lg:p-10 space-y-6"
      >
        {/* Image Upload */}
        <div>
          <p className="mb-3 font-medium text-gray-700 dark:text-gray-300">
            Product Images
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <label
                key={i}
                className="h-28 sm:h-32 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700"
              >
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`preview-${i}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-400 text-xs sm:text-sm">
                    Upload
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, i)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Product Description
          </label>
          <textarea
            placeholder="Write about the product..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white"
            >
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Sub Category
            </label>
            <select
              value={formData.subCategory}
              onChange={(e) =>
                setFormData({ ...formData, subCategory: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white"
            >
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
            Product Sizes
          </p>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  sizes.includes(size)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.bestseller}
            onChange={(e) =>
              setFormData({ ...formData, bestseller: e.target.checked })
            }
            className="h-4 w-4"
          />
          <span className="text-gray-700 dark:text-gray-300">
            Add to bestseller
          </span>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full sm:w-40 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
