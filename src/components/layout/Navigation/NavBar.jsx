import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSearch,
  FaSwimmingPool,
  FaSpa,
  FaUtensils,
  FaConciergeBell,
  FaShuttleVan,
  FaUserFriends,
  FaGift,
  FaHeadset,
  FaArrowRight,
  FaGlobe,
} from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const amenities = [
    {
      icon: <FaSwimmingPool className="w-4 h-4" />,
      title: "Infinity Pool",
      description: "Stunning lake views",
    },
    {
      icon: <FaSpa className="w-4 h-4" />,
      title: "Luxury Spa",
      description: "Traditional treatments",
    },
    {
      icon: <FaUtensils className="w-4 h-4" />,
      title: "Fine Dining",
      description: "Award-winning cuisine",
    },
    {
      icon: <FaConciergeBell className="w-4 h-4" />,
      title: "Concierge",
      description: "24/7 service",
    },
  ];

  const navItems = [
    {
      name: "Resorts",
      path: "/resorts",
      icon: <FaGlobe className="w-4 h-4" />,
      dropdown: [
        { name: "Kuriftu Lake Resort", path: "/resorts/lake" },
        { name: "Kuriftu Spa Resort", path: "/resorts/spa" },
        { name: "Kuriftu Safari Lodge", path: "/resorts/safari" },
        { name: "All Locations", path: "/resorts/all" },
      ],
    },
    {
      name: "Amenities",
      path: "/amenities",
      icon: <FaSwimmingPool className="w-4 h-4" />,
      dropdown: amenities,
    },
    {
      name: "Experiences",
      path: "/experiences",
      icon: <FaUserFriends className="w-4 h-4" />,
      dropdown: [
        { name: "Spa & Wellness", path: "/experiences/spa" },
        { name: "Dining", path: "/experiences/dining" },
        { name: "Activities", path: "/experiences/activities" },
        { name: "Events", path: "/experiences/events" },
      ],
    },
    {
      name: "Services",
      path: "/services",
      icon: <FaConciergeBell className="w-4 h-4" />,
      dropdown: [
        { name: "Airport Transfer", path: "/services/transfer" },
        { name: "Room Service", path: "/services/room-service" },
        { name: "Housekeeping", path: "/services/housekeeping" },
        { name: "Special Requests", path: "/services/special-requests" },
      ],
    },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg backdrop-blur-md bg-opacity-90"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xl">
                KT
              </div>
              <span
                className={`ml-3 text-xl font-bold ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Kuriftu Twin
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative dropdown-container group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <button
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path ||
                      activeDropdown === item.name
                        ? "text-yellow-600"
                        : isScrolled
                        ? "text-gray-700 hover:text-yellow-600"
                        : "text-white hover:text-yellow-300"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                    <FaChevronDown
                      className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                        activeDropdown === item.name
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "text-yellow-600"
                        : isScrolled
                        ? "text-gray-700 hover:text-yellow-600"
                        : "text-white hover:text-yellow-300"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div
                    className={`absolute left-0 z-10 mt-1 w-64 origin-top-left rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out transform ${
                      activeDropdown === item.name
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {item.name === "Amenities" ? (
                      <div className="px-4 py-2">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">
                          Luxury Amenities
                        </h3>
                        <div className="space-y-3">
                          {item.dropdown.map((amenity) => (
                            <div
                              key={amenity.title}
                              className="flex items-start group/item hover:bg-yellow-50 rounded-md p-2 transition-colors"
                            >
                              <div className="flex-shrink-0 h-8 w-8 rounded-md bg-yellow-100 flex items-center justify-center text-yellow-600 group-hover/item:bg-yellow-200 transition-colors">
                                {amenity.icon}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 group-hover/item:text-yellow-600 transition-colors">
                                  {amenity.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {amenity.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className={`block px-4 py-2 text-sm ${
                            location.pathname === dropdownItem.path
                              ? "text-yellow-600 bg-yellow-50 font-medium"
                              : "text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
                          }`}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className={`p-2 rounded-full transition-colors ${
                isScrolled
                  ? "text-gray-600 hover:text-yellow-600"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              <FaSearch className="w-5 h-5" />
            </button>
            <Link
              to="/book-now"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors ${
                isScrolled
                  ? "text-white bg-yellow-600 hover:bg-yellow-700"
                  : "text-yellow-600 bg-white hover:bg-yellow-50"
              }`}
            >
              Book Now
            </Link>
            <Link
              to="/contact"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors ${
                isScrolled
                  ? "text-yellow-600 bg-white border-yellow-600 hover:bg-yellow-50"
                  : "text-white bg-yellow-600 hover:bg-yellow-700"
              }`}
            >
              Contact Us
              <FaArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled
                  ? "text-gray-600 hover:text-yellow-600"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`flex items-center justify-between w-full px-3 py-2 text-base font-medium rounded-md ${
                          location.pathname === item.path ||
                          activeDropdown === item.name
                            ? "text-yellow-600"
                            : "text-gray-700 hover:text-yellow-600"
                        }`}
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-2">{item.name}</span>
                        </div>
                        <FaChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.name
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.name === "Amenities" ? (
                            <div className="space-y-3 py-2">
                              {item.dropdown.map((amenity) => (
                                <div
                                  key={amenity.title}
                                  className="flex items-start px-3"
                                >
                                  <div className="flex-shrink-0 h-8 w-8 rounded-md bg-yellow-100 flex items-center justify-center text-yellow-600">
                                    {amenity.icon}
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">
                                      {amenity.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {amenity.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.path}
                                className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                                  location.pathname === dropdownItem.path ||
                                  activeDropdown === dropdownItem.name
                                    ? "text-yellow-600"
                                    : "text-gray-700 hover:text-yellow-600"
                                }`}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  setIsOpen(false);
                                }}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 text-base font-medium rounded-md ${
                        location.pathname === item.path ||
                        activeDropdown === item.name
                          ? "text-yellow-600"
                          : "text-gray-700 hover:text-yellow-600"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}

              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex flex-col space-y-3 px-3">
                  <Link
                    to="/book-now"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Now
                  </Link>
                  <Link
                    to="/contact"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-yellow-600 bg-white border-yellow-600 hover:bg-yellow-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                    <FaArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
