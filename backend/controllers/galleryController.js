const Gallery = require('../models/Gallery');

// @desc Get all gallery items
exports.getGallery = async (req, res) => {
  try {
    const { category, isPublic, page = 1, limit = 12 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (isPublic === 'true') query.isPublic = true;

    const total = await Gallery.countDocuments(query);
    const gallery = await Gallery.find(query)
      .populate('uploadedBy', 'name')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({ success: true, data: gallery, total, pages: Math.ceil(total / limit), page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single gallery item
exports.getGalleryItem = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id).populate('uploadedBy', 'name');
    if (!gallery) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create gallery item
exports.createGallery = async (req, res) => {
  try {
    const galleryData = {
      ...req.body,
      uploadedBy: req.user._id
    };
    const gallery = await Gallery.create(galleryData);
    res.status(201).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update gallery item
exports.updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!gallery) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete gallery item
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Add image to gallery
exports.addImage = async (req, res) => {
  try {
    const { url, publicId, caption, isDefault } = req.body;
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: 'Gallery item not found' });

    gallery.images.push({ url, publicId, caption, isDefault: isDefault || false });
    await gallery.save();
    res.json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Remove image from gallery
exports.removeImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: 'Gallery item not found' });

    gallery.images = gallery.images.filter(img => img._id.toString() !== imageId);
    await gallery.save();
    res.json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get gallery stats
exports.getGalleryStats = async (req, res) => {
  try {
    const stats = await Gallery.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 }, images: { $sum: { $size: '$images' } } } }
    ]);
    const total = await Gallery.countDocuments();
    res.json({ success: true, data: { total, byCategory: stats } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};