import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMicrophoneAlt,
  FaConciergeBell,
  FaSpa,
  FaSwimmingPool,
  FaUtensils,
  FaBed,
  FaWifi,
  FaParking,
  FaHeadset,
  FaGift,
} from "react-icons/fa";

const BellowHome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaMicrophoneAlt className="w-8 h-8 text-amber-500" />,
      title: "Voice-Activated Services",
      description:
        "Experience seamless service through our AI-powered voice assistant. Control room settings, request services, and get instant responses with just your voice.",
    },
    {
      icon: <FaConciergeBell className="w-8 h-8 text-amber-500" />,
      title: "Smart Concierge",
      description:
        "Our AI concierge is available 24/7 to assist with reservations, recommendations, and personalized services. Just speak your needs.",
    },
    {
      icon: <FaSpa className="w-8 h-8 text-amber-500" />,
      title: "Luxury Spa & Wellness",
      description:
        "Indulge in our world-class spa treatments. Book your session through voice command or our app for a seamless experience.",
    },
    {
      icon: <FaUtensils className="w-8 h-8 text-amber-500" />,
      title: "Gourmet Dining",
      description:
        "Experience culinary excellence with our award-winning restaurants. Use voice commands to order room service or make dining reservations.",
    },
  ];

  const amenities = [
    {
      icon: <FaBed className="w-8 h-8 text-amber-500" />,
      title: "Luxury Accommodations",
      description:
        "Smart rooms with voice-controlled lighting, temperature, and entertainment systems. Experience ultimate comfort at your command.",
    },
    {
      icon: <FaSwimmingPool className="w-8 h-8 text-amber-500" />,
      title: "Infinity Pool & Recreation",
      description:
        "Enjoy our stunning infinity pool with panoramic views. Voice-activated poolside service available for your convenience.",
    },
    {
      icon: <FaWifi className="w-8 h-8 text-amber-500" />,
      title: "Smart Connectivity",
      description:
        "High-speed WiFi and smart room integration. Control your entire stay experience through voice commands or our mobile app.",
    },
    {
      icon: <FaParking className="w-8 h-8 text-amber-500" />,
      title: "Valet & Transportation",
      description:
        "Complimentary valet service and transportation arrangements. Book through voice command or our concierge service.",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-light text-gray-900 dark:text-white text-center mb-12">
            Experience Smart Luxury
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-light text-gray-900 dark:text-white text-center mb-12">
            Premium Amenities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{amenity.icon}</div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    {amenity.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {amenity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice Interaction Demo */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-light text-gray-900 dark:text-white mb-8">
            Experience Voice-Activated Luxury
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/voice-chat")}
              className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Try Voice Assistant
            </button>
            <button
              onClick={() => navigate("/give-feedback")}
              className="px-8 py-3 bg-white text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
            >
              Share Your Experience
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BellowHome;
