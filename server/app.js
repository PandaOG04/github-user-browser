const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const searchRoutes = require('./routes/search');
const userRoutes = require('./routes/users');
const repoRoutes = require('./routes/repos');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/search', searchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/repos', repoRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
