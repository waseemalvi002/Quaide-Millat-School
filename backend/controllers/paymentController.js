const Payment = require('../models/Payment');
const Student = require('../models/Student');

// @desc Get all payments
exports.getPayments = async (req, res) => {
  try {
    const { status, method, startDate, endDate, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (method) query.method = method;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const total = await Payment.countDocuments(query);
    const payments = await Payment.find(query)
      .populate('student', 'firstName lastName rollNumber')
      .populate('verifiedBy', 'name')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({ success: true, data: payments, total, pages: Math.ceil(total / limit), page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single payment
exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('student', 'firstName lastName rollNumber')
      .populate('verifiedBy', 'name');
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });
    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create payment record (manual entry)
exports.createPayment = async (req, res) => {
  try {
    const paymentData = {
      ...req.body,
      submittedBy: req.user._id
    };
    const payment = await Payment.create(paymentData);
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update payment
exports.updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });
    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Verify payment
exports.verifyPayment = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status, verifiedBy: req.user._id, verifiedAt: Date.now(), verificationRemarks: remarks },
      { new: true }
    );
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });

    // Emit real-time update
    const io = req.app.get('io');
    io.to(`student_${payment.student}`).emit('paymentUpdate', payment);

    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });
    res.json({ success: true, message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get payment stats
exports.getPaymentStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    const stats = await Payment.aggregate([
      { $match: { createdAt: dateFilter } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const methodStats = await Payment.aggregate([
      { $match: { status: 'verified', createdAt: dateFilter } },
      {
        $group: {
          _id: '$method',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        byStatus: stats,
        byMethod: methodStats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Initiate JazzCash payment
exports.initiateJazzCash = async (req, res) => {
  try {
    const { amount, studentId, description } = req.body;
    // Integration with JazzCash API would go here
    // For now, create a pending payment record
    const payment = await Payment.create({
      student: studentId,
      amount,
      method: 'jazzcash',
      status: 'pending',
      transactionId: `JC${Date.now()}`,
      description: description || 'Fee Payment',
      submittedBy: req.user._id
    });
    res.json({ success: true, data: payment, message: 'JazzCash payment initiated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Initiate Easypaisa payment
exports.initiateEasypaisa = async (req, res) => {
  try {
    const { amount, studentId, description } = req.body;
    const payment = await Payment.create({
      student: studentId,
      amount,
      method: 'easypaisa',
      status: 'pending',
      transactionId: `EP${Date.now()}`,
      description: description || 'Fee Payment',
      submittedBy: req.user._id
    });
    res.json({ success: true, data: payment, message: 'Easypaisa payment initiated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Record bank transfer
exports.recordBankTransfer = async (req, res) => {
  try {
    const { amount, studentId, accountNumber, transactionId, receiptImage, description } = req.body;
    const payment = await Payment.create({
      student: studentId,
      amount,
      method: 'bank-transfer',
      status: 'pending',
      transactionId,
      bankDetails: { accountNumber },
      receiptImage,
      description: description || 'Fee Payment',
      submittedBy: req.user._id
    });
    res.status(201).json({ success: true, data: payment, message: 'Bank transfer recorded' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};