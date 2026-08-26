const Inquiry = require('../models/Inquiry');

// @desc    Create new inquiry (Guest Lead)
// @route   POST /api/v1/inquiries
// @access  Public
const createInquiry = async (req, res, next) => {
  try {
    const {
      guestName,
      name,
      email,
      phone,
      property,
      occasion,
      budget,
      city,
      guestCount,
      roomCount,
      eventDuration,
      eventDate,
      preferredContact,
      message,
      notes,
    } = req.body;

    const inquiry = await Inquiry.create({
      guestName: guestName || name || 'Guest',
      email: email || '',
      phone: phone || '',
      property: property || occasion || 'Celebration Booking',
      budget: budget || 'Custom Quote',
      city: city || 'India',
      guestCount: guestCount || '',
      roomCount: roomCount || '',
      eventDuration: eventDuration || '',
      eventDate: eventDate || '',
      preferredContact: preferredContact || 'WhatsApp Priority',
      message: message || notes || '',
      status: 'new',
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully. Our concierge will connect with you shortly.',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries
// @route   GET /api/v1/inquiries
// @access  Private/Admin
const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single inquiry
// @route   GET /api/v1/inquiries/:id
// @access  Private/Admin
const getInquiryById = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status
// @route   PATCH /api/v1/inquiries/:id/status
// @access  Private/Admin
const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    if (status) inquiry.status = status;
    if (notes !== undefined) inquiry.notes = notes;

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: `Inquiry marked as ${inquiry.status}`,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/v1/inquiries/:id
// @access  Private/Admin
const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    await inquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Inquiry removed successfully',
      id: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
};
