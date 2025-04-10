import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaCheck } from "react-icons/fa";
import axios from "axios";
import DateRoomSelection from "./components/DateRoomSelection";
import GuestInformation from "./components/GuestInformation";
import PaymentInformation from "./components/PaymentInformation";
import BookingSteps from "./components/BookingSteps";
import image1 from "../../../assets/images/Hotel/Room/double-bed-with-cushions.jpg";
import image2 from "../../../assets/images/Hotel/Room/luxury-bedroom-suite-resort-high-rise-hotel-with-working-table.jpg";
import image3 from "../../../assets/images/Hotel/Room/tidy-room-with-big-mirror.jpg";

const Booking = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image1, image2, image3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    checkIn: new Date().toISOString().split("T")[0],
    checkOut: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    guests: 1,
    roomType: "standard",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "credit",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const roomTypes = [
    {
      id: "standard",
      name: "Standard Room",
      description: "Comfortable room with essential amenities",
      price: 150,
      capacity: 2,
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: "deluxe",
      name: "Deluxe Room",
      description: "Spacious room with premium amenities and city view",
      price: 250,
      capacity: 3,
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: "suite",
      name: "Executive Suite",
      description: "Luxury suite with separate living area and panoramic views",
      price: 400,
      capacity: 4,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  const calculateNights = () => {
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculatePrice = () => {
    const nights = calculateNights();
    const room = roomTypes.find((room) => room.id === formData.roomType);
    return nights * room.price;
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.checkIn || !formData.checkOut) {
        setError("Please select both check-in and check-out dates");
        return false;
      }

      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);

      if (checkIn >= checkOut) {
        setError("Check-out date must be after check-in date");
        return false;
      }

      if (formData.guests < 1) {
        setError("Please select at least one guest");
        return false;
      }
    } else if (step === 2) {
      if (!formData.firstName || !formData.lastName) {
        setError("Please enter your full name");
        return false;
      }
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        setError("Please enter a valid email address");
        return false;
      }
      if (!formData.phone) {
        setError("Please enter your phone number");
        return false;
      }
    } else if (step === 3) {
      if (!formData.cardNumber || formData.cardNumber.length < 16) {
        setError("Please enter a valid card number");
        return false;
      }
      if (!formData.cardName) {
        setError("Please enter the name on card");
        return false;
      }
      if (
        !formData.expiryDate ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)
      ) {
        setError("Please enter a valid expiry date (MM/YY)");
        return false;
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        setError("Please enter a valid CVV");
        return false;
      }
    }

    setError(null);
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);

      setTimeout(() => {
        navigate("/booking-confirmation", {
          state: {
            bookingId: "BK" + Math.floor(Math.random() * 1000000),
            ...formData,
            totalPrice: calculatePrice(),
          },
        });
      }, 2000);
    } catch (err) {
      setError(
        "An error occurred while processing your booking. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Hero Header Section with Image Slider */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* Image Slider */}
        {images.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{
              opacity: index === currentImage ? 1 : 0,
              scale: index === currentImage ? 1 : 1.2,
            }}
            transition={{
              opacity: { duration: 1.8, ease: "easeInOut" },
              scale: { duration: 2.5, ease: "easeOut" },
            }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/30 z-10 transition-opacity duration-1000" />
            <img
              src={src}
              alt={`Luxury Room ${index + 1}`}
              className="w-full h-full object-cover transform-gpu"
            />
          </motion.div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl font-bold text-white sm:text-6xl mb-6"
            >
              Book Your Stay
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-2xl text-gray-100"
            >
              Experience luxury and comfort at Kuriftu Resorts & Spa
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gray-50 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gray-50 rounded-full filter blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Steps */}
            <div className="lg:w-1/4">
              <BookingSteps step={step} setStep={setStep} />
            </div>

            {/* Main Content - Form */}
            <div className="lg:w-3/4">
              {step === 1 && (
                <DateRoomSelection
                  formData={formData}
                  setFormData={setFormData}
                  roomTypes={roomTypes}
                  handleNext={handleNext}
                />
              )}

              {step === 2 && (
                <GuestInformation
                  formData={formData}
                  setFormData={setFormData}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                />
              )}

              {step === 3 && (
                <PaymentInformation
                  formData={formData}
                  setFormData={setFormData}
                  handlePrev={handlePrev}
                  handleSubmit={handleSubmit}
                  loading={loading}
                  calculateNights={calculateNights}
                  calculatePrice={calculatePrice}
                  formatDate={formatDate}
                  roomTypes={roomTypes}
                />
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center"
            >
              <FaTimes className="text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
            >
              <FaCheck className="text-green-500 mr-3" />
              <p className="text-green-700">
                Booking confirmed! Redirecting to confirmation page...
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
