const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    enum: ['cash', 'bank-transfer', 'jazzcash', 'easypaisa', 'cheque', 'card'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  transactionId: String,
  bankDetails: {
    accountTitle: String,
    accountNumber: String,
    bankName: String,
    branchCode: String
  },
  receiptImage: {
    url: String,
    publicId: String
  },
  paymentDate: Date,
  description: String,
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date,
  verificationRemarks: String,
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);