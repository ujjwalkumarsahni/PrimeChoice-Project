import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="w-full px-4 sm:px-8 py-3 bg-gray-50 shadow-md flex items-center gap-3">
      {/* Search Input */}
      <div className="flex flex-1 items-center bg-white border border-gray-300 rounded-full px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
        <img src={assets.search_icon} alt="search" className="w-5 h-5 opacity-70" />
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none px-2 text-sm sm:text-base"
        />
      </div>

      {/* Close Button */}
      <button
        onClick={() => setShowSearch(false)}
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 hover:bg-gray-300 rounded-full transition"
      >
        <img src={assets.cross_icon} alt="close" className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  ) : null;
};

export default Searchbar;
