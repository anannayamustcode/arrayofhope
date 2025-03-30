import { useState, useEffect } from "react";

export default function ChatPopup() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    if (savedMessages) {
      setMessages(savedMessages);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { sender: "user", text: input }];
      setMessages(newMessages);
      setInput("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          sender: "AI",
          text: "Thanks for your input! What else can I help with?",
        };
        setMessages([...newMessages, aiResponse]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-[#012169] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#00194A] transition-all"
      >
        💬 Chat
      </button>

      {/* Chatbox Popup */}
      {isOpen && (
        <div className="fixed top-[60px] right-0 w-80 h-[calc(100%-60px)] bg-white shadow-lg border-l border-gray-300 flex flex-col">
          {/* Chat Header */}
          <div className="flex justify-between items-center bg-[#012169] text-white p-4">
            <h3 className="text-lg font-semibold">Chat Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-lg hover:text-gray-300"
            >
              ✖
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border ${msg.sender === "AI" ? "bg-blue-100" : "bg-gray-100 ml-8"}`}
              >
                <div className="font-semibold text-black">
                  {msg.sender === "AI" ? "AI Assistant" : "You"}
                </div>
                <p className="text-black">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="p-4 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 border rounded-lg text-black"
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="w-full mt-2 bg-[#012169] text-white px-4 py-2 rounded-lg border-2 border-black"
            >
              Send
            </button>
          </div>


        </div>
      )}
    </>
  );
}
