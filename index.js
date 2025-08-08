const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/careers', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'careers.html'));
});

app.get('/running', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'running.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Personal Portfolio running on http://localhost:${PORT}`);
});

module.exports = app; 