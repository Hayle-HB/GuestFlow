import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./Pages/SideBar/SideBar";
import UserFeedBack from "./Pages/UserFeedBack/UserFeedBack";
import Maintenance from "./Pages/UserFeedBack/components/Maintenance/Maintenance";

const AdminWeb = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      navigate("/login");
      return;
    }

    if (userRole !== "admin") {
      navigate("/user");
      return;
    }
  }, [navigate]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const renderContent = () => {
    switch (selectedCategory) {
      case "maintenance":
        return <Maintenance />;
      // Add more cases for other categories here
      default:
        return <UserFeedBack onCategorySelect={handleCategorySelect} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                {selectedCategory
                  ? selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)
                  : "Dashboard"}
              </h1>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Dashboard
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminWeb;
