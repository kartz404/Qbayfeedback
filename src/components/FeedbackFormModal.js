import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import api from '../api';

function FeedbackFormModal({ open, setOpen, date }) {
  const [question, setQuestion] = useState('');

  const handleSubmit = async () => {
    await api.post('/meetings', {
      title: `Feedback for ${date}`,
      date,
      questions: [question]
    });
    setOpen(false);
    setQuestion('');
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={{
        backgroundColor: 'white',
        p: 4,
        width: 400,
        margin: '10% auto',
        borderRadius: 2,
        boxShadow: 4
      }}>
        <h2>Create Feedback Form for {date}</h2>
        <TextField
          fullWidth
          label="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}
export default FeedbackFormModal;
