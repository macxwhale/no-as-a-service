const express = require('express');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const serverless = require('serverless-http');

const app = express();
app.set('trust proxy', true);

// Load reasons.json relative to project root
const reasonsPath = path.join(__dirname, '../reasons.json');
const reasons = JSON.parse(fs.readFileSync(reasonsPath, 'utf-8'));

// Rate limiter: 120 requests/min/IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  keyGenerator: (req) => req.headers['cf-connecting-ip'] || req.ip,
  message: { error: "Too many requests, please try again later. (120 reqs/min/IP)" }
});

app.use(limiter);

// Endpoint
app.get('/api/no', (req, res) => {
  const reason = reasons[Math.floor(Math.random() * reasons.length)];
  res.json({ reason });
});

// Export as a Vercel serverless function
module.exports = app;
module.exports.handler = serverless(app);
