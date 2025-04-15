import React from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import CTASection from "./components/CTASection";
import Booking from "./Booking/Booking";
import Footer from "./Footer/Footer";
import NavBar from "../../components/layout/Navigation/NavBar";
// import LoginOverlay from "./components/LoginOverlay";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
      {/* <LoginOverlay /> */}
    </div>
  );
};

export default LandingPage;
