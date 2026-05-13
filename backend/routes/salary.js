const express = require('express');
const router = express.Router();
const {
  getSalaries, getSalary, getEmployeeSalaries, createSalary,
  updateSalary, approveSalary, markAsPaid, deleteSalary,
  getSalaryStats, generateBulkSalaries, downloadSalarySlip
} = require('../controllers/salaryController');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

router.get('/stats', authorize('admin'), getSalaryStats);
router.get('/employee/:employeeId', getEmployeeSalaries);
router.post('/generate-bulk', authorize('admin'), generateBulkSalaries);
router.get('/', getSalaries);
router.get('/:id', getSalary);
router.post('/', authorize('admin', 'teacher'), createSalary);
router.put('/:id', authorize('admin'), updateSalary);
router.put('/:id/approve', authorize('admin'), approveSalary);
router.put('/:id/mark-paid', authorize('admin'), markAsPaid);
router.delete('/:id', authorize('admin'), deleteSalary);
router.get('/:id/download', downloadSalarySlip);

module.exports = router;