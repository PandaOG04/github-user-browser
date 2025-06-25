const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/repos/:username/:repo
router.get('/:username/:repo', async (req, res, next) => {
  try {
    const { username, repo } = req.params;

    const repoRes = await axios.get(`https://api.github.com/repos/${username}/${repo}`);
    const commitsRes = await axios.get(`https://api.github.com/repos/${username}/${repo}/commits?per_page=5`);

    const repoData = repoRes.data;
    const commits = commitsRes.data.map(commit => ({
      message: commit.commit.message,
      date: commit.commit.author.date,
      url: commit.html_url
    }));

    res.json({
      name: repoData.name,
      description: repoData.description,
      created_at: repoData.created_at,
      updated_at: repoData.updated_at,
      html_url: repoData.html_url,
      commits
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
