import React, { useRef } from "react";
import { Paperclip, Smile, Send, Image, File, Video, X } from "lucide-react";

const ChatInput = ({
  message,
  onInputChange,
  onSendMessage,
  onEmojiSelect,
  showEmojiPicker,
  setShowEmojiPicker,
  showAttachmentMenu,
  setShowAttachmentMenu,
  onAttachmentClick,
}) => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="relative p-4">
        {showAttachmentMenu && (
          <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onAttachmentClick("image")}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Image className="h-5 w-5 text-amber-500" />
                <span className="text-sm">Photo</span>
              </button>
              <button
                onClick={() => onAttachmentClick("file")}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <File className="h-5 w-5 text-amber-500" />
                <span className="text-sm">File</span>
              </button>
              <button
                onClick={() => onAttachmentClick("video")}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Video className="h-5 w-5 text-amber-500" />
                <span className="text-sm">Video</span>
              </button>
              <button
                onClick={() => setShowAttachmentMenu(false)}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="h-5 w-5 text-red-500" />
                <span className="text-sm">Cancel</span>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <Paperclip className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>

          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={onInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              rows="1"
              style={{ minHeight: "40px", maxHeight: "120px" }}
            />
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
                {/* Emoji picker component would go here */}
                <div className="p-2 text-center text-gray-500">
                  Emoji picker coming soon
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <Smile className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>

          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
