import React from "react";
import { useNavigate } from "react-router-dom";
import ChatHeader from "./components/ChatHeader";
import ChatList from "./components/ChatList";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import ConversationHeader from "./components/ConversationHeader";
import { getAvatarColor } from "./utils/chatHelpers";
import {
  MessageSquare,
  Search,
  MoreVertical,
  Phone,
  Video,
  Image,
  File,
  Smile,
  Bot,
  MessageCircle,
  Award,
  Star,
  Heart,
  Calendar,
  BedDouble,
  Wrench,
} from "lucide-react";
import {
  useChat,
  renderChatIcon,
  getCategoryLabel,
  filterAndGroupChats,
} from "./chatLogic/chatLogic";

const WelcomeScreen = () => (
  <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center space-y-6 max-w-md mx-auto p-8">
      <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto">
        <MessageSquare className="h-10 w-10 text-amber-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Welcome to Kuriftu Chat
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Select a conversation type from the left to start messaging. Our team is
        here to assist you with any inquiries or requests.
      </p>
    </div>
  </div>
);

const Chat = () => {
  const navigate = useNavigate();
  const {
    message,
    activeChat,
    isTyping,
    showEmojiPicker,
    chatList,
    messages,
    searchQuery,
    showAttachmentMenu,
    listSearchQuery,
    messagesEndRef,
    textareaRef,
    setMessage,
    setActiveChat,
    setIsTyping,
    setShowEmojiPicker,
    setChatList,
    setMessages,
    setSearchQuery,
    setShowAttachmentMenu,
    setListSearchQuery,
    handleChatSelect,
    handleInputChange,
    handleSendMessage,
    handleEmojiSelect,
    handleAttachmentClick,
    handleSettingsClick,
  } = useChat();

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <ChatHeader onBackClick={() => navigate("/user")} />

      <div className="flex-1 flex overflow-hidden">
        <ChatList
          chatList={chatList}
          activeChat={activeChat}
          onChatSelect={handleChatSelect}
          searchQuery={listSearchQuery}
          onSearchChange={setListSearchQuery}
          onSettingsClick={handleSettingsClick}
          groupedChats={filterAndGroupChats(chatList, listSearchQuery)}
          renderChatIcon={renderChatIcon}
          getCategoryLabel={getCategoryLabel}
        />

        {activeChat ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <ConversationHeader
              activeChat={activeChat}
              chatList={chatList}
              getAvatarColor={getAvatarColor}
            />

            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                {messages[activeChat]?.map((msg, index) => (
                  <React.Fragment key={msg.id}>
                    {(index === 0 ||
                      new Date(
                        messages[activeChat][index - 1].timestamp
                      ).toDateString() !==
                        new Date(msg.timestamp).toDateString()) && (
                      <div className="flex items-center justify-center my-4">
                        <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(msg.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                    <ChatMessage
                      message={msg}
                      getAvatarColor={getAvatarColor}
                    />
                  </React.Fragment>
                ))}
                {isTyping && (
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Typing...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <ChatInput
              message={message}
              textareaRef={textareaRef}
              showEmojiPicker={showEmojiPicker}
              onInputChange={handleInputChange}
              onSendMessage={handleSendMessage}
              onEmojiSelect={handleEmojiSelect}
              setShowEmojiPicker={setShowEmojiPicker}
              showAttachmentMenu={showAttachmentMenu}
              setShowAttachmentMenu={setShowAttachmentMenu}
              onAttachmentClick={handleAttachmentClick}
            />
          </div>
        ) : (
          <WelcomeScreen />
        )}
      </div>
    </div>
  );
};

export default Chat;
