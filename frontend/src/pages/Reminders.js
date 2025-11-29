import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../components/Card';
import { reminderService } from '../services/api';
import { IoAdd, IoTrash, IoCheckmark } from 'react-icons/io5';
import './Reminders.css';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'custom',
    reminderDate: '',
    reminderTime: '09:00',
    frequency: 'once',
    priority: 'medium',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await reminderService.getReminders();
      setReminders(response.data);
    } catch (error) {
      toast.error('Error fetching reminders');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reminderService.createReminder(formData);
      toast.success('Reminder created successfully!');
      setFormData({
        title: '',
        description: '',
        type: 'custom',
        reminderDate: '',
        reminderTime: '09:00',
        frequency: 'once',
        priority: 'medium',
      });
      setShowForm(false);
      fetchReminders();
    } catch (error) {
      toast.error('Error creating reminder');
    }
  };

  const handleDelete = async (reminderId) => {
    try {
      await reminderService.deleteReminder(reminderId);
      toast.success('Reminder deleted!');
      fetchReminders();
    } catch (error) {
      toast.error('Error deleting reminder');
    }
  };

  const handleMarkComplete = async (reminderId) => {
    try {
      await reminderService.markReminderComplete(reminderId);
      toast.success('Reminder marked complete!');
      fetchReminders();
    } catch (error) {
      toast.error('Error updating reminder');
    }
  };

  const activeReminders = reminders.filter((r) => !r.isCompleted);
  const completedReminders = reminders.filter((r) => r.isCompleted);

  if (loading) {
    return <div className="loading">Loading reminders...</div>;
  }

  const getTypeIcon = (type) => {
    const icons = {
      class: '📚',
      assignment: '📝',
      exam: '✏️',
      health: '💙',
      custom: '⭐',
    };
    return icons[type] || '⭐';
  };

  return (
    <div className="reminders-page">
      <div className="page-header">
        <div>
          <h1>Reminders & Tasks 🔔</h1>
          <p>Stay on top of your assignments and important dates</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          <IoAdd /> Add Reminder
        </button>
      </div>

      {/* Add Reminder Form */}
      {showForm && (
        <Card className="form-card">
          <h3>Create New Reminder</h3>
          <form onSubmit={handleSubmit} className="reminder-form">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Math Assignment Due"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional details (optional)"
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="custom">Custom</option>
                  <option value="class">Class</option>
                  <option value="assignment">Assignment</option>
                  <option value="exam">Exam</option>
                  <option value="health">Health</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                >
                  <option value="once">Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={formData.reminderDate}
                  onChange={(e) => setFormData({ ...formData, reminderDate: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Time *</label>
                <input
                  type="time"
                  value={formData.reminderTime}
                  onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Create Reminder
              </button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Active Reminders */}
      {activeReminders.length > 0 && (
        <div className="reminders-section">
          <h2>Upcoming Reminders</h2>
          <div className="reminders-list">
            {activeReminders
              .sort((a, b) => new Date(a.reminderDate) - new Date(b.reminderDate))
              .map((reminder) => (
                <Card key={reminder._id} className="reminder-card">
                  <div className="reminder-header">
                    <div className="reminder-title-section">
                      <span className="reminder-icon">{getTypeIcon(reminder.type)}</span>
                      <div>
                        <h3 className="reminder-title">{reminder.title}</h3>
                        <p className="reminder-date">
                          {new Date(reminder.reminderDate).toLocaleDateString()} at {reminder.reminderTime}
                        </p>
                      </div>
                    </div>
                    <div className="reminder-badges">
                      <span className={`badge priority-${reminder.priority}`}>{reminder.priority}</span>
                      <span className="badge type-badge">{reminder.type}</span>
                    </div>
                  </div>

                  {reminder.description && (
                    <p className="reminder-description">{reminder.description}</p>
                  )}

                  <div className="reminder-actions">
                    <button
                      className="btn-check"
                      onClick={() => handleMarkComplete(reminder._id)}
                      title="Mark as complete"
                    >
                      <IoCheckmark /> Complete
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(reminder._id)}
                      title="Delete reminder"
                    >
                      <IoTrash /> Delete
                    </button>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Completed Reminders */}
      {completedReminders.length > 0 && (
        <div className="reminders-section">
          <h2>Completed Reminders</h2>
          <div className="reminders-list">
            {completedReminders.slice(0, 5).map((reminder) => (
              <Card key={reminder._id} className="reminder-card completed">
                <div className="reminder-header">
                  <div className="reminder-title-section">
                    <span className="reminder-icon">{getTypeIcon(reminder.type)}</span>
                    <div>
                      <h3 className="reminder-title">{reminder.title}</h3>
                      <p className="reminder-date">
                        {new Date(reminder.reminderDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(reminder._id)}
                    title="Delete reminder"
                  >
                    <IoTrash />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {reminders.length === 0 && (
        <Card className="empty-state">
          <p>No reminders yet. Create one to get started! 🎯</p>
        </Card>
      )}
    </div>
  );
};

export default Reminders;
