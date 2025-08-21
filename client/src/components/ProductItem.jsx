import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency, getFinalPrice, hasDiscount } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="block group border-2 border-sky-900 rounded overflow-hidden"
    >
      <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-all">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="px-2 py-2">
        <p className="px-1 pt-3 font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
          {name}
        </p>

        {hasDiscount ? (
          <div className="flex items-center gap-1">
            <p className="text-gray-500 line-through hidden sm:block">
              {currency}{price}
            </p>
            <p className="text-green-600 font-bold">
              {currency}{getFinalPrice(price)}
            </p>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-1 py-1 rounded">
              5% OFF
            </span>
          </div>
        ) : (
          <p className="text-gray-700 text-sm font-medium">
            {currency}{price.toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;
