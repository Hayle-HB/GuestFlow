import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaHotel,
  FaCalendarAlt,
  FaUsers,
  FaKey,
  FaCreditCard,
  FaCheckCircle,
  FaHome,
  FaPrint,
  FaQrcode,
  FaShare,
  FaDownload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const BookConf = () => {
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("reservationData");
    if (!data) {
      navigate("/");
      return;
    }
    setReservationData(JSON.parse(data));
    // Stop animation after 2 seconds
    setTimeout(() => setIsAnimating(false), 2000);
  }, [navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const shareData = {
      title: "Kuriftu Resort Booking Confirmation",
      text: `Your booking at ${reservationData.hotel} is confirmed! Confirmation Code: ${reservationData.confirmationCode}`,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareData.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadQR = () => {
    const svg = document.querySelector(".qr-code svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `booking-qr-${reservationData.confirmationCode}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  if (!reservationData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-green-600 to-green-700 px-8 py-12">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
            <div className="relative flex items-center justify-center space-x-6">
              <div
                className={`transform transition-all duration-1000 ${
                  isAnimating ? "scale-110 rotate-12" : "scale-100 rotate-0"
                }`}
              >
                <FaCheckCircle className="text-white text-6xl drop-shadow-lg" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white tracking-tight">
                  Booking Confirmed!
                </h2>
                <p className="text-green-100 mt-2 text-lg">
                  Your reservation is now secure
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                    Guest Information
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center group">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <FaUser className="text-green-600 text-xl" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="text-gray-900 font-medium text-lg">
                          {reservationData.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center group">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <FaPhone className="text-green-600 text-xl" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-900 font-medium text-lg">
                          {reservationData.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center group">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <FaEnvelope className="text-green-600 text-xl" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900 font-medium text-lg">
                          {reservationData.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                    Reservation Details
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center group">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <FaHotel className="text-green-600 text-xl" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Hotel</p>
                        <p className="text-gray-900 font-medium text-lg">
                          {reservationData.hotel}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center group">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <FaCalendarAlt className="text-green-600 text-xl" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Check-in Date</p>
                        <p className="text-gray-900 font-medium text-lg">
                          {reservationData.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center group">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <FaUsers className="text-green-600 text-xl" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">
                          Number of Guests
                        </p>
                        <p className="text-gray-900 font-medium text-lg">
                          {reservationData.guests}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center group">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <FaKey className="text-green-600 text-xl" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Room Type</p>
                        <p className="text-gray-900 font-medium text-lg">
                          {reservationData.roomType}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                    Confirmation Code
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-6 rounded-xl shadow-inner border-2 border-green-100">
                      <p className="text-4xl font-bold text-green-600 tracking-wider font-mono">
                        {reservationData.confirmationCode}
                      </p>
                    </div>
                    <div className="mt-6 space-y-4">
                      <button
                        onClick={() => setShowQR(!showQR)}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
                      >
                        <FaQrcode />
                        <span>{showQR ? "Hide QR Code" : "Show QR Code"}</span>
                      </button>
                      {showQR && (
                        <div className="mt-4 flex flex-col items-center space-y-4">
                          <div className="qr-code p-4 bg-white rounded-xl shadow-inner">
                            <QRCodeSVG
                              value={`${reservationData.confirmationCode}-${reservationData.hotel}`}
                              size={160}
                              level="H"
                              includeMargin={true}
                              bgColor="#ffffff"
                              fgColor="#059669"
                            />
                          </div>
                          <button
                            onClick={handleDownloadQR}
                            className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                          >
                            <FaDownload />
                            <span>Download QR Code</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-8 shadow-lg border border-yellow-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                        <svg
                          className="h-6 w-6 text-yellow-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-yellow-800">
                        Important Notice
                      </h3>
                      <div className="mt-2 text-yellow-700">
                        <p>
                          Please complete your payment within 24 hours to secure
                          your reservation. You can make the payment at the
                          hotel reception or through our online payment system.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <button
                onClick={() => navigate("/")}
                className="flex items-center px-8 py-4 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
              >
                <FaHome className="mr-3 text-lg" />
                <span className="font-medium">Back to Home</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center px-8 py-4 bg-green-600 rounded-xl text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaPrint className="mr-3 text-lg" />
                <span className="font-medium">Print Confirmation</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center px-8 py-4 bg-blue-600 rounded-xl text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaShare className="mr-3 text-lg" />
                <span className="font-medium">
                  {copied ? "Copied!" : "Share"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookConf;
