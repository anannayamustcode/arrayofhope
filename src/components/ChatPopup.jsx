import { useState } from "react";

export default function ChatPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "AI", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "User", text: input }]);
      setInput("");
    }
  };

  return (
    <>
      {/* Chat Open Button */}
      <button
        className="fixed bottom-14 right-6 !bg-[#012169] text-white p-4 !rounded-full shadow-lg hover:bg-[#0038a8] transition-all"
        onClick={() => setIsOpen(true)}
      >
        💬
      </button>

      {/* Chat Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[27%] max-w-sm bg-white shadow-lg border-l transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-100">
          <h2 className="text-lg font-semibold text-black">Chat</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-black text-2xl"
          >
            ✖
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border ${
                msg.sender === "AI"
                  ? "bg-blue-100 text-black self-start"
                  : "bg-gray-200 text-black self-end"
              }`}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-gray-100 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg text-black"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-2 !bg-[#012169] text-white px-4 py-2 rounded-lg"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
