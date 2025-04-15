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
  FaCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VoiceAssistant = ({ position = "bottom" }) => {
  const navigate = useNavigate();
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
    name: "",
    phone: "",
    email: "",
  });

  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);
  const restartTimeoutRef = useRef(null);
  const textInputRef = useRef(null);

  const hotels = {
    "Awash Falls": {
      name: "Awash Falls",
      aliases: [
        "awash",
        "awsh",
        "awshf",
        "awshfls",
        "awshflls",
        "awshfalls",
        "awshfals",
        "awshflls",
        "awshfll",
        "awshfl",
        "awshf",
        "awsh",
        "aw",
        "ash",
        "wash",
        "awshflls",
        "awshfll",
        "awshfl",
        "awshf",
        "awsh",
        "aw",
        "ash",
        "wash",
        "awshflls",
        "awshfll",
        "awshfl",
        "awshf",
        "awsh",
        "aw",
        "ash",
        "wash",
      ],
    },
    "Entoto National Park": {
      name: "Entoto National Park",
      aliases: [
        "entoto",
        "entt",
        "ent",
        "ento",
        "entot",
        "entotopark",
        "entotoprk",
        "entotopk",
        "entotop",
        "entoto",
        "entt",
        "ent",
        "ento",
        "entot",
        "entotopark",
        "entotoprk",
        "entotopk",
        "entotop",
        "entoto",
        "entt",
        "ent",
        "ento",
        "entot",
        "entotopark",
        "entotoprk",
        "entotopk",
        "entotop",
      ],
    },
    "Lake Kuriftu": {
      name: "Kuriftu Lake Kuriftu",
      aliases: [
        "lake",
        "lk",
        "lke",
        "lkkuriftu",
        "lkkurftu",
        "lkkurft",
        "lkkurf",
        "lkkur",
        "lkk",
        "lk",
        "lke",
        "lkkuriftu",
        "lkkurftu",
        "lkkurft",
        "lkkurf",
        "lkkur",
        "lkk",
        "lk",
        "lke",
        "lkkuriftu",
        "lkkurftu",
        "lkkurft",
        "lkkurf",
        "lkkur",
        "lkk",
      ],
    },
    "Lake Tana": {
      name: "Lake Tana",
      aliases: [
        "tana",
        "tna",
        "tn",
        "tana",
        "tna",
        "tn",
        "tana",
        "tna",
        "tn",
        "tana",
        "tna",
        "tn",
        "tana",
        "tna",
        "tn",
        "tana",
        "tna",
        "tn",
        "tana",
        "tna",
        "tn",
      ],
    },
  };

  const roomTypes = {
    vip: "VIP Suite",
    normal: "Standard Room",
  };

  const months = {
    january: { aliases: ["jan", "jany", "jnuar", "jnu", "janu"] },
    february: { aliases: ["feb", "febr", "febru", "febuary", "febry"] },
    march: { aliases: ["mar", "marc", "march", "mrh", "mrch"] },
    april: { aliases: ["apr", "aprl", "april", "apri", "erpl", "pril"] },
    may: { aliases: ["may", "mai", "mei", "my"] },
    june: { aliases: ["jun", "june", "jne", "jnu"] },
    july: { aliases: ["jul", "july", "jly", "jli"] },
    august: { aliases: ["aug", "augu", "augst", "agst", "agust"] },
    september: { aliases: ["sep", "sept", "septm", "septem", "septembr"] },
    october: { aliases: ["oct", "octo", "octob", "octbr", "octber"] },
    november: { aliases: ["nov", "novm", "novem", "novemb", "novbr"] },
    december: { aliases: ["dec", "decm", "decem", "decemb", "decbr"] },
  };

  // Helper function to calculate string similarity
  const calculateSimilarity = (str1, str2) => {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = [];

    // Initialize matrix
    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }

    // Fill in the matrix
    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          );
        }
      }
    }

    // Calculate similarity score
    const maxLen = Math.max(len1, len2);
    return 1 - matrix[len1][len2] / maxLen;
  };

  // Enhanced fuzzy matching with similarity scoring
  const fuzzyMatch = (input, options) => {
    const normalizedInput = input.toLowerCase().replace(/\s+/g, "");
    let bestMatch = null;
    let bestScore = 0;

    for (const [key, value] of Object.entries(options)) {
      // Check direct matches and aliases
      if (
        key.toLowerCase().includes(normalizedInput) ||
        normalizedInput.includes(key.toLowerCase()) ||
        (value.aliases &&
          value.aliases.some(
            (alias) =>
              alias.toLowerCase().includes(normalizedInput) ||
              normalizedInput.includes(alias.toLowerCase())
          ))
      ) {
        return key;
      }

      // Calculate similarity scores
      const keyScore = calculateSimilarity(
        normalizedInput,
        key.toLowerCase().replace(/\s+/g, "")
      );
      const aliasScores = value.aliases
        ? value.aliases.map((alias) =>
            calculateSimilarity(normalizedInput, alias.toLowerCase())
          )
        : [];
      const maxAliasScore =
        aliasScores.length > 0 ? Math.max(...aliasScores) : 0;
      const totalScore = Math.max(keyScore, maxAliasScore);

      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestMatch = key;
      }
    }

    // Return best match if similarity score is above threshold
    return bestScore > 0.6 ? bestMatch : null;
  };

  // Enhanced date parsing
  const parseDate = (text) => {
    const lowerText = text.toLowerCase();

    // Check for relative dates
    if (
      lowerText.includes("tomorrow") ||
      lowerText.includes("tmrw") ||
      lowerText.includes("tomo")
    ) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    }
    if (lowerText.includes("today") || lowerText.includes("tonight")) {
      return new Date();
    }
    if (lowerText.includes("next week")) {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek;
    }

    // Extract month and day
    const monthMatch = fuzzyMatch(lowerText, months);
    if (monthMatch) {
      const dayMatch = lowerText.match(/\d{1,2}/);
      const day = dayMatch ? parseInt(dayMatch[0]) : new Date().getDate();
      const year = new Date().getFullYear();
      const monthIndex = Object.keys(months).indexOf(monthMatch);
      return new Date(year, monthIndex, day);
    }

    return null;
  };

  // Update the selectHotel function
  const selectHotel = (text) => {
    const matchedHotel = fuzzyMatch(text, hotels);
    if (matchedHotel) {
      return hotels[matchedHotel].name;
    }
    return null;
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

          recognitionRef.current.onstart = () => {
            setError("");
            console.log("Speech recognition started");
          };

          recognitionRef.current.onresult = (event) => {
            const transcript = Array.from(event.results)
              .map((result) => result[0].transcript)
              .join("");
            setTranscript(transcript);
            console.log("Transcript:", transcript);
          };

          recognitionRef.current.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            if (event.error === "aborted") {
              restartRecognition();
            } else {
              setError(`Error: ${event.error}`);
              setIsListening(false);
            }
          };

          recognitionRef.current.onend = () => {
            console.log("Speech recognition ended");
            if (isListening) {
              restartRecognition();
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

    const restartRecognition = () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }

      restartTimeoutRef.current = setTimeout(() => {
        if (isListening && recognitionRef.current) {
          try {
            console.log("Attempting to restart recognition");
            recognitionRef.current.start();
          } catch (err) {
            console.error("Error restarting recognition:", err);
            initializeRecognition();
            if (isListening) {
              recognitionRef.current.start();
            }
          }
        }
      }, 100);
    };

    initializeRecognition();

    return () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

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
        recognitionRef.current.stop();
        setIsListening(false);
        if (transcript.trim()) {
          processTranscript(transcript);
        }
      } else {
        // Reset recognition before starting
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        setTimeout(() => {
          recognitionRef.current.start();
          setIsListening(true);
          setTranscript("");
          setError("");
        }, 100);
      }
    } catch (err) {
      console.error("Error toggling listening:", err);
      setError("Error starting/stopping speech recognition");
      setIsListening(false);
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
          const selectedHotel = selectHotel(lowerText);
          if (selectedHotel) {
            setReservationData((prev) => ({
              ...prev,
              hotel: selectedHotel,
            }));
            response = `Great choice! ${selectedHotel} is a wonderful location. When would you like to check in? You can say a specific date like "April 15th" or "tomorrow".`;
            setConversationState("select_date");
          } else {
            response =
              "I didn't catch which hotel you prefer. We have Kuriftu Addis Ababa Entoto, Kuriftu Debrezeyit, and Kuriftu Bahirdar TanaHayik. Which one would you like?";
          }
          break;

        case "select_date":
          const parsedDate = parseDate(lowerText);
          if (parsedDate) {
            const formattedDate = parsedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            setReservationData((prev) => ({ ...prev, date: formattedDate }));
            response = `Perfect! I've set your check-in date for ${formattedDate}. Before we proceed, I'll need some personal information. What is your full name?`;
            setConversationState("get_name");
          } else {
            response =
              "I need to know your check-in date. You can say a specific date like 'April 15th' or 'tomorrow'. When would you like to stay?";
          }
          break;

        case "get_name":
          if (lowerText.trim()) {
            setReservationData((prev) => ({ ...prev, name: text.trim() }));
            response = "Thank you! Could you please provide your phone number?";
            setConversationState("get_phone");
          } else {
            response =
              "I need your full name to proceed with the reservation. What is your name?";
          }
          break;

        case "get_phone":
          // Basic phone number validation
          const phoneMatch = lowerText.match(/(?:\+\d{1,3}[- ]?)?\d{10,}/);
          if (phoneMatch) {
            setReservationData((prev) => ({ ...prev, phone: phoneMatch[0] }));
            response = "Thank you! Finally, what is your email address?";
            setConversationState("get_email");
          } else {
            response =
              "I need a valid phone number to proceed. Please provide your phone number including the country code if applicable.";
          }
          break;

        case "get_email":
          // Basic email validation
          const emailMatch = lowerText.match(
            /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
          );
          if (emailMatch) {
            setReservationData((prev) => ({ ...prev, email: emailMatch[0] }));
            response =
              "Thank you for providing your information. How many guests will be staying with you?";
            setConversationState("select_guests");
          } else {
            response =
              "I need a valid email address to proceed. Please provide your email address.";
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
            const confirmationCode = Math.random()
              .toString(36)
              .substring(2, 8)
              .toUpperCase();
            setReservationData((prev) => ({ ...prev, confirmationCode }));
            response =
              `Excellent choice! I've reserved a ${roomTypes[selectedRoom]} for you at ${reservationData.hotel} on ${reservationData.date} for ${reservationData.guests} guests. ` +
              `Your confirmation code is ${confirmationCode}. Please complete the payment within 24 hours to secure your reservation. ` +
              `Is there anything else I can help you with?`;
            setConversationState("confirmation");
          } else {
            response =
              "We have VIP Suite and Standard Room available. Which type would you prefer?";
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

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      processTranscript(textInput);
      setTextInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleTextSubmit(e);
    }
  };

  const handleConfirmBooking = () => {
    // Store reservation data in localStorage
    localStorage.setItem("reservationData", JSON.stringify(reservationData));
    // Navigate to confirmation page
    navigate("/confirm-booking");
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
            <>
              <div className="mb-4 p-3 bg-green-50 rounded">
                <h4 className="font-semibold mb-2">Reservation Details:</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <FaUser className="inline mr-2" /> Name:{" "}
                    {reservationData.name}
                  </p>
                  <p>
                    <FaPhone className="inline mr-2" /> Phone:{" "}
                    {reservationData.phone}
                  </p>
                  <p>
                    <FaEnvelope className="inline mr-2" /> Email:{" "}
                    {reservationData.email}
                  </p>
                  <p>
                    <FaHotel className="inline mr-2" /> Hotel:{" "}
                    {reservationData.hotel}
                  </p>
                  <p>
                    <FaCalendarAlt className="inline mr-2" /> Date:{" "}
                    {reservationData.date}
                  </p>
                  <p>
                    <FaUsers className="inline mr-2" /> Guests:{" "}
                    {reservationData.guests}
                  </p>
                  <p>
                    <FaKey className="inline mr-2" /> Room Type:{" "}
                    {reservationData.roomType}
                  </p>
                  <p>
                    <FaCreditCard className="inline mr-2" /> Confirmation Code:{" "}
                    {reservationData.confirmationCode}
                  </p>
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                className="w-full mb-4 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <FaCheck className="mr-2" />
                Confirm Booking
              </button>
            </>
          )}

          <div className="flex space-x-2 mb-4">
            <button
              onClick={toggleListening}
              className={`flex-1 py-2 rounded flex items-center justify-center ${
                isListening
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
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
          </div>

          <form onSubmit={handleTextSubmit} className="flex space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ref={textInputRef}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
              disabled={!textInput.trim()}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowAssistant(true)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <FaRobot className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default VoiceAssistant;
