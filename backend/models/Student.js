const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Personal Information
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  fatherName: { type: String, required: true, trim: true },
  motherName: { type: String, trim: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', ''] },
  religion: { type: String, trim: true },
  nationality: { type: String, default: 'Pakistani' },
  cnic: { type: String, trim: true }, // B-Form / CNIC

  // Academic Information
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  admissionNumber: { type: String, unique: true },
  admissionDate: { type: Date, default: Date.now },
  currentClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  section: { type: String, default: 'A' },
  previousSchool: { type: String, trim: true },

  // Contact Information
  address: { type: String, trim: true },
  city: { type: String, default: 'Karachi' },
  phone: { type: String, trim: true },
  emergencyContact: { type: String, trim: true },

  // Parent/Guardian
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  guardianName: { type: String, trim: true },
  guardianPhone: { type: String, trim: true },
  guardianRelation: { type: String, trim: true },

  // Image
  profileImage: {
    url: { type: String, default: '/images/default-student.png' },
    publicId: String,
    isDefault: { type: Boolean, default: true }
  },

  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated', 'transferred', 'expelled'],
    default: 'active'
  },

  // Fee
  feeCategory: {
    type: String,
    enum: ['regular', 'scholarship', 'sibling-discount', 'staff-child'],
    default: 'regular'
  },
  monthlyFee: { type: Number, default: 0 },

  // Branch support
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  },

  // Academic history
  academicHistory: [{
    year: String,
    class: String,
    result: String,
    percentage: Number,
    grade: String
  }]
}, {
  timestamps: true
});

// Virtual for full name
studentSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
studentSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birth = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
});

studentSchema.set('toJSON', { virtuals: true });
studentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Student', studentSchema);
