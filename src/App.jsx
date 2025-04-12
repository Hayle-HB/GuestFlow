import React from "react";
import UserWeb from "./MainApplication/USER_WEB/UserWeb";
import AdminWeb from "./MainApplication/ADMIN_WEB/AdminWeb";
import { Routes, Route, Navigate, Link } from "react-router-dom";

const Choice = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to Kuriftu Resort
        </h1>
        <div className="flex flex-col space-y-4 items-center">
          <div className="flex space-x-4">
            <Link
              to="/user"
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Guest Portal
            </Link>
            <Link
              to="/admin"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // useEffect(() => {
  //   // Create the widget element
  //   const widget = document.createElement("elevenlabs-convai");
  //   widget.setAttribute("agent-id", "Dzww2AKHJGxukFgQb8kI");

  //   // Create and load the script
  //   const script = document.createElement("script");
  //   script.src = "https://elevenlabs.io/convai-widget/index.js";
  //   script.async = true;
  //   script.type = "text/javascript";

  //   // Append both to the body
  //   document.body.appendChild(widget);
  //   document.body.appendChild(script);

  //   // Cleanup function
  //   return () => {
  //     document.body.removeChild(widget);
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Choice />} />
        <Route path="/user/*" element={<UserWeb />} />
        <Route path="/admin/*" element={<AdminWeb />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
