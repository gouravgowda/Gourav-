import React, { useEffect, useState } from 'react';
import WellbeingChat from '../components/WellbeingChat';
import Card from '../components/Card';
import './Wellbeing.css';

const Wellbeing = () => {
  const [checkInHistory, setCheckInHistory] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Mock data for preview
    const mockStats = {
      totalCheckIns: 24,
      averageStress: 4.2,
      averageSleepHours: 7.5,
      averageSentiment: 0.65
    };

    const mockHistory = [
      {
        _id: 1,
        mood: 'good',
        stressLevel: 3,
        createdAt: new Date().toISOString(),
        activities: ['Exercise', 'Study', 'Sleep']
      },
      {
        _id: 2,
        mood: 'excellent',
        stressLevel: 2,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        activities: ['Meditation', 'Reading']
      },
      {
        _id: 3,
        mood: 'neutral',
        stressLevel: 5,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        activities: ['Study', 'Gaming']
      }
    ];

    setStats(mockStats);
    setCheckInHistory(mockHistory);
  }, []);

  const getMoodEmoji = (mood) => {
    const emojis = {
      excellent: '😄',
      good: '😊',
      neutral: '😐',
      poor: '😕',
      terrible: '😢',
    };
    return emojis[mood] || '😐';
  };

  return (
    <div className="wellbeing-page">
      <div className="page-header">
        <h1>Mental Well-being & Health 💙</h1>
        <p>Track your mood, stress levels, and overall mental health</p>
      </div>

      {/* Chat Interface */}
      <div className="wellbeing-chat-container">
        <WellbeingChat />
      </div>

      {/* Statistics */}
      {stats && (
        <div className="stats-section">
          <div className="stats-grid">
            <Card>
              <h3>Total Check-ins</h3>
              <p className="stat-value">{stats.totalCheckIns}</p>
            </Card>

            <Card>
              <h3>Average Stress</h3>
              <p className="stat-value">{stats.averageStress?.toFixed(1) || 0}/10</p>
            </Card>

            <Card>
              <h3>Average Sleep</h3>
              <p className="stat-value">{stats.averageSleepHours?.toFixed(1) || 0}h</p>
            </Card>

            <Card>
              <h3>Sentiment Score</h3>
              <p className="stat-value">{stats.averageSentiment?.toFixed(2) || 0}</p>
            </Card>
          </div>
        </div>
      )}

      {/* Check-in History */}
      {checkInHistory.length > 0 && (
        <Card className="history-card">
          <h2 className="section-title">Recent Check-ins</h2>
          <div className="history-list">
            {checkInHistory.map((checkIn) => (
              <div key={checkIn._id} className="history-item">
                <div className="history-mood">
                  <span className="mood-emoji">{getMoodEmoji(checkIn.mood)}</span>
                  <span className="mood-label">{checkIn.mood}</span>
                </div>
                <div className="history-details">
                  <p className="history-date">
                    {new Date(checkIn.createdAt).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="history-stress">Stress: {checkIn.stressLevel}/10</p>
                </div>
                <div className="history-activities">
                  {checkIn.activities.map((activity, idx) => (
                    <span key={idx} className="activity-tag">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Wellbeing;
