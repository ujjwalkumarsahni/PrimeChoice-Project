import React from "react";
import { Title } from "../components/Title";
import { assets } from "../assets/assets.js";
import NewsletterBox from "../components/NewsletterBox.jsx";

const Contact = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-10">
      {/* Title */}
      <div className="text-center mb-10">
        <Title text1="CONTACT" text2="US" textSize="text-2xl" />
      </div>

      {/* Layout */}
      <div className="grid lg:grid-cols-2 gap-12 items-center pb-10">
        {/* Image */}
        <img
          src={assets.contact_img}
          alt="Contact Us"
          className="w-full rounded-2xl shadow-md object-cover"
        />

        {/* Info */}
        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Our Store</h3>
            <p className="mt-2">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
            <p className="mt-2">Tel: (415) 555-0132</p>
            <p>Email: admin@primechoice.com</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Careers at PrimeChoice
            </h3>
            <p className="mt-2">
              Learn more about our teams and job openings.
            </p>
            <button className="mt-4 border border-black px-6 py-2 rounded-md text-sm font-medium hover:bg-black hover:text-white transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
