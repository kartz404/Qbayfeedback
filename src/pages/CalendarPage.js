import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import FeedbackFormModal from '../components/FeedbackFormModal';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const { accounts } = useMsal();
  const navigate = useNavigate();

  useEffect(() => {
    // If user not logged in, redirect to login page
    if (!accounts || accounts.length === 0) {
      navigate('/');
    }
  }, [accounts, navigate]);

  const handleDayClick = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    setOpen(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📅 Click a date to add feedback</h2>
      <Calendar onClickDay={handleDayClick} />
      <FeedbackFormModal
        open={open}
        onClose={() => setOpen(false)}
        date={selectedDate}
      />
    </div>
  );
}

export default CalendarPage;
