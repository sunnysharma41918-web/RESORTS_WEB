const mongoose = require('mongoose');

const messageItemSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    intent: {
      type: String,
      default: 'GENERAL_CONVERSATION',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    messages: [messageItemSchema],
    slots: {
      destination: { type: String, default: '' },
      travelDate: { type: String, default: '' },
      travellers: { type: String, default: '' },
      budget: { type: String, default: '' },
      guestName: { type: String, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      requirements: { type: String, default: '' },
      packagePreference: { type: String, default: '' },
    },
    intent: {
      type: String,
      default: 'GENERAL_CONVERSATION',
    },
    language: {
      type: String,
      default: 'en',
    },
    requiresConfirmation: {
      type: Boolean,
      default: false,
    },
    isEnquirySubmitted: {
      type: Boolean,
      default: false,
    },
    inquiryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inquiry',
    },
    lastActive: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto expire inactive guest sessions after 30 days
conversationSchema.index({ lastActive: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

module.exports = mongoose.model('Conversation', conversationSchema);
