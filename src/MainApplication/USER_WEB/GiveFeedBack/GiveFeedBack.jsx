import React, { useState, useEffect, useRef } from "react";
import { Star, Send, Smile } from "lucide-react";

const GiveFeedBack = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "👋 Hello! I'm your feedback assistant. I'd love to hear about your stay at Kuriftu Twin!",
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roomNumber: "",
    rating: 0,
    cleanliness: 0,
    service: 0,
    comfort: 0,
    comment: "",
  });

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content, type = "user") => {
    setMessages((prev) => [...prev, { type, content }]);
  };

  const handleSend = () => {
    if (!currentInput.trim()) return;

    addMessage(currentInput);

    switch (currentStep) {
      case 0:
        setFormData((prev) => ({ ...prev, name: currentInput }));
        addMessage(
          "Great to meet you! Could you share your email address so we can follow up if needed?",
          "bot"
        );
        break;
      case 1:
        setFormData((prev) => ({ ...prev, email: currentInput }));
        addMessage("Thanks! And what's your room number?", "bot");
        break;
      case 2:
        setFormData((prev) => ({ ...prev, roomNumber: currentInput }));
        addMessage(
          "How would you rate your overall experience? (Type a number 1-5)",
          "bot"
        );
        break;
      case 3:
        const rating = parseInt(currentInput);
        if (rating >= 1 && rating <= 5) {
          setFormData((prev) => ({ ...prev, rating }));
          addMessage("How was the cleanliness of your room? (1-5)", "bot");
        }
        break;
      case 4:
        const cleanliness = parseInt(currentInput);
        if (cleanliness >= 1 && cleanliness <= 5) {
          setFormData((prev) => ({ ...prev, cleanliness }));
          addMessage("How would you rate our service? (1-5)", "bot");
        }
        break;
      case 5:
        const service = parseInt(currentInput);
        if (service >= 1 && service <= 5) {
          setFormData((prev) => ({ ...prev, service }));
          addMessage("How comfortable was your room? (1-5)", "bot");
        }
        break;
      case 6:
        const comfort = parseInt(currentInput);
        if (comfort >= 1 && comfort <= 5) {
          setFormData((prev) => ({ ...prev, comfort }));
          addMessage(
            "Finally, please share any additional thoughts or suggestions!",
            "bot"
          );
        }
        break;
      case 7:
        setFormData((prev) => ({ ...prev, comment: currentInput }));
        handleSubmitFeedback();
        break;
    }

    setCurrentInput("");
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmitFeedback = () => {
    addMessage(
      "Thank you so much for your valuable feedback! We'll use this to improve our services. 🌟",
      "bot"
    );
    console.log(formData);
    // TODO: Submit feedback to backend
  };

  const RatingStars = ({ value }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= value
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  const Message = ({ message }) => {
    const isBot = message.type === "bot";
    return (
      <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
        <div
          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
            isBot ? "bg-gray-100 text-gray-800" : "bg-amber-600 text-white"
          }`}
        >
          <p className="text-sm">{message.content}</p>
          {message.rating && <RatingStars value={message.rating} />}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-amber-600 p-4">
            <h2 className="text-xl font-semibold text-white">
              Kuriftu Feedback Chat
            </h2>
            <p className="text-amber-100 text-sm">
              We'd love to hear from you!
            </p>
          </div>

          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t p-4 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 rounded-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 px-4 py-2"
              />
              <button
                onClick={handleSend}
                className="rounded-full p-2 bg-amber-600 text-white hover:bg-amber-700 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveFeedBack;
