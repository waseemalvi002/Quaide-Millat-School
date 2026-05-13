const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/feeController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, ctrl.getFees);
router.get('/stats', protect, authorize('admin'), ctrl.getFeeStats);
router.post('/', protect, authorize('admin'), ctrl.createFee);
router.put('/:id', protect, authorize('admin'), ctrl.updateFee);
router.put('/:id/pay', protect, ctrl.payFee);

module.exports = router;
