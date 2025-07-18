const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  meetingDate: String,
  meetingName: String,
  rating: Number,
  comments: String,
  questions: [
    {
      question: String,
      answer: String,
    }
  ],
});

module.exports = mongoose.model('Feedback', feedbackSchema);
