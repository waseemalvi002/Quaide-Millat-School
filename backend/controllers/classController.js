const Class = require('../models/Class');

exports.getClasses = async (req, res) => {
  try {
    const { category, active } = req.query;
    const query = {};
    if (category) query.category = category;
    if (active !== undefined) query.isActive = active === 'true';
    const classes = await Class.find(query).populate('sections.classTeacher', 'firstName lastName').sort({ numericLevel: 1 });
    res.json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getClass = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id).populate('sections.classTeacher').populate('subjects.teacher');
    if (!cls) return res.status(404).json({ success: false, message: 'Class not found' });
    res.json({ success: true, data: cls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createClass = async (req, res) => {
  try {
    const cls = await Class.create(req.body);
    res.status(201).json({ success: true, data: cls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const cls = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cls) return res.status(404).json({ success: false, message: 'Class not found' });
    res.json({ success: true, data: cls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
