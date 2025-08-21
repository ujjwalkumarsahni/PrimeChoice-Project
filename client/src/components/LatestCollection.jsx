import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Title } from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";
import ShimmerCard from "./ShimmerCard.jsx";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestCollection, setLatestCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLatestCollection(products.slice(0, 10).reverse());
      setLoading(false);
    }
  }, [products]);

  return (
    <section className="relative overflow-hidden pb-16">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <Title text1="Latest" text2="Collection" textSize={"text-2xl md:text-3xl"} />
        <p className="max-w-3xl mx-auto text-center mb-10 text-gray-700 text-lg md:text-xl">
          Discover our newest arrivals! Trendy, high-quality products curated just for you.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {loading
            ? // Show shimmer loader while products load
              Array.from({ length: 10 }).map((_, idx) => <ShimmerCard key={idx} />)
            : // Show products when loaded
              latestCollection.map((item, index) => (
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

export default LatestCollection;
