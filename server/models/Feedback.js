// server/models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  meetingDate: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comments: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
