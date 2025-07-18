const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  microsoftId: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// POST /api/auth/microsoft
router.post('/microsoft', async (req, res) => {
  const { name, email, microsoftId } = req.body;

  if (!email || !microsoftId) {
    return res.status(400).json({ error: "Missing email or Microsoft ID" });
  }

  let user = await User.findOne({ microsoftId });

  if (!user) {
    user = new User({ name, email, microsoftId });
    await user.save();
  }

  res.json({ success: true, user });
});

module.exports = router;
