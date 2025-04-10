import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/Navigation/NavBar";
import LandingPage from "./pages//LandingPage/LandingPage";
import LoginPage from "./pages/auth/Login/LoginPage";
import Booking from "./pages/LandingPage/Booking/Booking";
import Availability from "./pages/LandingPage/Booking/components/Availablity";
const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book-now" element ={<Booking/>}/>
        <Route path="/availability" element={<Availability/>}/>
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
