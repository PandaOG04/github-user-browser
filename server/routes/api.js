const express = require('express');
const axios = require('axios');
const router = express.Router();

// GitHub API base URL
const GITHUB_API = 'https://api.github.com';

/**
 * Search for GitHub users
 */
router.get('/search/users', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(`${GITHUB_API}/search/users`, {
      params: { q },
      headers: { 'User-Agent': 'GitHub-Explorer-App' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

/**
 * Get user details
 */
router.get('/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`${GITHUB_API}/users/${username}`, {
      headers: { 'User-Agent': 'GitHub-Explorer-App' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

/**
 * Get user repositories
 */
router.get('/users/:username/repos', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
      headers: { 'User-Agent': 'GitHub-Explorer-App' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user repos:', error);
    res.status(500).json({ error: 'Failed to fetch user repositories' });
  }
});

/**
 * Get repository details
 */
router.get('/repos/:owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const response = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}`, {
      headers: { 'User-Agent': 'GitHub-Explorer-App' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching repo:', error);
    res.status(500).json({ error: 'Failed to fetch repository' });
  }
});

/**
 * Get repository commits
 */
router.get('/repos/:owner/:repo/commits', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const response = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/commits`, {
      params: { per_page: 5 },
      headers: { 'User-Agent': 'GitHub-Explorer-App' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching commits:', error);
    res.status(500).json({ error: 'Failed to fetch commits' });
  }
});

module.exports = router;