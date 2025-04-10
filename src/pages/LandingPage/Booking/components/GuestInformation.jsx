import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const GuestInformation = ({
  formData,
  setFormData,
  handleNext,
  handlePrev,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-100">
        <h2 className="text-2xl font-semibold text-amber-900 mb-8">
          Guest Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your first name"
                />
                <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your last name"
                />
                <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your email"
                />
                <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your phone number"
                />
                <FaPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-amber-800 mb-2">
            Special Requests
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={(e) =>
              setFormData({ ...formData, specialRequests: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            rows="4"
            placeholder="Any special requests or requirements?"
          />
        </div>

        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrev}
            className="flex items-center px-6 py-3 border border-amber-200 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Continue
            <FaArrowRight className="ml-2" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default GuestInformation;
