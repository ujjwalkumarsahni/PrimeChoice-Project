import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Title } from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import CartTotal from "../components/CartTotal.jsx";
import { ShoppingCart } from "lucide-react";
const Cart = () => {
  const { products, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
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
    }

  }, [cartItems, products]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-8 text-center">
        <Title text1="YOUR" text2="CART" textSize="text-xl md:text-2xl" />
      </div>

      {cartData.length > 0 ? (
        <div className="space-y-6">
          {/* Table for desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-sky-100">
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Size</th>
                  <th className="p-3 text-left">Quantity</th>
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
                          className="w-30 h-40 object-cover rounded"
                        />
                        <span className="font-medium">{product.name}</span>
                      </td>
                      <td className="p-3">{item.size}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          min={1}
                          defaultValue={item.quantity}
                          onChange={(e) =>
                            e.target.value === "" || e.target.value === "0"
                              ? null
                              : updateQuantity(
                                item._id,
                                item.size,
                                Number(e.target.value)
                              )
                          }
                          className="w-20 border rounded px-2 py-1 text-center"
                        />
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => updateQuantity(item._id, item.size, 0)}
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

          {/* Mobile list view */}
          <div className="md:hidden space-y-4">
            {cartData.map((item) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;
              return (
                <div
                  key={`${item._id}-${item.size}`}
                  className="flex items-center gap-4 border rounded-lg p-4 shadow-sm"
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-20 h-25 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p>Quantity: <input
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      onChange={(e) =>
                        e.target.value === "" || e.target.value === "0"
                          ? null
                          : updateQuantity(
                            item._id,
                            item.size,
                            Number(e.target.value)
                          )
                      }
                      className="w-15 border rounded px-1 text-center mt-2"
                    /></p>
                  </div>
                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  >
                    <img
                      src={assets.bin_icon}
                      alt="Remove"
                      className="w-6 cursor-pointer hover:opacity-75"
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Cart total and checkout */}
          <div className="flex justify-end mt-10">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-black text-white text-sm my-8 px-8 py-3 rounded hover:bg-gray-800 transition"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {cartData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-2xl shadow-inner">
              <ShoppingCart className="w-20 h-20 text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 text-center mb-6">
                Looks like you haven’t added anything yet.<br />
                Let’s find something you’ll love!
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-sky-600 text-white px-6 py-3 rounded-full shadow hover:bg-sky-700 transition"
              >
                🛍 Continue Shopping
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
