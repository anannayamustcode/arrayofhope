import { useState } from "react";

export default function TestCaseGenerator() {
  const [requirements, setRequirements] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [coverage, setCoverage] = useState(0);

  const generateTestCases = () => {
    if (!requirements) return;

    // Dummy logic for generating test cases (in real life, you'd use more complex logic)
    const generatedTestCases = requirements.split("\n").map((req, index) => ({
      id: index + 1,
      description: `Test case for: ${req}`,
      status: "Pending",
    }));

    const coveragePercentage = (generatedTestCases.length / 10) * 100; // Mock coverage calculation

    setTestCases(generatedTestCases);
    setCoverage(coveragePercentage);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-[#012169] mb-6">Test Case Generator</h1>

      {/* Input for Requirements */}
      <div className="mb-6">
        <label htmlFor="requirements" className="block text-lg font-semibold mb-2">
          Enter Requirements (One per line):
        </label>
        <textarea
          id="requirements"
          rows="6"
          className="w-full border rounded-lg p-4"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        ></textarea>
      </div>

      <button
        onClick={generateTestCases}
        className="bg-[#012169] text-white px-6 py-3 rounded-lg hover:bg-[#001a4d] transition"
      >
        Generate Test Cases
      </button>

      {/* Test Cases Section */}
      <div className="mt-8">
        <h2 className="font-semibold text-xl mb-4">Generated Test Cases</h2>
        {testCases.length > 0 ? (
          <ul className="space-y-4">
            {testCases.map((testCase) => (
              <li key={testCase.id} className="flex justify-between items-center">
                <span>{testCase.description}</span>
                <span className="text-gray-500 text-sm">{testCase.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No test cases generated yet.</p>
        )}
      </div>

      {/* Coverage Report Section */}
      <div className="mt-8">
        <h2 className="font-semibold text-xl mb-4">Coverage Report</h2>
        <div className="flex justify-between items-center">
          <p className="text-lg">Coverage: {coverage}%</p>
          <div
            className="w-full h-2 bg-gray-200 rounded-full"
            style={{ width: `${coverage}%`, backgroundColor: "#4caf50" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
