import { useState } from 'react'

export default function StakeholderPage() {
  const [activeRole, setActiveRole] = useState('product')
  const [conversation, setConversation] = useState([
    { role: 'AI', text: 'I see conflicting requirements about transaction limits' }
  ])

  const roles = {
    product: { name: 'Product Manager', color: 'bg-blue-100 text-blue-800' },
    legal: { name: 'Legal Team', color: 'bg-purple-100 text-purple-800' },
    security: { name: 'Security', color: 'bg-red-100 text-red-800' }
  }

  const handleResponse = (response) => {
    setConversation([...conversation, 
      { role: activeRole, text: response },
      { role: 'AI', text: generateAIResponse(response) }
    ])
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-[#012169] mb-6">Stakeholder Negotiation</h1>
      
      <div className="flex gap-2 mb-6">
        {Object.entries(roles).map(([key, { name, color }]) => (
          <button
            key={key}
            onClick={() => setActiveRole(key)}
            className={`px-4 py-2 rounded-full text-sm ${color} ${
              activeRole === key ? 'ring-2 ring-[#012169]' : ''
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="space-y-4 mb-6 h-64 overflow-y-auto p-4 border rounded-lg">
        {conversation.map((msg, i) => (
          <div key={i} className={`p-3 rounded-lg ${
            msg.role === 'AI' ? 'bg-gray-50' : roles[msg.role].color
          }`}>
            <div className="font-semibold">
              {msg.role === 'AI' ? 'AI Mediator' : roles[msg.role].name}
            </div>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <input
          type="text"
          placeholder={`Respond as ${roles[activeRole].name}...`}
          className="flex-1 p-2 border rounded-lg"
          onKeyPress={(e) => e.key === 'Enter' && handleResponse(e.target.value)}
        />
        <button className="bg-[#012169] text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </div>
    </div>
  )
}

// Mock AI response generator
function generateAIResponse(input) {
  const responses = [
    "How about we compromise with £10,000 daily limits?",
    "Let me check PCI-DSS compliance for that approach",
    "Security recommends adding 2FA for this feature"
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}