const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['event', 'sports', 'academic', 'general', 'infrastructure'], default: 'general' },
  images: [{
    url: { type: String, required: true },
    publicId: String,
    caption: String,
    isDefault: { type: Boolean, default: false }
  }],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublic: { type: Boolean, default: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
