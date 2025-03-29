// pages/Chat.js
import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "Alice", text: "Hey team, how’s it going?" },
    { sender: "Bob", text: "Working on backend updates!" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { sender: "You", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col h-screen">
        <h2 className="text-2xl font-bold mb-4">Team Chat</h2>
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 rounded">
          {messages.map((msg, index) => (
            <div key={index} className="mb-3">
              <span className="font-semibold">{msg.sender}:</span> {msg.text}
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
