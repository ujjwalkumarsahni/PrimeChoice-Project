import React, { useContext, useEffect, useState } from "react";
import { Title } from "./Title.jsx";
import { ShopContext } from "../context/ShopContext.jsx";
import ProductItem from "./ProductItem.jsx";
import ShimmerCard from "./ShimmerCard.jsx";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const bestSellerProducts = products.filter((item) => item.bestseller);
      setBestSellers(bestSellerProducts.slice(0, 5));
      setLoading(false);
    }
  }, [products]);

  return (
    <section className="relative overflow-hidden pb-16">
      <div className="relative z-10 container mx-auto px-4">
        <Title text1="BEST" text2="SELLER" textSize={"text-2xl md:text-3xl"} />
        <p className="max-w-3xl mx-auto text-center mb-10 text-gray-700 text-lg md:text-xl">
          Explore our best-selling products! These items are loved by our customers for their
          quality and style
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {loading
            ? // show shimmer while loading
              Array.from({ length: 5 }).map((_, idx) => <ShimmerCard key={idx} />)
            : // show products when loaded
              bestSellers.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
