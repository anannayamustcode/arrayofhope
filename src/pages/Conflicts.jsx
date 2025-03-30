import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SummaryPage () {
  const navigate = useNavigate(); // ✅ Moved inside the component
  const [activeRole, setActiveRole] = useState("product");
  const [conversation, setConversation] = useState([
    { role: "AI", text: "I see conflicting requirements about transaction limits." }
  ]);
  const [input, setInput] = useState("");

  const roles = {
    product: { name: "Product Manager", color: "!bg-gray-300 text-blue-800" },
    legal: { name: "Legal Team", color: "!bg-gray-300 text-purple-800" },
    security: { name: "Security", color: "!bg-gray-300 text-red-800" }
  };

  const handleResponse = () => {
    if (!input.trim()) return;

    setConversation([
      ...conversation,
      { role: activeRole, text: input },
      { role: "AI", text: generateAIResponse(input) }
    ]);

    setInput(""); // ✅ Clear input after sending

    // Navigate to a summary page after discussion
    setTimeout(() => {
      navigate("/summary"); // Change "/summary" to the actual route
    }, 3000); // Wait 3 seconds before navigating
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-[#012169] mb-6">Negotiation</h1>

      {/* Role Selection */}
      <div className="flex gap-2 mb-6">
        {Object.entries(roles).map(([key, { name, color }]) => (
          <button
            key={key}
            onClick={() => setActiveRole(key)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              activeRole === key ? "ring-2 ring-[#012169]" : "opacity-80 hover:opacity-100"
            } ${color}`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Chat Box */}
      <div className="space-y-4 mb-6 h-64 overflow-y-auto p-4 border rounded-lg bg-gray-50">
        {conversation.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg shadow-sm ${
              msg.role === "AI" ? "bg-gray-200 text-black" : `${roles[msg.role]?.color || "bg-gray-300"}`
            }`}
          >
            <div className="font-semibold">{msg.role === "AI" ? "AI Mediator" : roles[msg.role].name}</div>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder={`Respond as ${roles[activeRole].name}...`}
          className="flex-1 p-2 border rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleResponse()}
        />
        <button 
          className="bg-[#012169] text-white px-4 py-2 rounded-lg hover:bg-[#011a4b] transition"
          onClick={handleResponse}
        >
          Send
        </button>
      </div>
    </div>
  );
}

// Mock AI response generator
function generateAIResponse(input) {
  const responses = [
    "How about we compromise with £10,000 daily limits?",
    "Let me check PCI-DSS compliance for that approach.",
    "Security recommends adding 2FA for this feature.",
    "Legal team suggests adding a clause for fraud protection.",
    "Product team believes this could improve user experience."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
