const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadRoute = require('./routes/upload'); // Import the routes

const app = express();
const port = 5000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static file path for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the upload routes
app.use('/api', uploadRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
