const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true },
  address: String,
  city: { type: String, default: 'Karachi' },
  phone: String,
  email: String,
  principal: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true },
  logo: { url: String, publicId: String, isDefault: { type: Boolean, default: true } }
}, { timestamps: true });

module.exports = mongoose.model('Branch', branchSchema);
