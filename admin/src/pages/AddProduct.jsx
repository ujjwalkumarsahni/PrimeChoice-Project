import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const AddProduct = () => {
  const {backendUrl,token} = useContext(AppContext)
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
      newImages[index] = file; // keep File object for upload
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

      // Append images as image1, image2, image3, image4
      images.forEach((file, index) => {
        if (file) {
          data.append(`image${index + 1}`, file);
        }
      });

      const res = await axios.post(`${backendUrl}/api/product/add`, data, {
        headers: {
          token
        }
      });

      if (res.data.success) {
        toast.success(res.data.message)
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
      toast.error(err.message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

      {/* Image Upload */}
      <div className="flex gap-4 mb-4">
        {images.map((img, i) => (
          <label
            key={i}
            className="w-18 h-20 sm:w-24 sm:h-24 flex items-center justify-center border-2 border-dashed rounded cursor-pointer bg-gray-100 dark:bg-gray-700"
          >
            {img ? (
              <img
                src={URL.createObjectURL(img)}
                alt={`preview-${i}`}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-gray-400 text-sm">Upload</span>
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

      {/* Name */}
      <input
        type="text"
        placeholder="Product name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-3 border rounded px-3 py-2"
      />

      {/* Description */}
      <textarea
        placeholder="Product description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full mb-3 border rounded px-3 py-2"
      />

      {/* Category & Price */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
        </select>

        <select
          value={formData.subCategory}
          onChange={(e) =>
            setFormData({ ...formData, subCategory: e.target.value })
          }
          className="border rounded px-3 py-2"
        >
          <option>Topwear</option>
          <option>Bottomwear</option>
          <option>Footwear</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Sizes */}
      <div className="mb-3">
        <p className="mb-2 font-medium">Product Sizes</p>
        <div className="flex gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`px-4 py-2 border rounded ${
                sizes.includes(size)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={formData.bestseller}
          onChange={(e) =>
            setFormData({ ...formData, bestseller: e.target.checked })
          }
        />
        <span>Add to bestseller</span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="w-32 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        ADD
      </button>
    </form>
  );
};

export default AddProduct;
