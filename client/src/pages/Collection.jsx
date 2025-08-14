import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js';
import { Title } from '../components/Title.jsx';
import ProductItem from '../components/ProductItem.jsx';

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilters = () => {
    let productCopy = products.slice();

    if (category.length > 0) {
      productCopy = productCopy.filter(product => category.includes(product.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(product => subCategory.includes(product.subCategory));
    }

    setFilterProducts(productCopy);
  };

  const sortProducts = () => {
    const fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilters();
        break;
    }
  };

  useEffect(() => {
    applyFilters();
  }, [category, subCategory]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="px-4 sm:px-8 py-6">
      <div className="flex flex-col sm:flex-row gap-6">
        
        {/* Filter Section */}
        <div className="sm:w-1/4 bg-gray-50 p-4 rounded-lg shadow-sm">
          <div 
            className="flex items-center justify-between cursor-pointer sm:cursor-default"
            onClick={() => setShowFilters(!showFilters)}
          >
            <p className="font-semibold text-lg">Filters</p>
            <img 
              className={`h-3 sm:hidden transition-transform duration-300 ${showFilters ? 'rotate-90' : ''}`} 
              src={assets.dropdown_icon} 
              alt="dropdown" 
            />
          </div>

          {/* Categories */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block mt-4`}>
            <p className="font-semibold mb-2">Categories</p>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Men" onChange={toggleCategory} /> Men
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Women" onChange={toggleCategory} /> Women
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Kids" onChange={toggleCategory} /> Kids
              </label>
            </div>
          </div>

          {/* Subcategories */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block mt-6`}>
            <p className="font-semibold mb-2">Type</p>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Topwear" onChange={toggleSubCategory} /> Topwear
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Bottomwear" onChange={toggleSubCategory} /> Bottomwear
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" value="Winterwear" onChange={toggleSubCategory} /> Winterwear
              </label>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="sm:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <Title text1="ALL" text2="COLLECTION" />
            <select 
              className="border rounded-lg px-3 py-1 text-sm"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filterProducts.map((item, index) => (
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
      </div>
    </div>
  );
}

export default Collection;
