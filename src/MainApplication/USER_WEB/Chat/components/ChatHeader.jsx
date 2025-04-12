import React from "react";
import { ArrowLeft, Search, MoreVertical } from "lucide-react";

const ChatHeader = ({ onBackClick }) => {
  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBackClick}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:translate-x-[-2px] transition-transform" />
          <span>Back to Home</span>
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
