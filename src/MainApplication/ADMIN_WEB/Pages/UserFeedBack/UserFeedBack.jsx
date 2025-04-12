import React, { useState } from "react";
import {
  FaUtensils,
  FaBed,
  FaTools,
  FaSwimmingPool,
  FaSpa,
  FaConciergeBell,
  FaWifi,
  FaParking,
  FaShower,
  FaTv,
  FaTemperatureHigh,
  FaLightbulb,
  FaExclamationTriangle,
} from "react-icons/fa";

const UserFeedBack = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Mock data for feedback counts - replace with actual data from your backend
  const feedbackCounts = {
    food: { total: 12, urgent: 2 },
    rooms: { total: 8, urgent: 1 },
    maintenance: { total: 5, urgent: 3 },
    facilities: { total: 15, urgent: 0 },
    spa: { total: 7, urgent: 1 },
    concierge: { total: 3, urgent: 0 },
    wifi: { total: 9, urgent: 2 },
    parking: { total: 4, urgent: 0 },
    bathroom: { total: 6, urgent: 1 },
    entertainment: { total: 11, urgent: 0 },
    temperature: { total: 2, urgent: 1 },
    lighting: { total: 5, urgent: 0 },
  };

  const feedbackCategories = [
    {
      id: "food",
      title: "Food & Dining",
      icon: <FaUtensils />,
      description: "Share your dining experience",
      color: "bg-orange-500",
      count: feedbackCounts.food,
    },
    {
      id: "rooms",
      title: "Rooms & Accommodation",
      icon: <FaBed />,
      description: "Room comfort and cleanliness",
      color: "bg-blue-500",
      count: feedbackCounts.rooms,
    },
    {
      id: "maintenance",
      title: "Maintenance",
      icon: <FaTools />,
      description: "Report maintenance issues",
      color: "bg-green-500",
      count: feedbackCounts.maintenance,
    },
    {
      id: "facilities",
      title: "Facilities",
      icon: <FaSwimmingPool />,
      description: "Hotel facilities feedback",
      color: "bg-purple-500",
      count: feedbackCounts.facilities,
    },
    {
      id: "spa",
      title: "Spa & Wellness",
      icon: <FaSpa />,
      description: "Spa experience feedback",
      color: "bg-pink-500",
      count: feedbackCounts.spa,
    },
    {
      id: "concierge",
      title: "Concierge",
      icon: <FaConciergeBell />,
      description: "Guest services feedback",
      color: "bg-red-500",
      count: feedbackCounts.concierge,
    },
    {
      id: "wifi",
      title: "WiFi",
      icon: <FaWifi />,
      description: "Internet connectivity",
      color: "bg-indigo-500",
      count: feedbackCounts.wifi,
    },
    {
      id: "parking",
      title: "Parking",
      icon: <FaParking />,
      description: "Parking services",
      color: "bg-yellow-500",
      count: feedbackCounts.parking,
    },
    {
      id: "bathroom",
      title: "Bathroom",
      icon: <FaShower />,
      description: "Bathroom facilities",
      color: "bg-teal-500",
      count: feedbackCounts.bathroom,
    },
    {
      id: "entertainment",
      title: "Entertainment",
      icon: <FaTv />,
      description: "In-room entertainment",
      color: "bg-cyan-500",
      count: feedbackCounts.entertainment,
    },
    {
      id: "temperature",
      title: "Temperature",
      icon: <FaTemperatureHigh />,
      description: "Climate control",
      color: "bg-amber-500",
      count: feedbackCounts.temperature,
    },
    {
      id: "lighting",
      title: "Lighting",
      icon: <FaLightbulb />,
      description: "Room lighting",
      color: "bg-lime-500",
      count: feedbackCounts.lighting,
    },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onCategorySelect) {
      onCategorySelect(category.id);
    }
  };

  // Calculate total urgent feedback
  const totalUrgent = Object.values(feedbackCounts).reduce(
    (sum, item) => sum + item.urgent,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Feedback Dashboard
          </h1>
          <p className="text-gray-600">
            View and manage guest feedback by category
          </p>

          {/* Urgent Feedback Alert */}
          {totalUrgent > 0 && (
            <div className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-red-100 text-red-800">
              <FaExclamationTriangle className="mr-2" />
              <span className="font-semibold">
                {totalUrgent} urgent feedback items require attention
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedbackCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
            >
              {/* Feedback Count Badge */}
              <div className="absolute top-2 right-2 flex space-x-2">
                {category.count.urgent > 0 && (
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {category.count.urgent} urgent
                  </span>
                )}
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {category.count.total} total
                </span>
              </div>

              <div className="p-5 flex items-start space-x-4">
                <div className={`${category.color} p-3 rounded-lg text-white`}>
                  {React.cloneElement(category.icon, { className: "w-6 h-6" })}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 p-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserFeedBack;
