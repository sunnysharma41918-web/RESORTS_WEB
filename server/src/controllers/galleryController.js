const GalleryItem = require('../models/GalleryItem');

// @desc    Get all gallery items
// @route   GET /api/v1/gallery
// @access  Public
const getGalleryItems = async (req, res, next) => {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new gallery item
// @route   POST /api/v1/gallery
// @access  Private/Admin
const createGalleryItem = async (req, res, next) => {
  try {
    const item = await GalleryItem.create(req.body);

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update gallery item
// @route   PUT /api/v1/gallery/:id
// @access  Private/Admin
const updateGalleryItem = async (req, res, next) => {
  try {
    let item = await GalleryItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/v1/gallery/:id
// @access  Private/Admin
const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await GalleryItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Gallery item removed',
      id: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};
