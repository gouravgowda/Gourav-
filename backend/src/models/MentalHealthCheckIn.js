import mongoose from 'mongoose';

const mentalhealthCheckInSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mood: {
      type: String,
      enum: ['excellent', 'good', 'neutral', 'poor', 'terrible'],
      required: true,
    },
    stressLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    sleepHours: {
      type: Number,
      default: 0,
    },
    activities: [String], // e.g., ['exercise', 'meditation', 'study']
    notes: {
      type: String,
      default: '',
    },
    sentimentScore: {
      type: Number,
      min: -1,
      max: 1,
      default: 0,
    },
    aiResponse: {
      type: String,
      default: '',
    },
    responseGiven: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('MentalHealthCheckIn', mentalhealthCheckInSchema);
