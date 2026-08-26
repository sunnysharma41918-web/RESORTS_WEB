const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    guestName: {
      type: String,
      required: [true, 'Please provide the guest or host name'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      required: [true, 'Please provide a valid phone or WhatsApp number'],
      trim: true,
    },
    property: {
      type: String,
      default: 'Celebration Booking',
      trim: true,
    },
    budget: {
      type: String,
      default: 'Custom Quote',
      trim: true,
    },
    city: {
      type: String,
      default: 'India',
      trim: true,
    },
    guestCount: {
      type: String,
      default: '',
      trim: true,
    },
    roomCount: {
      type: String,
      default: '',
      trim: true,
    },
    eventDuration: {
      type: String,
      default: '',
      trim: true,
    },
    eventDate: {
      type: String,
      default: '',
      trim: true,
    },
    preferredContact: {
      type: String,
      default: 'WhatsApp Priority',
      trim: true,
    },
    message: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved'],
      default: 'new',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Virtual id for frontend compatibility
inquirySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

inquirySchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Inquiry', inquirySchema);
