const Subject = require('../models/Subject');

// @desc Get all subjects
exports.getSubjects = async (req, res) => {
  try {
    const { class: classId, teacherId, page = 1, limit = 50 } = req.query;
    const query = {};
    if (classId) query.class = classId;
    if (teacherId) query.teacher = teacherId;

    const total = await Subject.countDocuments(query);
    const subjects = await Subject.find(query)
      .populate('class', 'name numericLevel')
      .populate('teacher', 'name')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ class: 1, name: 1 });

    res.json({ success: true, data: subjects, total, pages: Math.ceil(total / limit), page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single subject
exports.getSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate('class')
      .populate('teacher', 'name email');
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
    res.json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create subject
exports.createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update subject
exports.updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
    res.json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete subject
exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found' });
    res.json({ success: true, message: 'Subject deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};