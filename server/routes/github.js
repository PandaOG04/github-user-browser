const express = require('express');
const axios = require('axios');
const router = express.Router();

// Base GitHub API URL
const GITHUB_API = 'https://api.github.com';

// Route: GET /api/github/search/users?q=:query
router.get('/search/users', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" required' });
    }
    const response = await axios.get(`${GITHUB_API}/search/users`, {
      params: { q }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: GET /api/github/users/:username
router.get('/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`${GITHUB_API}/users/${username}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: GET /api/github/users/:username/repos
router.get('/users/:username/repos', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 5
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: GET /api/github/repos/:owner/:repo/commits
router.get('/repos/:owner/:repo/commits', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const response = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/commits`, {
      params: {
        per_page: 5
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
