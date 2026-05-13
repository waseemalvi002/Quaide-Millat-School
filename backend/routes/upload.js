const express = require('express');
const router = express.Router();
const {
  uploadImage, uploadImages, handleUpload, handleUploads, deleteImage,
  updateUserImage, updateStudentImage, updateTeacherImage, updateStaffImage,
  uploadGalleryImages, resetToDefault
} = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

// Single image upload
router.post('/single', uploadImage, handleUpload);

// Multiple images upload
router.post('/multiple', uploadImages, handleUploads);

// Delete image
router.post('/delete', authorize('admin'), deleteImage);

// Update user profile image
router.post('/user', updateUserImage);

// Update entity images
router.post('/student/:studentId', authorize('admin'), uploadImage, updateStudentImage);
router.post('/teacher/:teacherId', authorize('admin'), uploadImage, updateTeacherImage);
router.post('/staff/:staffId', authorize('admin'), uploadImage, updateStaffImage);

// Gallery images
router.post('/gallery', authorize('admin'), uploadImages, uploadGalleryImages);

// Reset to default
router.post('/reset', authorize('admin'), resetToDefault);

module.exports = router;