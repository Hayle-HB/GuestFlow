import React from "react";
import { motion } from "framer-motion";
import {
  FaSwimmingPool,
  FaSpa,
  FaUtensils,
  FaWifi,
  FaConciergeBell,
  FaShuttleVan,
} from "react-icons/fa";
import kuriftuWater from "../../../assets/images/Hotel/kuriftuWater.webp";
import kuriftuadarash from "../../../assets/images/Hotel/kuriftuadarash.webp";
import kurifituhayk from "../../../assets/images/Hotel/kurifituhayk.webp";

const features = [
  {
    icon: <FaSwimmingPool className="h-8 w-8" />,
    title: "Infinity Pool",
    description:
      "Swim in our stunning infinity pool overlooking the lake while enjoying panoramic views of the surrounding landscape.",
    image: kuriftuWater,
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <FaSpa className="h-8 w-8" />,
    title: "Luxury Spa",
    description:
      "Rejuvenate your body and mind with our signature spa treatments and traditional Ethiopian massage therapies.",
    image: kuriftuadarash,
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <FaUtensils className="h-8 w-8" />,
    title: "Fine Dining",
    description:
      "Experience exquisite local and international cuisine at our award-winning restaurants with lake views.",
    image: kurifituhayk,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: <FaWifi className="h-8 w-8" />,
    title: "Premium Amenities",
    description:
      "Enjoy high-speed WiFi, 24-hour room service, and luxury toiletries in all our rooms and suites.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: <FaConciergeBell className="h-8 w-8" />,
    title: "Concierge Service",
    description:
      "Our dedicated concierge team is available 24/7 to assist with any request, from reservations to special arrangements.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: <FaShuttleVan className="h-8 w-8" />,
    title: "Airport Transfer",
    description:
      "Complimentary airport transfers and shuttle services to nearby attractions for a seamless travel experience.",
    color: "from-indigo-500 to-indigo-600",
  },
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {feature.image && (
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      <div className="p-8 relative">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
        >
          {feature.icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/0 to-white/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Luxury Amenities & Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600"
          >
            Experience unparalleled luxury with our world-class amenities and
            exceptional service designed to make your stay truly memorable.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
