const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  // Who
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userType: {
    type: String,
    enum: ['student', 'teacher', 'staff'],
    required: true
  },
  // When
  date: {
    type: Date,
    required: true
  },
  // Status
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'half-day', 'leave'],
    default: 'present'
  },
  // Academic context (for students)
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  section: String,
  // Metadata
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  remarks: String,
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate attendance
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
