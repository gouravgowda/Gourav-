import React, { useState } from 'react';
import { IoMoon, IoSunny, IoPersonOutline, IoNotificationsOutline, IoShieldCheckmarkOutline, IoColorPaletteOutline } from 'react-icons/io5';
import Card from '../components/Card';
import toast from 'react-hot-toast';
import './Settings.css';

const Settings = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        reminders: true,
        checkIns: true
    });
    const [profile, setProfile] = useState({
        name: localStorage.getItem('userName') || 'Student',
        email: localStorage.getItem('userEmail') || 'student@example.com',
        university: localStorage.getItem('userUniversity') || 'Your University'
    });

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        toast.success(`Switched to ${newTheme} mode`);
    };

    const handleNotificationToggle = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
        toast.success('Notification preferences updated');
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', profile.name);
        localStorage.setItem('userEmail', profile.email);
        localStorage.setItem('userUniversity', profile.university);
        toast.success('Profile updated successfully!');
    };

    const handleExportData = () => {
        toast.success('Data export started! Check your downloads.');
        // In a real app, this would export user data
    };

    const handleClearCache = () => {
        toast.success('Cache cleared successfully!');
    };

    return (
        <div className="settings-page">
            <div className="settings-header">
                <h1>⚙️ Settings</h1>
                <p>Customize your experience and manage your account</p>
            </div>

            <div className="settings-grid">
                {/* Theme Settings */}
                <Card>
                    <div className="settings-section">
                        <div className="section-header">
                            <IoColorPaletteOutline className="section-icon" />
                            <h2>Appearance</h2>
                        </div>
                        <p className="section-description">Customize how the app looks</p>

                        <div className="theme-toggle">
                            <div className="theme-option">
                                <IoSunny className={`theme-icon ${theme === 'light' ? 'active' : ''}`} />
                                <span>Light Mode</span>
                            </div>
                            <div className="toggle-switch" onClick={handleThemeToggle}>
                                <div className={`toggle-slider ${theme === 'dark' ? 'active' : ''}`}></div>
                            </div>
                            <div className="theme-option">
                                <IoMoon className={`theme-icon ${theme === 'dark' ? 'active' : ''}`} />
                                <span>Dark Mode</span>
                            </div>
                        </div>

                        <div className="theme-preview">
                            <p className="preview-label">Preview:</p>
                            <div className="preview-card">
                                <div className="preview-header">
                                    <div className="preview-circle"></div>
                                    <div className="preview-lines">
                                        <div className="preview-line short"></div>
                                        <div className="preview-line long"></div>
                                    </div>
                                </div>
                                <div className="preview-content">
                                    <div className="preview-line long"></div>
                                    <div className="preview-line medium"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Profile Settings */}
                <Card>
                    <div className="settings-section">
                        <div className="section-header">
                            <IoPersonOutline className="section-icon" />
                            <h2>Profile</h2>
                        </div>
                        <p className="section-description">Update your personal information</p>

                        <form onSubmit={handleProfileUpdate} className="profile-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    placeholder="Your full name"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label>University</label>
                                <input
                                    type="text"
                                    value={profile.university}
                                    onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                                    placeholder="Your university name"
                                />
                            </div>

                            <button type="submit" className="btn-primary">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </Card>

                {/* Notifications */}
                <Card>
                    <div className="settings-section">
                        <div className="section-header">
                            <IoNotificationsOutline className="section-icon" />
                            <h2>Notifications</h2>
                        </div>
                        <p className="section-description">Manage how you receive updates</p>

                        <div className="notification-options">
                            <div className="notification-item">
                                <div className="notification-info">
                                    <h3>Email Notifications</h3>
                                    <p>Receive updates via email</p>
                                </div>
                                <div
                                    className={`toggle-switch small ${notifications.email ? 'active' : ''}`}
                                    onClick={() => handleNotificationToggle('email')}
                                >
                                    <div className="toggle-slider"></div>
                                </div>
                            </div>

                            <div className="notification-item">
                                <div className="notification-info">
                                    <h3>Push Notifications</h3>
                                    <p>Get browser notifications</p>
                                </div>
                                <div
                                    className={`toggle-switch small ${notifications.push ? 'active' : ''}`}
                                    onClick={() => handleNotificationToggle('push')}
                                >
                                    <div className="toggle-slider"></div>
                                </div>
                            </div>

                            <div className="notification-item">
                                <div className="notification-info">
                                    <h3>Reminder Alerts</h3>
                                    <p>Get notified about upcoming tasks</p>
                                </div>
                                <div
                                    className={`toggle-switch small ${notifications.reminders ? 'active' : ''}`}
                                    onClick={() => handleNotificationToggle('reminders')}
                                >
                                    <div className="toggle-slider"></div>
                                </div>
                            </div>

                            <div className="notification-item">
                                <div className="notification-info">
                                    <h3>Check-in Reminders</h3>
                                    <p>Daily mental health check-in prompts</p>
                                </div>
                                <div
                                    className={`toggle-switch small ${notifications.checkIns ? 'active' : ''}`}
                                    onClick={() => handleNotificationToggle('checkIns')}
                                >
                                    <div className="toggle-slider"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Privacy & Security */}
                <Card>
                    <div className="settings-section">
                        <div className="section-header">
                            <IoShieldCheckmarkOutline className="section-icon" />
                            <h2>Privacy & Security</h2>
                        </div>
                        <p className="section-description">Manage your data and security settings</p>

                        <div className="privacy-actions">
                            <button className="action-btn secondary" onClick={handleExportData}>
                                📥 Export My Data
                            </button>
                            <button className="action-btn secondary" onClick={handleClearCache}>
                                🗑️ Clear Cache
                            </button>
                            <button className="action-btn danger">
                                ⚠️ Delete Account
                            </button>
                        </div>

                        <div className="privacy-info">
                            <p>
                                <strong>Data Privacy:</strong> Your mental health data is private and encrypted.
                                We never share your personal information with third parties.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Settings;
