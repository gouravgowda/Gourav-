import Sentiment from 'sentiment';

const sentiment = new Sentiment();

/**
 * Enhanced sentiment analysis with emotion detection
 * @param {string} text - User input text
 * @returns {object} Sentiment analysis results
 */
export const analyzeSentiment = (text) => {
  const result = sentiment.analyze(text);

  // Enhanced emotion keywords
  const emotionKeywords = {
    joy: ['happy', 'excited', 'joyful', 'cheerful', 'delighted', 'thrilled', 'ecstatic', 'great', 'wonderful', 'amazing', 'fantastic'],
    sadness: ['sad', 'depressed', 'unhappy', 'miserable', 'gloomy', 'down', 'blue', 'heartbroken', 'disappointed'],
    anger: ['angry', 'frustrated', 'annoyed', 'irritated', 'furious', 'mad', 'enraged', 'outraged'],
    fear: ['afraid', 'scared', 'anxious', 'worried', 'nervous', 'terrified', 'fearful', 'panic', 'frightened'],
    surprise: ['surprised', 'shocked', 'amazed', 'astonished', 'startled', 'unexpected']
  };

  // Detect primary emotion
  const lowerText = text.toLowerCase();
  let emotionScores = {};

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    emotionScores[emotion] = keywords.filter(keyword => lowerText.includes(keyword)).length;
  }

  const primaryEmotion = Object.entries(emotionScores)
    .sort((a, b) => b[1] - a[1])[0][0];

  return {
    score: Math.max(-1, Math.min(1, result.score / 10)),
    comparative: result.comparative,
    words: result.words,
    primary_emotion: emotionScores[primaryEmotion] > 0 ? primaryEmotion : 'neutral',
    emotion_scores: emotionScores
  };
};

/**
 * Enhanced stress level detection with better keyword matching
 * @param {string} text - User input text
 * @returns {number} Stress level (0-10)
 */
export const getStressLevelFromText = (text) => {
  const stressKeywords = {
    high: ['overwhelmed', 'exhausted', 'burnout', 'panic', 'breaking down', 'can\'t cope'],
    medium: ['stressed', 'anxious', 'worried', 'nervous', 'tense', 'pressure', 'deadline'],
    low: ['tired', 'busy', 'rushed', 'hectic', 'concerned']
  };

  const lowerText = text.toLowerCase();
  let stressScore = 0;

  // High stress keywords (3 points each)
  stressKeywords.high.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      stressScore += 3;
    }
  });

  // Medium stress keywords (2 points each)
  stressKeywords.medium.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      stressScore += 2;
    }
  });

  // Low stress keywords (1 point each)
  stressKeywords.low.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      stressScore += 1;
    }
  });

  // Cap at 10
  return Math.min(10, stressScore);
};

/**
 * Generate personalized AI response with enhanced context
 * @param {string} mood - User's mood
 * @param {number} stressLevel - Stress level (0-10)
 * @param {string} primaryEmotion - Primary detected emotion
 * @returns {string} AI-generated response
 */
