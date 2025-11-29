import express from 'express';
import {
  createTimetableEntry,
  getTimetable,
  getTimetableByDay,
  updateTimetableEntry,
  deleteTimetableEntry,
} from '../controllers/timetableController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createTimetableEntry);
router.get('/', authenticateToken, getTimetable);
router.get('/:day', authenticateToken, getTimetableByDay);
router.put('/:entryId', authenticateToken, updateTimetableEntry);
router.delete('/:entryId', authenticateToken, deleteTimetableEntry);

export default router;
