const Salary = require('../models/Salary');
const User = require('../models/User');

// @desc Get all salaries
exports.getSalaries = async (req, res) => {
  try {
    const { month, year, employeeType, status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (month) query.month = month;
    if (year) query.year = parseInt(year);
    if (employeeType) query.employeeType = employeeType;
    if (status) query.status = status;

    const total = await Salary.countDocuments(query);
    const salaries = await Salary.find(query)
      .populate('employee', 'name email')
      .populate('generatedBy', 'name')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({ success: true, data: salaries, total, pages: Math.ceil(total / limit), page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single salary
exports.getSalary = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id)
      .populate('employee', 'name email phone')
      .populate('generatedBy', 'name')
      .populate('approvedBy', 'name');
    if (!salary) return res.status(404).json({ success: false, message: 'Salary record not found' });
    res.json({ success: true, data: salary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get salary by employee
exports.getEmployeeSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find({ employee: req.params.employeeId })
      .sort({ year: -1, month: -1 });
    res.json({ success: true, data: salaries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create salary
exports.createSalary = async (req, res) => {
  try {
    const { employeeId, ...salaryData } = req.body;
    const employee = await User.findById(employeeId);
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });

    salaryData.employee = employeeId;
    salaryData.employeeType = employee.role === 'teacher' ? 'teacher' : 'staff';
    salaryData.generatedBy = req.user._id;

    const salary = await Salary.create(salaryData);
    res.status(201).json({ success: true, data: salary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update salary
exports.updateSalary = async (req, res) => {
  try {
    const salary = await Salary.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!salary) return res.status(404).json({ success: false, message: 'Salary record not found' });
    res.json({ success: true, data: salary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Approve salary
exports.approveSalary = async (req, res) => {
  try {
    const salary = await Salary.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', approvedBy: req.user._id },
      { new: true }
    );
    if (!salary) return res.status(404).json({ success: false, message: 'Salary record not found' });
    res.json({ success: true, data: salary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Mark salary as paid
exports.markAsPaid = async (req, res) => {
  try {
    const { paymentMethod, transactionId, paymentDate } = req.body;
    const salary = await Salary.findByIdAndUpdate(
      req.params.id,
      {
        status: 'paid',
        paymentMethod,
        transactionId,
        paymentDate: paymentDate || Date.now()
      },
      { new: true }
    );
    if (!salary) return res.status(404).json({ success: false, message: 'Salary record not found' });
    res.json({ success: true, data: salary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete salary
exports.deleteSalary = async (req, res) => {
  try {
    const salary = await Salary.findByIdAndDelete(req.params.id);
    if (!salary) return res.status(404).json({ success: false, message: 'Salary record not found' });
    res.json({ success: true, message: 'Salary record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get salary stats
exports.getSalaryStats = async (req, res) => {
  try {
    const { month, year } = req.query;
    const query = {};
    if (month) query.month = month;
    if (year) query.year = parseInt(year);

    const stats = await Salary.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$employeeType',
          totalAmount: { $sum: '$netSalary' },
          count: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
          paid: { $sum: { $cond: [{ $eq: ['$status', 'paid'] }, 1, 0] } }
        }
      }
    ]);

    const totalSalaries = await Salary.countDocuments(query);
    const totalAmount = await Salary.aggregate([
      { $match: { ...query, status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$netSalary' } } }
    ]);

    res.json({
      success: true,
      data: {
        byType: stats,
        totalSalaries,
        totalPaid: totalAmount[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Generate bulk salaries
exports.generateBulkSalaries = async (req, res) => {
  try {
    const { month, year } = req.body;
    const teachers = await User.find({ role: 'teacher', isActive: true });
    const staff = await User.find({ role: 'staff', isActive: true });

    const salaries = [];
    for (const teacher of teachers) {
      const existing = await Salary.findOne({ employee: teacher._id, month, year });
      if (!existing) {
        salaries.push({
          employee: teacher._id,
          employeeType: 'teacher',
          month,
          year,
          baseSalary: 50000,
          workingDays: 26,
          presentDays: 26,
          generatedBy: req.user._id
        });
      }
    }
    for (const s of staff) {
      const existing = await Salary.findOne({ employee: s._id, month, year });
      if (!existing) {
        salaries.push({
          employee: s._id,
          employeeType: 'staff',
          month,
          year,
          baseSalary: 30000,
          workingDays: 26,
          presentDays: 26,
          generatedBy: req.user._id
        });
      }
    }

    const created = await Salary.insertMany(salaries);
    res.status(201).json({ success: true, data: created, count: created.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const { generateSalarySlipPDF } = require('../utils/pdfGenerator');

// @desc Download salary slip PDF
exports.downloadSalarySlip = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id)
      .populate('employee', 'name email phone')
      .populate('generatedBy', 'name');
      
    if (!salary) return res.status(404).json({ success: false, message: 'Salary record not found' });
    
    generateSalarySlipPDF(salary, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};