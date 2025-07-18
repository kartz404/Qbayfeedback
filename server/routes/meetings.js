const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');

// Create meeting
router.post('/', async (req, res) => {
  const { title, date, questions } = req.body;
  const meeting = new Meeting({ title, date, questions });
  await meeting.save();
  res.json(meeting);
});

// Get all meetings
router.get('/', async (req, res) => {
  const meetings = await Meeting.find();
  res.json(meetings);
});

module.exports = router;
