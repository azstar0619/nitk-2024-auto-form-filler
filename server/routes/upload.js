const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set storage engine for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Save files to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp as file name
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.status(200).send({
      message: 'File uploaded successfully',
      file: req.file
    });
  } else {
    res.status(400).send('No file uploaded');
  }
});

module.exports = router;
