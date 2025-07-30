const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Ensure the server binds to the correct host for deployment
const HOST = process.env.HOST || '0.0.0.0';

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Powered-By', 'AG AVOCATS Website');
    next();
});

// Serve static files from the current directory with proper headers
app.use(express.static(__dirname, {
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes for HTML
        } else if (path.endsWith('.css') || path.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day for assets
        }
    }
}));

// Health check endpoint for deployment
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        port: PORT,
        uptime: process.uptime(),
        service: 'AG AVOCATS website'
    });
});

// Additional health check routes that some deployment systems expect
app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});

app.get('/healthcheck', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.get('/status', (req, res) => {
    res.status(200).json({ 
        status: 'running',
        timestamp: new Date().toISOString(),
        service: 'AG AVOCATS website'
    });
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Page routes with proper error handling
const pages = [
    'baux-commerciaux',
    'contentieux-commercial', 
    'droit-franchise',
    'droit-contrats',
    'contact',
    'mentions-legales'
];

pages.forEach(page => {
    app.get(`/${page}`, (req, res) => {
        const filePath = path.join(__dirname, `${page}.html`);
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(`Error serving ${page}.html:`, err);
                res.status(404).sendFile(path.join(__dirname, 'index.html'));
            }
        });
    });
});

// API endpoint for form submissions (if needed)
app.use(express.json());
app.post('/api/contact', (req, res) => {
    // Log the contact form submission
    console.log('Contact form submission:', req.body);
    res.json({ success: true, message: 'Message reçu avec succès' });
});

// Fallback for any other route - serve index.html (SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

const server = app.listen(PORT, HOST, () => {
    console.log(`AG AVOCATS website server running on http://${HOST}:${PORT}`);
    console.log(`Health check available at http://${HOST}:${PORT}/health`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Server ready for deployment`);
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
});