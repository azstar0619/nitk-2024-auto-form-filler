const express = require("express");
const multer = require("multer");
const tesseract = require("tesseract.js");
const path = require("path");
const fs = require("fs");

const app = express();

// Set up Multer for file uploads
const upload = multer({ dest: "uploads/" });

app.use(express.static(path.join(__dirname, "public")));

// Endpoint for uploading files
app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;

  // Perform OCR using Tesseract.js
  tesseract.recognize(filePath, "eng")
    .then(({ data: { text } }) => {
      res.json({ extractedText: text });

      // Clean up by removing the file
      fs.unlinkSync(filePath);
    })
    .catch((error) => {
      res.status(500).send("Error processing document");
    });
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

const url = "mongodb+srv://anshsalunke5:9Kpwl59LL9jL0Pqo@cluster0.bpfm4.mongodb.net/";