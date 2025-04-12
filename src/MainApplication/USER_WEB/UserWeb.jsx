import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import GiveFeedBack from "./GiveFeedBack/GiveFeedBack";
// import GetBonus from "./GetBonus/GetBonus";
import MeetKuriftuGuide from "./MeetKuriftuGuide/MeetKuriftuGuide";
import VoiceChat from "./Home/VoiceChat";
import NavBar from "./NavBar/NavBar";
const UserWeb = () => {
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);

  return (
    <div className="relative">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Home onOpenVoiceChat={() => setIsVoiceChatOpen(true)} />}
        />
        {/* <Route path="/give-feedback" element={<GiveFeedBack />} />
        <Route path="/get-bonus" element={<GetBonus />} /> */}
        <Route path="/meet-kuriftu-guide" element={<MeetKuriftuGuide />} />
      </Routes>

      <VoiceChat
        isOpen={isVoiceChatOpen}
        onClose={() => setIsVoiceChatOpen(false)}
      />
    </div>
  );
};

export default UserWeb;
