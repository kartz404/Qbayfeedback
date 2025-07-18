import React from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import ChartView from '../components/ChartView';
import 'react-calendar/dist/Calendar.css';

function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 20 }}>
      <h1>📅 Meeting Feedback Dashboard</h1>
      <button onClick={() => navigate('/calendar')}>Add Calendar</button>
      <div style={{ marginTop: 30 }}>
        <Calendar />
      </div>
      <div style={{ marginTop: 30 }}>
        <ChartView />
      </div>
    </div>
  );
}
export default HomePage;
