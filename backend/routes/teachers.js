const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, ctrl.getTeachers);
router.get('/:id', protect, ctrl.getTeacher);
router.post('/', protect, authorize('admin'), ctrl.createTeacher);
router.put('/:id', protect, authorize('admin'), ctrl.updateTeacher);
router.delete('/:id', protect, authorize('admin'), ctrl.deleteTeacher);

module.exports = router;
