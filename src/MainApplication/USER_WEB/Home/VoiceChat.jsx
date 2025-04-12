import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Send, Volume2 } from "lucide-react";
import { io } from "socket.io-client";
import "./VoiceChat.css";

const VoiceChat = ({ isOpen, onClose, autoStart }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputText, setInputText] = useState("");

  const socketRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const messagesEndRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const statusIndicatorRef = useRef(null);
  const hasAutoStartedRef = useRef(false);
  const hasWelcomePlayedRef = useRef(false);

  // Initialize WebSocket connection
  useEffect(() => {
    if (isOpen) {
      const socket = io("http://localhost:5000", {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("Connected to server");
        setIsConnected(true);
        // Request welcome message
        socket.emit("request_welcome");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
        setIsConnected(false);
      });

      socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
        setIsConnected(false);
      });

      socket.on("ai_response", async (data) => {
        console.log("AI Response received:", data);
        if (data.text) {
          setMessages((prev) => [...prev, { type: "ai", content: data.text }]);
        }
        if (data.audio) {
          await playAudio(data.audio);
        }
        setIsSpeaking(false);
      });

      return () => {
        socket.close();
      };
    }
  }, [isOpen]);

  // Handle auto-start and welcome message
  useEffect(() => {
    if (isOpen && isConnected && !hasWelcomePlayedRef.current) {
      hasWelcomePlayedRef.current = true;
      // Add a small delay to ensure the audio context is ready
      setTimeout(() => {
        socketRef.current?.emit("request_welcome");
      }, 500);
    }
  }, [isOpen, isConnected]);

  // Initialize audio context
  useEffect(() => {
    if (isOpen) {
      try {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
        console.log("Audio context initialized");
      } catch (error) {
        console.error("Error initializing audio context:", error);
      }
    }
  }, [isOpen]);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        console.log("Speech recognition started");
        setIsListening(true);
        socketRef.current?.emit("voice_start");
        if (statusIndicatorRef.current) {
          statusIndicatorRef.current.classList.add("listening");
        }
      };

      recognition.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscriptRef.current = event.results[i][0].transcript;
            console.log("Final transcript:", finalTranscriptRef.current);
            setTranscript(finalTranscriptRef.current);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        if (finalTranscriptRef.current.trim()) {
          console.log("Sending transcript:", finalTranscriptRef.current);
          socketRef.current?.emit("voice_end", {
            transcript: finalTranscriptRef.current,
          });
          setMessages((prev) => [
            ...prev,
            { type: "user", content: finalTranscriptRef.current },
          ]);
          finalTranscriptRef.current = "";
          setTranscript("");
        }
        setIsListening(false);
        if (statusIndicatorRef.current) {
          statusIndicatorRef.current.classList.remove("listening");
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (statusIndicatorRef.current) {
          statusIndicatorRef.current.classList.remove("listening");
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const playAudio = async (base64Audio) => {
    if (!base64Audio || !audioContextRef.current) {
      console.error("No audio data or audio context not initialized");
      return;
    }

    try {
      // Resume audio context if it's suspended
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }

      const audioContext = audioContextRef.current;
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const audioBuffer = await audioContext.decodeAudioData(bytes.buffer);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      // Create a gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 1.0; // Set volume to 100%

      // Connect nodes
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      setIsSpeaking(true);
      if (statusIndicatorRef.current) {
        statusIndicatorRef.current.classList.add("responding");
      }

      source.start();
      console.log("Audio playback started");

      source.onended = () => {
        console.log("Audio playback ended");
        setIsSpeaking(false);
        if (statusIndicatorRef.current) {
          statusIndicatorRef.current.classList.remove("responding");
        }
      };
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsSpeaking(false);
      if (statusIndicatorRef.current) {
        statusIndicatorRef.current.classList.remove("responding");
      }
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening && !isSpeaking) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting recognition:", error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && socketRef.current) {
      // Add user message to chat
      setMessages((prev) => [...prev, { type: "user", content: inputText }]);

      // Send text to server
      socketRef.current.emit("voice_end", {
        transcript: inputText,
        isTextInput: true,
      });

      // Clear input
      setInputText("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-3xl h-[85vh] flex flex-col">
        <div className="status-indicator" ref={statusIndicatorRef}></div>
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-light text-white">
            Kuriftu AI Assistant
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="message-container w-full mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type === "user" ? "user" : "ai"}`}
              >
                {message.content}
              </div>
            ))}
            {isTyping && (
              <div className="message ai">
                <span className="animate-pulse">AI is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-8 flex items-center gap-4">
              <button
                onClick={stopListening}
                className={`${
                  isListening ? "block" : "hidden"
                } bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors`}
              >
                Finish Talking
              </button>
              <div className="text-white">
                <span>
                  {isConnected
                    ? isSpeaking
                      ? "AI is speaking..."
                      : isListening
                      ? "Listening..."
                      : "Ready to listen"
                    : "Connecting..."}
                </span>
                {isSpeaking && <span className="speaking-indicator"></span>}
              </div>
            </div>

            <div
              className={`bg-amber-500/20 rounded-full p-8 flex items-center justify-center mb-8 cursor-pointer hover:bg-amber-500/30 transition-colors ${
                isListening ? "bg-amber-500/30" : ""
              }`}
              onClick={startListening}
            >
              <svg
                className={`mic-icon text-white ${isListening ? "active" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </div>

            <div className="text-center text-white space-y-4">
              <p className="text-gray-400">
                Click the microphone to start speaking
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleInputSubmit}
          className="p-4 border-t border-gray-700"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoiceChat;
