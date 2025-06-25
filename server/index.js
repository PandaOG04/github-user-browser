const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(cors()); // Allow React frontend to access backend
app.use(express.json());

const GITHUB_API_BASE = 'https://api.github.com';

// Search users by query string
app.get('/api/search-users', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'Query "q" is required' });

  try {
    const response = await axios.get(`${GITHUB_API_BASE}/search/users`, {
      params: { q, per_page: 10 }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user details + repos
app.get('/api/users/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const [userRes, reposRes] = await Promise.all([
      axios.get(`${GITHUB_API_BASE}/users/${username}`),
      axios.get(`${GITHUB_API_BASE}/users/${username}/repos`, {
        params: { sort: 'updated', per_page: 10 }
      })
    ]);
    res.json({
      user: userRes.data,
      repos: reposRes.data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get repo details + last 5 commits
app.get('/api/repos/:username/:repoName', async (req, res) => {
  const { username, repoName } = req.params;
  try {
    const [repoRes, commitsRes] = await Promise.all([
      axios.get(`${GITHUB_API_BASE}/repos/${username}/${repoName}`),
      axios.get(`${GITHUB_API_BASE}/repos/${username}/${repoName}/commits`, {
        params: { per_page: 5 }
      })
    ]);
    res.json({
      repo: repoRes.data,
      commits: commitsRes.data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
