const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Health check endpoint for deployment
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Specific routes for HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/baux-commerciaux', (req, res) => {
    res.sendFile(path.join(__dirname, 'baux-commerciaux.html'));
});

app.get('/contentieux-commercial', (req, res) => {
    res.sendFile(path.join(__dirname, 'contentieux-commercial.html'));
});

app.get('/droit-franchise', (req, res) => {
    res.sendFile(path.join(__dirname, 'droit-franchise.html'));
});

app.get('/droit-contrats', (req, res) => {
    res.sendFile(path.join(__dirname, 'droit-contrats.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/mentions-legales', (req, res) => {
    res.sendFile(path.join(__dirname, 'mentions-legales.html'));
});

// Fallback for any other route - serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`AG AVOCATS website server running on http://0.0.0.0:${PORT}`);
    console.log(`Health check available at http://0.0.0.0:${PORT}/health`);
});