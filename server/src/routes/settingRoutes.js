const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, getTickerOffers, updateTickerOffers } = require('../controllers/settingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getSettings);
router.put('/', protect, updateSettings);

router.get('/ticker', getTickerOffers);
router.put('/ticker', protect, updateTickerOffers);

module.exports = router;
