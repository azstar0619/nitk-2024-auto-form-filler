// server/db.js
const mongoose = require('mongoose');

// Replace with your MongoDB URI
const uri = "your-mongodb-atlas-uri";

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;

// server/models/Document.js
const mongoose = require('mongoose');

// Define the schema for a document
const documentSchema = new mongoose.Schema({
    documentType: String,
    extractedText: String,
    formData: Object, // The auto-filled form data will be saved here
    uploadedAt: { type: Date, default: Date.now }
});

// Create and export the Document model
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
