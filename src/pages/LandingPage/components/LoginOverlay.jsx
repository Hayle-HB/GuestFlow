import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHotel, FaRobot, FaCommentAlt } from "react-icons/fa";

const LoginOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowConfirmation(true);
  };

  const handleConfirmClose = () => {
    setShowOverlay(false);
    setShowConfirmation(false);
  };

  const handleCancelClose = () => {
    setShowConfirmation(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-xl w-full mx-4 border-l-4 border-amber-500">
        <div className="flex items-start space-x-4 mb-4">
          <div className="text-amber-500 mt-1">
            <FaHotel className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              For Judges: Core Functionality Preview
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              This is just the landing page. To experience our complete solution
              with 1-second response time for all interactions, please log in:
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Admin Account
              </h3>
              <p className="text-gray-800 dark:text-gray-200 font-mono">
                Username: <span className="font-bold">admin</span>
              </p>
              <p className="text-gray-800 dark:text-gray-200 font-mono">
                Password: <span className="font-bold">admin123</span>
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                User Account
              </h3>
              <p className="text-gray-800 dark:text-gray-200 font-mono">
                Username: <span className="font-bold">new_user</span>
              </p>
              <p className="text-gray-800 dark:text-gray-200 font-mono">
                Password: <span className="font-bold">123456</span>
              </p>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200">
              <span className="font-semibold">Important:</span> Sign up
              functionality is currently disabled. Please use the provided demo
              accounts to experience our complete solution.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <FaRobot className="text-amber-600 dark:text-amber-400 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  1-Second Response System
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Every interaction - voice, text, or call - gets an instant
                  1-second response
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FaCommentAlt className="text-amber-600 dark:text-amber-400 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Complete Solution
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  All features are fully implemented and ready for evaluation
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              Dismiss
            </button>
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Login In{" "}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              For Judges Only
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This is just the landing page. Our complete solution with 1-second
              response time for all interactions is only accessible after
              logging in. Are you sure you want to dismiss this notification?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClose}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginOverlay;
