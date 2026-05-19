// Mock data for demo mode
let mockGallery = [
  {
    _id: '1',
    title: 'Annual Sports Gala 2024',
    category: 'sports',
    description: 'A day of athletic excellence and school spirit.',
    isPublic: true,
    images: [
      { _id: 'img1', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', publicId: 'img1', caption: 'Opening Ceremony' },
      { _id: 'img2', url: 'https://images.unsplash.com/photo-1564066341310-59d5dc334f47?w=800', publicId: 'img2', caption: '100m Sprint' }
    ],
    createdAt: new Date()
  },
  {
    _id: '2',
    title: 'Science Exhibition',
    category: 'academic',
    description: 'Students showcasing their innovative projects.',
    isPublic: true,
    images: [
      { _id: 'img3', url: 'https://images.unsplash.com/photo-1523050853063-bd8012fec040?w=800', publicId: 'img3', caption: 'Physics Lab Projects' }
    ],
    createdAt: new Date()
  }
];

// @desc Get all gallery items
exports.getGallery = async (req, res) => {
  try {
    // If DB is not connected, use mock data
    if (process.env.USE_DEMO === 'true' || true) {
      return res.json({ success: true, data: mockGallery, total: mockGallery.length });
    }
    
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
    const album = mockGallery.find(g => g._id === req.params.id);
    if (album) return res.json({ success: true, data: album });

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
      _id: Date.now().toString(),
      images: [],
      createdAt: new Date()
    };
    mockGallery.unshift(galleryData);
    res.status(201).json({ success: true, data: galleryData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update gallery item
exports.updateGallery = async (req, res) => {
  try {
    const index = mockGallery.findIndex(g => g._id === req.params.id);
    if (index !== -1) {
      mockGallery[index] = { ...mockGallery[index], ...req.body };
      return res.json({ success: true, data: mockGallery[index] });
    }
    res.status(404).json({ success: false, message: 'Not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete gallery item
exports.deleteGallery = async (req, res) => {
  try {
    mockGallery = mockGallery.filter(g => g._id !== req.params.id);
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Add image to gallery
exports.addImage = async (req, res) => {
  try {
    const { url, publicId, caption } = req.body;
    const album = mockGallery.find(g => g._id === req.params.id);
    if (album) {
      album.images.push({ _id: Date.now().toString(), url, publicId, caption });
      return res.json({ success: true, data: album });
    }
    res.status(404).json({ success: false, message: 'Not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Remove image from gallery
exports.removeImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const album = mockGallery.find(g => g._id === req.params.id);
    if (album) {
      album.images = album.images.filter(img => img.publicId !== imageId);
      return res.json({ success: true, data: album });
    }
    res.status(404).json({ success: false, message: 'Not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update image caption
exports.updateImageCaption = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { caption } = req.body;
    const album = mockGallery.find(g => g._id === req.params.id);
    if (album) {
      const img = album.images.find(i => i.publicId === imageId);
      if (img) img.caption = caption;
      return res.json({ success: true, data: album });
    }
    res.status(404).json({ success: false, message: 'Not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get gallery stats
exports.getGalleryStats = async (req, res) => {
  try {
    res.json({ success: true, data: { total: mockGallery.length } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};