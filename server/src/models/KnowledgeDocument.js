const mongoose = require('mongoose');

const knowledgeDocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a document title'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['packages', 'destinations', 'policies', 'faq', 'itineraries', 'hotels', 'general'],
      default: 'general',
      trim: true,
    },
    destination: {
      type: String,
      default: '',
      trim: true,
    },
    visibility: {
      type: String,
      enum: ['public', 'internal'],
      default: 'public',
    },
    version: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ['UPLOADING', 'PROCESSING', 'READY', 'FAILED'],
      default: 'UPLOADING',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    fileType: {
      type: String,
      enum: ['pdf', 'docx', 'txt', 'csv', 'manual_text'],
      required: true,
    },
    originalFilename: {
      type: String,
      default: '',
    },
    filePath: {
      type: String,
      default: '',
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    rawContent: {
      type: String,
      default: '',
    },
    chunksCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

knowledgeDocumentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

knowledgeDocumentSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('KnowledgeDocument', knowledgeDocumentSchema);
