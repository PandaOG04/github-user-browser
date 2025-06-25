const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const githubRoutes = require('./routes/github');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Use GitHub routes
app.use('/api/github', githubRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
