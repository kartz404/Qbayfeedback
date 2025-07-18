import React, { useState } from 'react';
import Calendar from 'react-calendar';
import FeedbackFormModal from '../components/FeedbackFormModal';
import 'react-calendar/dist/Calendar.css';

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);

  const handleDayClick = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    setOpen(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📅 Click a date to add a feedback form</h2>
      <Calendar onClickDay={handleDayClick} />
      <FeedbackFormModal open={open} setOpen={setOpen} date={selectedDate} />
    </div>
  );
}
export default CalendarPage;
