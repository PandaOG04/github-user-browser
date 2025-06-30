const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const apiRouter = require('./routes/api');

// Initialize Express app
const app = express();

// Middleware
app.use(helmet()); // Security middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// API routes
app.use('/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});