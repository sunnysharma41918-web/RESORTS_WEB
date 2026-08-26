const express = require('express');
const router = express.Router();
const {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
} = require('../controllers/offerController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getOffers);
router.get('/:id', getOfferById);
router.post('/', protect, createOffer);
router.put('/:id', protect, updateOffer);
router.delete('/:id', protect, deleteOffer);

module.exports = router;
