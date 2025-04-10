import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaCreditCard,
  FaCheck,
  FaQuestionCircle,
} from "react-icons/fa";

const BookingSteps = ({ step, setStep }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-100">
      <h2 className="text-xl font-semibold text-amber-900 mb-6">
        Booking Journey
      </h2>

      <div className="space-y-6">
        <motion.div
          className={`relative flex items-center p-4 rounded-lg cursor-pointer transition-all ${
            step >= 1
              ? "bg-amber-50 border border-amber-300"
              : "bg-gray-50 border border-gray-200"
          }`}
          onClick={() => step > 1 && setStep(1)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className={`absolute left-0 top-0 bottom-0 w-1 rounded-tl-lg rounded-bl-lg ${
              step >= 1 ? "bg-amber-500" : "bg-gray-300"
            }`}
          ></div>

          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
              step >= 1
                ? "bg-amber-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            <FaCalendarAlt />
          </div>

          <div>
            <h3
              className={`font-medium ${
                step >= 1 ? "text-amber-900" : "text-gray-600"
              }`}
            >
              Select Dates
            </h3>
            <p className="text-sm text-gray-500">
              Choose your stay dates and room
            </p>
          </div>

          {step > 1 && (
            <div className="absolute right-2 top-2">
              <FaCheck className="text-amber-500" />
            </div>
          )}
        </motion.div>

        <motion.div
          className={`relative flex items-center p-4 rounded-lg cursor-pointer transition-all ${
            step >= 2
              ? "bg-amber-50 border border-amber-300"
              : "bg-gray-50 border border-gray-200"
          }`}
          onClick={() => step > 2 && setStep(2)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className={`absolute left-0 top-0 bottom-0 w-1 rounded-tl-lg rounded-bl-lg ${
              step >= 2 ? "bg-amber-500" : "bg-gray-300"
            }`}
          ></div>

          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
              step >= 2
                ? "bg-amber-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            <FaUser />
          </div>

          <div>
            <h3
              className={`font-medium ${
                step >= 2 ? "text-amber-900" : "text-gray-600"
              }`}
            >
              Guest Info
            </h3>
            <p className="text-sm text-gray-500">Enter your personal details</p>
          </div>

          {step > 2 && (
            <div className="absolute right-2 top-2">
              <FaCheck className="text-amber-500" />
            </div>
          )}
        </motion.div>

        <motion.div
          className={`relative flex items-center p-4 rounded-lg cursor-pointer transition-all ${
            step >= 3
              ? "bg-amber-50 border border-amber-300"
              : "bg-gray-50 border border-gray-200"
          }`}
          onClick={() => step > 3 && setStep(3)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className={`absolute left-0 top-0 bottom-0 w-1 rounded-tl-lg rounded-bl-lg ${
              step >= 3 ? "bg-amber-500" : "bg-gray-300"
            }`}
          ></div>

          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
              step >= 3
                ? "bg-amber-500 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            <FaCreditCard />
          </div>

          <div>
            <h3
              className={`font-medium ${
                step >= 3 ? "text-amber-900" : "text-gray-600"
              }`}
            >
              Payment
            </h3>
            <p className="text-sm text-gray-500">Complete your booking</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex items-start">
          <FaQuestionCircle className="text-amber-500 mt-1 mr-3" />
          <div>
            <h3 className="font-medium text-amber-800 mb-2">Need Help?</h3>
            <p className="text-sm text-amber-600 mb-3">
              Our team is available 24/7 to assist you with your booking.
            </p>
            <div className="space-y-1">
              <p className="text-sm text-amber-600 flex items-center">
                <span className="font-medium mr-2">Phone:</span>
                +1 (555) 123-4567
              </p>
              <p className="text-sm text-amber-600 flex items-center">
                <span className="font-medium mr-2">Email:</span>
                support@kuriftu.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSteps;
