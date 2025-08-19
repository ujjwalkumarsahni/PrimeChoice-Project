import React, { useState } from "react";
import { Title } from "../components/Title";
import { assets } from "../assets/assets"; // razorpay & stripe images
import CartTotal from "../components/CartTotal";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  return (
    <div className="px-4 sm:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Delivery Information */}
        <div>
          <Title text1="DELIVERY" text2="INFORMATION" textSize="text-lg md:text-xl" />
          <form className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="First name" className="border rounded px-3 py-2 w-full" />
              <input type="text" placeholder="Last name" className="border rounded px-3 py-2 w-full" />
            </div>
            <input type="email" placeholder="Email address" className="border rounded px-3 py-2 w-full" />
            <input type="text" placeholder="Street" className="border rounded px-3 py-2 w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="City" className="border rounded px-3 py-2 w-full" />
              <input type="text" placeholder="State" className="border rounded px-3 py-2 w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Zipcode" className="border rounded px-3 py-2 w-full" />
              <input type="text" placeholder="Country" className="border rounded px-3 py-2 w-full" />
            </div>
            <input type="text" placeholder="Phone" className="border rounded px-3 py-2 w-full" />
          </form>
        </div>

        {/* Cart Totals + Payment */}
        <div>
          <Title text1="CART" text2="TOTALS" textSize="text-lg md:text-xl" />
          <div className="mt-6">
            <CartTotal />
          </div>

          <div className="mt-8">
            <Title text1="PAYMENT" text2="METHOD" textSize="text-lg md:text-xl" />
            <div className="mt-4 flex flex-wrap gap-4">
              <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 cursor-pointer border p-2 px-3">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
              </div>
              <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 cursor-pointer border p-2 px-3">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
              </div>
              <div onClick={() => setMethod('cod')} className="flex items-center gap-3 cursor-pointer border p-2 px-3">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-8 bg-black text-white text-sm px-8 py-3 rounded hover:bg-gray-800 transition"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;


