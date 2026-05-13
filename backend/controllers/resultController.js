const Result = require('../models/Result');

exports.getResults = async (req, res) => {
  try {
    const { student, class: classId, examType, page = 1, limit = 20 } = req.query;
    const query = {};
    if (student) query.student = student;
    if (classId) query.class = classId;
    if (examType) query.examType = examType;
    const total = await Result.countDocuments(query);
    const results = await Result.find(query)
      .populate({ path: 'student', select: 'firstName lastName rollNumber' })
      .populate('class', 'name')
      .skip((page - 1) * limit).limit(parseInt(limit)).sort({ createdAt: -1 });
    res.json({ success: true, data: results, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createResult = async (req, res) => {
  try {
    req.body.uploadedBy = req.user.id;
    const result = await Result.create(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) return res.status(404).json({ success: false, message: 'Result not found' });
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteResult = async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Result deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const { generateReportCardPDF } = require('../utils/pdfGenerator');

exports.downloadReportCard = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('student', 'firstName lastName rollNumber')
      .populate('class', 'name');
      
    if (!result) return res.status(404).json({ success: false, message: 'Result not found' });
    
    generateReportCardPDF(result, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

