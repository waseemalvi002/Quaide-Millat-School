const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    trim: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: ['theory', 'practical', 'both'],
    default: 'theory'
  },
  totalMarks: {
    type: Number,
    default: 100
  },
  passMarks: {
    type: Number,
    default: 33
  },
  isActive: {
    type: Boolean,
    default: true
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Subject', subjectSchema);