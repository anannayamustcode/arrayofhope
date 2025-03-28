import React, { useState, useEffect } from "react";
import { diffLines } from "diff";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import AuditTrail from "../components/AuditTrail";

const fileHistory = [
  { id: 1, timestamp: "2025-03-25 10:00", content: "Hello World!\nThis is Version 1." },
  { id: 2, timestamp: "2025-03-25 12:00", content: "Hello World!\nThis is Version 2.\nAdded new line." },
  { id: 3, timestamp: "2025-03-25 14:00", content: "Hello World!\nThis is Version 3.\nUpdated line 2." }
];

const HistoryPage = () => {
  const [selectedOld, setSelectedOld] = useState(fileHistory[0].id);
  const [selectedNew, setSelectedNew] = useState(fileHistory[fileHistory.length - 1].id);
  const [actionCount, setActionCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const storedStartTime = localStorage.getItem("auditStartTime");
    if (!storedStartTime) {
      const now = new Date();
      localStorage.setItem("auditStartTime", now.getTime());
      setStartTime(now);
    } else {
      setStartTime(new Date(parseInt(storedStartTime)));
    }
  }, []);

  const logAction = () => {
    setActionCount((prev) => prev + 1);
    setEndTime(new Date());
  };

  const handleOldChange = (e) => {
    setSelectedOld(Number(e.target.value));
    logAction();
  };

  const handleNewChange = (e) => {
    setSelectedNew(Number(e.target.value));
    logAction();
  };

  const oldVersion = fileHistory.find(f => f.id === selectedOld)?.content || "";
  const newVersion = fileHistory.find(f => f.id === selectedNew)?.content || "";
  const diff = diffLines(oldVersion, newVersion);

  return (
    <div className="p-6">
      <h1 className="text-black text-2xl font-bold mb-4">File History</h1>

      {/* Version Selectors */}
      <div className="text-black flex gap-4 mb-4">
        <select value={selectedOld} onChange={handleOldChange} className="p-2 border rounded">
          {fileHistory.map(v => (
            <option key={v.id} value={v.id}>Old: {v.timestamp}</option>
          ))}
        </select>

        <select value={selectedNew} onChange={handleNewChange} className="p-2 border rounded">
          {fileHistory.map(v => (
            <option key={v.id} value={v.id}>New: {v.timestamp}</option>
          ))}
        </select>
      </div>

      {/* Diff Viewer */}
      <div className="border p-4 rounded bg-gray-100">
        {diff.map((part, index) => (
          <SyntaxHighlighter
            key={index}
            language="text"
            style={solarizedlight}
            wrapLines
            className={`p-2 ${part.added ? "bg-green-200" : part.removed ? "bg-red-200" : "bg-white"}`}
          >
            {part.value}
          </SyntaxHighlighter>
        ))}
      </div>

      {/* Audit Summary */}
      <AuditTrail startTime={startTime} endTime={endTime} actionCount={actionCount} />
    </div>
  );
};

export default HistoryPage;
