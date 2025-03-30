import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel
} from "reactflow";
import "reactflow/dist/style.css";

// Custom node types
const nodeTypes = {
  circle: ({ data }) => (
    <div className="flex items-center justify-center w-20 h-20 rounded-full border-2" style={{ background: data.color || "#4CAF50", borderColor: data.borderColor || "#2d662f" }}>
      <div className="text-center font-medium" style={{ color: data.textColor || "white" }}>
        {data.label}
      </div>
    </div>
  ),
  diamond: ({ data }) => (
    <div className="flex items-center justify-center w-24 h-24 rotate-45" style={{ background: data.color || "#FF9800", borderColor: data.borderColor || "#b36b00" }}>
      <div className="text-center font-medium -rotate-45" style={{ color: data.textColor || "white" }}>
        {data.label}
      </div>
    </div>
  ),
};

// Initial nodes and edges
const initialNodes = [
  { id: "1", type: "input", data: { label: "Start", color: "#4CAF50", textColor: "white" }, position: { x: 250, y: 5 } },
  { id: "2", data: { label: "Process", color: "#2196F3", textColor: "white" }, position: { x: 250, y: 100 } },
  { id: "3", type: "output", data: { label: "End", color: "#F44336", textColor: "white" }, position: { x: 250, y: 200 } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#4CAF50" } },
  { id: "e2-3", source: "2", target: "3", animated: true, style: { stroke: "#2196F3" } },
];

// Edge types
const edgeTypes = [
  { id: "default", label: "Default", stroke: "#555" },
  { id: "success", label: "Success", stroke: "#4CAF50" },
  { id: "warning", label: "Warning", stroke: "#FF9800" },
  { id: "error", label: "Error", stroke: "#F44336" },
  { id: "dashed", label: "Dashed", stroke: "#555", strokeDasharray: "5,5" },
];

// Color palette
const colorPalette = [
  { color: "#4CAF50", name: "Green" },
  { color: "#2196F3", name: "Blue" },
  { color: "#F44336", name: "Red" },
  { color: "#FF9800", name: "Orange" },
  { color: "#9C27B0", name: "Purple" },
  { color: "#607D8B", name: "Blue Grey" },
  { color: "#FFEB3B", name: "Yellow", textColor: "#333" },
  { color: "#000000", name: "Black" },
];

function FlowchartPage() {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeName, setNodeName] = useState("New Node");
  const [selectedNodeType, setSelectedNodeType] = useState("default");
  const [selectedColor, setSelectedColor] = useState(colorPalette[0]);
  const [selectedEdgeType, setSelectedEdgeType] = useState(edgeTypes[0]);
  const [isAnimated, setIsAnimated] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Handle node connections
  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      animated: isAnimated,
      style: { 
        stroke: selectedEdgeType.stroke,
        strokeDasharray: selectedEdgeType.strokeDasharray,
      },
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges, isAnimated, selectedEdgeType]);

  // Handle drag-and-drop creation of new nodes
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow/type");
      
      // Get position from mouse position relative to the wrapper
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      const newNode = {
        id: `node_${nodes.length + 1}`,
        type,
        position,
        data: { 
          label: nodeName || `Node ${nodes.length + 1}`,
          color: selectedColor.color,
          textColor: selectedColor.textColor || "white",
        },
      };
      
      setNodes((nds) => nds.concat(newNode));
    }
  }, [reactFlowInstance, nodes, nodeName, selectedColor, selectedNodeType]);

  // Node selection handler
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  // Edge selection handler
  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  // Update node properties
  const updateNodeLabel = (newLabel) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                label: newLabel,
              },
            };
          }
          return node;
        })
      );
    }
  };

  const updateNodeColor = (newColor, newTextColor) => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                color: newColor,
                textColor: newTextColor || "white",
              },
            };
          }
          return node;
        })
      );
    }
  };

  // Update edge properties
  const updateEdgeStyle = (stroke, strokeDasharray, animated) => {
    if (selectedEdge) {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === selectedEdge.id) {
            return {
              ...edge,
              animated: animated,
              style: {
                ...edge.style,
                stroke,
                strokeDasharray,
              },
            };
          }
          return edge;
        })
      );
    }
  };

  // Delete selected elements
  const deleteSelected = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setSelectedNode(null);
    }
    if (selectedEdge) {
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  };

  // Clear entire flowchart
  const clearFlowchart = () => {
    if (window.confirm("Are you sure you want to clear the entire flowchart?")) {
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
      setSelectedEdge(null);
    }
  };

  // Handle drag start for different node types
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow/type", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col">
      <div className="flex items-center p-4 bg-[#012169] text-white">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 rounded hover:bg-[#001a4d] transition-colors"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <h1 className="text-2xl">Interactive Flowchart Builder</h1>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with controls */}
        <aside className="w-64 bg-white p-4 shadow-lg flex flex-col">
          <h2 className="font-bold text-lg mb-3 text-indigo-700">Add Nodes</h2>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Node Name:</label>
            <input
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Node Type:</label>
            <select
              value={selectedNodeType}
              onChange={(e) => setSelectedNodeType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="default">Rectangle</option>
              <option value="input">Start/Input</option>
              <option value="output">End/Output</option>
              <option value="circle">Circle</option>
              <option value="diamond">Diamond</option>
            </select>
          </div>
          
          <label className="block text-sm font-medium mb-1">Node Color:</label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {colorPalette.map((item) => (
              <div
                key={item.name}
                className={`w-8 h-8 rounded cursor-pointer ${
                  selectedColor.color === item.color ? "ring-2 ring-indigo-600" : ""
                }`}
                style={{ backgroundColor: item.color }}
                onClick={() => setSelectedColor(item)}
                title={item.name}
              />
            ))}
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Edge Style:</label>
            <select
              value={selectedEdgeType.id}
              onChange={(e) => setSelectedEdgeType(edgeTypes.find(type => type.id === e.target.value))}
              className="w-full p-2 border rounded"
            >
              {edgeTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAnimated}
                onChange={(e) => setIsAnimated(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Animated Edges</span>
            </label>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div
              className="p-2 bg-indigo-600 text-white rounded text-center cursor-pointer shadow-sm"
              draggable
              onDragStart={(e) => onDragStart(e, selectedNodeType)}
            >
              Drag to Canvas
            </div>
            
            <button
              onClick={deleteSelected}
              disabled={!selectedNode && !selectedEdge}
              className={`p-2 text-white rounded text-center shadow-sm ${
                selectedNode || selectedEdge ? "bg-red-500" : "bg-gray-400"
              }`}
            >
              Delete Selected
            </button>
          </div>
          
          <button
            onClick={clearFlowchart}
            className="mt-auto p-2 bg-gray-700 text-white rounded text-center shadow-sm"
          >
            Clear Flowchart
          </button>
        </aside>
        
        {/* Main flowchart area */}
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <MiniMap nodeColor={(node) => node.data.color || "#eee"} />
            <Controls />
            <Background variant="dots" gap={12} size={1} />
            
            {/* Properties panel for selected node or edge */}
            {(selectedNode || selectedEdge) && (
              <Panel position="top-right" className="bg-white p-3 rounded shadow-lg text-sm">
                <h3 className="font-bold mb-2">
                  {selectedNode ? "Node Properties" : "Edge Properties"}
                </h3>
                
                {selectedNode && (
                  <div>
                    <div className="mb-2">
                      <label className="block mb-1">Label:</label>
                      <input
                        type="text"
                        value={selectedNode.data.label}
                        onChange={(e) => updateNodeLabel(e.target.value)}
                        className="w-full p-1 border rounded text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1">Color:</label>
                      <div className="grid grid-cols-4 gap-1">
                        {colorPalette.map((item) => (
                          <div
                            key={item.name}
                            className="w-6 h-6 rounded cursor-pointer"
                            style={{ backgroundColor: item.color }}
                            onClick={() => updateNodeColor(item.color, item.textColor)}
                            title={item.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedEdge && (
                  <div>
                    <div className="mb-2">
                      <label className="block mb-1">Edge Style:</label>
                      <select
                        value={edgeTypes.find(type => type.stroke === selectedEdge.style?.stroke)?.id || "default"}
                        onChange={(e) => {
                          const selectedType = edgeTypes.find(type => type.id === e.target.value);
                          updateEdgeStyle(selectedType.stroke, selectedType.strokeDasharray, selectedEdge.animated);
                        }}
                        className="w-full p-1 border rounded text-sm"
                      >
                        {edgeTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedEdge.animated}
                          onChange={(e) => {
                            updateEdgeStyle(
                              selectedEdge.style?.stroke,
                              selectedEdge.style?.strokeDasharray,
                              e.target.checked
                            );
                          }}
                          className="mr-1"
                        />
                        <span>Animated</span>
                      </label>
                    </div>
                  </div>
                )}
              </Panel>
            )}
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default FlowchartPage;