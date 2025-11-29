import express from 'express';
import {
  createCheckIn,
  getCheckInHistory,
  getCheckInStats,
} from '../controllers/mentalHealthController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkin', authenticateToken, createCheckIn);
router.get('/checkin/history', authenticateToken, getCheckInHistory);
router.get('/checkin/stats', authenticateToken, getCheckInStats);

export default router;
