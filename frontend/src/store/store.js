import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),

  login: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isLoggedIn: false });
  },

  setUser: (user) => set({ user }),
}));

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  currentPage: 'dashboard',
  notificationCount: 0,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setCurrentPage: (page) => set({ currentPage: page }),
  setNotificationCount: (count) => set({ notificationCount: count }),
}));

export const useMentalHealthStore = create((set) => ({
  checkIns: [],
  stats: {},
  loading: false,

  setCheckIns: (checkIns) => set({ checkIns }),
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ loading }),
  addCheckIn: (checkIn) => set((state) => ({ checkIns: [checkIn, ...state.checkIns] })),
}));

export const useCourseStore = create((set) => ({
  courses: [],
  courseStats: {},
  loading: false,

  setCourses: (courses) => set({ courses }),
  setCourseStats: (stats) => set({ courseStats: stats }),
  setLoading: (loading) => set({ loading }),
  addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
}));

export const useReminderStore = create((set) => ({
  reminders: [],
  upcomingReminders: [],
  loading: false,

  setReminders: (reminders) => set({ reminders }),
  setUpcomingReminders: (reminders) => set({ upcomingReminders: reminders }),
  setLoading: (loading) => set({ loading }),
  addReminder: (reminder) => set((state) => ({ reminders: [...state.reminders, reminder] })),
}));
