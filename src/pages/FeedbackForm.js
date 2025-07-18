import React, { useState } from 'react';
import api from '../api';

const FeedbackForm = () => {
  const [meetingDate, setMeetingDate] = useState('');
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user._id) {
      alert('❌ Please login first');
      return;
    }

    try {
      await api.post('/api/feedback', {
        userId: user._id,
        meetingDate,
        rating,
        comments,
      });
      alert('✅ Feedback submitted!');
      setMeetingDate('');
      setRating(1);
      setComments('');
    } catch (err) {
      console.error('❌ Error submitting feedback:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <label>
        Meeting Date:
        <input
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          required
        />
      </label><br />
      <label>
        Rating (1–5):
        <input
          type="number"
          value={rating}
          min={1}
          max={5}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />
      </label><br />
      <label>
        Comments:
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          required
        />
      </label><br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
