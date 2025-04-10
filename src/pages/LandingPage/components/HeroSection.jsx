import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import one from "../../../assets/images/Hotel/kurifituhayk.webp";
import two from "../../../assets/images/Hotel/kuriftuadarash.webp";
import three from "../../../assets/images/Hotel/kurifuwater.webp";
import four from "../../../assets/images/Hotel/kurifuadarash.webp";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt,
} from "react-icons/fa";

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [one, two, three, four];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImage ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={src}
              alt={`Kuriftu Resort ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium"
            >
              Welcome to Luxury Living
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Experience
              <span className="block text-yellow-400">Unparalleled Luxury</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Discover the perfect blend of traditional Ethiopian hospitality
              and modern luxury at Kuriftu Resorts. Your journey to relaxation
              begins here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/book-now"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-900 bg-yellow-400 rounded-md hover:bg-yellow-500 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Book Your Stay
                <FaArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/resorts"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-md hover:bg-white/10 transition-colors duration-300"
              >
                Explore Resorts
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Booking Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Book Your Luxury Stay
              </h3>

              <div className="space-y-4">
                <div className="flex items-center bg-white rounded-md border border-gray-200 p-3">
                  <FaMapMarkerAlt className="text-blue-600 h-5 w-5 mr-3" />
                  <select className="w-full bg-transparent border-none focus:ring-0 text-gray-700">
                    <option>Select Resort</option>
                    <option>Kuriftu Lake Resort & Spa</option>
                    <option>Kuriftu Spa Resort</option>
                    <option>Kuriftu Safari Lodge</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center bg-white rounded-md border border-gray-200 p-3">
                    <FaCalendarAlt className="text-blue-600 h-5 w-5 mr-3" />
                    <input
                      type="date"
                      className="w-full bg-transparent border-none focus:ring-0 text-gray-700"
                      placeholder="Check-in"
                    />
                  </div>
                  <div className="flex items-center bg-white rounded-md border border-gray-200 p-3">
                    <FaCalendarAlt className="text-blue-600 h-5 w-5 mr-3" />
                    <input
                      type="date"
                      className="w-full bg-transparent border-none focus:ring-0 text-gray-700"
                      placeholder="Check-out"
                    />
                  </div>
                </div>

                <div className="flex items-center bg-white rounded-md border border-gray-200 p-3">
                  <FaUsers className="text-blue-600 h-5 w-5 mr-3" />
                  <select className="w-full bg-transparent border-none focus:ring-0 text-gray-700">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5+ Guests</option>
                  </select>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-300">
                  Check Availability
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Best rate guarantee • Free cancellation • 24/7 support
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Luxury Award
                  </p>
                  <p className="text-xs text-gray-500">2023 Winner</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    5-Star Rating
                  </p>
                  <p className="text-xs text-gray-500">Luxury Resorts</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
