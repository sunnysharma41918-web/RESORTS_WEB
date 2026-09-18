const mongoose = require('mongoose');

const knowledgeChunkSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'KnowledgeDocument',
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    embedding: {
      type: [Number],
      default: [],
      index: false,
    },
    chunkIndex: {
      type: Number,
      default: 0,
    },
    metadata: {
      title: { type: String, default: '' },
      category: { type: String, default: 'general' },
      destination: { type: String, default: '' },
      visibility: { type: String, enum: ['public', 'internal'], default: 'public', index: true },
      version: { type: Number, default: 1 },
      isActive: { type: Boolean, default: true, index: true },
    },
  },
  {
    timestamps: true,
  }
);

knowledgeChunkSchema.index({ 'metadata.visibility': 1, 'metadata.isActive': 1 });
knowledgeChunkSchema.index({ documentId: 1, chunkIndex: 1 });

module.exports = mongoose.model('KnowledgeChunk', knowledgeChunkSchema);
