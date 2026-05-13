const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Staff = require('../models/Staff');
const Gallery = require('../models/Gallery');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo'
});

// Configure multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'qm-school',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }]
  }
});

const upload = multer({ storage });

// @desc Upload single image
exports.uploadImage = upload.single('image');

// @desc Upload multiple images
exports.uploadImages = upload.array('images', 10);

// @desc Handle upload response
exports.handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.json({
      success: true,
      data: {
        url: req.file.path,
        publicId: req.file.filename
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Handle multiple uploads
exports.handleUploads = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }
    const images = req.files.map(file => ({
      url: file.path,
      publicId: file.filename
    }));
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete image from Cloudinary
exports.deleteImage = async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ success: false, message: 'Public ID required' });
    }
    await cloudinary.uploader.destroy(publicId);
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update user profile image
exports.updateUserImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: { url: req.file.path, publicId: req.file.filename, isDefault: false } },
      { new: true }
    );
    res.json({ success: true, data: user.avatar });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update student image
exports.updateStudentImage = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const student = await Student.findByIdAndUpdate(
      studentId,
      { profileImage: { url: req.file.path, publicId: req.file.filename, isDefault: false } },
      { new: true }
    );
    res.json({ success: true, data: student.profileImage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update teacher image
exports.updateTeacherImage = async (req, res) => {
  try {
    const { teacherId } = req.params;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const teacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { profileImage: { url: req.file.path, publicId: req.file.filename, isDefault: false } },
      { new: true }
    );
    res.json({ success: true, data: teacher.profileImage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update staff image
exports.updateStaffImage = async (req, res) => {
  try {
    const { staffId } = req.params;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const staff = await Staff.findByIdAndUpdate(
      staffId,
      { profileImage: { url: req.file.path, publicId: req.file.filename, isDefault: false } },
      { new: true }
    );
    res.json({ success: true, data: staff.profileImage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Upload gallery images
exports.uploadGalleryImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }
    const images = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      isDefault: false
    }));
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Reset to default image
exports.resetToDefault = async (req, res) => {
  try {
    const { type, id } = req.body;
    const defaults = {
      student: { url: '/images/default-student.png', publicId: null, isDefault: true },
      teacher: { url: '/images/default-teacher.png', publicId: null, isDefault: true },
      staff: { url: '/images/default-staff.png', publicId: null, isDefault: true },
      user: { url: '/images/default-avatar.png', publicId: null, isDefault: true }
    };

    if (!defaults[type]) {
      return res.status(400).json({ success: false, message: 'Invalid type' });
    }

    let Model;
    switch (type) {
      case 'student': Model = Student; break;
      case 'teacher': Model = Teacher; break;
      case 'staff': Model = Staff; break;
      case 'user': Model = User; break;
      default: return res.status(400).json({ success: false, message: 'Invalid type' });
    }

    const updateField = type === 'user' ? 'avatar' : 'profileImage';
    const item = await Model.findByIdAndUpdate(
      id,
      { [updateField]: defaults[type] },
      { new: true }
    );

    res.json({ success: true, data: defaults[type] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  uploadImage: exports.uploadImage,
  uploadImages: exports.uploadImages,
  handleUpload: exports.handleUpload,
  handleUploads: exports.handleUploads,
  deleteImage: exports.deleteImage,
  updateUserImage: exports.updateUserImage,
  updateStudentImage: exports.updateStudentImage,
  updateTeacherImage: exports.updateTeacherImage,
  updateStaffImage: exports.updateStaffImage,
  uploadGalleryImages: exports.uploadGalleryImages,
  resetToDefault: exports.resetToDefault
};