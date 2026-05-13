const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeType: { type: String, enum: ['teacher', 'staff'], required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  baseSalary: { type: Number, required: true },
  allowances: {
    housing: { type: Number, default: 0 },
    transport: { type: Number, default: 0 },
    medical: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  deductions: {
    tax: { type: Number, default: 0 },
    providentFund: { type: Number, default: 0 },
    absent: { type: Number, default: 0 },
    late: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  bonus: { type: Number, default: 0 },
  totalAllowances: { type: Number, default: 0 },
  totalDeductions: { type: Number, default: 0 },
  netSalary: { type: Number, default: 0 },
  workingDays: { type: Number, default: 26 },
  presentDays: { type: Number, default: 0 },
  absentDays: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'paid', 'hold'], default: 'pending' },
  paymentDate: Date,
  paymentMethod: { type: String, enum: ['cash', 'bank-transfer', 'jazzcash', 'easypaisa', 'cheque'] },
  transactionId: String,
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

salarySchema.pre('save', function(next) {
  const a = this.allowances;
  this.totalAllowances = (a.housing||0)+(a.transport||0)+(a.medical||0)+(a.other||0);
  const d = this.deductions;
  this.totalDeductions = (d.tax||0)+(d.providentFund||0)+(d.absent||0)+(d.late||0)+(d.other||0);
  this.netSalary = this.baseSalary + this.totalAllowances + this.bonus - this.totalDeductions;
  next();
});

module.exports = mongoose.model('Salary', salarySchema);
