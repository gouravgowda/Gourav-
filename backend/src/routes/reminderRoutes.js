import express from 'express';
import {
  createReminder,
  getReminders,
  getUpcomingReminders,
  updateReminder,
  markReminderComplete,
  deleteReminder,
} from '../controllers/reminderController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createReminder);
router.get('/', authenticateToken, getReminders);
router.get('/upcoming', authenticateToken, getUpcomingReminders);
router.put('/:reminderId', authenticateToken, updateReminder);
router.patch('/:reminderId/complete', authenticateToken, markReminderComplete);
router.delete('/:reminderId', authenticateToken, deleteReminder);

export default router;
