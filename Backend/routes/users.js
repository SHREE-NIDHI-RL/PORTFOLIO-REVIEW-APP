const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all reviewers
router.get('/reviewers', auth, async (req, res) => {
  try {
    const reviewers = await User.find({ role: 'reviewer' })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(reviewers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get reviewer by email
router.get('/reviewer/:email', auth, async (req, res) => {
  try {
    const reviewer = await User.findOne({ 
      email: req.params.email, 
      role: 'reviewer' 
    }).select('-password');
    
    if (!reviewer) {
      return res.status(404).json({ message: 'Reviewer not found' });
    }

    res.json(reviewer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all posts
router.get('/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .populate('reviewer', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;