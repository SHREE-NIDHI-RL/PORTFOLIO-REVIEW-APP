const express = require('express');
const { body, validationResult } = require('express-validator');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');

const router = express.Router();

// Create portfolio
router.post('/', auth, [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const portfolioData = {
      ...req.body,
      owner: req.user._id,
      ownerName: req.user.name,
      versions: [{
        version: 1,
        content: req.body.content,
        publicForReviewers: false
      }]
    };

    const portfolio = new Portfolio(portfolioData);
    await portfolio.save();

    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's portfolios
router.get('/my-portfolios', auth, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get public portfolios for reviewers
router.get('/public', auth, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({
      'versions.publicForReviewers': true
    }).populate('owner', 'name email');
    
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add version to portfolio
router.post('/:id/versions', auth, [
  body('content').notEmpty().withMessage('Content is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const portfolio = await Portfolio.findOne({ _id: req.params.id, owner: req.user._id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const newVersion = {
      version: portfolio.versions.length + 1,
      content: req.body.content,
      publicForReviewers: false
    };

    portfolio.versions.push(newVersion);
    await portfolio.save();

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update portfolio visibility
router.patch('/:id/visibility', auth, async (req, res) => {
  try {
    const { versionNumber, publicForReviewers } = req.body;
    
    const portfolio = await Portfolio.findOne({ _id: req.params.id, owner: req.user._id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const version = portfolio.versions.find(v => v.version === versionNumber);
    if (!version) {
      return res.status(404).json({ message: 'Version not found' });
    }

    version.publicForReviewers = publicForReviewers;
    await portfolio.save();

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;