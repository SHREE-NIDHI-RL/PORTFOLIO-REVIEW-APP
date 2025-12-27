const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  version: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  publicForReviewers: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
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
  domain: {
    type: String,
    enum: ['Web Development', 'Mobile Development', 'UI/UX Design', 'Data Science', 'AI/ML', 'DevOps', 'Other'],
    default: 'Other'
  },
  experienceLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate'
  },
  uploadType: {
    type: String,
    enum: ['text', 'file', 'link'],
    default: 'text'
  },
  fileName: String,
  externalLink: String,
  openForReview: {
    type: Boolean,
    default: true
  },
  private: {
    type: Boolean,
    default: false
  },
  versions: [versionSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);