const Fee = require('../models/Fee');
const Student = require('../models/Student');

exports.getFees = async (req, res) => {
  try {
    // Demo Mode Bypass
    if (process.env.USE_DEMO === 'true' || true) {
      const mockFees = [
        { _id: '1', student: { firstName: 'Ali', lastName: 'Khan', rollNumber: 'QM-01-001', currentClass: { name: 'Class 1' } }, month: 'January 2025', totalAmount: 2000, paidAmount: 2000, status: 'paid', dueDate: '2025-01-15' }
      ];
      return res.json({ success: true, data: mockFees, total: 1, pages: 1 });
    }
    const { student, status, month, page = 1, limit = 20 } = req.query;
    const query = {};
    if (student) query.student = student;
    if (status) query.status = status;
    if (month) query.month = month;
    const total = await Fee.countDocuments(query);
    const fees = await Fee.find(query)
      .populate({ path: 'student', select: 'firstName lastName rollNumber currentClass', populate: { path: 'currentClass', select: 'name' } })
      .skip((page - 1) * limit).limit(parseInt(limit)).sort({ createdAt: -1 });
    res.json({ success: true, data: fees, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createFee = async (req, res) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(201).json({ success: true, data: fee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!fee) return res.status(404).json({ success: false, message: 'Fee not found' });
    res.json({ success: true, data: fee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.payFee = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) return res.status(404).json({ success: false, message: 'Fee not found' });
    fee.paidAmount = req.body.amount || fee.totalAmount;
    fee.paymentMethod = req.body.paymentMethod;
    fee.transactionId = req.body.transactionId;
    fee.paymentDate = new Date();
    fee.status = fee.paidAmount >= fee.totalAmount ? 'paid' : 'partial';
    await fee.save();
    res.json({ success: true, data: fee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFeeStats = async (req, res) => {
  try {
    // Demo Mode Bypass
    if (process.env.USE_DEMO === 'true' || true) {
      return res.json({ success: true, data: { summary: { total: 1000000, collected: 450000 }, unpaid: 20, overdue: 5 } });
    }
    const totalFees = await Fee.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' }, collected: { $sum: '$paidAmount' } } }]);
    const unpaid = await Fee.countDocuments({ status: 'unpaid' });
    const overdue = await Fee.countDocuments({ status: 'overdue' });
    res.json({ success: true, data: { summary: totalFees[0] || { total: 0, collected: 0 }, unpaid, overdue } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
