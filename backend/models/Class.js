const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }, // e.g., "Class 1", "Class 10"
  numericLevel: {
    type: Number,
    required: true
  }, // 1-12+ for scalability
  sections: [{
    name: { type: String, default: 'A' },
    capacity: { type: Number, default: 40 },
    classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
  }],
  subjects: [{
    name: String,
    code: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    isOptional: { type: Boolean, default: false }
  }],
  monthlyFee: { type: Number, default: 0 },
  academicYear: { type: String, default: '2024-2025' },
  category: {
    type: String,
    enum: ['primary', 'middle', 'secondary', 'higher-secondary', 'college'],
    default: 'primary'
  },
  isActive: { type: Boolean, default: true },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Class', classSchema);
