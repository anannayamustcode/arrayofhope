export default function ComplianceAlert({ message, severity = 'medium' }) {
    const colors = {
      high: 'bg-red-50 text-red-800 border-red-200',
      medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      low: 'bg-green-50 text-green-800 border-green-200'
    }
  
    const icons = {
      high: '⚠️',
      medium: 'ℹ️',
      low: '✓'
    }
  
    return (
      <div className={`${colors[severity]} border-l-4 p-4 rounded`}>
        <div className="flex items-start">
          <span className="mr-2">{icons[severity]}</span>
          <p>{message}</p>
        </div>
      </div>
    )
  }