const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'warning', 'success', 'error', 'fee', 'result', 'attendance', 'general'], default: 'info' },
  channel: { type: String, enum: ['email', 'sms', 'push', 'whatsapp', 'in-app'], default: 'in-app' },
  isRead: { type: Boolean, default: false },
  readAt: Date,
  link: String,
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
