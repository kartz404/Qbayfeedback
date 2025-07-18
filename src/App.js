import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage';
import AuthCallback from './pages/AuthCallback';

// Initialize the MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <AppRoutes />
      </Router>
    </MsalProvider>
  );
}

export default App;
