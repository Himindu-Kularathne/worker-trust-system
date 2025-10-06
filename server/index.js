// server.js
const express = require('express');
const cors = require('cors');

// Initialize app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for JSON parsing (good practice for APIs)
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    version: process.env.API_VERSION || 'v1',
    timestamp: new Date().toISOString(),
  });
});

// === Server Initialization ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
