const Accommodation = require('../models/Accommodation');

// @desc    Get all accommodations
// @route   GET /api/v1/accommodations
// @access  Public
const getAccommodations = async (req, res, next) => {
  try {
    const accommodations = await Accommodation.find().sort({ order: 1, tier: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      count: accommodations.length,
      data: accommodations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single accommodation
// @route   GET /api/v1/accommodations/:id
// @access  Public
const getAccommodationById = async (req, res, next) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found',
      });
    }

    res.status(200).json({
      success: true,
      data: accommodation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new accommodation
// @route   POST /api/v1/accommodations
// @access  Private/Admin
const createAccommodation = async (req, res, next) => {
  try {
    const count = await Accommodation.countDocuments();
    const tierNum = req.body.tier || String(count + 1).padStart(2, '0');

    const accommodation = await Accommodation.create({
      ...req.body,
      tier: tierNum,
      specs: Array.isArray(req.body.specs)
        ? req.body.specs
        : (req.body.specs || '').split(',').map((s) => s.trim()).filter(Boolean),
    });

    res.status(201).json({
      success: true,
      data: accommodation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update accommodation
// @route   PUT /api/v1/accommodations/:id
// @access  Private/Admin
const updateAccommodation = async (req, res, next) => {
  try {
    let accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found',
      });
    }

    const payload = {
      ...req.body,
      specs: Array.isArray(req.body.specs)
        ? req.body.specs
        : (req.body.specs || '').split(',').map((s) => s.trim()).filter(Boolean),
    };

    accommodation = await Accommodation.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: accommodation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete accommodation
// @route   DELETE /api/v1/accommodations/:id
// @access  Private/Admin
const deleteAccommodation = async (req, res, next) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found',
      });
    }

    await accommodation.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Accommodation removed',
      id: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
};
