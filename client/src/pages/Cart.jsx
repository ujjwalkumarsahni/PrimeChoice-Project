// import React, { useContext, useEffect } from 'react'
// import { ShopContext } from '../context/ShopContext.jsx';
// import { Title } from '../components/Title.jsx';
// import { assets } from '../assets/assets.js';

// const Cart = () => {
//   const { products, cartItems, currency ,removeFromCart} = useContext(ShopContext);
//   const [cartData, setCartData] = React.useState([]);

//   useEffect(() => {
//     const tempData = [];
//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {
//         if (cartItems[items][item] > 0) {
//           tempData.push({
//             _id: items,
//             size: item,
//             quantity: cartItems[items][item],
//           });
//         }
//       }
//     }
//     setCartData(tempData);
//   }, [cartItems]);

//   // Calculate total
//   const totalPrice = cartData.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <div>

//       <div className="">
//         <Title text1="YOUR" text2="CART" textSize="text-xl md:text-2xl" />
//       </div>

//       <div>
//         {
//           cartData.map((item) => {
//             const product = products.find((p) => p._id === item._id);
//             if (!product) return null;

//             return (
//               <div key={item._id} className="">
//                 <div className="">
//                   <img src={product.image[0]} alt={product.name} className="" />
//                   <div>
//                     <h2 className="">{product.name}</h2>
//                     <p className="">Size: {item.size}</p>
//                   </div>
//                 </div>
//                 <div className="">
//                   <span className="">{currency}{(product.price * item.quantity).toFixed(2)}</span>
              
//                 </div>
//                 <input type="number" min={1} defaultValue={item.quantity} />
//                 <img src={assets.bin_icon} alt="" />
//               </div>
//             );
//           })
//         }
//       </div>
//     </div>
//   );
// };


// export default Cart


import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Title } from "../components/Title.jsx";
import { assets } from "../assets/assets.js";

const Cart = () => {
  const { products, cartItems, currency, removeFromCart } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const totalPrice = cartData.reduce((acc, item) => {
    const product = products.find((p) => p._id === item._id);
    return product ? acc + product.price * item.quantity : acc;
  }, 0);

  return (
    <div className="px-4 sm:px-8 py-8">
      {/* Title */}
      <div className="mb-8 text-center">
        <Title text1="YOUR" text2="CART" textSize="text-xl md:text-2xl" />
      </div>

      {cartData.length > 0 ? (
        <div className="space-y-6">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Size</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item) => {
                  const product = products.find((p) => p._id === item._id);
                  if (!product) return null;
                  return (
                    <tr
                      key={`${item._id}-${item.size}`}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <span>{product.name}</span>
                      </td>
                      <td className="p-3">{item.size}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          min={1}
                          defaultValue={item.quantity}
                          className="w-16 border rounded px-2 py-1"
                        />
                      </td>
                      <td className="p-3">
                        {currency}
                        {(product.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => removeFromCart(item._id, item.size)}
                        >
                          <img
                            src={assets.bin_icon}
                            alt="Remove"
                            className="w-6 cursor-pointer hover:opacity-75"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {cartData.map((item) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;
              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="flex items-center gap-4 bg-white rounded-lg shadow p-4"
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm font-medium">
                      {currency}
                      {(product.price * item.quantity).toFixed(2)}
                    </p>
                    <input
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      className="mt-2 w-16 border rounded px-2 py-1"
                    />
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <img
                      src={assets.bin_icon}
                      alt="Remove"
                      className="w-6 cursor-pointer"
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Total Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-lg font-semibold">
              Total: {currency}
              {totalPrice.toFixed(2)}
            </p>
            <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
