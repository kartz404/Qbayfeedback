// server/index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/feedback-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// MODELS
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  microsoftId: String,
}, { timestamps: true });

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Feedback = mongoose.model("Feedback", feedbackSchema);

// ROUTES

// Microsoft Login Route
app.post("/api/auth/microsoft", async (req, res) => {
  const { name, email, microsoftId } = req.body;

  if (!name || !email || !microsoftId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let user = await User.findOne({ microsoftId });

    if (!user) {
      user = new User({ name, email, microsoftId });
      await user.save();
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Feedback Submission Route
app.post("/api/feedback", async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "User ID and message are required" });
  }

  try {
    const feedback = new Feedback({ userId, message });
    await feedback.save();
    res.json({ success: true, feedback });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all feedbacks
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('userId', 'name email');
    res.json({ success: true, feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Root Test Route
app.get("/", (req, res) => {
  res.send("🚀 API is running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
