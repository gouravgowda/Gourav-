import express from 'express';
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  addAssessment,
  getCourseStats,
} from '../controllers/courseController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createCourse);
router.get('/', authenticateToken, getCourses);
router.put('/:courseId', authenticateToken, updateCourse);
router.delete('/:courseId', authenticateToken, deleteCourse);
router.post('/:courseId/assessment', authenticateToken, addAssessment);
router.get('/stats', authenticateToken, getCourseStats);

export default router;
