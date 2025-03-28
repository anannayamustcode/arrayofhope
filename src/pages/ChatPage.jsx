import { useState } from 'react'
import PriorityBadge from '../components/PriorityBadge'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'I found a requirement about user authentication. Should we include biometric verification?' },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }])
      setInput('')
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="space-y-4 mb-6 h-96 overflow-y-auto p-4 border-2  rounded-lg">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg border-2 border-gray-100 ${msg.sender === 'AI' ? 'bg-blue-50' : 'bg-gray-50 ml-8'}`}
          >
            <div className="font-semibold text-black">
              {msg.sender === 'AI' ? 'AI Analyst' : 'You'}
            </div>
            <p className="text-black">{msg.text}</p>
          </div>
        ))}
      </div>
      
      <div className="flex space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response..."
          className="flex-1 p-2 border-2 border-black rounded-lg text-black"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-[#012169] text-white px-4 py-2 rounded-lg border-2 border-black"
        >
          Send
        </button>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-2 text-black">Set Priority:</h3>
        <div className="flex space-x-2">
          <PriorityBadge priority="Must Have" />
          <PriorityBadge priority="Should Have" />
          <PriorityBadge priority="Could Have" />
          <PriorityBadge priority="Won't Have" />
        </div>
      </div>
    </div>
  )
}