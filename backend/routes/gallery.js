const express = require('express');
const router = express.Router();
const {
  getGallery, getGalleryItem, createGallery, updateGallery,
  deleteGallery, addImage, removeImage, getGalleryStats
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');

// Public route
router.get('/', getGallery);
router.get('/stats', getGalleryStats);

// Protected routes
router.use(protect);
router.get('/:id', getGalleryItem);
router.post('/', authorize('admin'), createGallery);
router.put('/:id', authorize('admin'), updateGallery);
router.delete('/:id', authorize('admin'), deleteGallery);
router.post('/:id/images', authorize('admin'), addImage);
router.delete('/:id/images/:imageId', authorize('admin'), removeImage);

module.exports = router;