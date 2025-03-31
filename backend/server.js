const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const JiraApi = require('jira-client');
const { pipeline } = require('@xenova/transformers');
const WebSocket = require('ws');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize WebSocket server
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${server.address().port}`);
});
const wss = new WebSocket.Server({ server });

// Track connected clients
const clients = new Set();
wss.on('connection', (ws) => {
  clients.add(ws);
  ws.on('close', () => clients.delete(ws));
});

// Initialize ML pipeline (Zero-shot classification)
let classifier;
(async function initML() {
  try {
    classifier = await pipeline('zero-shot-classification', 
      'Xenova/mobilebert-uncased-mnli', { quantized: true });
    console.log("ML model loaded successfully");
  } catch (err) {
    console.error("Failed to load ML model, using fallback:", err);
  }
})();

// Initialize JIRA client
const jira = new JiraApi({
  protocol: 'https',
  host: process.env.JIRA_DOMAIN,
  username: process.env.JIRA_EMAIL,
  password: process.env.JIRA_API_TOKEN,
  apiVersion: '2'
});

// File upload setup
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Routes
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// AI Requirement Classification
app.post('/api/analyze-requirement', async (req, res) => {
  const { text } = req.body;
  
  try {
    // Try ML model first, fallback to rules
    const result = classifier 
      ? await classifier(text, ['functional', 'non-functional', 'security'], { multi_label: true })
      : { labels: [text.includes('shall') || text.includes('must') ? 'functional' : 'non-functional'] };
    
    res.json({
      type: result.labels[0],
      confidence: classifier ? result.scores[0] : 0.85 // Mock confidence if no ML
    });
  } catch (err) {
    res.status(500).json({ error: "Analysis failed", details: err.message });
  }
});

// JIRA Integration
const priorityMap = {
  'Must Have': 'Highest',
  'Should Have': 'High',
  'Could Have': 'Medium',
  "Won't Have": 'Low'
};

app.post('/api/jira/create-issues', async (req, res) => {
  const { requirements } = req.body;
  
  if (!requirements?.length) {
    return res.status(400).json({ error: "No requirements provided" });
  }

  try {
    const results = await Promise.all(
      requirements.map(req => 
        jira.addNewIssue({
          fields: {
            project: { key: process.env.JIRA_PROJECT_KEY },
            summary: req.title,
            description: `${req.description}\nType: ${req.type || 'Unknown'}`,
            issuetype: { name: 'Story' },
            priority: { name: priorityMap[req.priority] || 'Medium' },
            labels: ['AI-Generated', `Req-Type-${req.type}`]
          }
        }).then(issue => ({
          success: true,
          key: issue.key,
          url: `https://${process.env.JIRA_DOMAIN}/browse/${issue.key}`
        })).catch(err => ({
          success: false,
          title: req.title,
          error: err.message
        }))
      )
    );

    // Notify all connected clients
    broadcast({ type: 'JIRA_SYNC', count: results.length });
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: "Bulk export failed", details: err.message });
  }
});

// Helper function to broadcast WS messages
function broadcast(data) {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Mock JIRA webhook (for demo purposes)
app.post('/api/jira/webhook', (req, res) => {
  broadcast({ type: 'JIRA_UPDATE', data: req.body });
  res.status(200).end();
});

console.log(`Server ready on port ${process.env.PORT || 5000}`);