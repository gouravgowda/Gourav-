import express from 'express';
import {
  markAttendance,
  getAttendance,
  getAttendanceStats,
  getAllAttendanceStats,
} from '../controllers/attendanceController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, markAttendance);
router.get('/:courseId', authenticateToken, getAttendance);
router.get('/stats/:courseId', authenticateToken, getAttendanceStats);
router.get('/stats', authenticateToken, getAllAttendanceStats);

export default router;
