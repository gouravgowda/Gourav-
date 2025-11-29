import Course from '../models/Course.js';

export const createCourse = async (req, res) => {
  try {
    const { name, code, instructor, credits, startDate, endDate } = req.body;

    const course = new Course({
      userId: req.user.userId,
      name,
      code,
      instructor,
      credits,
      startDate,
      endDate,
    });

    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.user.userId });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, code, instructor, credits, completionPercentage, grade } = req.body;

    const course = await Course.findByIdAndUpdate(
      courseId,
      { name, code, instructor, credits, completionPercentage, grade },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
};

export const addAssessment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, type, dueDate, marks, totalMarks } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.assessments.push({
      name,
      type,
      dueDate,
      marks,
      totalMarks,
    });

    await course.save();
    res.json({ message: 'Assessment added successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error adding assessment', error: error.message });
  }
};

export const getCourseStats = async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.user.userId });
    
    const stats = {
      totalCourses: courses.length,
      averageCompletion: courses.length > 0 
        ? (courses.reduce((sum, c) => sum + c.completionPercentage, 0) / courses.length).toFixed(2)
        : 0,
      coursesWithGrades: courses.filter(c => c.grade).length,
      totalCredits: courses.reduce((sum, c) => sum + c.credits, 0),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course statistics', error: error.message });
  }
};
