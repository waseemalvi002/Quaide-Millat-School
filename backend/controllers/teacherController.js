const Teacher = require('../models/Teacher');
const User = require('../models/User');

exports.getTeachers = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await Teacher.countDocuments(query);
    const teachers = await Teacher.find(query)
      .populate('user', 'name email')
      .skip((page - 1) * limit).limit(parseInt(limit)).sort({ createdAt: -1 });
    res.json({ success: true, data: teachers, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('user', 'name email').populate('assignedClasses.class');
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    res.json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const { email, password, ...teacherData } = req.body;
    const user = await User.create({
      name: `${teacherData.firstName} ${teacherData.lastName}`,
      email, password: password || 'teacher123', role: 'teacher'
    });
    teacherData.user = user._id;
    const teacher = await Teacher.create(teacherData);
    res.status(201).json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    res.json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
    await User.findByIdAndDelete(teacher.user);
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Teacher deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
