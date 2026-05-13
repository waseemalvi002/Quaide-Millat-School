const Student = require('../models/Student');
const User = require('../models/User');

// @desc Get all students
exports.getStudents = async (req, res) => {
  try {
    const { search, class: classId, section, status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (classId) query.currentClass = classId;
    if (section) query.section = section;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } },
        { fatherName: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await Student.countDocuments(query);
    const students = await Student.find(query)
      .populate('currentClass', 'name numericLevel')
      .populate('user', 'name email')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ rollNumber: 1 });
    res.json({ success: true, data: students, total, pages: Math.ceil(total / limit), page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single student
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('currentClass').populate('user', 'name email');
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Search student by roll number (public)
exports.searchByRollNumber = async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const student = await Student.findOne({ rollNumber })
      .populate('currentClass', 'name numericLevel')
      .select('firstName lastName fatherName rollNumber currentClass section profileImage status');
    if (!student) return res.status(404).json({ success: false, message: 'No student found with this roll number' });
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create student
exports.createStudent = async (req, res) => {
  try {
    const { email, password, ...studentData } = req.body;
    // Create user account
    const user = await User.create({
      name: `${studentData.firstName} ${studentData.lastName}`,
      email, password: password || 'student123',
      role: 'student'
    });
    studentData.user = user._id;
    const student = await Student.create(studentData);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    await User.findByIdAndDelete(student.user);
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get student stats
exports.getStudentStats = async (req, res) => {
  try {
    const total = await Student.countDocuments();
    const active = await Student.countDocuments({ status: 'active' });
    const byClass = await Student.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$currentClass', count: { $sum: 1 } } }
    ]);
    res.json({ success: true, data: { total, active, inactive: total - active, byClass } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
