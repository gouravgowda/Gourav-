import MentalHealthCheckIn from '../models/MentalHealthCheckIn.js';
import User from '../models/User.js';
import {
  analyzeSentiment,
  getStressLevelFromText,
  generateAIResponse,
  calculateWellnessScore,
  generateWellnessTips
} from '../services/sentimentService.js';

export const createCheckIn = async (req, res) => {
  try {
    const { mood, stressLevel, sleepHours, activities, notes } = req.body;

    // Enhanced sentiment analysis with emotion detection
    const sentimentData = analyzeSentiment(notes || '');
    const detectedStressLevel = getStressLevelFromText(notes || '');

    // Generate AI response with emotion context
    const aiResponse = generateAIResponse(mood, stressLevel, sentimentData.primary_emotion);

    // Calculate wellness score
    const wellnessScore = calculateWellnessScore(stressLevel, sleepHours, mood, activities.length);

    // Generate wellness tips
    const wellnessTips = generateWellnessTips(stressLevel, sleepHours, mood);

    const checkIn = new MentalHealthCheckIn({
      userId: req.user.userId,
      mood,
      stressLevel,
      sleepHours,
      activities,
      notes,
      sentimentScore: sentimentData.score,
      aiResponse,
      responseGiven: true,
    });

    await checkIn.save();

    // Update user's stress level and mental health score with wellness score
    const user = await User.findById(req.user.userId);
    user.stressLevel = stressLevel;
    user.mentalHealthScore = wellnessScore;
    await user.save();

    res.status(201).json({
      message: 'Check-in recorded successfully',
      checkIn,
      aiResponse,
      wellnessScore,
      wellnessTips,
      emotionDetected: sentimentData.primary_emotion
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating check-in', error: error.message });
  }
};

export const getCheckInHistory = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const checkIns = await MentalHealthCheckIn.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await MentalHealthCheckIn.countDocuments({ userId: req.user.userId });

    res.json({
      checkIns,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching check-in history', error: error.message });
  }
};

export const getCheckInStats = async (req, res) => {
  try {
    const checkIns = await MentalHealthCheckIn.find({ userId: req.user.userId });

    if (checkIns.length === 0) {
      return res.json({
        averageStress: 0,
        averageSleepHours: 0,
        moodDistribution: {},
        totalCheckIns: 0,
      });
    }

    const stats = {
      averageStress: (checkIns.reduce((sum, c) => sum + c.stressLevel, 0) / checkIns.length).toFixed(2),
      averageSleepHours: (checkIns.reduce((sum, c) => sum + c.sleepHours, 0) / checkIns.length).toFixed(2),
      moodDistribution: {},
      totalCheckIns: checkIns.length,
      averageSentiment: (checkIns.reduce((sum, c) => sum + c.sentimentScore, 0) / checkIns.length).toFixed(2),
    };

    checkIns.forEach(c => {
      stats.moodDistribution[c.mood] = (stats.moodDistribution[c.mood] || 0) + 1;
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};
