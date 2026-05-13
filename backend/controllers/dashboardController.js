const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Staff = require('../models/Staff');
const Fee = require('../models/Fee');
const Attendance = require('../models/Attendance');

exports.getDashboardStats = async (req, res) => {
  try {
    const students = await Student.countDocuments({ status: 'active' });
    const teachers = await Teacher.countDocuments({ status: 'active' });
    const staff = await Staff.countDocuments({ status: 'active' });
    const feeStats = await Fee.aggregate([
      { $group: { _id: null, totalFees: { $sum: '$totalAmount' }, collected: { $sum: '$paidAmount' } } }
    ]);
    const unpaidFees = await Fee.countDocuments({ status: { $in: ['unpaid', 'overdue'] } });
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const todayAttendance = await Attendance.aggregate([
      { $match: { date: today } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const recentStudents = await Student.find({ status: 'active' })
      .populate('currentClass', 'name').sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        counts: { students, teachers, staff, total: students + teachers + staff },
        financial: { ...(feeStats[0] || { totalFees: 0, collected: 0 }), unpaidFees },
        todayAttendance,
        recentStudents
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
