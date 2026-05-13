const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  section: String,
  examType: {
    type: String,
    enum: ['weekly', '15-days', 'monthly', 'midterm', 'final', 'unit-test'],
    required: true
  },
  examName: { type: String, trim: true },
  academicYear: { type: String, default: '2024-2025' },
  examDate: Date,

  // Subject-wise marks
  subjects: [{
    name: { type: String, required: true },
    code: String,
    totalMarks: { type: Number, required: true },
    obtainedMarks: { type: Number, required: true },
    grade: String,
    remarks: String
  }],

  // Summary
  totalMarks: { type: Number, default: 0 },
  obtainedMarks: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  grade: String,
  classPosition: Number,
  remarks: String,
  status: {
    type: String,
    enum: ['pass', 'fail', 'pending'],
    default: 'pending'
  },

  // Meta
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  }
}, {
  timestamps: true
});

// Calculate totals before save
resultSchema.pre('save', function(next) {
  if (this.subjects && this.subjects.length > 0) {
    this.totalMarks = this.subjects.reduce((sum, s) => sum + s.totalMarks, 0);
    this.obtainedMarks = this.subjects.reduce((sum, s) => sum + s.obtainedMarks, 0);
    this.percentage = this.totalMarks > 0
      ? Math.round((this.obtainedMarks / this.totalMarks) * 100 * 100) / 100
      : 0;

    // Auto grade
    if (this.percentage >= 90) this.grade = 'A+';
    else if (this.percentage >= 80) this.grade = 'A';
    else if (this.percentage >= 70) this.grade = 'B';
    else if (this.percentage >= 60) this.grade = 'C';
    else if (this.percentage >= 50) this.grade = 'D';
    else this.grade = 'F';

    this.status = this.percentage >= 33 ? 'pass' : 'fail';
  }
  next();
});

module.exports = mongoose.model('Result', resultSchema);
