const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/search/users?q=someuser
router.get('/users', async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query parameter q is required' });

    const githubRes = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(q)}`);
    const users = githubRes.data.items.map(user => ({
      login: user.login,
      avatar_url: user.avatar_url,
      html_url: user.html_url
    }));

    res.json({ users });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
