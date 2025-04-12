import React from "react";
import { Check, CheckCheck, Clock, File } from "lucide-react";
import { formatTime } from "../utils/chatHelpers";

const ChatMessage = ({ message, getAvatarColor }) => {
  const isUser = message.sender === "user";
  const avatarColor = getAvatarColor(message.sender);

  const renderMessageContent = () => {
    switch (message.type) {
      case "text":
        return <div className="text-sm">{message.text}</div>;
      case "image":
        return (
          <div className="rounded-lg overflow-hidden">
            <img
              src={message.url}
              alt="Shared image"
              className="max-w-xs rounded-lg"
            />
          </div>
        );
      case "file":
        return (
          <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <File className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800 dark:text-white">
                {message.fileName}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {message.fileSize}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex items-end mb-4 ${isUser ? "justify-end" : "space-x-2"}`}
    >
      {!isUser && (
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${avatarColor}`}
        >
          {message.sender.charAt(0).toUpperCase()}
        </div>
      )}

      <div
        className={`flex flex-col ${
          isUser ? "items-end" : "items-start"
        } max-w-[70%]`}
      >
        <div
          className={`rounded-2xl px-4 py-2 ${
            isUser
              ? "bg-amber-500 text-white rounded-br-none"
              : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none"
          }`}
        >
          {renderMessageContent()}
        </div>

        <div
          className={`flex items-center space-x-1 mt-1 ${
            isUser ? "flex-row-reverse space-x-reverse" : ""
          }`}
        >
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatTime(message.timestamp)}
          </span>
          {isUser && (
            <div className="flex items-center">
              {message.read ? (
                <CheckCheck className="h-3 w-3 text-blue-500" />
              ) : message.sent ? (
                <Check className="h-3 w-3 text-gray-400" />
              ) : (
                <Clock className="h-3 w-3 text-gray-400" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
