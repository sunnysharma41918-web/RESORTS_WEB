const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createInquiry);
router.get('/', protect, getInquiries);
router.get('/:id', protect, getInquiryById);
router.patch('/:id/status', protect, updateInquiryStatus);
router.put('/:id', protect, updateInquiryStatus);
router.delete('/:id', protect, deleteInquiry);

module.exports = router;
