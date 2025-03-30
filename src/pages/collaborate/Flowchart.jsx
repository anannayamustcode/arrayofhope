import React from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

const initialElements = [
  { id: "1", type: "input", data: { label: "Start" }, position: { x: 250, y: 5 } },
  { id: "2", data: { label: "Step 1" }, position: { x: 250, y: 100 } },
  { id: "3", data: { label: "Step 2" }, position: { x: 250, y: 200 } },
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

function FlowchartPage() {
  return (
    <div className="h-screen w-full bg-gray-100 p-4">
      <h1 className="text-black text-xl font-bold mb-4">Flowchart Builder</h1>
      <div className="h-[80vh] border border-gray-300 rounded-lg overflow-hidden">
        <ReactFlow elements={initialElements}>
          <MiniMap />
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowchartPage;
