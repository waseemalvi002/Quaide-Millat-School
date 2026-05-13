const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  fatherName: { type: String, trim: true },
  dateOfBirth: Date,
  gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
  cnic: { type: String, unique: true, sparse: true },
  qualification: { type: String, trim: true },
  specialization: { type: String, trim: true },
  experience: { type: Number, default: 0 }, // years

  // Employment
  employeeId: { type: String, unique: true },
  joiningDate: { type: Date, default: Date.now },
  designation: { type: String, default: 'Teacher' },
  department: { type: String, trim: true },

  // Subjects & Classes
  subjects: [{ type: String, trim: true }],
  assignedClasses: [{
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    section: String,
    subject: String
  }],

  // Contact
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  city: { type: String, default: 'Karachi' },

  // Salary
  baseSalary: { type: Number, default: 0 },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  bankAccount: { type: String, trim: true },
  bankName: { type: String, trim: true },

  // Image
  profileImage: {
    url: { type: String, default: '/images/default-teacher.png' },
    publicId: String,
    isDefault: { type: Boolean, default: true }
  },

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'on-leave', 'terminated'],
    default: 'active'
  },

  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  }
}, {
  timestamps: true
});

teacherSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

teacherSchema.set('toJSON', { virtuals: true });
teacherSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Teacher', teacherSchema);
