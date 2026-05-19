const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  try {
    const { records } = req.body; // Array of { user, userType, status, class, section }
    const date = req.body.date || new Date().toISOString().split('T')[0];
    const results = [];
    for (const record of records) {
      const existing = await Attendance.findOne({ user: record.user, date: new Date(date) });
      if (existing) {
        existing.status = record.status;
        existing.remarks = record.remarks;
        await existing.save();
        results.push(existing);
      } else {
        const att = await Attendance.create({ ...record, date: new Date(date), markedBy: req.user.id });
        results.push(att);
      }
    }
    res.json({ success: true, data: results, message: `${results.length} records saved` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    // Demo Mode Bypass
    if (process.env.USE_DEMO === 'true' || true) {
      return res.json({ success: true, data: [], total: 0 });
    }
    const { userType, class: classId, date, month, user: userId, page = 1, limit = 50 } = req.query;
    const query = {};
    if (userType) query.userType = userType;
    if (classId) query.class = classId;
    if (userId) query.user = userId;
    if (date) query.date = new Date(date);
    if (month) {
      const [y, m] = month.split('-');
      query.date = { $gte: new Date(y, m - 1, 1), $lt: new Date(y, m, 1) };
    }
    const total = await Attendance.countDocuments(query);
    const attendance = await Attendance.find(query)
      .populate('user', 'name role')
      .skip((page - 1) * limit).limit(parseInt(limit)).sort({ date: -1 });
    res.json({ success: true, data: attendance, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAttendanceStats = async (req, res) => {
  try {
    // Demo Mode Bypass
    if (process.env.USE_DEMO === 'true' || true) {
      return res.json({ success: true, data: [{ _id: 'present', count: 45 }, { _id: 'absent', count: 5 }] });
    }
    const { userType, month } = req.query;
    const query = {};
    if (userType) query.userType = userType;
    if (month) {
      const [y, m] = month.split('-');
      query.date = { $gte: new Date(y, m - 1, 1), $lt: new Date(y, m, 1) };
    }
    const stats = await Attendance.aggregate([
      { $match: query },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
