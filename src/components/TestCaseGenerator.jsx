import { useState } from 'react'

export default function TestCaseGenerator({ requirement }) {
  const [testCases, setTestCases] = useState([])
  
  const generateTestCases = () => {
    // Mock generation based on requirement type
    const generated = []
    
    if (/authentication/i.test(requirement)) {
      generated.push(
        'Verify user can login with valid credentials',
        'Verify login fails with invalid password',
        'Verify session expires after 30 minutes'
      )
    }
    
    if (/payment/i.test(requirement)) {
      generated.push(
        'Verify £10,000 transaction succeeds',
        'Verify £15,000 transaction fails',
        'Verify payment confirmation email sends'
      )
    }
    
    setTestCases(generated)
  }

  return (
    <div className="mt-4 border-t pt-4">
      <button 
        onClick={generateTestCases}
        className="flex items-center gap-2 text-sm bg-[#012169] text-white px-3 py-1 rounded"
      >
        <span>🧪</span> Generate Test Cases
      </button>
      
      {testCases.length > 0 && (
        <ul className="mt-2 space-y-1 pl-5 list-disc text-sm">
          {testCases.map((tc, i) => (
            <li key={i}>{tc}</li>
          ))}
        </ul>
      )}
    </div>
  )
}