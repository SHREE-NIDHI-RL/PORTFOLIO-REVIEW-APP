const express = require('express');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Portfolio = require('../models/Portfolio');
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Send review request
router.post('/request', auth, [
  body('portfolioId').notEmpty().withMessage('Portfolio ID is required'),
  body('reviewerEmail').isEmail().withMessage('Valid reviewer email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { portfolioId, reviewerEmail, message } = req.body;

    const portfolio = await Portfolio.findById(portfolioId).populate('owner');
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const reviewer = await User.findOne({ email: reviewerEmail, role: 'reviewer' });
    if (!reviewer) {
      return res.status(404).json({ message: 'Reviewer not found' });
    }

    const reviewData = {
      portfolio: portfolioId,
      portfolioTitle: portfolio.title,
      portfolioContent: portfolio.content,
      owner: portfolio.owner._id,
      ownerName: portfolio.owner.name,
      ownerEmail: portfolio.owner.email,
      reviewer: reviewer._id,
      reviewerName: reviewer.name,
      reviewerEmail: reviewer.email,
      status: 'pending'
    };

    const review = new Review(reviewData);
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get review requests for reviewer
router.get('/requests', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ 
      reviewerEmail: req.user.email,
      status: { $in: ['pending', 'accepted'] }
    }).sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get reviews for owner
router.get('/my-reviews', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ 
      ownerEmail: req.user.email 
    }).sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update review status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    const review = await Review.findOne({ 
      _id: req.params.id, 
      reviewerEmail: req.user.email 
    });
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.status = status;
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit review
router.patch('/:id/submit', auth, [
  body('score').isFloat({ min: 0, max: 10 }).withMessage('Score must be between 0 and 10'),
  body('feedback').notEmpty().withMessage('Feedback is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { score, feedback, structuredFeedback } = req.body;
    
    const review = await Review.findOne({ 
      _id: req.params.id, 
      reviewerEmail: req.user.email,
      status: 'accepted'
    });
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found or not accepted' });
    }

    review.score = score;
    review.feedback = feedback;
    review.structuredFeedback = structuredFeedback;
    review.status = 'completed';
    review.reviewDate = new Date();
    
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create post from review
router.post('/:id/post', auth, async (req, res) => {
  try {
    const review = await Review.findOne({ 
      _id: req.params.id, 
      ownerEmail: req.user.email,
      status: 'completed'
    });
    
    if (!review) {
      return res.status(404).json({ message: 'Completed review not found' });
    }

    const postData = {
      author: req.user._id,
      authorName: req.user.name,
      authorEmail: req.user.email,
      portfolioTitle: review.portfolioTitle,
      portfolioContent: review.portfolioContent,
      reviewer: review.reviewer,
      reviewerName: review.reviewerName,
      reviewerEmail: review.reviewerEmail,
      reviewScore: review.score,
      reviewFeedback: review.feedback
    };

    const post = new Post(postData);
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;