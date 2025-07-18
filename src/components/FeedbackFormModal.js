import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Typography, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import api from '../api'; // Axios instance pointing to your backend

const FeedbackFormModal = ({ open, onClose, date }) => {
  const [meetingName, setMeetingName] = useState('');
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState('');
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const handleSubmit = async () => {
    try {
      console.log('localStorage user:', localStorage.getItem('user'));
      const user = localStorage.getItem('user');
      if (!user) {
        alert('❌ Please login first');
        return;
      }
      const userId = JSON.parse(user)._id;
      if (!userId) {
        alert('❌ Please login first');
        return;
      }

      await api.post('/feedback', {
        userId,
        meetingDate: date,
        meetingName,
        rating,
        comments,
        questions,
      });

      alert('✅ Feedback submitted!');
      setMeetingName('');
      setRating(1);
      setComments('');
      setQuestions([{ question: '', answer: '' }]);
      onClose();
    } catch (err) {
      console.error(err);
      alert('❌ Error submitting feedback');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Submit Feedback for {date}</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Meeting Name"
          fullWidth
          margin="normal"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
        />
        <TextField
          label="Rating (1–5)"
          type="number"
          fullWidth
          margin="normal"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          inputProps={{ min: 1, max: 5 }}
        />
        <TextField
          label="Comments"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />

        <Typography variant="h6" gutterBottom>Questions</Typography>
        {questions.map((q, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <TextField
              label={`Question ${index + 1}`}
              fullWidth
              margin="dense"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
            />
            <TextField
              label="Answer"
              fullWidth
              margin="dense"
              value={q.answer}
              onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
            />
          </div>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={addQuestion}
          style={{ marginTop: '1rem' }}
        >
          Add Question
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackFormModal;
