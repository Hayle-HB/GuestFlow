import {
  MessageSquare,
  MessageCircle,
  Award,
  Star,
  HelpCircle,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Demo data for chat list
export const initialChatList = [
  {
    id: "recommendations",
    name: "Recommendations",
    type: "recommendations",
    category: "Guest Services",
    lastMessage: "Get personalized recommendations for your stay",
    unread: 0,
    online: true,
    avatar: "RC",
    timestamp: new Date().toISOString(),
    read: true,
    status: "Online",
    role: "Recommendation Assistant",
  },
  {
    id: "feedback",
    name: "Issue Feedback",
    type: "feedback",
    category: "Guest Services",
    lastMessage: "Share your experience and help us improve",
    unread: 0,
    online: true,
    avatar: "FB",
    timestamp: new Date().toISOString(),
    read: true,
    status: "Online",
    role: "Feedback Team",
  },
  {
    id: "loyalty",
    name: "Loyalty Engagement",
    type: "loyalty",
    category: "Rewards",
    lastMessage: "Check your points and exclusive perks",
    unread: 2,
    online: true,
    avatar: "LP",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    status: "Online",
    role: "Loyalty Manager",
  },
  {
    id: "support",
    name: "Support",
    type: "support",
    category: "Guest Services",
    lastMessage: "Need help? We're here 24/7",
    unread: 0,
    online: true,
    avatar: "SP",
    timestamp: new Date().toISOString(),
    read: true,
    status: "Online",
    role: "Support Agent",
  },
];

// Initial messages for each chat type
export const initialMessages = {
  recommendations: [
    {
      id: "1",
      text: "Welcome to Recommendations! How can I help you discover our services?",
      sender: "recommendations",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      type: "text",
    },
  ],
  feedback: [
    {
      id: "1",
      text: "Welcome to Feedback! We value your input to improve our services.",
      sender: "feedback",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      type: "text",
    },
  ],
  loyalty: [
    {
      id: "1",
      text: "Welcome to Loyalty! Let's check your rewards and benefits.",
      sender: "loyalty",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      type: "text",
    },
  ],
  support: [
    {
      id: "1",
      text: "Welcome to Support! How can we assist you today?",
      sender: "support",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
      type: "text",
    },
  ],
};

// Helper functions
export const renderChatIcon = (type) => {
  switch (type) {
    case "recommendations":
      return <Star className="h-5 w-5 text-amber-600" />;
    case "feedback":
      return <MessageCircle className="h-5 w-5 text-amber-600" />;
    case "loyalty":
      return <Award className="h-5 w-5 text-amber-600" />;
    case "support":
      return <HelpCircle className="h-5 w-5 text-amber-600" />;
    default:
      return <MessageSquare className="h-5 w-5 text-amber-600" />;
  }
};

export const getCategoryLabel = (type) => {
  switch (type) {
    case "recommendations":
      return "Recommendations";
    case "feedback":
      return "Issue Feedback";
    case "loyalty":
      return "Loyalty Engagement";
    case "support":
      return "Support";
    default:
      return type;
  }
};

// Filter and group chats
export const filterAndGroupChats = (chats, query) => {
  const filtered = query
    ? chats.filter(
        (chat) =>
          chat.name.toLowerCase().includes(query.toLowerCase()) ||
          chat.lastMessage.toLowerCase().includes(query.toLowerCase())
      )
    : chats;

  return filtered.reduce((acc, chat) => {
    const category = chat.category || "other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(chat);
    return acc;
  }, {});
};

// Get random response for chat type
export const getRandomResponse = (chatType) => {
  const responses = {
    recommendations: [
      "Based on your preferences, I recommend trying our signature spa treatment.",
      "You might enjoy our sunset yoga session at the beach.",
      "Our chef's special tasting menu would be perfect for your anniversary dinner.",
    ],
    feedback: [
      "Thank you for sharing your feedback. We'll address this immediately.",
      "We appreciate your input and will use it to improve our services.",
      "Your feedback is valuable to us. We'll make sure to implement your suggestions.",
    ],
    loyalty: [
      "You've earned 500 points for your recent stay!",
      "As a gold member, you're eligible for a complimentary spa treatment.",
      "Your loyalty points can be redeemed for a free night's stay.",
    ],
    support: [
      "How can I assist you today?",
      "I'll help you resolve this issue right away.",
      "Let me connect you with the appropriate department.",
    ],
  };

  const chatResponses = responses[chatType] || ["Thank you for your message."];
  return chatResponses[Math.floor(Math.random() * chatResponses.length)];
};

// Custom hook for chat functionality
export const useChat = () => {
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chatList, setChatList] = useState(initialChatList);
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [listSearchQuery, setListSearchQuery] = useState("");

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat, messages]);

  const handleChatSelect = (chatType) => {
    setActiveChat(chatType);
    setChatList((prev) =>
      prev.map((chat) =>
        chat.type === chatType ? { ...chat, unread: 0 } : chat
      )
    );
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setIsTyping(true);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && activeChat) {
      const newMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: "user",
        timestamp: new Date().toISOString(),
        read: false,
        sent: true,
        type: "text",
      };

      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), newMessage],
      }));

      setChatList((prev) =>
        prev.map((chat) =>
          chat.type === activeChat
            ? {
                ...chat,
                lastMessage: message,
                timestamp: new Date().toISOString(),
                unread: 0,
              }
            : chat
        )
      );

      setMessage("");

      setTimeout(() => {
        setMessages((prev) => ({
          ...prev,
          [activeChat]: prev[activeChat].map((msg) =>
            msg.id === newMessage.id ? { ...msg, read: true } : msg
          ),
        }));

        const responseMessage = {
          id: Date.now().toString(),
          text: getRandomResponse(activeChat),
          sender: activeChat,
          timestamp: new Date().toISOString(),
          read: false,
          sent: true,
          type: "text",
        };

        setMessages((prev) => ({
          ...prev,
          [activeChat]: [...prev[activeChat], responseMessage],
        }));

        setChatList((prev) =>
          prev.map((chat) =>
            chat.type === activeChat
              ? {
                  ...chat,
                  lastMessage: responseMessage.text,
                  timestamp: new Date().toISOString(),
                  unread: chat.type !== activeChat ? 1 : 0,
                }
              : chat
          )
        );

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 1000);
      }, Math.random() * 1000 + 1000);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleAttachmentClick = (type) => {
    console.log(`Attaching ${type}`);
    setShowAttachmentMenu(false);
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
  };

  return {
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
  };
};
