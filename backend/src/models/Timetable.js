import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    dayOfWeek: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    startTime: {
      type: String,
      required: true, // HH:MM format
    },
    endTime: {
      type: String,
      required: true, // HH:MM format
    },
    location: {
      type: String,
      default: '',
    },
    instructor: {
      type: String,
      default: '',
    },
    classType: {
      type: String,
      enum: ['lecture', 'lab', 'tutorial', 'seminar', 'other'],
      default: 'lecture',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Timetable', timetableSchema);
