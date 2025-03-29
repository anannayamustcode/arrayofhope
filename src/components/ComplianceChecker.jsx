export default function ComplianceChecker({ requirements }) {
    const regulations = [
      {
        name: "PCI-DSS",
        checks: [
          { pattern: /credit card/i, message: "Must encrypt credit card data" },
          { pattern: /cvv/i, message: "Never store CVV numbers" },
        ],
      },
      {
        name: "GDPR",
        checks: [
          { pattern: /personal data/i, message: "Requires consent mechanism" },
        ],
      },
    ];
  
    const detectIssues = () => {
      return requirements.flatMap((req) =>
        regulations.flatMap((reg) =>
          reg.checks
            .filter((check) => check.pattern.test(req.text))
            .map((check) => ({
              requirement: req.text,
              regulation: reg.name,
              message: check.message,
            }))
        )
      );
    };
  
    const issues = detectIssues();
  
    return (
      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold flex items-center gap-2">
          <span className="text-red-500">⚠</span> Compliance Check
        </h3>
        {issues.length > 0 ? (
          <ul className="mt-3 space-y-3">
            {issues.map((issue, i) => (
              <li
                key={i}
                className="text-sm p-3 bg-red-50 border border-red-200 rounded-lg shadow-sm"
                title={`Issue related to ${issue.regulation}`}
              >
                <span className="font-semibold text-red-700">{issue.regulation}:</span> {issue.message}
                <br />
                <span className="text-gray-600 italic text-xs">Found in: "{issue.requirement}"</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-green-600 mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
            ✅ No compliance issues detected
          </p>
        )}
      </div>
    );
  }
  