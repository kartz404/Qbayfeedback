// server/routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const { meetingDate, rating, comments } = req.body;

    const feedback = new Feedback({ meetingDate, rating, comments });
    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Feedback error:', error.message);
    res.status(500).json({ message: 'Server error while saving feedback.' });
  }
});

module.exports = router;
