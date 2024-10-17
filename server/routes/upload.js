// server/routes/upload.js
const express = require('express');
const router = express.Router();
const Document = require('../models/Document'); // Import the Document model

// Route to handle document upload and saving
router.post('/upload', (req, res) => {
    const { documentType, extractedText, formData } = req.body;

    const newDocument = new Document({
        documentType,
        extractedText,
        formData
    });

    newDocument.save()
        .then(savedDoc => res.status(200).json(savedDoc))
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
