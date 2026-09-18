const express = require('express');
const router = express.Router();
const { handleChat, getConciergeInfo } = require('../controllers/conciergeController');

// Public endpoints for AI Concierge
router.post('/chat', handleChat);
router.get('/info', getConciergeInfo);

module.exports = router;
