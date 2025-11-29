import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Service
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Mental Health Service
export const mentalHealthService = {
  createCheckIn: (data) => api.post('/mental-health/checkin', data),
  getCheckInHistory: (limit = 10, skip = 0) =>
    api.get(`/mental-health/checkin/history?limit=${limit}&skip=${skip}`),
  getCheckInStats: () => api.get('/mental-health/checkin/stats'),
};

// Course Service
export const courseService = {
  createCourse: (data) => api.post('/courses', data),
  getCourses: () => api.get('/courses'),
  updateCourse: (courseId, data) => api.put(`/courses/${courseId}`, data),
  deleteCourse: (courseId) => api.delete(`/courses/${courseId}`),
  addAssessment: (courseId, data) => api.post(`/courses/${courseId}/assessment`, data),
  getCourseStats: () => api.get('/courses/stats'),
};

// Attendance Service
export const attendanceService = {
  markAttendance: (data) => api.post('/attendance', data),
  getAttendance: (courseId) => api.get(`/attendance/${courseId}`),
  getAttendanceStats: (courseId) => api.get(`/attendance/stats/${courseId}`),
  getAllAttendanceStats: () => api.get('/attendance/stats'),
};

// Timetable Service
export const timetableService = {
  createTimetableEntry: (data) => api.post('/timetable', data),
  getTimetable: () => api.get('/timetable'),
  getTimetableByDay: (day) => api.get(`/timetable/${day}`),
  updateTimetableEntry: (entryId, data) => api.put(`/timetable/${entryId}`, data),
  deleteTimetableEntry: (entryId) => api.delete(`/timetable/${entryId}`),
};

// Reminder Service
export const reminderService = {
  createReminder: (data) => api.post('/reminders', data),
  getReminders: () => api.get('/reminders'),
  getUpcomingReminders: () => api.get('/reminders/upcoming'),
  updateReminder: (reminderId, data) => api.put(`/reminders/${reminderId}`, data),
  markReminderComplete: (reminderId) => api.patch(`/reminders/${reminderId}/complete`),
  deleteReminder: (reminderId) => api.delete(`/reminders/${reminderId}`),
};

export default api;
