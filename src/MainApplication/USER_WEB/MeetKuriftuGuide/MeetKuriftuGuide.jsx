import React from "react";

const MeetKuriftuGuide = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Your Kuriftu Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Our expert guides are here to help you make the most of your stay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Guide cards will be added here */}
        </div>
      </div>
    </div>
  );
};

export default MeetKuriftuGuide;
