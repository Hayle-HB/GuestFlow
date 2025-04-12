import React, { useState } from "react";
import { FaPaperPlane, FaUser, FaUserTie } from "react-icons/fa";

const UserReplay = ({ feedback }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: "guest",
      message: feedback.description,
      timestamp: feedback.date,
      name: feedback.guest,
    },
    {
      id: 2,
      sender: "admin",
      message:
        "Thank you for reporting this issue. Our maintenance team has been notified and will address it shortly.",
      timestamp: "2024-03-15 15:00",
      name: "Maintenance Team",
    },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: chatHistory.length + 1,
      sender: "admin",
      message: message.trim(),
      timestamp: new Date().toISOString(),
      name: "Maintenance Team",
    };

    setChatHistory([...chatHistory, newMessage]);
    setMessage("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">
          {feedback.title}
        </h3>
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
          <span className="flex items-center">
            <FaUser className="mr-1" /> {feedback.guest}
          </span>
          <span>Room {feedback.room}</span>
          <span>{feedback.date}</span>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "admin" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === "admin"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <div className="flex items-center mb-1">
                {msg.sender === "admin" ? (
                  <FaUserTie className="mr-2 text-blue-600" />
                ) : (
                  <FaUser className="mr-2 text-gray-600" />
                )}
                <span className="font-medium">{msg.name}</span>
              </div>
              <p className="text-sm">{msg.message}</p>
              <span className="text-xs text-gray-500 mt-1 block">
                {new Date(msg.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your response..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserReplay;
