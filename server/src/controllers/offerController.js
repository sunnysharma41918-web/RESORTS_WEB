const Offer = require('../models/Offer');

// @desc    Get all offers
// @route   GET /api/v1/offers
// @access  Public
const getOffers = async (req, res, next) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: offers.length,
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single offer
// @route   GET /api/v1/offers/:id
// @access  Public
const getOfferById = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found',
      });
    }

    res.status(200).json({
      success: true,
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new offer
// @route   POST /api/v1/offers
// @access  Private/Admin
const createOffer = async (req, res, next) => {
  try {
    const offer = await Offer.create({
      ...req.body,
      inclusions: Array.isArray(req.body.inclusions)
        ? req.body.inclusions
        : (req.body.inclusions || '').split(',').map((s) => s.trim()).filter(Boolean),
    });

    res.status(201).json({
      success: true,
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update offer
// @route   PUT /api/v1/offers/:id
// @access  Private/Admin
const updateOffer = async (req, res, next) => {
  try {
    let offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found',
      });
    }

    const payload = {
      ...req.body,
      inclusions: Array.isArray(req.body.inclusions)
        ? req.body.inclusions
        : (req.body.inclusions || '').split(',').map((s) => s.trim()).filter(Boolean),
    };

    offer = await Offer.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete offer
// @route   DELETE /api/v1/offers/:id
// @access  Private/Admin
const deleteOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found',
      });
    }

    await offer.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Offer removed',
      id: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
};
