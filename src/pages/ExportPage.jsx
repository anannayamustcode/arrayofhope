import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// Import the html2pdf library
import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function ExportPage() {
  const navigate = useNavigate();
  const [documentContent, setDocumentContent] = useState(
    "# Requirements Document\n\n## Overview\nThis document outlines the key requirements for the project.\n\n## Functional Requirements\n- Requirement 1: Description of requirement\n- Requirement 2: Description of requirement\n\n## Technical Specifications\n- Specification 1: Details\n- Specification 2: Details\n\n## Timeline\n- Phase 1: Q1 2025\n- Phase 2: Q2 2025"
  );
  const [selectedFormat, setSelectedFormat] = useState("PDF");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const documentRef = useRef(null);
  const previewRef = useRef(null);

  const handleContentChange = (e) => {
    setDocumentContent(e.target.value);
  };

  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
  };

  const handleSave = () => {
    setIsSaving(true);

    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus("saved");

      // Clear status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }, 800);
  };

  const handleExport = async () => {
    setIsExporting(true);

    if (selectedFormat === "PDF") {
      try {
        const formattedContent = documentContent
          .replace(/^# (.*$)/gm, '<h1 style="font-size: 24px; font-weight: bold; margin-top: 20px; margin-bottom: 10px;">$1</h1>')
          .replace(/^## (.*$)/gm, '<h2 style="font-size: 20px; font-weight: bold; margin-top: 15px; margin-bottom: 10px;">$1</h2>')
          .replace(/^- (.*$)/gm, '<li style="margin-left: 20px; margin-bottom: 5px;">$1</li>')
          .replace(/\n\n/g, '</p><p style="margin-bottom: 10px;">');

        const element = document.createElement('div');
        element.innerHTML = `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px;">${formattedContent}</div>`;

        const options = {
          margin: [15, 15, 15, 15],
          filename: 'requirements_document.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        await html2pdf().from(element).set(options).save();
      } catch (error) {
        console.error('PDF generation failed:', error);
        alert('Failed to generate PDF. Please try again.');
      }
    } else if (selectedFormat === "Microsoft Word (.docx)") {
      try {
        const doc = new Document({
          sections: [
            {
              properties: {},
              children: documentContent.split('\n').map((line) => new Paragraph({
                children: [new TextRun(line)],
              })),
            },
          ],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, "requirements_document.docx");
      } catch (error) {
        console.error("Word export failed:", error);
        alert("Failed to generate Word document. Please try again.");
      }
    } else if (selectedFormat === "Excel (.xlsx)") {
      alert("Excel export not implemented yet");
    }

    setIsExporting(false);
  };

  const getPreviewHtml = () => {
    return documentContent
      .replace(/^# (.*$)/gm, '<h1 style="font-size: 1.5rem; font-weight: bold; margin-top: 1rem;">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 style="font-size: 1.25rem; font-weight: bold; margin-top: 0.75rem;">$1</h2>')
      .replace(/^- (.*$)/gm, '<li style="margin-left: 1.5rem;">$1</li>')
      .replace(/\n\n/g, '</p><p>');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-[#012169] mb-6">Export Requirements</h1>

      {/* Live Editable Document */}
      <div className="border rounded-lg p-4 mb-6 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">Document Editor</h2>
          <div className="flex items-center text-sm">
            {saveStatus === "saved" && (
              <span className="text-green-600 mr-2">✓ Saved</span>
            )}
            <button
              onClick={handleSave}
              className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-sm mr-2"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
        <div className="relative bg-white border rounded-lg">
          <textarea
            ref={documentRef}
            value={documentContent}
            onChange={handleContentChange}
            className="w-full h-64 p-4 text-sm font-mono resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-lg"
            placeholder="Enter your document content here..."
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {documentContent.length} characters
          </div>
        </div>
      </div>

      {/* Document Format Section */}
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-lg mb-3">Document Format</h2>
        <div className="flex flex-wrap gap-4">
          {["Microsoft Word (.docx)", "Excel (.xlsx)", "PDF"].map((format) => (
            <button
              key={format}
              onClick={() => handleFormatSelect(format)}
              className={`border px-4 py-2 rounded-lg transition ${
                selectedFormat === format
                  ? "bg-[#012169] text-black"
                  : "hover:bg-gray-100"
              }`}
            >
              {format}
            </button>
          ))}
        </div>
      </div>

      {/* Integration Options Section */}
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-lg mb-3">Integration Options</h2>
        <div className="flex flex-wrap gap-4">
          {["JIRA Import", "Confluence"].map((option) => (
            <button key={option} className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Document Preview */}
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-lg mb-3">Preview</h2>
        <div
          ref={previewRef}
          className="bg-white border rounded-lg p-4 text-sm"
          dangerouslySetInnerHTML={{ __html: getPreviewHtml() }}
        />
      </div>

      {/* Version Control and Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Version Control</h3>
          <p className="text-sm text-gray-500">Current version: v1.2</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/history")}
            className="!bg-[#012169] text-white px-6 py-3 rounded-lg hover:bg-[#001a4d] transition"
          >
            History
          </button>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="!bg-[#012169] text-white px-6 py-3 rounded-lg hover:bg-[#001a4d] transition disabled:bg-gray-400"
          >
            {isExporting ? "Exporting..." : "Export"}
          </button>
        </div>
      </div>
    </div>
  );
}
