const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  portfolioTitle: {
    type: String,
    required: true
  },
  portfolioContent: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  ownerEmail: {
    type: String,
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewerName: {
    type: String,
    required: true
  },
  reviewerEmail: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  score: {
    type: Number,
    min: 0,
    max: 10
  },
  feedback: String,
  structuredFeedback: {
    strengths: String,
    weaknesses: String,
    suggestions: String,
    generalFeedback: String
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  reviewDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);