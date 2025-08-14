import React from 'react';

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
                        <li><a href="#" className="hover:text-gray-900 transition">Home</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition">About us</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition">Delivery</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition">Privacy policy</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="font-semibold text-lg mb-4">GET IN TOUCH</h2>
                    <ul className="space-y-2 text-gray-600">
                        <li>+1-000-000-0000</li>
                        <li>primechoice@gmail.com</li>
                        <li>Instagram</li>
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
