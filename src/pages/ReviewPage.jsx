import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ComplianceAlert from '../components/ComplianceAlert';
import PriorityBadge from '../components/PriorityBadge';

const ItemType = 'REQUIREMENT';

export default function ReviewPage() {
  const initialRequirements = [
    { id: 1, title: 'User Authentication', description: 'System must authenticate users via biometric verification', type: 'Functional' },
    { id: 2, title: 'Transaction Speed', description: 'Payments must process within 2 seconds', type: 'Non-Functional' }
  ];

  const [requirements, setRequirements] = useState(initialRequirements);
  const [priorities, setPriorities] = useState({
    'Must Have': [],
    'Should Have': [],
    'Could Have': [],
    "Won't Have": [],
  });

  // Handle dropping an item into a priority category
  const handleDrop = (item, category) => {
    setRequirements(requirements.filter((req) => req.id !== item.id));
    setPriorities((prev) => ({
      ...prev,
      [category]: [...prev[category], item],
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-[#012169] mb-6">Review Requirements</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Extracted Requirements */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Extracted Requirements</h2>
            <div className="space-y-4">
              {requirements.map((req) => (
                <DraggableRequirement key={req.id} requirement={req} />
              ))}
            </div>
          </div>

          {/* Gaps & Issues */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Gaps & Issues</h2>
            <div className="space-y-3">
              <ComplianceAlert message="No timeout specified for login session" severity="high" />
              <ComplianceAlert message="Password complexity requirements not defined" severity="medium" />
            </div>
            <button className="mt-6 !bg-[#012169] text-white px-4 py-2 rounded-lg">Resolve</button>
          </div>
        </div>

        {/* Set Priority Section */}
        <h2 className="text-xl font-semibold mt-8">Set Priority</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {Object.keys(priorities).map((priority) => (
            <PriorityCategory key={priority} category={priority} items={priorities[priority]} onDrop={handleDrop} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

// Draggable Requirement Component
const DraggableRequirement = ({ requirement }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: requirement,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`border rounded-lg p-4 ${isDragging ? 'opacity-50' : ''} cursor-move`}>
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{requirement.title}</h3>
      </div>
      <p className="text-gray-600 mt-1">{requirement.description}</p>
      <span className="inline-block mt-2 text-sm px-2 py-1 bg-gray-100 rounded">{requirement.type}</span>
    </div>
  );
};

// Priority Category Drop Zone
const PriorityCategory = ({ category, items, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => onDrop(item, category),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const bgColor = {
    'Must Have': '!bg-gray-200 text-red-800',
    'Should Have': '!bg-gray-200 text-blue-800',
    'Could Have': '!bg-gray-200 text-green-800',
    "Won't Have": '!bg-gray-200 text-gray-800',
  }[category];

  return (
    <div ref={drop} className={`p-4 rounded-lg shadow min-h-[150px] ${bgColor} ${isOver ? 'border-2 border-black' : ''}`}>
      <h3 className="font-semibold">{category}</h3>
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="p-2 bg-white rounded shadow">
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};
