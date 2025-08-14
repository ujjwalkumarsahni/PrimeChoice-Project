import React from 'react';
import { assets } from '../assets/assets.js';
import { Title } from './Title.jsx';

const OurPolicy = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
        <Title text1="OUR" text2="POLICIES"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Exchange Policy */}
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
          <img src={assets.exchange_icon} alt="Exchange Policy" className="w-20 h-20 mb-4" />
          <p className="font-semibold text-lg mb-2">Easy Exchange</p>
          <p className="text-gray-500">Hassle-free exchange within 30 days of purchase.</p>
        </div>

        {/* Quality Policy */}
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
          <img src={assets.quality_icon} alt="Quality Policy" className="w-20 h-20 mb-4" />
          <p className="font-semibold text-lg mb-2">Premium Quality</p>
          <p className="text-gray-500">All our products go through strict quality checks.</p>
        </div>

        {/* Support Policy */}
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition">
          <img src={assets.support_img} alt="Support Policy" className="w-20 h-20 mb-4" />
          <p className="font-semibold text-lg mb-2">24/7 Support</p>
          <p className="text-gray-500">Our support team is always ready to assist you.</p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
