import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { IoAnalytics, IoTrendingUp, IoCalendar, IoPeople } from 'react-icons/io5';
import './StressAnalytics.css';

const StressAnalytics = () => {
    // Mock data for historical comparison & weekly reports
    const weeklyData = [
        { day: 'Mon', stress: 6, mood: 7 },
        { day: 'Tue', stress: 4, mood: 8 },
        { day: 'Wed', stress: 7, mood: 5 },
        { day: 'Thu', stress: 5, mood: 6 },
        { day: 'Fri', stress: 3, mood: 9 },
        { day: 'Sat', stress: 2, mood: 9 },
        { day: 'Sun', stress: 3, mood: 8 },
    ];

    const communityData = [
        { range: 'Low', count: 45 },
        { range: 'Med', count: 30 },
        { range: 'High', count: 25 },
    ];

    return (
        <div className="stress-analytics-container">
            <div className="analytics-header">
                <h2><IoAnalytics /> Stress Analytics & Reports</h2>
                <p>Detailed insights into your mental wellbeing journey</p>
            </div>

            <div className="analytics-grid">
                {/* Weekly Trend Card */}
                <div className="analytics-card trend-card">
                    <div className="card-header">
                        <h3><IoTrendingUp /> Weekly Stress Trend</h3>
                        <span className="badge">Last 7 Days</span>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="stress" stroke="#ef4444" fillOpacity={1} fill="url(#colorStress)" name="Stress Level" />
                                <Area type="monotone" dataKey="mood" stroke="#10b981" fillOpacity={1} fill="url(#colorMood)" name="Mood Score" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Historical Stats */}
                <div className="analytics-card stats-card">
                    <div className="card-header">
                        <h3><IoCalendar /> Historical Comparison</h3>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-label">Avg Stress</span>
                            <span className="stat-value down">4.2 <small>↓ 12%</small></span>
                            <span className="stat-desc">Better than last week</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Top Emotion</span>
                            <span className="stat-value">Calm</span>
                            <span className="stat-desc">Most frequent state</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Scans</span>
                            <span className="stat-value">14</span>
                            <span className="stat-desc">Total this week</span>
                        </div>
                    </div>
                </div>

                {/* Social / Community Features */}
                <div className="analytics-card social-card">
                    <div className="card-header">
                        <h3><IoPeople /> Community Pulse</h3>
                        <span className="badge new">Beta</span>
                    </div>
                    <p className="social-desc">See how you compare to the student community (Anonymous)</p>
                    <div className="chart-container small">
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={communityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="range" axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="count" fill="#667eea" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="community-insight">
                        <p><strong>Insight:</strong> 75% of students reported lower stress after using the breathing exercises.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StressAnalytics;
