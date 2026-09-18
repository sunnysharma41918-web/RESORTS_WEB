const { generateConciergeResponse } = require('../services/aiConciergeService');
const { retrieveWebsiteContent } = require('../services/ragService');

/**
 * @desc    Chat with AI Concierge
 * @route   POST /api/v1/concierge/chat
 * @access  Public
 */
const handleChat = async (req, res, next) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required and must be a non-empty string.'
      });
    }

    // Limit conversation history length to avoid payload overflow
    const trimmedHistory = Array.isArray(conversationHistory)
      ? conversationHistory.slice(-10)
      : [];

    const result = await generateConciergeResponse({
      message: message.trim(),
      conversationHistory: trimmedHistory
    });

    return res.status(200).json({
      success: true,
      data: {
        reply: result.reply,
        resortName: result.resortName,
        contactInfo: result.contactInfo,
        source: result.source,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get AI Concierge Status & Quick Suggestions
 * @route   GET /api/v1/concierge/info
 * @access  Public
 */
const getConciergeInfo = async (req, res, next) => {
  try {
    const { resortName, contactInfo } = await retrieveWebsiteContent();

    return res.status(200).json({
      success: true,
      data: {
        resortName,
        status: 'online',
        supportedLanguages: ['English', 'Hindi', 'Hinglish'],
        suggestions: [
          'Tell me about The Forest Pool Villa',
          'What are the check-in and check-out times?',
          'What dining options are available?',
          'Do you have any wedding or honeymoon packages?',
          'What is the child policy?'
        ],
        contactInfo
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleChat,
  getConciergeInfo
};
