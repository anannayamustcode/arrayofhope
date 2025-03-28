import ComplianceAlert from '../components/ComplianceAlert'
import PriorityBadge from '../components/PriorityBadge'

export default function ReviewPage() {
  const requirements = [
    {
      id: 1,
      title: 'User Authentication',
      description: 'System must authenticate users via biometric verification',
      type: 'Functional',
      priority: 'Must Have'
    },
    {
      id: 2,
      title: 'Transaction Speed',
      description: 'Payments must process within 2 seconds',
      type: 'Non-Functional',
      priority: 'Should Have'
    }
  ]

  const gaps = [
    'No timeout specified for login session',
    'Password complexity requirements not defined'
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-[#012169] mb-6">Review Requirements</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Requirements Column */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Extracted Requirements</h2>
          <div className="space-y-4">
            {requirements.map((req) => (
              <div key={req.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{req.title}</h3>
                  <PriorityBadge priority={req.priority} />
                </div>
                <p className="text-gray-600 mt-1">{req.description}</p>
                <span className="inline-block mt-2 text-sm px-2 py-1 bg-gray-100 rounded">
                  {req.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gaps Column */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Gaps & Issues</h2>
          <div className="space-y-3">
            {gaps.map((gap, i) => (
              <ComplianceAlert 
                key={i}
                message={gap}
                severity={i === 0 ? 'high' : 'medium'}
              />
            ))}
          </div>
          <button className="mt-6 bg-[#012169] text-white px-4 py-2 rounded-lg">
            Generate Stakeholder Questions
          </button>
        </div>
      </div>
    </div>
  )
}