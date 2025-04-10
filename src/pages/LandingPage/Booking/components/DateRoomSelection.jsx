import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaBed, FaUsers, FaArrowRight } from "react-icons/fa";

const DateRoomSelection = ({
  formData,
  setFormData,
  roomTypes,
  handleNext,
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
          Select Your Stay
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Check-in Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={(e) =>
                    setFormData({ ...formData, checkIn: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Check-out Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={(e) =>
                    setFormData({ ...formData, checkOut: e.target.value })
                  }
                  min={formData.checkIn}
                  className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-800 mb-2">
                Number of Guests
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      guests: Math.max(1, formData.guests - 1),
                    })
                  }
                  className="p-2 rounded-lg border border-amber-200 hover:bg-amber-50 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium text-amber-900">
                  {formData.guests}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      guests: Math.min(10, formData.guests + 1),
                    })
                  }
                  className="p-2 rounded-lg border border-amber-200 hover:bg-amber-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium text-amber-800 mb-4">
            Select Room Type
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roomTypes.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all ${
                  formData.roomType === room.id
                    ? "ring-2 ring-amber-500"
                    : "hover:ring-1 hover:ring-amber-300"
                }`}
                onClick={() => setFormData({ ...formData, roomType: room.id })}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-white font-medium mb-1">{room.name}</h4>
                  <div className="flex items-center justify-between text-white/80 text-sm">
                    <span className="flex items-center">
                      <FaBed className="mr-1" /> {room.capacity} guests
                    </span>
                    <span>${room.price}/night</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
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

export default DateRoomSelection;
