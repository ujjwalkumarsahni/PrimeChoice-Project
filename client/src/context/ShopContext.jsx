import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [products, setProducts] = useState([])
    const currency = "₹";
    const delivery_fee = 20;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [hasDiscount, setHasDiscount] = useState(false);

    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token])

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size", { autoClose: 1000 });
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
        toast.success("Item added to cart", { autoClose: 500 });

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } })

            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                try {
                    if (cartItems[items][size] > 0) {
                        totalCount += cartItems[items][size];
                    }
                } catch (error) {
                    console.error("Error calculating cart count:", error);
                }
            }
        }
        return totalCount;
    };


    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);
        toast.success("Cart updated", { autoClose: 500 });

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } })

            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserCart(token)
        }
    }, [token])

    const getCartAmount = (applyDiscount = false) => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((p) => p._id === items);
            if (!itemInfo) continue;

            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        let price = applyDiscount && hasDiscount
                            ? parseFloat(getFinalPrice(itemInfo.price))  // discounted
                            : itemInfo.price;                           // original

                        totalAmount += price * cartItems[items][item];
                    }
                } catch (error) {
                    console.error("Error calculating cart amount:", error);
                }
            }
        }
        return totalAmount;
    };


    const getProductData = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/product/list`);
            if (res.data.success) {
                setProducts(res.data.products);
            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.error("Error fetching products:", err);
            toast.error(err.message)
        }
    }

    useEffect(() => {
        getProductData()
    }, [])


    // ✅ discounted price function fix
    const getFinalPrice = (price) => {
        return hasDiscount ? (price * 0.95).toFixed(2) : price.toFixed(2);
    };

    // ✅ check discount status from backend
    useEffect(() => {
        const fetchDiscount = async () => {
            if (!token) return; // agar user login nahi hai to skip

            try {
                const res = await axios.post(
                    `${backendUrl}/api/newsletter/status`,
                    {}, // body empty rakho
                    { headers: { token } }
                );

                if (res.data.success) {
                    setHasDiscount(res.data.hasDiscount);
                } else {
                    console.log("Discount status error:", res.data.message);
                    setHasDiscount(false);
                }
            } catch (err) {
                console.error("Error fetching discount status:", err);
                setHasDiscount(false);
            }
        };

        fetchDiscount();
    }, [token]);


    const value = {
        backendUrl,
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount,
        navigate, token, setToken,
        hasDiscount, setHasDiscount,
        getFinalPrice,
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider