import React from 'react';
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className=" text-gray-800 border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo and Description */}
                <div>
                    <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-sky-500 to-blue-500 bg-clip-text text-transparent">
                        Prime<span className='bg-gradient-to-r from-black via-purple-500 to-sky-500 bg-clip-text text-transparent'>Choice</span><span className="text-pink-500">.</span>
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Your one-stop destination for the latest fashion trends. Explore our wide range of products and enjoy a seamless shopping experience.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <h2 className="font-semibold text-lg mb-4">COMPANY</h2>
                    <ul className="space-y-2 text-gray-600">
                        <li><Link to="/" className="hover:text-gray-900 transition">Home</Link></li>
                        <li><Link to="/about" className="hover:text-gray-900 transition">About us</Link></li>
                        <li><Link to="/orders" className="hover:text-gray-900 transition">Delivery</Link></li>
                        <li><Link to="/contact" className="hover:text-gray-900 transition">Privacy policy</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="font-semibold text-lg mb-4">GET IN TOUCH</h2>
                    <ul className="space-y-2 text-gray-600">
                        <li>+91-960-848-3662</li>
                        <li>primechoice@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-200 mt-8 py-4 text-center text-gray-500 text-sm">
                Copyright 2025@ PrimeChoice - All Right Reserved.
            </div>
        </footer>
    );
};

export default Footer;
