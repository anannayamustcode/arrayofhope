import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AlertCircle, AlertTriangle, ChevronDown, ChevronUp, Menu } from 'lucide-react';
import ComplianceAlert from '../components/ComplianceAlert';
import PriorityBadge from '../components/PriorityBadge';
import { Link } from "react-router-dom";
import ExportPage from './ExportPage';

const ItemType = 'REQUIREMENT';

export default function ReviewPage() {
  const initialRequirements = [
    { id: 1, title: 'User Authentication', description: 'System must authenticate users via biometric verification', type: 'Functional' },
    { id: 2, title: 'Transaction Speed', description: 'Payments must process within 2 seconds', type: 'Non-Functional' },
    { id: 3, title: 'Data Encryption', description: 'All sensitive data must be encrypted at rest and in transit', type: 'Security' },
    { id: 4, title: 'Accessibility', description: 'UI must comply with WCAG 2.1 AA standards', type: 'Compliance' }
  ];

  const [requirements, setRequirements] = useState(initialRequirements);
  const [priorities, setPriorities] = useState({
    'Must Have': [],
    'Should Have': [],
    'Could Have': [],
    "Won't Have": [],
  });
  const [expandedPriorities, setExpandedPriorities] = useState({
    'Must Have': true,
    'Should Have': true,
    'Could Have': true,
    "Won't Have": true,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [completionStatus, setCompletionStatus] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState(null);
  const exportToJira = async () => {
    setIsExporting(true);
    setExportResult(null);
  
    try {
      // Convert priorities to JIRA format
      const issues = Object.entries(priorities).flatMap(([priority, items]) => 
        items.map(item => ({
          title: item.title,
          description: `${item.description}\nType: ${item.type}`,
          priority
        }))
      );
  
      const response = await fetch('/api/jira/create-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issues[0]) // Send first item for demo
      });
  
      const result = await response.json();
      setExportResult(result);
    } catch (error) {
      setExportResult({ error: error.message });
    } finally {
      setIsExporting(false);
    }
  };
    
  // Calculate completion percentage
  useEffect(() => {
    const totalRequirements = requirements.length + 
      Object.values(priorities).flat().length;
    const categorizedRequirements = Object.values(priorities).flat().length;
    
    const percentage = totalRequirements > 0 
      ? Math.round((categorizedRequirements / totalRequirements) * 100) 
      : 0;
    
    setCompletionStatus(percentage);
  }, [requirements, priorities]);

  // Handle dropping an item into a priority category
  const handleDrop = (item, category) => {
    setRequirements(requirements.filter((req) => req.id !== item.id));
    setPriorities((prev) => ({
      ...prev,
      [category]: [...prev[category], item],
    }));
  };

  // Handle removing an item from a priority
  const handleRemoveFromPriority = (item, category) => {
    setPriorities((prev) => ({
      ...prev,
      [category]: prev[category].filter((req) => req.id !== item.id),
    }));
    setRequirements((prev) => [...prev, item]);
  };

  // Toggle expand/collapse for priority sections
  const togglePriorityExpansion = (category) => {
    setExpandedPriorities((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Filter requirements based on search term
  const filteredRequirements = requirements.filter(req => 
    req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-6xl mx-auto p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#012169]">Review Requirements</h1>
          <div className="flex items-center space-x-4">
            <div className="bg-white shadow rounded-full h-8 w-64 flex items-center">
              <div className="h-full bg-blue-600 rounded-l-full" style={{ width: `${completionStatus}%` }}></div>
              <span className="ml-4 text-sm font-medium">{completionStatus}% Requirements Prioritized</span>
            </div>
            <Link to="/export">
              <button className="!bg-[#012169] text-white px-4 py-2 rounded hover:bg-[#013169] transition-colors">
                Proceed
              </button>
            </Link>
                        <button 
              onClick={exportToJira}
              disabled={isExporting}
              className="!bg-[#0052CC] text-white px-4 py-2 rounded hover:bg-[#0065FF] transition-colors ml-2"
            >
              {isExporting ? 'Exporting...' : 'Export to JIRA'}
            </button>

            {exportResult && (
              <div className={`mt-2 p-2 rounded ${exportResult.error ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                {exportResult.error ? (
                  `Error: ${exportResult.error}`
                ) : (
                  <a href={exportResult.issueUrl} target="_blank" rel="noopener noreferrer" className="underline">
                    JIRA Issue Created → #{exportResult.issueUrl.split('/').pop()}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Requirements List */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Extracted Requirements</h2>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">{requirements.length}</span>
              </div>
              
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search requirements..."
                  className="w-full p-2 pl-8 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="absolute left-2 top-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                {filteredRequirements.length > 0 ? (
                  filteredRequirements.map((req) => (
                    <DraggableRequirement key={req.id} requirement={req} />
                  ))
                ) : (
                  searchTerm ? (
                    <p className="text-gray-500 text-center py-3">No requirements match your search</p>
                  ) : (
                    <p className="text-gray-500 text-center py-3">All requirements have been prioritized</p>
                  )
                )}
              </div>
              <div className="mt-4 text-xs text-gray-500 italic">
                Drag requirements to priority categories &rarr;
              </div>
            </div>

            {/* Gaps & Issues Panel */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <AlertTriangle size={16} className="mr-2 text-amber-500" />
                  Gaps & Issues
                </h2>
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">2</span>
              </div>
              <div className="space-y-3">
                <ComplianceAlert message="No timeout specified for login session" severity="high" />
                <ComplianceAlert message="Password complexity requirements not defined" severity="medium" />
              </div>

              <Link to="/negotiation" className="mt-4 !bg-[#012169] !text-white px-4 py-2 rounded-lg text-sm hover:bg-[#013169] transition-colors inline-block text-center">
                Resolve Issues
              </Link>
            </div>
          </div>

          {/* Right Column - Priority Categories */}
          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Set Priority</h2>
              <div className="space-y-4">
                {Object.keys(priorities).map((category) => (
                  <PriorityCategory 
                    key={category} 
                    category={category} 
                    items={priorities[category]} 
                    onDrop={handleDrop}
                    onRemove={handleRemoveFromPriority}
                    isExpanded={expandedPriorities[category]}
                    onToggleExpand={() => togglePriorityExpansion(category)}
                  />
                ))}
              </div>
            </div>
          </div>
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

  // Define type badge color
  const typeBadgeColor = {
    'Functional': 'bg-blue-50 text-blue-700',
    'Non-Functional': 'bg-purple-50 text-purple-700',
    'Security': 'bg-red-50 text-red-700',
    'Compliance': 'bg-green-50 text-green-700',
  }[requirement.type] || 'bg-gray-100 text-gray-700';

  return (
    <div 
      ref={drag} 
      className={`border border-gray-200 rounded-lg p-3 bg-white shadow-sm hover:shadow transition-shadow
                  ${isDragging ? 'opacity-50' : ''} cursor-move`}
    >
      <h3 className="font-medium text-gray-900">{requirement.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{requirement.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className={`inline-block text-xs px-2 py-1 rounded-full ${typeBadgeColor}`}>
          {requirement.type}
        </span>
        <Menu size={16} className="text-gray-400" />
      </div>
    </div>
  );
};

// Priority Category Drop Zone
const PriorityCategory = ({ category, items, onDrop, onRemove, isExpanded, onToggleExpand }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => onDrop(item, category),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Define category styling
  const categoryStyles = {
    'Must Have': {
      headerBg: 'bg-red-50',
      border: isOver ? 'border-2 border-red-500' : 'border border-red-200',
      icon: <AlertCircle size={16} className="text-red-500 mr-2" />,
      badge: 'bg-red-100 text-red-800',
    },
    'Should Have': {
      headerBg: 'bg-blue-50',
      border: isOver ? 'border-2 border-blue-500' : 'border border-blue-200',
      icon: <AlertCircle size={16} className="text-blue-500 mr-2" />,
      badge: 'bg-blue-100 text-blue-800',
    },
    'Could Have': {
      headerBg: 'bg-green-50',
      border: isOver ? 'border-2 border-green-500' : 'border border-green-200',
      icon: <AlertCircle size={16} className="text-green-500 mr-2" />,
      badge: 'bg-green-100 text-green-800',
    },
    "Won't Have": {
      headerBg: 'bg-gray-50',
      border: isOver ? 'border-2 border-gray-500' : 'border border-gray-200',
      icon: <AlertCircle size={16} className="text-gray-500 mr-2" />,
      badge: 'bg-gray-100 text-gray-800',
    },
  }[category];

  return (
    <div 
      className={`rounded-lg overflow-hidden ${categoryStyles.border}`}
    >
      <div 
        className={`${categoryStyles.headerBg} p-3 flex justify-between items-center cursor-pointer`}
        onClick={onToggleExpand}
      >
        <div className="flex items-center">
          {categoryStyles.icon}
          <h3 className="font-medium">{category}</h3>
        </div>
        <div className="flex items-center">
          <span className={`text-xs px-2 py-1 rounded-full mr-2 ${categoryStyles.badge}`}>
            {items.length}
          </span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      
      {isExpanded && (
        <div 
          ref={drop}
          className={`p-3 bg-white min-h-[100px] transition-all ${isOver ? 'bg-gray-50' : ''}`}
        >
          {items.length > 0 ? (
            <div className="space-y-2">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="p-2 bg-white rounded border border-gray-200 shadow-sm flex justify-between items-center"
                >
                  <span>{item.title}</span>
                  <button 
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    onClick={() => onRemove(item, category)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-24 text-gray-400 text-sm border border-dashed border-gray-200 rounded">
              Drop requirements here
            </div>
          )}
        </div>
        
      )}
    </div>
  );
};