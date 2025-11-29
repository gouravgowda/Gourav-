import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import WellbeingChat from '../components/WellbeingChat';
import FacialStressAnalyzer from '../components/FacialStressAnalyzer';
import StressAnalytics from '../components/StressAnalytics';
import ExerciseTimer from '../components/ExerciseTimer';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { IoHeart, IoFitness, IoHappy, IoTime } from 'react-icons/io5';
import './Wellbeing.css';

const Wellbeing = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('checkin'); // checkin, facial, analytics
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleAnalysisComplete = (results) => {
    console.log('Analysis results:', results);
    // Here you would save to backend
  };

  if (loading) {
    return (
      <div className="wellbeing-page">
        <LoadingSkeleton type="card" count={2} />
      </div>
    );
  }

  return (
    <div className="wellbeing-page">
      {/* Premium Header Section */}
      <div className="wellbeing-header-hero">
        <div className="header-content">
          <h1>Mental Wellness Center</h1>
          <p>Track, analyze, and improve your mental health with AI</p>
        </div>
        <div className="quick-actions">
          <button
            className={`action-pill ${activeTab === 'checkin' ? 'active' : ''}`}
            onClick={() => setActiveTab('checkin')}
          >
            <IoHeart /> Daily Check-in
          </button>
          <button
            className={`action-pill ${activeTab === 'facial' ? 'active' : ''}`}
            onClick={() => setActiveTab('facial')}
          >
            <IoHappy /> AI Face Scan
          </button>
          <button
            className={`action-pill ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <IoFitness /> Analytics & Reports
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="wellbeing-content">
        {activeTab === 'checkin' && (
          <div className="tab-content fade-in">
            <WellbeingChat />
          </div>
        )}

        {activeTab === 'facial' && (
          <div className="tab-content fade-in">
            <div className="facial-section-header">
              <h2>AI Facial Stress Detection</h2>
              <p>Use your camera to analyze stress levels through facial micro-expressions</p>
            </div>
            <FacialStressAnalyzer onAnalysisComplete={handleAnalysisComplete} />

            <div className="quick-exercises-promo">
              <h3>Feeling Stressed?</h3>
              <button className="start-exercise-btn" onClick={() => setShowTimer(true)}>
                <IoTime /> Start Breathing Exercise
              </button>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="tab-content fade-in">
            <StressAnalytics />
          </div>
        )}
      </div>

      {/* Exercise Timer Modal Overlay */}
      {showTimer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowTimer(false)}>×</button>
            <ExerciseTimer onClose={() => setShowTimer(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Wellbeing;
