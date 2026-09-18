const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getKnowledgeDocuments,
  getKnowledgeDocumentById,
  uploadDocument,
  createTextKnowledge,
  toggleDocumentActive,
  deleteKnowledgeDocument,
} = require('../controllers/knowledgeBaseController');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads/documents');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup with safe filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40);
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e6)}`;
    cb(null, `${safeBase}_${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.docx', '.txt', '.csv'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${ext}. Only PDF, DOCX, TXT, and CSV are allowed.`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
});

// All knowledge base routes are protected by admin authentication
router.use(protect);
router.use(authorize('superadmin', 'manager'));

router.get('/', getKnowledgeDocuments);
router.get('/:id', getKnowledgeDocumentById);
router.post('/upload', upload.single('file'), uploadDocument);
router.post('/text', createTextKnowledge);
router.patch('/:id/toggle', toggleDocumentActive);
router.delete('/:id', deleteKnowledgeDocument);

module.exports = router;
