const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  // Fee details
  feeType: {
    type: String,
    enum: ['monthly', 'admission', 'exam', 'transport', 'library', 'lab', 'sports', 'other'],
    default: 'monthly'
  },
  month: { type: String, required: true }, // e.g., "January 2025"
  academicYear: { type: String, default: '2024-2025' },
  amount: { type: Number, required: true },
  lateFee: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },

  // Payment
  status: {
    type: String,
    enum: ['paid', 'unpaid', 'partial', 'overdue'],
    default: 'unpaid'
  },
  paidAmount: { type: Number, default: 0 },
  paymentDate: Date,
  paymentMethod: {
    type: String,
    enum: ['cash', 'jazzcash', 'easypaisa', 'bank-transfer', 'online', 'other'],
  },
  transactionId: String,
  receiptNumber: String,

  // Verification (for online payments)
  screenshotUrl: String,
  isVerified: { type: Boolean, default: false },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verifiedAt: Date,

  dueDate: Date,
  remarks: String,
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  }
}, {
  timestamps: true
});

// Calculate total before save
feeSchema.pre('save', function(next) {
  this.totalAmount = this.amount + this.lateFee - this.discount;
  if (this.paidAmount >= this.totalAmount) {
    this.status = 'paid';
  } else if (this.paidAmount > 0) {
    this.status = 'partial';
  }
  next();
});

module.exports = mongoose.model('Fee', feeSchema);
