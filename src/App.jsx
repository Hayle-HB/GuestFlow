import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/layout/Navigation/NavBar";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/auth/Login/LoginPage";
import Booking from "./pages/LandingPage/Booking/Booking";
import Availability from "./pages/LandingPage/Booking/components/Availablity";
import UserWeb from "./MainApplication/USER_WEB/UserWeb";
import AdminWeb from "./MainApplication/ADMIN_WEB/adminWeb";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && userRole !== "admin") {
    return <Navigate to="/user" replace />;
  }

  if (!isAdmin && userRole === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setIsAuthenticated(!!newToken);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book-now" element={<Booking />} />
        <Route path="/availability" element={<Availability />} />

        {/* Protected User Routes */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <UserWeb />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute isAdmin={true}>
              <AdminWeb />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
