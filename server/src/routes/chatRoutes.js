const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { handleChat, getChatInfo } = require('../controllers/chatController');

// Rate limiter for public chat queries (60 requests per minute per IP)
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: {
    success: false,
    message: 'Too many chat requests from this IP, please try again in a minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', chatLimiter, handleChat);
router.post('/chat', chatLimiter, handleChat);
router.get('/info', getChatInfo);

module.exports = router;
