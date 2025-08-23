import React from "react";
import { Title } from "../components/Title";
import { assets } from "../assets/assets.js";
import Newsbox from "../components/Newsbox.jsx";

const About = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-10 space-y-12">
      {/* Page Title */}
      <div className="text-center">
        <Title text1="ABOUT" text2="US" textSize="text-2xl" />
      </div>

      {/* About Section */}
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <img
          src={assets.about_img}
          alt="About PrimeChoice"
          className="w-full rounded-2xl shadow-lg object-cover"
        />

        <div className="space-y-5 text-gray-700">
          <p>
            PrimeChoice was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
          <p>
            Our mission at PrimeChoice is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-start">
        <p className="text-2xl font-bold text-gray-900">
          WHY <span className="text-blue-600">CHOOSE US</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition">
          <h4 className="font-bold text-lg text-gray-900">Quality Assurance</h4>
          <p className="mt-2 text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition">
          <h4 className="font-bold text-lg text-gray-900">Convenience</h4>
          <p className="mt-2 text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition">
          <h4 className="font-bold text-lg text-gray-900">
            Exceptional Customer Service
          </h4>
          <p className="mt-2 text-gray-600">
            Our team of dedicated professionals is here to assist you every
            step of the way, ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <Newsbox />
    </div>
  );
};

export default About;
