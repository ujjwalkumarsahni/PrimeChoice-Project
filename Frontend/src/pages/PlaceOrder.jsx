import React, { useContext, useState } from "react";
import { Title } from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal.jsx";
import { ShopContext } from "../context/ShopContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, backendUrl, cartItems, setCartItems, token, getCartAmount, products, delivery_fee } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const initPay = async (order) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, { headers: { token } });

          if (data.success) {
            navigate('/orders');
            setCartItems({})
            toast.success(data.message, {autoClose: 1000});
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
      theme: {
        color: "#6a11cb"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const validateForm = () => {
    if (!formData.firstName || formData.firstName.length < 3) {
      toast.error("First name must be at least 2 characters", {autoClose: 500});
      return false;
    }
    if (!formData.lastName || formData.lastName.length < 3) {
      toast.error("Last name must be at least 2 characters", {autoClose: 500});
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email", {autoClose: 500});
      return false;
    }
    if (!formData.street || formData.street.length < 3) {
      toast.error("Street must be at least 3 characters", {autoClose: 500});
      return false;
    }
    if (!formData.city || formData.city.length < 3) {
      toast.error("Enter a valid city", {autoClose: 500});
      return false;
    }
    if (!formData.state || formData.state.length < 3) {
      toast.error("Enter a valid state", {autoClose: 500});
      return false;
    }
    const zipRegex = /^[0-9]{4,6}$/;
    if (!zipRegex.test(formData.zipcode)) {
      toast.error("Enter a valid zipcode (4–6 digits)", {autoClose: 500});
      return false;
    }
    if (!formData.country || formData.country.length < 2) {
      toast.error("Enter a valid country", {autoClose: 500});
      return false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Enter a valid 10-digit phone number", {autoClose: 500});
      return false;
    }
    return true;
  };


  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onsubmitHandler = async (e) => {
    e.preventDefault()

    if (!validateForm()) return;

    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {

        // api calls for COD
        case 'cod':
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            toast.success(response.data.message, {autoClose: 1000})
            navigate('/orders')
          } else {
            toast.error(response.data.message, {autoClose: 1000})
          }
          break;
        case 'stripe':
          const responseStripe = await axios.post(`${backendUrl}/api/order/stripe`, orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;
        case 'razorpay':
          const responserazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: { token } })
          if (responserazorpay.data.success) {
            initPay(responserazorpay.data.order)
          } else {
            toast.error(responserazorpay.data.message)
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className="px-4 sm:px-8 py-8">
      <form onSubmit={onsubmitHandler} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Delivery Information */}
        <div>
          <Title text1="DELIVERY" text2="INFORMATION" textSize="text-lg md:text-xl" />
          <div on className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder="First name" className="border rounded px-3 py-2 w-full" />
              <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} type="text" placeholder="Last name" className="border rounded px-3 py-2 w-full" />
            </div>
            <input required onChange={onChangeHandler} name="email" value={formData.email} type="email" placeholder="Email address" className="border rounded px-3 py-2 w-full" />
            <input required onChange={onChangeHandler} name="street" value={formData.street} type="text" placeholder="Street" className="border rounded px-3 py-2 w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required onChange={onChangeHandler} name="city" value={formData.city} type="text" placeholder="City" className="border rounded px-3 py-2 w-full" />
              <input required onChange={onChangeHandler} name="state" value={formData.state} type="text" placeholder="State" className="border rounded px-3 py-2 w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} type="text" placeholder="Zipcode" className="border rounded px-3 py-2 w-full" />
              <input required onChange={onChangeHandler} name="country" value={formData.country} type="text" placeholder="Country" className="border rounded px-3 py-2 w-full" />
            </div>
            <input required onChange={onChangeHandler} name="phone" value={formData.phone} type="text" placeholder="Phone" className="border rounded px-3 py-2 w-full" />
          </div>
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
            type="submit"
            className=" mt-8 bg-black text-white text-sm px-8 py-3 rounded hover:bg-gray-800 transition"
          >
            PLACE ORDER
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;


