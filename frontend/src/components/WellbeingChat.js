import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { mentalHealthService } from '../services/api';
import { useMentalHealthStore } from '../store/store';
import Card from './Card';
import './WellbeingChat.css';

const WellbeingChat = () => {
  const [mood, setMood] = useState('neutral');
  const [stressLevel, setStressLevel] = useState(5);
  const [sleepHours, setSleepHours] = useState(0);
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const addCheckIn = useMentalHealthStore((state) => state.addCheckIn);

  const activityOptions = ['exercise', 'meditation', 'study', 'socializing', 'gaming', 'sleep'];

  const handleActivityToggle = (activity) => {
    setActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await mentalHealthService.createCheckIn({
        mood,
        stressLevel,
        sleepHours,
        activities,
        notes,
      });

      const { aiResponse: response_text, checkIn } = response.data;
      setAiResponse(response_text);
      addCheckIn(checkIn);

      // Reset form
      setMood('neutral');
      setStressLevel(5);
      setSleepHours(0);
      setNotes('');
      setActivities([]);

      toast.success('Check-in recorded successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating check-in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wellbeing-chat">
      <Card className="chat-card">
        <div className="chat-header">
          <h2 className="chat-title">How are you feeling today? 💙</h2>
          <p className="chat-subtitle">Tell us how you're doing and we'll provide support</p>
        </div>

        <form onSubmit={handleSubmit} className="chat-form">
          {/* Mood Selection */}
          <div className="form-group">
            <label className="form-label">Current Mood</label>
            <div className="mood-selector">
              {['excellent', 'good', 'neutral', 'poor', 'terrible'].map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`mood-btn ${mood === m ? 'active' : ''}`}
                  onClick={() => setMood(m)}
                  title={m}
                >
                  {m === 'excellent' && '😄'}
                  {m === 'good' && '😊'}
                  {m === 'neutral' && '😐'}
                  {m === 'poor' && '😕'}
                  {m === 'terrible' && '😢'}
                </button>
              ))}
            </div>
          </div>

          {/* Stress Level */}
          <div className="form-group">
            <label className="form-label">Stress Level: {stressLevel}/10</label>
            <input
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(Number(e.target.value))}
              className="stress-slider"
            />
          </div>

          {/* Sleep Hours */}
          <div className="form-group">
            <label className="form-label">Sleep Hours Last Night</label>
            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
              placeholder="Enter hours"
              className="form-input"
            />
          </div>

          {/* Activities */}
          <div className="form-group">
            <label className="form-label">What have you done today?</label>
            <div className="activities-grid">
              {activityOptions.map((activity) => (
                <button
                  key={activity}
                  type="button"
                  className={`activity-badge ${activities.includes(activity) ? 'active' : ''}`}
                  onClick={() => handleActivityToggle(activity)}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="form-group">
            <label className="form-label">Share Your Thoughts (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind? Share anything you'd like to discuss..."
              rows="4"
              className="form-textarea"
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Send Check-in'}
          </button>
        </form>

        {aiResponse && (
          <div className="ai-response">
            <div className="response-header">
              <p className="response-title">💡 AI Companion Response</p>
            </div>
            <div className="response-body">{aiResponse}</div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default WellbeingChat;
