import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExclamationTriangle,
  FaExclamationCircle,
  FaInfoCircle,
  FaUser,
  FaCalendarAlt,
  FaChevronRight,
  FaCheck,
  FaClock,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";
import UserReplay from "../UserReplay/UserReplay";

const Maintenance = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState("urgent");
  const [confirmedItems, setConfirmedItems] = useState(new Set());

  const handleConfirm = (id, e) => {
    e.stopPropagation();
    setConfirmedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Mock data - replace with actual data from your backend
  const feedbackItems = {
    urgent: [
      {
        id: 1,
        title: "AC Not Working",
        description:
          "Room 101 AC is not cooling properly, temperature is very high",
        room: "101",
        guest: "John Doe",
        date: "2024-03-15 14:30",
        status: "pending",
        priority: "urgent",
      },
      {
        id: 2,
        title: "Water Leak",
        description: "Major water leak in bathroom, causing damage to floor",
        room: "205",
        guest: "Jane Smith",
        date: "2024-03-15 15:45",
        status: "in-progress",
        priority: "urgent",
      },
    ],
    medium: [
      {
        id: 3,
        title: "TV Remote Issue",
        description: "TV remote not working properly, needs replacement",
        room: "302",
        guest: "Mike Johnson",
        date: "2024-03-15 10:20",
        status: "pending",
        priority: "medium",
      },
    ],
    low: [
      {
        id: 4,
        title: "Light Bulb Replacement",
        description: "One light bulb in bathroom needs replacement",
        room: "401",
        guest: "Sarah Wilson",
        date: "2024-03-15 09:15",
        status: "completed",
        priority: "low",
      },
    ],
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="text-amber-500" />;
      case "in-progress":
        return <FaTools className="text-blue-500" />;
      case "completed":
        return <FaCheck className="text-emerald-500" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-gray-400";
    }
  };

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-50";
      case "medium":
        return "bg-amber-50";
      case "low":
        return "bg-blue-50";
      default:
        return "bg-gray-50";
    }
  };

  const tabs = [
    {
      id: "urgent",
      label: "Urgent",
      count: feedbackItems.urgent.length,
      icon: <FaExclamationTriangle />,
    },
    {
      id: "medium",
      label: "Medium",
      count: feedbackItems.medium.length,
      icon: <FaExclamationCircle />,
    },
    {
      id: "low",
      label: "Low",
      count: feedbackItems.low.length,
      icon: <FaInfoCircle />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">
            Maintenance Requests
          </h1>
          <p className="text-slate-600 mt-1">
            Manage and respond to maintenance issues
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-slate-200">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-all duration-300 ease-in-out ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
              <span className="ml-2 bg-slate-100 text-slate-600 rounded-full px-2 py-0.5 text-xs">
                {tab.count}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feedback List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="divide-y divide-slate-200">
                <AnimatePresence>
                  {feedbackItems[activeTab].map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedFeedback(item)}
                      className={`p-4 cursor-pointer transition-all duration-300 ease-in-out ${
                        selectedFeedback?.id === item.id
                          ? "bg-indigo-50 border-l-4 border-indigo-500"
                          : `${getPriorityBgColor(
                              item.priority
                            )} hover:bg-opacity-80 border-l-4 border-transparent`
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-slate-900 truncate">
                              {item.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(item.status)}
                              <span
                                className={`text-xs font-medium ${getPriorityColor(
                                  item.priority
                                )}`}
                              >
                                {item.priority}
                              </span>
                              <motion.button
                                onClick={(e) => handleConfirm(item.id, e)}
                                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-300 ${
                                  confirmedItems.has(item.id)
                                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <FaCheckCircle className="w-4 h-4" />
                                <span>
                                  {confirmedItems.has(item.id)
                                    ? "Confirmed"
                                    : "Confirm"}
                                </span>
                              </motion.button>
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="mt-2 flex items-center text-xs text-slate-500 space-x-4">
                            <span className="flex items-center">
                              <FaUser className="mr-1" /> {item.guest}
                            </span>
                            <span>Room {item.room}</span>
                            <span className="flex items-center">
                              <FaCalendarAlt className="mr-1" /> {item.date}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <FaChevronRight className="h-5 w-5 text-slate-400" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-1">
            {selectedFeedback ? (
              <UserReplay feedback={selectedFeedback} />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-6 text-center"
              >
                <div className="text-slate-400 mb-4">
                  <FaTools className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">
                  Select a Request
                </h3>
                <p className="text-sm text-slate-500">
                  Choose a maintenance request from the list to view details and
                  respond
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
