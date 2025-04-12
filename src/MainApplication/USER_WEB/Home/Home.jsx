import React, { useState, useEffect } from "react";
import { ChevronRight, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import luxuryBedroom from "../../../assets/images/Hotel/kurifuadarash.webp";
import VoiceChat from "./VoiceChat";

const Home = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds countdown
  const [isVisible, setIsVisible] = useState(true);
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setIsVisible(false);
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  // Auto-open voice chat when time reaches 0
  useEffect(() => {
    if (timeLeft === 0 && !hasAutoOpened) {
      setIsVoiceChatOpen(true);
      setHasAutoOpened(true);
    }
  }, [timeLeft, hasAutoOpened]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${luxuryBedroom})`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full flex items-center justify-between">
            {/* Left content */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">
                Welcome to Kuriftu Twin
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Experience luxury and comfort in the heart of the city. Your
                perfect getaway awaits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/give-feedback")}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  <span>Give Feedback</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate("/get-bonus")}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  <span>Get a Bonus</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setIsVoiceChatOpen(true)}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  <span>Meet Kuriftu Guide</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Right side elegant feedback section */}
            {isVisible && (
              <div className="hidden lg:block w-[400px]">
                <div className="relative">
                  <div className="absolute -inset-4">
                    <div className="w-full h-full opacity-30 blur-md filter bg-gradient-to-r from-amber-300 to-amber-500 rounded-3xl"></div>
                  </div>

                  {/* Main container */}
                  <div className="relative bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl">
                    {/* Timer section */}
                    <div className="text-center mb-4">
                      <div className="text-amber-300 text-sm font-medium uppercase tracking-wider mb-1">
                        Exclusive Offer
                      </div>
                      <div className="text-white text-lg font-light">
                        Expires In
                      </div>
                      <div className="mt-2 inline-block bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-400/30">
                        <span className="text-amber-300 text-xl font-bold tracking-wider">
                          {formatTime(timeLeft)}
                        </span>
                      </div>
                    </div>

                    {/* Feedback button */}
                    <button
                      onClick={() => setIsVoiceChatOpen(true)}
                      className="w-full group relative overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg border border-amber-400/30 group-hover:border-amber-400/50">
                        <div className="text-center relative z-10">
                          <div className="flex justify-center mb-3">
                            <Gift className="h-6 w-6 text-amber-200" />
                          </div>
                          <h3 className="text-white text-xl font-light mb-2">
                            Win a Mystery Gift
                          </h3>
                          <p className="text-amber-100 text-xs mb-3 max-w-sm mx-auto">
                            Share your valuable feedback and get a chance to win
                            an exclusive surprise from Kuriftu Twin
                          </p>
                          <div className="inline-flex items-center justify-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 group-hover:bg-white/20 transition-colors">
                            <span className="text-white text-xs">
                              Share Feedback
                            </span>
                            <ChevronRight className="h-3 w-3 text-white transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Special Offers */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-light text-gray-800 dark:text-white mb-8">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Add your special offers here */}
          </div>
        </div>
      </div>

      {/* Voice Chat Modal */}
      <VoiceChat
        isOpen={isVoiceChatOpen}
        onClose={() => setIsVoiceChatOpen(false)}
        autoStart={timeLeft === 0}
      />
    </div>
  );
};

// Add this to your CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .animate-spin-slow {
    animation: spin-slow 12s linear infinite;
  }
`;
document.head.appendChild(style);

export default Home;
