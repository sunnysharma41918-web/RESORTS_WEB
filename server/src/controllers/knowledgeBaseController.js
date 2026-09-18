const path = require('path');
const fs = require('fs');
const KnowledgeDocument = require('../models/KnowledgeDocument');
const KnowledgeChunk = require('../models/KnowledgeChunk');
const VectorStore = require('../services/ai/VectorStore');
const { processDocument } = require('../services/ai/documentProcessor');

// @desc    Get all knowledge documents (Admin)
// @route   GET /api/v1/knowledge-base
// @access  Private/Admin
const getKnowledgeDocuments = async (req, res, next) => {
  try {
    const { category, status, visibility } = req.query;
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (status && status !== 'all') filter.status = status;
    if (visibility && visibility !== 'all') filter.visibility = visibility;

    const documents = await KnowledgeDocument.find(filter)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });

    const totalChunks = await KnowledgeChunk.countDocuments();

    res.status(200).json({
      success: true,
      count: documents.length,
      totalChunks,
      data: documents,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single knowledge document with chunk previews (Admin)
// @route   GET /api/v1/knowledge-base/:id
// @access  Private/Admin
const getKnowledgeDocumentById = async (req, res, next) => {
  try {
    const doc = await KnowledgeDocument.findById(req.params.id).populate('uploadedBy', 'name email');
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    const chunks = await KnowledgeChunk.find({ documentId: doc._id })
      .select('content chunkIndex metadata createdAt')
      .sort({ chunkIndex: 1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: doc,
      chunks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload Knowledge Document File (PDF, DOCX, TXT, CSV)
// @route   POST /api/v1/knowledge-base/upload
// @access  Private/Admin
const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a valid document file (PDF, DOCX, TXT, or CSV).',
      });
    }

    const { title, category, destination, visibility } = req.body;

    if (!title || !title.trim()) {
      // Clean up uploaded file if title missing
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, message: 'Title is required.' });
    }

    const ext = path.extname(req.file.originalname).toLowerCase().replace('.', '');
    const validTypes = ['pdf', 'docx', 'txt', 'csv'];

    if (!validTypes.includes(ext)) {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: `Unsupported file type: .${ext}. Allowed formats are PDF, DOCX, TXT, CSV.`,
      });
    }

    const doc = await KnowledgeDocument.create({
      title: title.trim(),
      category: category || 'general',
      destination: destination ? destination.trim() : '',
      visibility: visibility || 'public',
      status: 'UPLOADING',
      fileType: ext,
      originalFilename: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      uploadedBy: req.user?._id,
    });

    // Start background processing
    setImmediate(() => {
      processDocument(doc._id);
    });

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully and queued for AI knowledge embedding.',
      data: doc,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (_) {}
    }
    next(error);
  }
};

// @desc    Create Manual Text Knowledge Item
// @route   POST /api/v1/knowledge-base/text
// @access  Private/Admin
const createTextKnowledge = async (req, res, next) => {
  try {
    const { title, content, category, destination, visibility } = req.body;

    if (!title || !title.trim() || !content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Title and content text are required.',
      });
    }

    const doc = await KnowledgeDocument.create({
      title: title.trim(),
      category: category || 'general',
      destination: destination ? destination.trim() : '',
      visibility: visibility || 'public',
      status: 'UPLOADING',
      fileType: 'manual_text',
      rawContent: content.trim(),
      fileSize: Buffer.byteLength(content, 'utf8'),
      uploadedBy: req.user?._id,
    });

    // Start background processing
    setImmediate(() => {
      processDocument(doc._id);
    });

    res.status(201).json({
      success: true,
      message: 'Knowledge text entry created and queued for vector embedding.',
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle Knowledge Document Active / Inactive
// @route   PATCH /api/v1/knowledge-base/:id/toggle
// @access  Private/Admin
const toggleDocumentActive = async (req, res, next) => {
  try {
    const doc = await KnowledgeDocument.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    doc.isActive = !doc.isActive;
    await doc.save();

    // Sync active flag to all its chunks in VectorStore
    await VectorStore.setDocumentChunksActive(doc._id, doc.isActive);

    res.status(200).json({
      success: true,
      message: `Document is now ${doc.isActive ? 'Active' : 'Disabled'} in RAG retrieval.`,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Knowledge Document and its chunks
// @route   DELETE /api/v1/knowledge-base/:id
// @access  Private/Admin
const deleteKnowledgeDocument = async (req, res, next) => {
  try {
    const doc = await KnowledgeDocument.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    // Delete associated physical file if exists
    if (doc.filePath && fs.existsSync(doc.filePath)) {
      try {
        fs.unlinkSync(doc.filePath);
      } catch (err) {
        console.warn('Could not remove file on disk:', err.message);
      }
    }

    // Delete chunks from vector store
    await VectorStore.deleteByDocumentId(doc._id);

    // Delete document record
    await doc.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Knowledge document and associated embeddings deleted successfully.',
      id: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getKnowledgeDocuments,
  getKnowledgeDocumentById,
  uploadDocument,
  createTextKnowledge,
  toggleDocumentActive,
  deleteKnowledgeDocument,
};