export const generateAIResponse = (mood, stressLevel, primaryEmotion = 'neutral') => {
  const responses = {
    excellent: [
      "That's wonderful! 🌟 Your positive energy is inspiring! Keep maintaining this great momentum and remember to celebrate your wins!",
      "I'm so happy to hear you're doing excellent! ✨ Continue with what works for you and don't forget to share your positivity with others!",
      "Amazing! 🎉 You're in a great place right now. Use this energy to tackle your goals and enjoy the moment!"
    ],
    good: [
      "Glad to hear you're doing well! 💪 Keep up the good work and remember that consistency is key to maintaining this positive state!",
      "That's great! 😊 You're on the right track. Continue taking care of yourself and building on this positive momentum!",
      "Wonderful to hear! 🌈 Stay focused on what makes you feel good and keep nurturing your well-being!"
    ],
    neutral: [
      "It's completely okay to have neutral days! 🤗 Focus on small victories and be kind to yourself. Every day is a new opportunity!",
      "I understand you're feeling in-between today. 📈 Try engaging in activities you enjoy or talking to someone you trust. Small steps matter!",
      "Neutral days are part of life's rhythm. 🌱 Consider this a chance to reflect and prepare for better days ahead. You've got this!"
    ],
    poor: [
      "I see you're going through a tough time. 💙 Remember that this too shall pass. Consider taking a break, doing something you enjoy, or reaching out to a friend!",
      "I'm sorry you're not feeling great. 🤝 It's okay to struggle sometimes. Try some self-care activities like deep breathing, a walk, or listening to music you love!",
      "Tough days happen to everyone. 🌤️ Be gentle with yourself and remember that reaching out for support is a sign of strength, not weakness!"
    ],
    terrible: [
      "I'm genuinely concerned about how you're feeling. 💙 Please reach out to a mental health professional or your university's counseling services. Your well-being matters!",
      "I can see you're really struggling right now. 🆘 Please don't hesitate to seek help from a counselor or trusted person. You don't have to face this alone!",
      "Your feelings are valid, and you deserve support. 💙 Please contact your university's mental health services or a crisis helpline. Professional help can make a real difference!"
    ]
  };

  // Emotion-specific additions
  const emotionResponses = {
    joy: "Your joy is contagious! Keep spreading that positive energy! 🌟",
    sadness: "It's okay to feel sad. Acknowledge your feelings and be gentle with yourself. 💙",
    anger: "I sense you're feeling frustrated. Try some deep breathing or physical activity to channel that energy constructively. 🌬️",
    fear: "Anxiety can be overwhelming. Remember to ground yourself with deep breaths. You're stronger than you think! 💪",
    surprise: "Life can be full of surprises! Take time to process and adapt. 🎭"
  };

  // Stress-specific advice
  const stressResponses = {
    high: "⚠️ Your stress level seems quite high. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, exhale for 8. Consider taking breaks using the Pomodoro technique (25 min work, 5 min rest).",
    medium: "⚡ You have some stress building up. Remember to take regular breaks, stay hydrated, and practice mindfulness. Even 5 minutes of meditation can help!",
    low: "✅ Great job managing your stress levels! Keep up with your healthy habits and continue monitoring  your well-being!"
  };

  // Get base response
  let response = responses[mood] ?
    responses[mood][Math.floor(Math.random() * responses[mood].length)] :
    responses.neutral[0];

  // Add emotion-specific insight
  if (primaryEmotion !== 'neutral' && emotionResponses[primaryEmotion]) {
    response += " " + emotionResponses[primaryEmotion];
  }

  // Add stress-specific advice
  if (stressLevel > 7) {
    response += " " + stressResponses.high;
  } else if (stressLevel > 4) {
    response += " " + stressResponses.medium;
  } else {
    response += " " + stressResponses.low;
  }

  return response;
};

/**
 * Calculate wellness score based on multiple factors
 * @param {number} stressLevel - Current stress level (0-10)
 * @param {number} sleepHours - Hours of sleep
 * @param {string} mood - Current mood
 * @param {number} activityCount - Number of activities
 * @returns {number} Wellness score (0-100)
 */
export const calculateWellnessScore = (stressLevel, sleepHours, mood, activityCount = 0) => {
  const moodScores = {
    excellent: 100,
    good: 80,
    neutral: 60,
    poor: 40,
    terrible: 20
  };

  // Mood contribution (40%)
  const moodScore = (moodScores[mood] || 60) * 0.4;

  // Stress contribution (30%) - inverse relationship
  const stressScore = ((10 - stressLevel) / 10 * 100) * 0.3;

  // Sleep contribution (20%)
  const idealSleep = 8;
  const sleepScore = Math.max(0, 100 - Math.abs(sleepHours - idealSleep) * 10) * 0.2;

  // Activity contribution (10%)
  const activityScore = Math.min(100, activityCount * 20) * 0.1;

  const totalScore = moodScore + stressScore + sleepScore + activityScore;

  return Math.round(Math.max(0, Math.min(100, totalScore)));
};

/**
 * Generate wellness tips based on current state
 * @param {number} stressLevel - Current stress level
 * @param {number} sleepHours - Hours of sleep
 * @param {string} mood - Current mood
 * @returns {array} Array of personalized tips
 */
export const generateWellnessTips = (stressLevel, sleepHours, mood) => {
  const tips = [];

  if (stressLevel > 7) {
    tips.push("🧘 Try a 10-minute guided meditation session");
    tips.push("🚶 Take a 15-minute walk to clear your mind");
    tips.push("📝 Journal your thoughts to process emotions");
  }

  if (sleepHours < 6) {
    tips.push("😴 Aim for 7-8 hours of sleep tonight");
    tips.push("📱 Limit screen time 1 hour before bed");
    tips.push("☕ Reduce caffeine intake after 2 PM");
  }

  if (mood === 'poor' || mood === 'terrible') {
    tips.push("💬 Reach out to a friend or family member");
    tips.push("🎵 Listen to your favorite uplifting music");
    tips.push("🤝 Consider speaking with a counselor");
  }

  if (tips.length === 0) {
    tips.push("⭐ Keep up the great work with your well-being!");
    tips.push("📚 Continue your current healthy habits");
    tips.push("🎯 Set small achievable goals for today");
  }

  return tips.slice(0, 3); // Return max 3 tips
};
