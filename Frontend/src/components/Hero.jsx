import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
    return (
        <section className="relative overflow-hidden px-10 pt-10 pb-20">
            {/* Background with gradient + clip-path */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-sky-200 animate-gradient clip-bottom"></div>

            <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row-reverse items-center relative z-10">
                {/* Left Content */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                        Welcome to <span className="text-gray-900">PrimeChoice</span>
                    </h1>
                    <p className="mt-4 text-gray-700 text-lg md:text-xl">
                        Discover our exclusive collection and shop the latest trends today.
                    </p>
                    <Link
                        to="/collection"
                        className="inline-block mt-4 px-6 py-3 text-white text-sm md:text-md lg:text-lg font-semibold rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors animate-gradient"
                    >
                        Shop Now
                    </Link>
                </div>

                {/* Right Image */}
                <div className="flex-1 mb-20 md:mb-0">
                    <img
                        src={assets.hero_image}
                        alt="PrimeChoice Hero"
                        className="w-full rounded-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
