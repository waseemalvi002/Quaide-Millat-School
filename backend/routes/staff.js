const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/staffController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, ctrl.getStaffMembers);
router.get('/:id', protect, ctrl.getStaffMember);
router.post('/', protect, authorize('admin'), ctrl.createStaffMember);
router.put('/:id', protect, authorize('admin'), ctrl.updateStaffMember);
router.delete('/:id', protect, authorize('admin'), ctrl.deleteStaffMember);

module.exports = router;
