const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/auth');

router.post('/mark', protect, authorize('admin', 'teacher'), ctrl.markAttendance);
router.get('/', protect, ctrl.getAttendance);
router.get('/stats', protect, ctrl.getAttendanceStats);

module.exports = router;
