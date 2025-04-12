import React, { useState, useEffect, useRef } from "react";
import { Send, X, Loader2, MessageCircle, Phone } from "lucide-react";
import VoiceChat from "./VoiceChat";

const TalkMe = ({ isOpen, onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);

  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize WebSocket connection
  useEffect(() => {
    if (isOpen) {
      wsRef.current = new WebSocket("ws://localhost:5000/chat");

      wsRef.current.onopen = () => {
        setIsConnected(true);
        addMessage(
          "system",
          "Connected to Kuriftu Guide. How can I help you today?"
        );
      };

      wsRef.current.onmessage = handleWebSocketMessage;

      wsRef.current.onclose = () => {
        setIsConnected(false);
        addMessage("system", "Connection lost. Please try again later.");
      };

      return () => {
        if (wsRef.current) {
          wsRef.current.close();
        }
      };
    }
  }, [isOpen]);

  // Handle WebSocket messages
  const handleWebSocketMessage = async (event) => {
    try {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "CHAT_RESPONSE":
          setIsTyping(false);
          addMessage("ai", data.message);
          break;
        case "TYPING_START":
          setIsTyping(true);
          break;
        case "TYPING_END":
          setIsTyping(false);
          break;
        case "ERROR":
          console.error("Server error:", data.error);
          setIsTyping(false);
          addMessage(
            "system",
            "Sorry, something went wrong. Please try again."
          );
          break;
      }
    } catch (error) {
      console.error("Error handling message:", error);
      setIsTyping(false);
      addMessage("system", "An error occurred while processing the message.");
    }
  };

  // Add message to chat
  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text, timestamp: new Date() }]);
  };

  // Send message
  const sendMessage = () => {
    if (inputText.trim() && wsRef.current && isConnected) {
      addMessage("user", inputText);
      setIsTyping(true);

      wsRef.current.send(
        JSON.stringify({
          type: "CHAT_MESSAGE",
          message: inputText,
        })
      );

      setInputText("");
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl h-[85vh] mx-4 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-6 w-6 text-white" />
                <h2 className="text-white text-xl font-light">Kuriftu Guide</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsVoiceChatOpen(true)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  title="Start Voice Chat"
                >
                  <Phone className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[calc(85vh-180px)] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : message.sender === "system"
                    ? "justify-center"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === "user"
                      ? "bg-amber-500 text-white"
                      : message.sender === "system"
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows="1"
                  disabled={!isConnected}
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 resize-none"
                />
                {inputText && (
                  <button
                    onClick={sendMessage}
                    disabled={!isConnected}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-amber-500 hover:text-amber-600 transition-colors disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isConnected ? "Connected" : "Disconnected"} • Press Enter to
                send
              </p>
            </div>
          </div>
        </div>
      </div>

      <VoiceChat
        isOpen={isVoiceChatOpen}
        onClose={() => setIsVoiceChatOpen(false)}
      />
    </>
  );
};

export default TalkMe;
