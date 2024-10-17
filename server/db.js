// server/db.js
const sqlite3 = require('sqlite3').verbose();

// Open or create an SQLite database
const db = new sqlite3.Database('./documentProcessing.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create a table for documents (if it doesn't exist)
db.run(`CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    documentType TEXT,
    extractedText TEXT,
    formData TEXT,
    uploadedAt TEXT
)`);

module.exports = db;

// server/routes/upload.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import SQLite connection

// Route to handle document upload and saving
router.post('/upload', (req, res) => {
    const { documentType, extractedText, formData } = req.body;
    const uploadedAt = new Date().toISOString();

    const query = `INSERT INTO documents (documentType, extractedText, formData, uploadedAt) VALUES (?, ?, ?, ?)`;
    const params = [documentType, extractedText, JSON.stringify(formData), uploadedAt];

    db.run(query, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "Document saved successfully!", id: this.lastID });
    });
});

module.exports = router;

// React component: UploadForm.js
const handleSubmit = async (formData) => {
    const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        console.log("Data saved successfully!");
    } else {
        console.error("Error saving data!");
    }
};
