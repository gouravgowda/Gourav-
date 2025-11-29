import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Wellbeing from './pages/Wellbeing';
import Courses from './pages/Courses';
import Timetable from './pages/Timetable';
import Reminders from './pages/Reminders';
import './styles/globals.css';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main App Routes - Bypassed Auth for Preview */}
          <Route path="/dashboard" element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Header title="Dashboard" />
                <Dashboard />
              </div>
            </div>
          } />

          <Route path="/wellbeing" element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Header title="Well-being" />
                <Wellbeing />
              </div>
            </div>
          } />

          <Route path="/courses" element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Header title="Courses" />
                <Courses />
              </div>
            </div>
          } />

          <Route path="/timetable" element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Header title="Timetable" />
                <Timetable />
              </div>
            </div>
          } />

          <Route path="/reminders" element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Header title="Reminders" />
                <Reminders />
              </div>
            </div>
          } />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
