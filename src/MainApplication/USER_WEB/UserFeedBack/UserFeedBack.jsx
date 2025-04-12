import React, { useState } from "react";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  ChevronRight,
} from "lucide-react";

const UserFeedBack = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("positive");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log({ rating, feedback, feedbackType });
    // Reset form
    setRating(0);
    setFeedback("");
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <MessageSquare className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Share Your Experience
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Your feedback helps us improve our services
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                How would you rate your experience?
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? "text-amber-500 fill-current"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Type of Feedback
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setFeedbackType("positive")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    feedbackType === "positive"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>Positive</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackType("negative")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    feedbackType === "negative"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  <ThumbsDown className="h-5 w-5" />
                  <span>Negative</span>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Your Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                rows="4"
                placeholder="Share your experience with us..."
                required
              />
            </div>

            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              <span>Submit Feedback</span>
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Recent Feedback */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Recent Feedback
          </h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 text-amber-500 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      March 15, 2024
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-white">
                    "Absolutely amazing experience! The staff was incredibly
                    attentive and the facilities were top-notch."
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <ThumbsUp className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 dark:text-green-400">
                    Positive
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 text-amber-500 fill-current"
                        />
                      ))}
                      {[4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 text-gray-300 dark:text-gray-600"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      March 10, 2024
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-white">
                    "The room service was a bit slow, but the food quality made
                    up for it."
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <ThumbsDown className="h-5 w-5 text-red-500" />
                  <span className="text-red-600 dark:text-red-400">
                    Negative
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFeedBack;
