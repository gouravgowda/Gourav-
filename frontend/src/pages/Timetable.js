import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../components/Card';
import { timetableService, courseService } from '../services/api';
import { IoAdd, IoTrash } from 'react-icons/io5';
import './Timetable.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const daysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    courseId: '',
    dayOfWeek: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    classType: 'lecture',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [timetableRes, coursesRes] = await Promise.all([
        timetableService.getTimetable(),
        courseService.getCourses(),
      ]);

      setTimetable(timetableRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      toast.error('Error fetching timetable');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await timetableService.createTimetableEntry(formData);
      toast.success('Class added successfully!');
      setFormData({
        courseId: '',
        dayOfWeek: 'Monday',
        startTime: '09:00',
        endTime: '10:00',
        location: '',
        classType: 'lecture',
      });
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error('Error adding class');
    }
  };

  const handleDelete = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await timetableService.deleteTimetableEntry(entryId);
        toast.success('Class deleted!');
        fetchData();
      } catch (error) {
        toast.error('Error deleting class');
      }
    }
  };

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    return course?.name || 'Unknown Course';
  };

  const getTimetableByDay = (day) => {
    return timetable.filter((entry) => entry.dayOfWeek === day);
  };

  if (loading) {
    return <div className="loading">Loading timetable...</div>;
  }

  return (
    <div className="timetable-page">
      <div className="page-header">
        <div>
          <h1>Weekly Timetable 📅</h1>
          <p>View and manage your class schedule</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          <IoAdd /> Add Class
        </button>
      </div>

      {/* Add Class Form */}
      {showForm && (
        <Card className="form-card">
          <h3>Add New Class</h3>
          <form onSubmit={handleSubmit} className="timetable-form">
            <div className="form-group">
              <label>Course *</label>
              <select
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name} ({course.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Day *</label>
                <select
                  value={formData.dayOfWeek}
                  onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Start Time *</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Time *</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Room number or building"
                />
              </div>

              <div className="form-group">
                <label>Class Type</label>
                <select
                  value={formData.classType}
                  onChange={(e) => setFormData({ ...formData, classType: e.target.value })}
                >
                  <option value="lecture">Lecture</option>
                  <option value="lab">Lab</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="seminar">Seminar</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Add Class
              </button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Weekly Timetable */}
      <div className="timetable-container">
        <div className="timetable-grid">
          {days.map((day) => {
            const dayClasses = getTimetableByDay(day);
            return (
              <Card key={day} className="day-card">
                <h3 className="day-title">{daysShort[days.indexOf(day)]}</h3>
                <p className="day-full">{day}</p>

                {dayClasses.length > 0 ? (
                  <div className="classes-list">
                    {dayClasses
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map((cls) => (
                        <div key={cls._id} className="class-item">
                          <div className="class-time">
                            <span className="time-start">{cls.startTime}</span>
                            <span className="time-separator">-</span>
                            <span className="time-end">{cls.endTime}</span>
                          </div>
                          <div className="class-details">
                            <p className="class-name">{getCourseName(cls.courseId._id)}</p>
                            {cls.location && <p className="class-location">📍 {cls.location}</p>}
                            <span className={`class-type ${cls.classType}`}>{cls.classType}</span>
                          </div>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(cls._id)}
                            title="Delete class"
                          >
                            <IoTrash />
                          </button>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="no-classes">No classes</div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
