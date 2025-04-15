import React, { useState, useEffect, useRef } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaRobot,
  FaHotel,
  FaCalendarAlt,
  FaUsers,
  FaKey,
  FaCreditCard,
  FaPaperPlane,
  FaUser,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const VoiceAssistant = ({ position = "bottom" }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [error, setError] = useState("");
  const [conversationState, setConversationState] = useState("initial");
  const [textInput, setTextInput] = useState("");
  const [reservationData, setReservationData] = useState({
    hotel: "",
    date: "",
    guests: 0,
    roomType: "",
    confirmationCode: "",
  });
  const [personalData, setPersonalData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    numberOfGuests: 0,
  });

  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);
  const restartTimeoutRef = useRef(null);

  const hotels = {
    "addis ababa": "Addis Ababa Entoto",
    debrezeyit: "Debrezeyit",
    bahirdar: "Bahirdar Tana",
  };

  const roomTypes = {
    vip: "VIP Suite",
    normal: "Standard Room",
  };

  // Initialize speech recognition
  useEffect(() => {
    const initializeRecognition = () => {
      if ("webkitSpeechRecognition" in window) {
        try {
          recognitionRef.current = new window.webkitSpeechRecognition();
          recognitionRef.current.continuous = true;
          recognitionRef.current.interimResults = true;
          recognitionRef.current.lang = "en-US";
          recognitionRef.current.maxAlternatives = 1;

          recognitionRef.current.onstart = () => {
            setError("");
            console.log("Speech recognition started");
            setTranscript("Listening...");
          };

          recognitionRef.current.onresult = (event) => {
            let interimTranscript = "";
            let finalTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
              const transcript = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                finalTranscript += transcript;
              } else {
                interimTranscript += transcript;
              }
            }

            // Update transcript with both interim and final results
            setTranscript(finalTranscript || interimTranscript);
            console.log("Transcript:", finalTranscript || interimTranscript);

            // If we have a final result, process it
            if (finalTranscript) {
              processTranscript(finalTranscript);
            }
          };

          recognitionRef.current.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            if (event.error === "no-speech") {
              setError("No speech detected. Please try speaking again.");
            } else if (event.error === "audio-capture") {
              setError(
                "No microphone detected. Please check your microphone settings."
              );
            } else if (event.error === "network") {
              setError("Network error. Please check your internet connection.");
            } else {
              setError(`Error: ${event.error}`);
            }
            setIsListening(false);
          };

          recognitionRef.current.onend = () => {
            console.log("Speech recognition ended");
            setIsListening(false);
            if (transcript && transcript !== "Listening...") {
              processTranscript(transcript);
            }
          };
        } catch (err) {
          console.error("Error initializing speech recognition:", err);
          setError("Error initializing speech recognition");
        }
      } else {
        setError("Speech recognition is not supported in your browser");
      }
    };

    initializeRecognition();

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log("Error stopping recognition on cleanup:", e);
        }
      }
    };
  }, []);

  // Initialize speech synthesis
  useEffect(() => {
    if ("speechSynthesis" in window) {
      synthesisRef.current = window.speechSynthesis;
    } else {
      setError("Speech synthesis is not supported in your browser");
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError("Speech recognition is not supported in your browser");
      return;
    }

    try {
      if (isListening) {
        console.log("Stopping recognition");
        recognitionRef.current.stop();
        setIsListening(false);
        // Process the final transcript when stopping
        if (transcript && transcript !== "Listening...") {
          processTranscript(transcript);
        }
      } else {
        console.log("Starting recognition");
        setTranscript("Listening...");
        setError("");
        recognitionRef.current.start();
        setIsListening(true);
      }
    } catch (err) {
      console.error("Error toggling listening:", err);
      setError("Error starting/stopping speech recognition");
      setIsListening(false);
    }
  };

  const handleFinish = () => {
    if (isListening) {
      toggleListening();
    } else if (transcript && transcript !== "Listening...") {
      processTranscript(transcript);
    }
  };

  const processTranscript = (text) => {
    const lowerText = text.toLowerCase().trim();
    let response = "";

    if (!lowerText) {
      response = "I didn't catch that. Could you please repeat?";
    } else {
      switch (conversationState) {
        case "initial":
          if (
            lowerText.includes("hi") ||
            lowerText.includes("hello") ||
            lowerText.includes("hey")
          ) {
            response =
              "Hello! Welcome to Kuriftu Resorts. How can I assist you today?";
            setConversationState("greeting");
          } else {
            response =
              "Hello! I'm here to help you with your hotel reservation. Would you like to make a booking?";
          }
          break;

        case "greeting":
          if (
            lowerText.includes("reservation") ||
            lowerText.includes("book") ||
            lowerText.includes("room")
          ) {
            response =
              "I'd be happy to help you with your reservation. We have three beautiful locations: " +
              "Kuriftu Addis Ababa Entoto, Kuriftu Debrezeyit, and Kuriftu Bahirdar TanaHayik. " +
              "Which location would you prefer?";
            setConversationState("select_hotel");
          } else {
            response =
              "I can help you with hotel reservations, room bookings, and information about our facilities. What would you like to know?";
          }
          break;

        case "select_hotel":
          const selectedHotel = Object.keys(hotels).find((hotel) =>
            lowerText.includes(hotel)
          );
          if (selectedHotel) {
            setReservationData((prev) => ({
              ...prev,
              hotel: hotels[selectedHotel],
            }));
            response = `Great choice! ${hotels[selectedHotel]} is a wonderful location. When would you like to check in?`;
            setConversationState("select_date");
          } else {
            response =
              "I didn't catch which hotel you prefer. We have Kuriftu Addis Ababa Entoto, Kuriftu Debrezeyit, and Kuriftu Bahirdar TanaHayik. Which one would you like?";
          }
          break;

        case "select_date":
          if (
            lowerText.includes("tomorrow") ||
            lowerText.includes("today") ||
            lowerText.match(
              /\d{1,2}\s*(?:st|nd|rd|th)?\s*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i
            )
          ) {
            setReservationData((prev) => ({ ...prev, date: "April 12, 2024" }));
            response = "Perfect! How many guests will be staying with you?";
            setConversationState("select_guests");
          } else {
            response =
              "I need to know your check-in date. Would you like to stay tomorrow or on a specific date?";
          }
          break;

        case "select_guests":
          // Map number words to digits
          const numberWords = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
          };

          // Check for number words first
          const wordMatch = Object.keys(numberWords).find((word) =>
            lowerText.includes(word)
          );

          // Then check for digits
          const digitMatch = lowerText.match(/\d+/);

          if (wordMatch) {
            const guestCount = numberWords[wordMatch];
            setReservationData((prev) => ({
              ...prev,
              guests: guestCount,
            }));
            response = `Thank you for ${wordMatch} guests. We have two room types available: VIP Suite and Standard Room. Which would you prefer?`;
            setConversationState("select_room");
          } else if (digitMatch) {
            setReservationData((prev) => ({
              ...prev,
              guests: parseInt(digitMatch[0]),
            }));
            response = `Thank you for ${digitMatch[0]} guests. We have two room types available: VIP Suite and Standard Room. Which would you prefer?`;
            setConversationState("select_room");
          } else {
            response =
              "How many guests will be staying with you? Please tell me the number of guests.";
          }
          break;

        case "select_room":
          const selectedRoom = Object.keys(roomTypes).find((room) =>
            lowerText.includes(room)
          );
          if (selectedRoom) {
            setReservationData((prev) => ({
              ...prev,
              roomType: roomTypes[selectedRoom],
            }));
            response =
              "Great choice! Before I confirm your reservation, I need some personal information. " +
              "Could you please tell me your full name?";
            setConversationState("collect_name");
          } else {
            response =
              "We have VIP Suite and Standard Room available. Which type would you prefer?";
          }
          break;

        case "collect_name":
          setPersonalData((prev) => ({ ...prev, name: text.trim() }));
          response =
            "Thank you, " +
            text.trim() +
            ". Could you please provide your phone number?";
          setConversationState("collect_phone");
          break;

        case "collect_phone":
          const phoneNumber = text.trim().replace(/\D/g, "");
          if (phoneNumber.length >= 10) {
            setPersonalData((prev) => ({ ...prev, phoneNumber }));
            response = "Thank you. What is your email address?";
            setConversationState("collect_email");
          } else {
            response =
              "I need a valid phone number with at least 10 digits. Could you please provide it again?";
          }
          break;

        case "collect_email":
          const email = text.trim();
          if (email.includes("@") && email.includes(".")) {
            setPersonalData((prev) => ({ ...prev, email }));
            response =
              "Thank you. How many guests will be staying with you? Please provide just the number.";
            setConversationState("collect_guests");
          } else {
            response =
              "I need a valid email address. Could you please provide it again?";
          }
          break;

        case "collect_guests":
          const guestCount = lowerText.match(/\d+/);
          if (guestCount) {
            setPersonalData((prev) => ({
              ...prev,
              numberOfGuests: parseInt(guestCount[0]),
            }));
            const confirmationCode = Math.random()
              .toString(36)
              .substring(2, 8)
              .toUpperCase();
            setReservationData((prev) => ({ ...prev, confirmationCode }));
            response =
              `Perfect! I've reserved a ${reservationData.roomType} for you at ${reservationData.hotel} on ${reservationData.date} for ${guestCount[0]} guests. ` +
              `Your confirmation code is ${confirmationCode}. Please complete the payment within 24 hours to secure your reservation. ` +
              `Is there anything else I can help you with?`;
            setConversationState("confirmation");
          } else {
            response =
              "I need the number of guests. Please provide just the number.";
          }
          break;

        case "confirmation":
          if (lowerText.includes("thank")) {
            response =
              "You're welcome! Have a wonderful stay at Kuriftu Resorts!";
            setConversationState("end");
          } else if (
            lowerText.includes("help") ||
            lowerText.includes("assist")
          ) {
            response =
              "I can help you with another reservation, provide information about our facilities, or answer any questions you might have. What would you like to know?";
            setConversationState("initial");
          } else {
            response = "Is there anything else I can help you with?";
          }
          break;

        default:
          response =
            "I'm not sure I understand. Could you please rephrase your question?";
      }
    }

    setResponse(response);
    speakResponse(response);
  };

  const speakResponse = (text) => {
    if (!synthesisRef.current) {
      setError("Speech synthesis is not supported in your browser");
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (isListening && recognitionRef.current) {
          setTimeout(() => {
            try {
              recognitionRef.current.start();
            } catch (err) {
              console.error("Error restarting after speech:", err);
            }
          }, 500);
        }
      };
      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        setError("Error speaking response");
      };
      synthesisRef.current.speak(utterance);
    } catch (err) {
      console.error("Error speaking response:", err);
      setError("Error speaking response");
    }
  };

  const positionClasses = {
    top: "top-4",
    bottom: "bottom-4",
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("Enter key pressed, toggling listening");
      toggleListening();
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      processTranscript(textInput);
      setTextInput("");
    }
  };

  return (
    <div className={`fixed ${positionClasses[position]} right-4 z-50`}>
      {showAssistant ? (
        <div className="bg-white rounded-lg shadow-lg p-4 w-80">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <FaRobot className="text-blue-500 text-2xl mr-2" />
              <h3 className="text-lg font-semibold">Kuriftu Assistant</h3>
            </div>
            <button
              onClick={() => {
                setShowAssistant(false);
                setIsListening(false);
                if (recognitionRef.current) {
                  recognitionRef.current.stop();
                }
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">You said:</div>
            <div className="bg-gray-100 p-2 rounded min-h-[40px]">
              {transcript || "..."}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Assistant:</div>
            <div className="bg-blue-50 p-2 rounded min-h-[40px]">
              {response || "..."}
            </div>
          </div>

          {conversationState === "confirmation" && (
            <div className="mb-4 p-3 bg-green-50 rounded">
              <h4 className="font-semibold mb-2">Reservation Details:</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <FaHotel className="inline mr-2" /> Hotel:{" "}
                  {reservationData.hotel}
                </p>
                <p>
                  <FaCalendarAlt className="inline mr-2" /> Date:{" "}
                  {reservationData.date}
                </p>
                <p>
                  <FaUsers className="inline mr-2" /> Room Type:{" "}
                  {reservationData.roomType}
                </p>
                <p>
                  <FaCreditCard className="inline mr-2" /> Confirmation Code:{" "}
                  {reservationData.confirmationCode}
                </p>
                <p>
                  <FaUser className="inline mr-2" /> Name: {personalData.name}
                </p>
                <p>
                  <FaPhone className="inline mr-2" /> Phone:{" "}
                  {personalData.phoneNumber}
                </p>
                <p>
                  <FaEnvelope className="inline mr-2" /> Email:{" "}
                  {personalData.email}
                </p>
                <p>
                  <FaUsers className="inline mr-2" /> Number of Guests:{" "}
                  {personalData.numberOfGuests}
                </p>
              </div>
            </div>
          )}

          <div className="flex space-x-2 mb-4">
            <button
              onClick={toggleListening}
              className={`flex-1 py-2 rounded flex items-center justify-center ${
                isListening
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white transition-colors duration-200`}
              type="button"
            >
              {isListening ? (
                <>
                  <FaMicrophoneSlash className="mr-2" />
                  Stop Listening
                </>
              ) : (
                <>
                  <FaMicrophone className="mr-2" />
                  Start Listening
                </>
              )}
            </button>
            <button
              onClick={handleFinish}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center justify-center transition-colors duration-200"
              type="button"
            >
              <FaPaperPlane className="mr-2" />
              Finish
            </button>
          </div>

          <form onSubmit={handleTextSubmit} className="flex space-x-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here or press Enter to start/stop voice..."
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowAssistant(true)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <FaRobot className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default VoiceAssistant;
