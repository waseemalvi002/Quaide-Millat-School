const express = require('express');
const router = express.Router();
const {
  getOnlineClasses, getOnlineClass, getStudentUpcomingClasses,
  createOnlineClass, updateOnlineClass, startClass, endClass,
  cancelClass, deleteOnlineClass, recordAttendance, getClassStats,
  generateMeetingLink
} = require('../controllers/onlineClassController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

// Public for students to see upcoming classes
router.get('/upcoming', getStudentUpcomingClasses);

router.get('/stats', authorize('admin'), getClassStats);
router.get('/', getOnlineClasses);
router.get('/:id', getOnlineClass);
router.post('/', authorize('admin', 'teacher'), createOnlineClass);
router.put('/:id', authorize('admin', 'teacher'), updateOnlineClass);
router.put('/:id/start', authorize('teacher'), startClass);
router.put('/:id/end', authorize('teacher'), endClass);
router.put('/:id/cancel', authorize('admin'), cancelClass);
router.post('/:id/attendance', authorize('teacher'), recordAttendance);
router.post('/:id/generate-link', authorize('admin', 'teacher'), generateMeetingLink);
router.delete('/:id', authorize('admin'), deleteOnlineClass);

module.exports = router;