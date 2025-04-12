// Generate consistent avatar colors based on sender
export const getAvatarColor = (sender) => {
  const colors = [
    "bg-amber-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  const index = sender
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

// Format timestamp to readable time
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;

  // Less than 24 hours
  if (diff < 86400000) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  // Less than 7 days
  if (diff < 604800000) {
    return date.toLocaleDateString([], { weekday: "short" });
  }
  // More than 7 days
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

// Create a new message object
export const createMessage = (
  text,
  sender,
  type = "text",
  additionalData = {}
) => {
  return {
    id: Date.now().toString(),
    text,
    sender,
    timestamp: new Date().toISOString(),
    read: false,
    sent: false,
    type,
    ...additionalData,
  };
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Generate a random response for demo purposes
export const getRandomResponse = (chatType) => {
  const responses = {
    support: [
      "Thank you for your message. Our team will get back to you shortly.",
      "We appreciate your patience. How can we assist you further?",
      "Is there anything specific you'd like to know about our services?",
    ],
    ai: [
      "I understand your request. Let me help you with that.",
      "Based on your query, here's what I found...",
      "Would you like me to provide more details about that?",
    ],
    vip: [
      "Your request has been noted. We'll take care of it right away.",
      "As a VIP guest, you have access to exclusive services.",
      "Would you like to schedule a personal consultation?",
    ],
    spa: [
      "We'll arrange that for you. Is there anything else you'd like to add?",
      "Your wellness is our priority. How else can we help you relax?",
      "Would you like to know more about our signature treatments?",
    ],
  };

  const chatResponses = responses[chatType] || responses.support;
  return chatResponses[Math.floor(Math.random() * chatResponses.length)];
};
