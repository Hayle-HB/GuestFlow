import React from "react";
import { Phone, Video, MoreVertical, Circle } from "lucide-react";

const ConversationHeader = ({ activeChat, chatList }) => {
  const currentChat = chatList.find((chat) => chat.type === activeChat);

  const handleVoiceCall = () => {
    console.log("Voice call initiated with:", currentChat.name);
  };

  const handleVideoCall = () => {
    console.log("Video call initiated with:", currentChat.name);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <span className="text-lg font-medium text-amber-600">
                {currentChat?.name.charAt(0)}
              </span>
            </div>
            {currentChat?.online && (
              <div className="absolute bottom-0 right-0">
                <Circle className="h-3 w-3 text-green-500 fill-current" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-800 dark:text-white">
              {currentChat?.name}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              {currentChat?.online ? (
                <>
                  <Circle className="h-2 w-2 text-green-500 fill-current mr-1" />
                  Online
                </>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleVoiceCall}
            className="p-2 text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Phone className="h-5 w-5" />
          </button>
          <button
            onClick={handleVideoCall}
            className="p-2 text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Video className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
