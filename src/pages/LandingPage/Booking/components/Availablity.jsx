import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRegCalendarAlt,
  FaChevronRight,
  FaGlassMartini,
  FaSpa,
  FaSwimmingPool,
  FaUserFriends,
  FaTimes,
  FaCheck,
  FaMoon,
  FaSun,
  FaRegClock,
} from "react-icons/fa";

const Availability = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomPreference, setRoomPreference] = useState("any");
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Mock data for availability and pricing
  const availabilityData = {
    "2024-03-15": {
      available: true,
      price: 250,
      isWeekend: true,
      events: ["Wine Tasting"],
    },
    "2024-03-16": {
      available: true,
      price: 280,
      isWeekend: true,
      events: ["Pool Party"],
    },
    "2024-03-17": { available: false, price: 200, isWeekend: true },
    "2024-03-20": {
      available: true,
      price: 180,
      isWeekend: false,
      discount: true,
    },
    "2024-03-21": {
      available: true,
      price: 190,
      isWeekend: false,
      discount: true,
    },
  };

  // Quick selection options
  const quickSelections = [
    { label: "This Weekend", days: 2, startDay: "friday" },
    { label: "Next Week", days: 7, startDay: "monday" },
    { label: "Long Weekend", days: 3, startDay: "friday" },
  ];

  // Function to get next occurrence of a day
  const getNextDayOccurrence = (dayName, daysToAdd = 0) => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = new Date();
    const targetDay = days.indexOf(dayName.toLowerCase());
    const currentDay = today.getDay();
    let daysUntilTarget = targetDay - currentDay;
    if (daysUntilTarget <= 0) daysUntilTarget += 7;

    const result = new Date(today);
    result.setDate(today.getDate() + daysUntilTarget);
    if (daysToAdd) result.setDate(result.getDate() + daysToAdd);
    return result;
  };

  // Handle quick selection
  const handleQuickSelect = (selection) => {
    const start = getNextDayOccurrence(selection.startDay);
    const end = new Date(start);
    end.setDate(start.getDate() + selection.days - 1);
    setDateRange([start, end]);
  };

  // Calculate total nights and price
  const calculateSummary = () => {
    if (!startDate || !endDate) return null;

    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const basePrice = 200; // Default price if no specific price is set
    let totalPrice = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0];
      const dayData = availabilityData[dateString];
      totalPrice += dayData ? dayData.price : basePrice;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return { nights, totalPrice };
  };

  // Enhanced date picker styles
  const datePickerCustomStyles = `
    .react-datepicker-wrapper {
      width: 100%;
    }
    .react-datepicker-popper {
      position: static !important;
      transform: none !important;
    }
    .react-datepicker {
      font-family: 'Inter', sans-serif;
      border: none;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      padding: 16px;
      background: white;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }
    .react-datepicker__header {
      background: white;
      border: none;
      padding-top: 0;
    }
    .react-datepicker__month-container {
      float: none;
      display: inline-block;
      width: 50%;
      padding: 0 8px;
      box-sizing: border-box;
    }
    .react-datepicker__month {
      margin: 0.5rem 0;
    }
    .react-datepicker__day {
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      margin: 0.1rem;
      border-radius: 50%;
      color: #4B5563;
      font-weight: 500;
      transition: all 0.2s ease;
      position: relative;
      box-sizing: border-box;
      font-size: 0.875rem;
    }
    .react-datepicker__day:hover {
      background: #FEF3C7;
      color: #92400E;
      transform: scale(1.05);
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--in-range {
      background: linear-gradient(135deg, #F59E0B, #D97706) !important;
      color: white !important;
      font-weight: 600;
    }
    .react-datepicker__day--keyboard-selected {
      background: #FCD34D;
      color: #92400E;
    }
    .react-datepicker__day--in-selecting-range {
      background: #FEF3C7;
      color: #92400E;
    }
    .react-datepicker__day--disabled {
      color: #E5E7EB;
      text-decoration: line-through;
    }
    .react-datepicker__current-month {
      font-size: 1rem;
      color: #1F2937;
      font-weight: 600;
      margin-bottom: 0.75rem;
      text-align: center;
    }
    .react-datepicker__day-name {
      color: #9CA3AF;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      margin: 0.1rem;
      font-weight: 500;
      text-align: center;
      box-sizing: border-box;
      font-size: 0.75rem;
    }
    .react-datepicker__navigation {
      top: 1rem;
    }
    .react-datepicker__navigation-icon::before {
      border-color: #F59E0B;
      width: 6px;
      height: 6px;
    }
    .react-datepicker__day-names {
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding: 0;
    }
    .react-datepicker__week {
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding: 0;
    }
    .react-datepicker__month {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
  `;

  const roomTypes = [
    {
      id: "deluxe",
      name: "Deluxe Suite",
      description: "Spacious room with city view",
      price: "300",
      amenities: ["King Bed", "City View", "Mini Bar"],
    },
    {
      id: "executive",
      name: "Executive Suite",
      description: "Premium suite with ocean view",
      price: "500",
      amenities: ["King Bed", "Ocean View", "Lounge Access"],
    },
    {
      id: "presidential",
      name: "Presidential Suite",
      description: "Ultimate luxury experience",
      price: "1000",
      amenities: ["Master Suite", "Private Pool", "Butler Service"],
    },
  ];

  const Counter = ({ value, onChange, label, icon: Icon }) => (
    <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-lg p-3 hover:bg-white/60 transition-all duration-300">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="text-amber-500" />}
        <span className="text-gray-700">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-amber-50 border border-gray-200 hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
        >
          -
        </motion.button>
        <span className="w-8 text-center font-medium">{value}</span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-amber-50 border border-gray-200 hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
        >
          +
        </motion.button>
      </div>
    </div>
  );

  // Format date range for display
  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    } else if (startDate) {
      return `${startDate.toLocaleDateString()} - Select end date`;
    }
    return "Select dates";
  };

  // Custom day content renderer
  const renderDayContents = (day, date) => {
    const dateString = date.toISOString().split("T")[0];
    const dayData = availabilityData[dateString];

    return (
      <div className="relative flex flex-col items-center justify-center ">
        <span className="text-xs">{day}</span>
        {dayData && (
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-[10px] whitespace-nowrap">
            {dayData.price && (
              <span
                className={`block ${
                  dayData.discount ? "text-green-500" : "text-gray-500"
                }`}
              >
                ${dayData.price}
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  // Function to get available dates
  const getAvailableDates = () => {
    const availableDates = Object.entries(availabilityData)
      .filter(([_, data]) => data.available)
      .map(([date, data]) => ({
        date: new Date(date),
        price: data.price,
        isWeekend: data.isWeekend,
        discount: data.discount,
        events: data.events || [],
      }))
      .sort((a, b) => a.date - b.date);

    return availableDates;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
      <style>{datePickerCustomStyles}</style>

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Hotel Room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4"
            >
              Book Your Luxury Stay
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto"
            >
              Experience unparalleled comfort and elegance in our premium
              accommodations
            </motion.p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 -mt-32 relative z-10">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Date Selection */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Your Dates
                  </label>
                  <button
                    onClick={() => setShowDatePicker(true)}
                    className="w-full p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 hover:border-amber-500 focus:border-amber-500 focus:ring-0 transition-all duration-300 cursor-pointer text-left relative"
                  >
                    <span className="text-gray-600">{formatDateRange()}</span>
                    <FaRegCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500" />
                  </button>
                </div>

                <div className="space-y-4 mt-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Guest Information
                  </label>
                  <Counter
                    value={adults}
                    onChange={setAdults}
                    label="Adults"
                    icon={FaUserFriends}
                  />
                  <Counter
                    value={children}
                    onChange={setChildren}
                    label="Children"
                    icon={FaUserFriends}
                  />
                </div>
              </div>
            </div>

            {/* Middle Column - Room Selection */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
                <label className="block text-sm font-medium text-gray-700">
                  Select Your Room
                </label>
                <div className="grid gap-4 mt-4">
                  {roomTypes.map((room) => (
                    <motion.button
                      key={room.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setRoomPreference(room.id);
                        setShowRoomInfo(true);
                      }}
                      className={`p-4 rounded-lg border text-left transition-all duration-300 bg-white/50 backdrop-blur-sm hover:bg-white/60 ${
                        roomPreference === room.id
                          ? "border-amber-500 bg-white/60"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            {room.name}
                          </p>
                          <p className="text-gray-500 text-sm mt-1">
                            {room.description}
                          </p>
                        </div>
                        <p className="text-amber-600 font-medium">
                          ${room.price}/night
                        </p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {room.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Features and Booking */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/60 transition-all duration-300 cursor-pointer group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-amber-500 mb-2"
                    >
                      <FaGlassMartini className="mx-auto text-xl" />
                    </motion.div>
                    <div className="text-sm text-gray-600 group-hover:text-amber-700">
                      Premium Bar
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/60 transition-all duration-300 cursor-pointer group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-amber-500 mb-2"
                    >
                      <FaSpa className="mx-auto text-xl" />
                    </motion.div>
                    <div className="text-sm text-gray-600 group-hover:text-amber-700">
                      Spa Access
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/60 transition-all duration-300 cursor-pointer group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-amber-500 mb-2"
                    >
                      <FaSwimmingPool className="mx-auto text-xl" />
                    </motion.div>
                    <div className="text-sm text-gray-600 group-hover:text-amber-700">
                      Pool Access
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-lg hover:bg-white/60 transition-all duration-300 cursor-pointer group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-amber-500 mb-2"
                    >
                      <FaGlassMartini className="mx-auto text-xl" />
                    </motion.div>
                    <div className="text-sm text-gray-600 group-hover:text-amber-700">
                      Room Service
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 px-4 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-all duration-300 mt-6"
                  onClick={() => {
                    console.log("Booking:", {
                      dateRange,
                      adults,
                      children,
                      roomPreference,
                    });
                  }}
                >
                  Check Availability
                  <FaChevronRight className="text-sm" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Available Dates Section */}
        <div className="mt-16 max-w-4xl mx-auto px-4 sm:px-6">
          <h3 className="text-xl font-serif text-gray-900 mb-6">
            Available Dates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getAvailableDates().map((dateInfo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200 hover:border-amber-500 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {dateInfo.date.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {dateInfo.isWeekend ? "Weekend Rate" : "Weekday Rate"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        dateInfo.discount ? "text-green-600" : "text-amber-600"
                      }`}
                    >
                      ${dateInfo.price}
                    </p>
                    {dateInfo.discount && (
                      <p className="text-xs text-green-500">Special Offer</p>
                    )}
                  </div>
                </div>
                {dateInfo.events.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">Special Events:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {dateInfo.events.map((event, eventIndex) => (
                        <span
                          key={eventIndex}
                          className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Date Picker Overlay */}
      <AnimatePresence>
        {showDatePicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDatePicker(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDatePicker(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="flex gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-gray-900 mb-4">
                    Select Your Dates
                  </h3>

                  {/* Quick Selection Options */}
                  <div className="flex gap-2 mb-4">
                    {quickSelections.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickSelect(option)}
                        className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs transition-colors"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  <DatePicker
                    selected={startDate}
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    monthsShown={2}
                    renderDayContents={renderDayContents}
                    minDate={new Date()}
                    excludeDates={Object.entries(availabilityData)
                      .filter(([_, data]) => !data.available)
                      .map(([date]) => new Date(date))}
                  />

                  {/* Legend */}
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-gray-600">Selected Dates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-600">Special Offer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                      <span className="text-gray-600">Unavailable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaSun className="text-amber-500" />
                      <span className="text-gray-600">Weekend Rates</span>
                    </div>
                  </div>
                </div>

                {/* Summary Panel */}
                <div className="w-64 border-l border-gray-100 pl-6">
                  <h4 className="text-base font-medium text-gray-900 mb-3">
                    Booking Summary
                  </h4>

                  {calculateSummary() ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <FaRegClock className="text-amber-500 text-sm" />
                        <span>{calculateSummary().nights} nights</span>
                      </div>

                      <div className="py-3 border-y border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-600 text-sm">
                            Base rate
                          </span>
                          <span className="font-medium text-sm">
                            ${calculateSummary().totalPrice}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500">Taxes & fees</span>
                          <span className="text-gray-500">
                            +${Math.round(calculateSummary().totalPrice * 0.1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center font-medium text-sm">
                        <span>Total</span>
                        <span className="text-amber-600">
                          $
                          {calculateSummary().totalPrice +
                            Math.round(calculateSummary().totalPrice * 0.1)}
                        </span>
                      </div>

                      <button
                        onClick={() => setShowDatePicker(false)}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-1.5 rounded-lg mt-3 flex items-center justify-center gap-2 text-sm"
                      >
                        Confirm Dates <FaCheck className="text-xs" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-xs">
                      Select dates to see booking summary
                    </div>
                  )}

                  {/* Special Offers */}
                  <div className="mt-6">
                    <h5 className="font-medium text-gray-900 mb-2 text-sm">
                      Special Offers
                    </h5>
                    <div className="space-y-2">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <p className="text-green-800 text-xs font-medium">
                          Midweek Special
                        </p>
                        <p className="text-green-600 text-[10px]">
                          Save 20% on weekday stays
                        </p>
                      </div>
                      <div className="p-2 bg-amber-50 rounded-lg">
                        <p className="text-amber-800 text-xs font-medium">
                          Extended Stay
                        </p>
                        <p className="text-amber-600 text-[10px]">
                          10% off on 5+ nights
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Availability;
