import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import GiveFeedBack from "./GiveFeedBack/GiveFeedBack";
// import GetBonus from "./GetBonus/GetBonus";
import MeetKuriftuGuide from "./MeetKuriftuGuide/MeetKuriftuGuide";
import VoiceChat from "./Home/VoiceChat";
import NavBar from "./NavBar/NavBar";

const UserWeb = () => {
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      navigate("/login");
      return;
    }

    if (userRole === "admin") {
      navigate("/admin");
      return;
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Home onOpenVoiceChat={() => setIsVoiceChatOpen(true)} />}
        />
        <Route path="/give-feedback" element={<GiveFeedBack />} />
        {/* <Route path="/get-bonus" element={<GetBonus />} /> */}
        <Route path="/meet-kuriftu-guide" element={<MeetKuriftuGuide />} />
        <Route path="*" element={<Navigate to="/user" replace />} />
      </Routes>

      <VoiceChat
        isOpen={isVoiceChatOpen}
        onClose={() => setIsVoiceChatOpen(false)}
      />
    </div>
  );
};

export default UserWeb;
