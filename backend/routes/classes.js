const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/classController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, ctrl.getClasses);
router.get('/:id', protect, ctrl.getClass);
router.post('/', protect, authorize('admin'), ctrl.createClass);
router.put('/:id', protect, authorize('admin'), ctrl.updateClass);
router.delete('/:id', protect, authorize('admin'), ctrl.deleteClass);

module.exports = router;
