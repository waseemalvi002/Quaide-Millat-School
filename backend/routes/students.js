const express = require('express');
const router = express.Router();
const { getStudents, getStudent, searchByRollNumber, createStudent, updateStudent, deleteStudent, getStudentStats } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/auth');

// Public route
router.get('/search/:rollNumber', searchByRollNumber);

// Protected routes
router.get('/', protect, getStudents);
router.get('/stats', protect, authorize('admin'), getStudentStats);
router.get('/:id', protect, getStudent);
router.post('/', protect, authorize('admin'), createStudent);
router.put('/:id', protect, authorize('admin'), updateStudent);
router.delete('/:id', protect, authorize('admin'), deleteStudent);

module.exports = router;
