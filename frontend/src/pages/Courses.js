import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../components/Card';
import { courseService } from '../services/api';
import { IoAdd, IoTrash } from 'react-icons/io5';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    instructor: '',
    credits: 3,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getCourses();
      setCourses(response.data);
    } catch (error) {
      toast.error('Error fetching courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await courseService.createCourse(formData);
      toast.success('Course added successfully!');
      setFormData({ name: '', code: '', instructor: '', credits: 3 });
      setShowForm(false);
      fetchCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding course');
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.deleteCourse(courseId);
        toast.success('Course deleted successfully!');
        fetchCourses();
      } catch (error) {
        toast.error('Error deleting course');
      }
    }
  };

  const handleUpdateProgress = async (courseId, newProgress) => {
    try {
      await courseService.updateCourse(courseId, { completionPercentage: newProgress });
      toast.success('Progress updated!');
      fetchCourses();
    } catch (error) {
      toast.error('Error updating progress');
    }
  };

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="courses-page">
      <div className="page-header">
        <div>
          <h1>My Courses 📚</h1>
          <p>Manage your courses and track progress</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          <IoAdd /> Add Course
        </button>
      </div>

      {/* Add Course Form */}
      {showForm && (
        <Card className="form-card">
          <h3>Add New Course</h3>
          <form onSubmit={handleSubmit} className="course-form">
            <div className="form-group">
              <label>Course Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Course Code *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Instructor</label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Credits</label>
                <input
                  type="number"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Add Course
              </button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Courses Grid */}
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Card key={course._id} className="course-card">
              <div className="course-header">
                <div>
                  <h3 className="course-name">{course.name}</h3>
                  <p className="course-code">{course.code}</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(course._id)}
                  title="Delete course"
                >
                  <IoTrash />
                </button>
              </div>

              <div className="course-info">
                {course.instructor && <p>👨‍🏫 {course.instructor}</p>}
                <p>📖 {course.credits} Credits</p>
              </div>

              <div className="progress-section">
                <div className="progress-header">
                  <span>Progress</span>
                  <span className="progress-value">{course.completionPercentage}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.completionPercentage}%` }}
                  ></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={course.completionPercentage}
                  onChange={(e) => handleUpdateProgress(course._id, Number(e.target.value))}
                  className="progress-slider"
                />
              </div>

              {course.assessments && course.assessments.length > 0 && (
                <div className="assessments">
                  <h4>Assessments</h4>
                  <ul>
                    {course.assessments.map((assessment, idx) => (
                      <li key={idx}>
                        <span>{assessment.name}</span>
                        <span className="assessment-type">{assessment.type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))
        ) : (
          <div className="empty-state">
            <p>No courses yet. Add one to get started! 🎓</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
