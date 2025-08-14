import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { assets } from "../assets/assets.js";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {setShowSearch, getCartCount} = useContext(ShopContext);
  const navigate = useNavigate()

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "COLLECTION", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 left-0 z-50 shadow-lg bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400 text-black">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">
            Prime<span className='bg-gradient-to-r from-black via-purple-500 to-sky-500 bg-clip-text text-transparent'>Choice</span><span className="text-pink-500">.</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                ` hover:text-blue-600 transition-colors ${isActive ? "font-semibold border-b-2 border-blue-600" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button onClick={() => {setShowSearch(true); navigate('collection')}} className="text-gray-700 hover:text-blue-600">
            <Search size={22} />
          </button>

          {/* Cart */}
          <Link to={'/cart'} className="relative text-gray-700 hover:text-blue-600">
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {getCartCount() || 0}
            </span>
          </Link>

          {/* Profile Dropdown */}
          <div className="group relative">
            <button
              className="text-gray-700 hover:text-blue-600">
              <User size={22} />
            </button>
            <div className="group-hover:block hidden absolute right-0 top-5 w-45 bg-white shadow-lg rounded-lg py-2">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                My Profile
              </Link>
              <Link
                to="/orders"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Orders
              </Link>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-y-0 top-16 left-0 z-50 w-[75%] sm:w-[60%] bg-gray-300 shadow-lg transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 m-1 py-3 text-gray-800 hover:bg-gray-100 transition-colors ${isActive ? "font-semibold bg-gray-100" : ""
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </NavLink>
        ))}
      </div>

    </nav>
  );
};

export default Navbar;
