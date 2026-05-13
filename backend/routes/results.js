const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/resultController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, ctrl.getResults);
router.post('/', protect, authorize('admin', 'teacher'), ctrl.createResult);
router.put('/:id', protect, authorize('admin', 'teacher'), ctrl.updateResult);
router.delete('/:id', protect, authorize('admin'), ctrl.deleteResult);
router.get('/:id/download', protect, ctrl.downloadReportCard);

module.exports = router;
