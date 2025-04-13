const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Store files in 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });
});
app.post("/upload-url", async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "A valid URL is required" });
  }

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const pageText = $("body").text().replace(/\s+/g, " ").trim().slice(0, 5000);
    const filename = `${Date.now()}-webpage.txt`;
    const filepath = path.join(uploadDir, filename);

    fs.writeFile(filepath, pageText, (err) => {
      if (err) {
        console.error("File write error:", err);
        return res.status(500).json({ error: "Failed to write file" });
      }

      console.log("Web content saved:", filepath);
      res.json({
        message: "Webpage content saved as text file",
        filename,
        filePath: `/uploads/${filename}`,
      });
    });
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch or process URL" });
  }
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
