// export default function AuditTrail({ events }) {
//   return (
//     <div className="mt-6 border rounded-lg p-4">
//       <h3 className="font-semibold flex items-center gap-2">
//         <span className="text-gray-500">📝</span> Audit Trail
//       </h3>
//       <ul className="mt-3 space-y-3">
//         {events.map((event, i) => (
//           <li key={i} className="flex items-start gap-3">
//             <div className={`mt-1 w-2 h-2 rounded-full ${
//               event.type === 'edit' ? 'bg-blue-500' : 
//               event.type === 'approve' ? 'bg-green-500' : 'bg-gray-500'
//             }`}></div>
//             <div className="flex-1">
//               <div className="text-sm">
//                 <span className="font-medium">{event.user}</span> • {event.time}
//               </div>
//               <div className="text-sm text-gray-600">
//                 {event.action}
//                 {event.comment && (
//                   <div className="mt-1 p-2 bg-gray-50 rounded text-gray-700">
//                     "{event.comment}"
//                   </div>
//                 )}
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

export default function AuditSummary({ startTime, endTime, actionCount }) {
    const calculateDuration = () => {
      if (!startTime || !endTime) return "N/A";
      const diffMs = endTime - startTime;
      const minutes = Math.floor(diffMs / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);
      return `${minutes} min ${seconds} sec`;
    };
  
    return (
      <div className="mt-6 bg-gray-100 p-4 rounded">
        <h3 className="text-black text-lg font-semibold">Audit Summary</h3>
        <ul className="mt-2 space-y-1 text-black">
          <li><strong>Total Time Spent:</strong> {calculateDuration()}</li>
          <li><strong>Total Actions Taken:</strong> {actionCount}</li>
        </ul>
      </div>
    );
  }
  