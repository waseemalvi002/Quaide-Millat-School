const Student = require('../models/Student');
const User = require('../models/User');

const firstNames = ['Ali', 'Hamza', 'Zain', 'Abdullah', 'Bilal', 'Umar', 'Hassan', 'Saad', 'Fahad', 'Owais', 'Sara', 'Ayesha', 'Fatima', 'Zainab', 'Mariam', 'Sana', 'Sidra', 'Amina', 'Hina', 'Nida'];
const lastNames = ['Khan', 'Ahmed', 'Malik', 'Sheikh', 'Qureshi', 'Siddiqui', 'Raza', 'Iqbal', 'Hussain', 'Shah', 'Alvi', 'Lodhi', 'Mughal', 'Jatt', 'Chaudhry', 'Farooq', 'Ansari', 'Mirza', 'Dar', 'Butt'];

const classDefs = [
  { name: 'Nursery', numericLevel: 0, count: 60 },
  { name: 'Class 1', numericLevel: 1, count: 70 },
  { name: 'Class 2', numericLevel: 2, count: 70 },
  { name: 'Class 3', numericLevel: 3, count: 70 },
  { name: 'Class 4', numericLevel: 4, count: 70 },
  { name: 'Class 5', numericLevel: 5, count: 70 },
  { name: 'Class 6', numericLevel: 6, count: 70 },
  { name: 'Class 7', numericLevel: 7, count: 70 },
  { name: 'Class 8', numericLevel: 8, count: 70 },
  { name: 'Class 9', numericLevel: 9, count: 70 },
  { name: 'Class 10', numericLevel: 10, count: 70 },
  { name: 'Class 11 (Pre-Med)', numericLevel: 11, count: 35, onlySection: 'A' },
  { name: 'Class 11 (Pre-Eng)', numericLevel: 11, count: 35, onlySection: 'B' },
  { name: 'Class 12 (Pre-Med)', numericLevel: 12, count: 35, onlySection: 'A' },
  { name: 'Class 12 (Pre-Eng)', numericLevel: 12, count: 35, onlySection: 'B' },
];

const GENERATED_STUDENTS = [];
let studentTotalCount = 0;

classDefs.forEach((cDef, classIdx) => {
  for (let s = 0; s < cDef.count; s++) {
    studentTotalCount++;
    const fn = firstNames[(classIdx + s) % firstNames.length];
    const ln = lastNames[(classIdx + s + 1) % lastNames.length];
    const section = cDef.onlySection ? cDef.onlySection : (s < cDef.count / 2 ? 'A' : 'B');
    const rollId = String((s % Math.ceil(cDef.count / 2)) + 1).padStart(3, '0');
    const rollNumber = `QM-${String(cDef.numericLevel).padStart(2, '0')}-${section}-${rollId}`;
    
    GENERATED_STUDENTS.push({
      _id: String(studentTotalCount),
      firstName: fn,
      lastName: ln,
      name: `${fn} ${ln}`,
      fatherName: `Mr. ${ln}`,
      rollNumber,
      admissionNumber: `ADM-${String(studentTotalCount).padStart(5, '0')}`,
      currentClass: { name: cDef.name, numericLevel: cDef.numericLevel },
      class: { name: cDef.name }, // Needed for table view key
      section,
      age: 6 + cDef.numericLevel + (s % 2),
      phone: `031${studentTotalCount % 10}-${String(studentTotalCount).padStart(7, '0')}`,
      status: 'active',
      profileImage: { url: 'https://cdn-icons-png.flaticon.com/512/149/149071.png', isDefault: true }
    });
  }
});

// @desc Get all students
exports.getStudents = async (req, res) => {
  try {
    // Demo Mode Bypass
    if (process.env.USE_DEMO === 'true' || true) {
      const { search, class: classFilter, section, status, page = 1, limit = 20 } = req.query;
      let filtered = [...GENERATED_STUDENTS];
      
      if (classFilter) {
        filtered = filtered.filter(s => s.currentClass.name.toLowerCase() === classFilter.toLowerCase() || s.class.name.toLowerCase() === classFilter.toLowerCase());
      }
      if (section) {
        filtered = filtered.filter(s => s.section.toLowerCase() === section.toLowerCase());
      }
      if (status) {
        filtered = filtered.filter(s => s.status.toLowerCase() === status.toLowerCase());
      }
      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter(s => 
          s.firstName.toLowerCase().includes(query) ||
          s.lastName.toLowerCase().includes(query) ||
          s.fatherName.toLowerCase().includes(query) ||
          s.rollNumber.toLowerCase().includes(query)
        );
      }
      
      const pageInt = parseInt(page);
      const limitInt = parseInt(limit);
      const startIdx = (pageInt - 1) * limitInt;
      const endIdx = startIdx + limitInt;
      const paginated = filtered.slice(startIdx, endIdx);
      
      return res.json({
        success: true,
        data: paginated,
        total: filtered.length,
        pages: Math.ceil(filtered.length / limitInt),
        page: pageInt
      });
    }

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
    // Demo Mode Bypass
    if (process.env.USE_DEMO === 'true' || true) {
      return res.json({ success: true, data: { total: 900, active: 900, inactive: 0, byClass: [] } });
    }

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
