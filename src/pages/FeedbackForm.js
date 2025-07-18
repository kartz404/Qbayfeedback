import React, { useState } from 'react';
import api from '../api'; // Axios instance

const FeedbackForm = () => {
  const [meetingDate, setMeetingDate] = useState('');
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/feedback', {
        meetingDate,
        rating,
        comments,
      });
      alert('✅ Feedback submitted successfully!');
      setMeetingDate('');
      setRating(1);
      setComments('');
    } catch (err) {
      console.error('❌ Submission error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        Rating (1-5):
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min={1}
          max={5}
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
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
