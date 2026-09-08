const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

  
// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileInfo = {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      size: req.file.size,
      createdAt: new Date(),
    };

    // Store uploaded files in memory
    if (!app.locals.uploads) app.locals.uploads = [];
    app.locals.uploads.push(fileInfo);

    res.json({
      message: "File uploaded successfully",
      fileInfo,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});


// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");
// const fs = require("fs");
// const axios = require("axios");
// const FormData = require("form-data");

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// // File upload endpoint
// app.post("/upload", upload.single("file"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   const sessionId = req.headers["session-id"] || Date.now().toString();
//   const filePath = req.file.path;

//   try {
//     // Read the file and prepare for ML model
//     const formData = new FormData();
//     formData.append("files", fs.createReadStream(filePath));

//     // Send to ML model
//     const mlResponse = await axios.post(
//       "https://b9ce-2405-201-1015-3898-2873-2289-3f2f-ed02.ngrok-free.app/upload",
//       formData,
//       {
//         headers: {
//           ...formData.getHeaders(),
//           "Session-ID": sessionId,
//         },
//         timeout: 30000
//       }
//     );

//     // Store file info and ML response
//     const fileInfo = {
//       originalName: req.file.originalname,
//       storedName: req.file.filename,
//       size: req.file.size,
//       mlResponse: mlResponse.data,
//       sessionId,
//       createdAt: new Date()
//     };

//     // Save to backend (in-memory for this example)
//     // In production, save to database
//     if (!app.locals.uploads) app.locals.uploads = [];
//     app.locals.uploads.push(fileInfo);

//     res.json({
//       message: "File processed successfully",
//       fileInfo,
//       mlResponse: mlResponse.data
//     });
//   } catch (error) {
//     console.error("Error processing file:", error);
//     res.status(500).json({ 
//       error: "Failed to process file",
//       details: error.message 
//     });
//   } finally {
//     // Clean up - remove the uploaded file
//     fs.unlink(filePath, () => {});
//   }
// });

// // URL upload endpoint
// app.post("/upload-url", async (req, res) => {
//   const { url } = req.body;
//   const sessionId = req.headers["session-id"] || Date.now().toString();

//   if (!url || !url.startsWith("http")) {
//     return res.status(400).json({ error: "A valid URL is required" });
//   }

//   try {
//     // Send to ML model
//     const mlResponse = await axios.post(
//       "https://b9ce-2405-201-1015-3898-2873-2289-3f2f-ed02.ngrok-free.app/upload",
//       { urls: [url] },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Session-ID": sessionId,
//         }
//       }
//     );

//     // Store URL info
//     const urlInfo = {
//       url,
//       mlResponse: mlResponse.data,
//       sessionId,
//       createdAt: new Date()
//     };

//     if (!app.locals.urlUploads) app.locals.urlUploads = [];
//     app.locals.urlUploads.push(urlInfo);

//     res.json({
//       message: "URL processed successfully",
//       urlInfo,
//       mlResponse: mlResponse.data
//     });
//   } catch (error) {
//     console.error("Error processing URL:", error);
//     res.status(500).json({ 
//       error: "Failed to process URL",
//       details: error.message 
//     });
//   }
// });

// // Start server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
//   // Ensure upload directory exists
//   if (!fs.existsSync('uploads')) {
//     fs.mkdirSync('uploads');
//   }
// });


// // const express = require("express");
// // const multer = require("multer");
// // const cors = require("cors");
// // const dotenv = require("dotenv");
// // const path = require("path");
// // const fs = require("fs");
// // const axios = require("axios");
// // const cheerio = require("cheerio");

// // dotenv.config();
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Ensure uploads directory exists
// // const uploadDir = "uploads/";
// // if (!fs.existsSync(uploadDir)) {
// //   fs.mkdirSync(uploadDir, { recursive: true });
// // }

// // // Configure Multer for file uploads
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, uploadDir); // Store files in 'uploads/' directory
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, `${Date.now()}-${file.originalname}`);
// //   },
// // });

// // const upload = multer({ storage });

// // // Upload route
// // app.post("/upload", upload.single("file"), (req, res) => {
// //   if (!req.file) {
// //     return res.status(400).json({ error: "No file uploaded" });
// //   }
// //   res.json({
// //     message: "File uploaded successfully",
// //     filename: req.file.filename,
// //     filePath: `/uploads/${req.file.filename}`,
// //   });
// // });
// // app.post("/upload-url", async (req, res) => {
// //   const { url } = req.body;

// //   if (!url || !url.startsWith("http")) {
// //     return res.status(400).json({ error: "A valid URL is required" });
// //   }

// //   try {
// //     const { data: html } = await axios.get(url);
// //     const $ = cheerio.load(html);

// //     const pageText = $("body").text().replace(/\s+/g, " ").trim().slice(0, 5000);
// //     const filename = `${Date.now()}-webpage.txt`;
// //     const filepath = path.join(uploadDir, filename);

// //     fs.writeFile(filepath, pageText, (err) => {
// //       if (err) {
// //         console.error("File write error:", err);
// //         return res.status(500).json({ error: "Failed to write file" });
// //       }

// //       console.log("Web content saved:", filepath);
// //       res.json({
// //         message: "Webpage content saved as text file",
// //         filename,
// //         filePath: `/uploads/${filename}`,
// //       });
// //     });
// //   } catch (err) {
// //     console.error("Fetch error:", err.message);
// //     res.status(500).json({ error: "Failed to fetch or process URL" });
// //   }
// // });

// // // Serve uploaded files statically
// // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // const port = process.env.PORT || 5000;
// // app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });


