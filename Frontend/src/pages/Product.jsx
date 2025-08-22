import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js';
import RelatedProduct from '../components/RelatedProduct.jsx';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, hasDiscount, getFinalPrice } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Product details layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left: Product images */}
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnail images */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:h-[500px]">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index}`}
                onClick={() => setImage(img)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition-transform duration-200 hover:scale-105 ${img === image ? 'border-blue-500' : 'border-gray-200'}`}
              />
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={image}
              alt={productData.name}
              className="w-full max-h-[500px] object-contain rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Right: Product info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-5 h-5" />
            ))}
            <img src={assets.star_dull_icon} alt="star" className="w-5 h-5" />
            <p className="text-gray-600 text-sm">(122 reviews)</p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            {hasDiscount ? (
              <>
                <p className="text-xl text-gray-500 line-through">
                  {currency}{productData.price.toFixed(2)}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {currency}{getFinalPrice(productData.price)}
                </p>
                <span className="bg-green-100 text-green-700 text-sm font-medium px-2 py-1 rounded">
                  5% OFF
                </span>
              </>
            ) : (
              <p className="text-2xl font-semibold text-blue-600">
                {currency}{productData.price.toFixed(2)}
              </p>
            )}
          </div>


          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{productData.description}</p>

          {/* Size selection */}
          <div>
            <p className="font-medium mb-2">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-4 py-2 border rounded-lg transition ${item === size
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button onClick={() => addToCart(productData._id, size)} className="mt-4 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            ADD TO CART
          </button>

          <hr className="my-4" />

          {/* Highlights */}
          <ul className="text-gray-600 text-sm space-y-1">
            <li>✅ 100% Original product</li>
            <li>💵 Cash on delivery available</li>
            <li>🔄 Easy return within 7 days</li>
          </ul>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-10">
        <div className="flex gap-6 border-b pb-2 mb-4">
          <b className="cursor-pointer border-b-2 border-blue-600 pb-1">Description</b>
          <p className="cursor-pointer text-gray-600 hover:text-blue-600">Reviews (122)</p>
        </div>
        <p className="text-gray-700 mb-4">
          An e-commerce website is an online platform that facilitates the buying and selling of products or services...
        </p>
        <p className="text-gray-700">
          E-commerce websites typically display products or services along with detailed descriptions...
        </p>
      </div>

      {/* Related Products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">Loading product details...</p>
    </div>
  );
};

export default Product;
