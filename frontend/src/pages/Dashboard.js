import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../components/Card';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [courseStats, setCourseStats] = useState(null);
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [upcomingReminders, setUpcomingReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  useEffect(() => {
    // Mock data for preview
    const mockStats = {
      averageStress: 4.2,
      averageSleepHours: 7.5,
      totalCheckIns: 24,
      moodDistribution: {
        happy: 12,
        neutral: 5,
        stressed: 2,
        sad: 1
      }
    };

    const mockCourseStats = {
      averageCompletion: 78,
      totalCourses: 5,
      coursesWithGrades: 3,
      totalCredits: 18
    };

    const mockAttendanceStats = {
      overallAttendancePercentage: 92,
      present: 45,
      absent: 2,
      late: 3
    };

    const mockReminders = [
      { _id: 1, title: 'Machine Learning Assignment', reminderTime: 'Today, 5:00 PM', priority: 'high' },
      { _id: 2, title: 'Database Quiz', reminderTime: 'Tomorrow, 10:00 AM', priority: 'medium' },
      { _id: 3, title: 'Project Meeting', reminderTime: 'Dec 05, 2:00 PM', priority: 'low' }
    ];

    setStats(mockStats);
    setCourseStats(mockCourseStats);
    setAttendanceStats(mockAttendanceStats);
    setUpcomingReminders(mockReminders);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading your dashboard...</div>;
  }

  const moodData = stats?.moodDistribution
    ? Object.entries(stats.moodDistribution).map(([mood, count]) => ({
      name: mood.charAt(0).toUpperCase() + mood.slice(1),
      value: count,
    }))
    : [];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back! 👋</h1>
        <p>Here's your personalized overview</p>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <Card className="metric-card">
          <div className="metric-content">
            <div className="metric-value">{stats?.averageStress?.toFixed(1) || 0}</div>
            <div className="metric-label">Avg Stress Level</div>
            <div className="metric-icon">😰</div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="metric-content">
            <div className="metric-value">{stats?.averageSleepHours?.toFixed(1) || 0}h</div>
            <div className="metric-label">Avg Sleep</div>
            <div className="metric-icon">😴</div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="metric-content">
            <div className="metric-value">{courseStats?.averageCompletion || 0}%</div>
            <div className="metric-label">Course Progress</div>
            <div className="metric-icon">📚</div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="metric-content">
            <div className="metric-value">{attendanceStats?.overallAttendancePercentage || 0}%</div>
            <div className="metric-label">Attendance</div>
            <div className="metric-icon">✅</div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Mood Distribution */}
        {moodData.length > 0 && (
          <Card>
            <h3 className="chart-title">Mood Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {moodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Course Stats */}
        {courseStats && (
          <Card>
            <h3 className="chart-title">Course Overview</h3>
            <div className="course-stats-list">
              <div className="stat-row">
                <span>Total Courses</span>
                <span className="stat-value">{courseStats.totalCourses}</span>
              </div>
              <div className="stat-row">
                <span>With Grades</span>
                <span className="stat-value">{courseStats.coursesWithGrades}</span>
              </div>
              <div className="stat-row">
                <span>Total Credits</span>
                <span className="stat-value">{courseStats.totalCredits}</span>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Upcoming Reminders */}
      {upcomingReminders.length > 0 && (
        <Card>
          <h3 className="chart-title">Upcoming Reminders</h3>
          <div className="reminders-list">
            {upcomingReminders.slice(0, 5).map((reminder) => (
              <div key={reminder._id} className="reminder-item">
                <div className={`reminder-badge ${reminder.priority}`}>{reminder.priority}</div>
                <div className="reminder-details">
                  <p className="reminder-title">{reminder.title}</p>
                  <p className="reminder-time">{reminder.reminderTime}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="quick-stats">
        <Card>
          <h3>Mental Health Check-ins</h3>
          <p className="stat-large">{stats?.totalCheckIns || 0}</p>
          <p className="stat-label">Total check-ins recorded</p>
        </Card>

        <Card>
          <h3>Attendance Summary</h3>
          <div className="attendance-summary">
            <div className="attendance-stat">
              <span className="label">Present</span>
              <span className="value present">{attendanceStats?.present || 0}</span>
            </div>
            <div className="attendance-stat">
              <span className="label">Absent</span>
              <span className="value absent">{attendanceStats?.absent || 0}</span>
            </div>
            <div className="attendance-stat">
              <span className="label">Late</span>
              <span className="value late">{attendanceStats?.late || 0}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
