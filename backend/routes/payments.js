const express = require('express');
const router = express.Router();
const {
  getPayments, getPayment, createPayment, updatePayment,
  verifyPayment, deletePayment, getPaymentStats,
  initiateJazzCash, initiateEasypaisa, recordBankTransfer
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/stats', authorize('admin'), getPaymentStats);
router.get('/', getPayments);
router.get('/:id', getPayment);
router.post('/', createPayment);
router.put('/:id', authorize('admin'), updatePayment);
router.put('/:id/verify', authorize('admin'), verifyPayment);
router.delete('/:id', authorize('admin'), deletePayment);

// Payment method specific endpoints
router.post('/jazzcash', initiateJazzCash);
router.post('/easypaisa', initiateEasypaisa);
router.post('/bank-transfer', recordBankTransfer);

module.exports = router;