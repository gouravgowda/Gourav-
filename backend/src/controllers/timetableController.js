import Timetable from '../models/Timetable.js';
import Course from '../models/Course.js';

export const createTimetableEntry = async (req, res) => {
  try {
    const { courseId, dayOfWeek, startTime, endTime, location, instructor, classType } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const timetable = new Timetable({
      userId: req.user.userId,
      courseId,
      dayOfWeek,
      startTime,
      endTime,
      location,
      instructor,
      classType,
    });

    await timetable.save();
    res.status(201).json({ message: 'Timetable entry created successfully', timetable });
  } catch (error) {
    res.status(500).json({ message: 'Error creating timetable entry', error: error.message });
  }
};

export const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find({ userId: req.user.userId })
      .populate('courseId', 'name code')
      .sort({ dayOfWeek: 1, startTime: 1 });

    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timetable', error: error.message });
  }
};

export const getTimetableByDay = async (req, res) => {
  try {
    const { day } = req.params;

    const timetable = await Timetable.find({
      userId: req.user.userId,
      dayOfWeek: day,
    })
      .populate('courseId', 'name code')
      .sort({ startTime: 1 });

    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timetable for the day', error: error.message });
  }
};

export const updateTimetableEntry = async (req, res) => {
  try {
    const { entryId } = req.params;
    const { dayOfWeek, startTime, endTime, location, instructor, classType } = req.body;

    const timetable = await Timetable.findByIdAndUpdate(
      entryId,
      { dayOfWeek, startTime, endTime, location, instructor, classType },
      { new: true, runValidators: true }
    );

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    res.json({ message: 'Timetable entry updated successfully', timetable });
  } catch (error) {
    res.status(500).json({ message: 'Error updating timetable entry', error: error.message });
  }
};

export const deleteTimetableEntry = async (req, res) => {
  try {
    const { entryId } = req.params;
    const timetable = await Timetable.findByIdAndDelete(entryId);

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    res.json({ message: 'Timetable entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting timetable entry', error: error.message });
  }
};
