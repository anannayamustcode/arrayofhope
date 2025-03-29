export default function PriorityBadge({ priority, onClick }) {
  const styles = {
    "Must Have": "!bg-gray-200 text-red-800",
    "Should Have": "!bg-gray-200 text-blue-800",
    "Could Have": "!bg-gray-200 text-green-800",
    "Won't Have": "!bg-gray-200 text-gray-800",
  };

  return (
    <button
      onClick={() => onClick?.(priority)}
      className={`text-xs px-3 py-1 rounded-full font-medium transition-transform duration-200 active:scale-95 ${styles[priority]}`}
    >
      {priority}
    </button>
  );
}
