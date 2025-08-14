import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Title } from "./Title.jsx";
import ProductItem from "./ProductItem.jsx"; // Make sure to import this

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <section className="mt-12 px-4 sm:px-8">
      {/* Title */}
      <div className="text-center mb-8">
        <Title text="Related Products" />
        <p className="text-gray-600 text-sm sm:text-base">
          You might also like these
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

      {/* Fallback if no related products */}
      {related.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No related products found.
        </p>
      )}
    </section>
  );
};

export default RelatedProduct;
