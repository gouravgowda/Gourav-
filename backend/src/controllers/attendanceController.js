import Attendance from '../models/Attendance.js';
import Course from '../models/Course.js';

export const markAttendance = async (req, res) => {
  try {
    const { courseId, date, status, remarks } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const attendance = new Attendance({
      userId: req.user.userId,
      courseId,
      date,
      status,
      remarks,
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Error marking attendance', error: error.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const { courseId } = req.params;
    const attendance = await Attendance.find({
      userId: req.user.userId,
      courseId,
    }).sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
};

export const getAttendanceStats = async (req, res) => {
  try {
    const { courseId } = req.params;

    const allAttendance = await Attendance.find({
      userId: req.user.userId,
      courseId,
    });

    const stats = {
      total: allAttendance.length,
      present: allAttendance.filter(a => a.status === 'present').length,
      absent: allAttendance.filter(a => a.status === 'absent').length,
      late: allAttendance.filter(a => a.status === 'late').length,
      excused: allAttendance.filter(a => a.status === 'excused').length,
    };

    stats.attendancePercentage = stats.total > 0
      ? ((stats.present / stats.total) * 100).toFixed(2)
      : 0;

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance statistics', error: error.message });
  }
};

export const getAllAttendanceStats = async (req, res) => {
  try {
    const allAttendance = await Attendance.find({ userId: req.user.userId }).populate('courseId');

    const stats = {
      totalClasses: allAttendance.length,
      present: allAttendance.filter(a => a.status === 'present').length,
      absent: allAttendance.filter(a => a.status === 'absent').length,
      late: allAttendance.filter(a => a.status === 'late').length,
      excused: allAttendance.filter(a => a.status === 'excused').length,
    };

    stats.overallAttendancePercentage = stats.totalClasses > 0
      ? ((stats.present / stats.totalClasses) * 100).toFixed(2)
      : 0;

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching overall attendance', error: error.message });
  }
};
