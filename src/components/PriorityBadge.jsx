export default function PriorityBadge({ priority }) {
    const styles = {
      'Must Have': 'bg-red-100 text-red-800',
      'Should Have': 'bg-blue-100 text-blue-800',
      'Could Have': 'bg-green-100 text-green-800',
      'Won\'t Have': 'bg-gray-100 text-gray-800'
    }
  
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${styles[priority]}`}>
        {priority}
      </span>
    )
  }