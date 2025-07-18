const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: String,
  date: String,
  questions: [String],
});

module.exports = mongoose.model('Meeting', meetingSchema);
