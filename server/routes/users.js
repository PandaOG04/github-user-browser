const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/users/:username
router.get('/:username', async (req, res, next) => {
  try {
    const username = req.params.username;
    const githubRes = await axios.get(`https://api.github.com/users/${username}`);
    const userData = githubRes.data;

    // Get repos (max 5 repos)
    const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=updated`);
    const repos = reposRes.data.map(repo => ({
      name: repo.name,
      description: repo.description,
      created_at: repo.created_at,
      html_url: repo.html_url,
      updated_at: repo.updated_at,
    }));

    res.json({
      login: userData.login,
      avatar_url: userData.avatar_url,
      html_url: userData.html_url,
      bio: userData.bio,
      repos
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
