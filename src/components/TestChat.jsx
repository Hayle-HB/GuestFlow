import React, { useEffect, useRef, useState } from "react";

const TestChat = () => {
  const chatId = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize chat configuration
    window.ChatWidgetConfig = {
      webhook: {
        url: "https://strikerealty.app.n8n.cloud/webhook/5397f135-5628-4b4d-b6f0-6a869f5640e8/chat",
        route: "general",
      },
      style: {
        primaryColor: "#4F46E5",
        secondaryColor: "#6366F1",
        backgroundColor: "#ffffff",
        fontColor: "#333333",
      },
    };

    // Generate or retrieve chat ID
    const getChatId = () => {
      let id = sessionStorage.getItem("chatId");
      if (!id) {
        id = "chat_" + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem("chatId", id);
      }
      return id;
    };

    chatId.current = getChatId();
  }, []);

  const handleSendMessage = async () => {
    const message = inputMessage.trim();
    if (!message) return;

    console.log("=== Starting Message Process ===");
    console.log("1. Input Message:", message);

    // Add user message to chat
    console.log("2. Adding user message to chat state");
    setMessages((prev) => {
      const newMessages = [...prev, { type: "user", content: message }];
      console.log("Current messages after adding user:", newMessages);
      return newMessages;
    });
    setInputMessage("");

    try {
      const requestData = {
        chatId: chatId.current,
        message: message,
        route: window.ChatWidgetConfig.webhook.route,
      };

      console.log("3. Preparing request data:", requestData);
      console.log("4. Webhook URL:", window.ChatWidgetConfig.webhook.url);

      console.log("5. Sending request to webhook...");
      const response = await fetch(window.ChatWidgetConfig.webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      console.log("6. Raw response received:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      const data = await response.json();
      console.log("7. Parsed response data:", JSON.stringify(data, null, 2));

      // Extract the guest_response from the output object
      let botResponse;
      console.log("8. Processing response data...");

      if (data && typeof data === "object") {
        console.log("8.1 Response is an object");
        if (data.output) {
          console.log("8.2 Output object found:", data.output);
          // Check if output is an object with guest_response
          if (typeof data.output === "object" && data.output.guest_response) {
            botResponse = data.output.guest_response;
            console.log("8.3 Extracted guest_response:", botResponse);
          } else {
            console.log("8.3 No guest_response found in output");
          }
        } else {
          console.log("8.2 No output property found in response");
        }
      } else {
        console.log("8.1 Response is not an object:", typeof data);
      }

      if (!botResponse) {
        console.log("9. No valid response found, using fallback message");
        botResponse = "Sorry, I couldn't understand that.";
      }

      console.log("10. Final bot response to be displayed:", botResponse);

      // Add bot response to chat
      console.log("11. Updating chat with bot response...");
      setMessages((prev) => {
        const newMessages = [...prev, { type: "bot", content: botResponse }];
        console.log("12. Messages after adding bot response:", newMessages);
        return newMessages;
      });

      console.log("=== Message Process Complete ===");
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      console.log("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });

      setMessages((prev) => {
        const newMessages = [
          ...prev,
          {
            type: "bot",
            content: "Sorry, there was an error processing your message.",
          },
        ];
        console.log("Error state - messages after error:", newMessages);
        return newMessages;
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Chat Support</h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Online</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg
                className="w-16 h-16 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-lg">Start a conversation</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    message.type === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="bg-white border-t p-4 shadow-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border border-gray-200 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors shadow-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestChat;
