import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoHome, IoHeart, IoBook, IoCalendarOutline, IoNotifications, IoSettingsOutline, IoLogOut } from 'react-icons/io5';
import { useAuth } from '../hooks/useAuth';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { icon: <IoHome />, label: 'Dashboard', path: '/dashboard' },
    { icon: <IoHeart />, label: 'Well-being', path: '/wellbeing' },
    { icon: <IoBook />, label: 'Courses', path: '/courses' },
    { icon: <IoCalendarOutline />, label: 'Timetable', path: '/timetable' },
    { icon: <IoNotifications />, label: 'Reminders', path: '/reminders' },
    { icon: <IoSettingsOutline />, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">CompanionAI</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          <IoLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
