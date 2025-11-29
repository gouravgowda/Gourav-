import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: String,
      default: '',
    },
    credits: {
      type: Number,
      default: 3,
    },
    grade: {
      type: String,
      default: null,
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    assessments: [
      {
        name: String,
        type: String, // quiz, assignment, midterm, final
        dueDate: Date,
        marks: Number,
        totalMarks: Number,
        completed: { type: Boolean, default: false },
      },
    ],
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
