import React from "react";
import {
  MessageSquare,
  Bot,
  Search,
  Star,
  MessageCircle,
  Settings,
  Heart,
  Award,
} from "lucide-react";

const ChatList = ({
  chatList = [],
  activeChat,
  onChatSelect,
  searchQuery,
  onSearchChange,
  onSettingsClick,
  groupedChats,
  renderChatIcon,
  getCategoryLabel,
}) => {
  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Kuriftu Resort Chat
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.entries(groupedChats).map(([category, chats]) => (
          <div key={category} className="py-2">
            <div className="px-4 py-2">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {category}
              </h3>
            </div>
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat.type)}
                className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  activeChat === chat.type
                    ? "bg-amber-50 dark:bg-amber-900/20"
                    : ""
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                    {renderChatIcon(chat.type)}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {getCategoryLabel(chat.type)}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {new Date(chat.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onSettingsClick}
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400"
        >
          <Settings className="h-4 w-4" />
          <span>Chat Settings</span>
        </button>
      </div>
    </div>
  );
};

export default ChatList;
