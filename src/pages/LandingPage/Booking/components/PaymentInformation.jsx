import React from "react";
import { motion } from "framer-motion";
import { FaCreditCard, FaLock, FaArrowLeft, FaCheck } from "react-icons/fa";

const PaymentInformation = ({
  formData,
  setFormData,
  handlePrev,
  handleSubmit,
  loading,
  calculateNights,
  calculatePrice,
  formatDate,
  roomTypes,
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
          Payment Information
        </h2>

        <div className="mb-8">
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 className="text-lg font-medium text-amber-800 mb-4">
              Booking Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-amber-600">Check-in:</p>
                <p className="text-sm text-amber-600">Check-out:</p>
                <p className="text-sm text-amber-600">Nights:</p>
                <p className="text-sm text-amber-600">Guests:</p>
                <p className="text-sm text-amber-600">Room Type:</p>
                <p className="text-sm text-amber-600">Price per night:</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-amber-900">
                  {formatDate(formData.checkIn)}
                </p>
                <p className="text-sm font-medium text-amber-900">
                  {formatDate(formData.checkOut)}
                </p>
                <p className="text-sm font-medium text-amber-900">
                  {calculateNights()}
                </p>
                <p className="text-sm font-medium text-amber-900">
                  {formData.guests}
                </p>
                <p className="text-sm font-medium text-amber-900">
                  {
                    roomTypes.find((room) => room.id === formData.roomType)
                      ?.name
                  }
                </p>
                <p className="text-sm font-medium text-amber-900">
                  $
                  {
                    roomTypes.find((room) => room.id === formData.roomType)
                      ?.price
                  }
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-amber-200">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-amber-800">
                  Total Price:
                </p>
                <p className="text-xl font-bold text-amber-600">
                  ${calculatePrice()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium text-amber-800 mb-4">
            Payment Method
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  placeholder="1234 5678 9012 3456"
                />
                <FaCreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Name on Card
              </label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={(e) =>
                  setFormData({ ...formData, cardName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                placeholder="Enter name as it appears on card"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                placeholder="MM/YY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                CVV
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={(e) =>
                    setFormData({ ...formData, cvv: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  placeholder="123"
                />
                <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
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
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Complete Booking
                <FaCheck className="ml-2" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentInformation;
