const { v4: uuidv4 } = require('crypto');
const Conversation = require('../models/Conversation');
const { INTENTS, detectLanguage, classifyIntent } = require('../services/ai/intentClassifier');
const {
  extractSlots,
  getNextSlotPrompt,
  buildConfirmationSummary,
  submitEnquiryToAdmin,
} = require('../services/ai/slotFillingEngine');
const { generateGroundedResponse } = require('../services/ai/enhancedRAGService');
const GeminiProvider = require('../services/ai/GeminiProvider');

const gemini = new GeminiProvider();

/**
 * @desc    Main Chatbot Conversation Endpoint
 * @route   POST /api/v1/chat or POST /api/chat
 * @access  Public
 */
const handleChat = async (req, res, next) => {
  try {
    const { message, language: clientLanguage, confirmSubmission } = req.body;
    let { conversationId } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message is required and must be a non-empty string.',
      });
    }

    const cleanMessage = message.trim();

    // 1. Session & Memory retrieval
    if (!conversationId) {
      conversationId = `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }

    let conversation = await Conversation.findOne({ conversationId });
    if (!conversation) {
      conversation = new Conversation({
        conversationId,
        messages: [],
        slots: {},
        language: clientLanguage && clientLanguage !== 'auto' ? clientLanguage : 'en',
      });
    }

    // 2. Language Detection
    const detectedLang = detectLanguage(cleanMessage);
    const effectiveLanguage =
      clientLanguage && clientLanguage !== 'auto' ? clientLanguage : detectedLang;
    conversation.language = effectiveLanguage;

    // 3. Intent Classification & Security Guard
    const { intent } = classifyIntent(cleanMessage, {
      requiresConfirmation: conversation.requiresConfirmation,
    });
    conversation.intent = intent;

    let replyText = '';
    let requiresConfirmation = false;
    let isEnquirySubmitted = false;
    let createdInquiryId = null;

    // -------------------------------------------------------------
    // Branch A: PROMPT INJECTION DEFENSE
    // -------------------------------------------------------------
    if (intent === INTENTS.PROMPT_INJECTION) {
      if (effectiveLanguage === 'hi') {
        replyText =
          'मैं कंट्री हॉलीडेज होटल्स एंड रिसॉर्ट्स का आधिकारिक डिजिटल असिस्टेंट हूँ। मैं केवल लक्ज़री स्टे, विला, हॉलिडे पैकेज और बुकिंग से जुड़े प्रश्नों में आपकी सहायता कर सकता हूँ।';
      } else if (effectiveLanguage === 'hinglish') {
        replyText =
          'Main Country Holidays Hotels & Resorts ka official AI Concierge hoon. Main sirf aapke luxury stays, resort packages aur bookings me help kar sakta hoon.';
      } else {
        replyText =
          'I am the official travel assistant for Country Holidays Hotels & Resorts. I am only able to assist with resort accommodations, bespoke packages, and travel itineraries.';
      }
    }

    // -------------------------------------------------------------
    // Branch B: CONFIRMATION OF TRAVEL ENQUIRY
    // -------------------------------------------------------------
    else if (
      (intent === INTENTS.CONFIRMATION || confirmSubmission === true) &&
      conversation.requiresConfirmation
    ) {
      const inquiry = await submitEnquiryToAdmin(
        conversation.slots,
        conversation.messages,
        effectiveLanguage
      );

      conversation.requiresConfirmation = false;
      conversation.isEnquirySubmitted = true;
      conversation.inquiryId = inquiry._id;
      isEnquirySubmitted = true;
      createdInquiryId = inquiry._id;

      if (effectiveLanguage === 'hi') {
        replyText = `🎉 **धन्यवाद!** आपकी यात्रा पूछताछ सफलतापूर्वक हमारे VIP कंसीयज डेस्क को भेज दी गई है।\n\nहमारे ट्रेवल स्पेशलिस्ट बहुत जल्द आपके दिए गए नंबर **${
          conversation.slots.phone || ''
        }** पर संपर्क करेंगे।\n\nक्या आप हमारे किसी अन्य रिसॉर्ट या सुइट के बारे में जानना चाहते हैं?`;
      } else if (effectiveLanguage === 'hinglish') {
        replyText = `🎉 **Thank you!** Aapki travel enquiry successfully hamare Luxury Concierge Desk ko bhej di gayi hai.\n\nHamare travel executive jald hi aapke contact number **${
          conversation.slots.phone || ''
        }** par personalized itinerary aur quotes ke sath call/WhatsApp karenge! ✨\n\nKya aapko kisi aur resort ya dining ke baare me janna hai?`;
      } else {
        replyText = `🎉 **Thank you!** Your bespoke travel request has been successfully submitted to our Executive Concierge Desk.\n\nOur luxury travel specialist will reach out to you directly at **${
          conversation.slots.phone || ''
        }** shortly with a customized itinerary and pricing. ✨\n\nIs there anything else I can help you with regarding our sanctuaries?`;
      }
    }

    // -------------------------------------------------------------
    // Branch C: CANCELLATION OF ENQUIRY
    // -------------------------------------------------------------
    else if (intent === INTENTS.CANCELLATION && conversation.requiresConfirmation) {
      conversation.requiresConfirmation = false;
      if (effectiveLanguage === 'hi') {
        replyText =
          'कोई बात नहीं! मैंने यह रिक्वेस्ट रद्द कर दी है। आप जब चाहें हमारे विला, ऑफर या सुविधाओं के बारे में पूछ सकते हैं।';
      } else if (effectiveLanguage === 'hinglish') {
        replyText =
          'Koi baat nahi! Request cancel kar di gayi hai. Aap hamare villas, packages ya pricing ke baare me koi bhi sawaal pooch sakte hain.';
      } else {
        replyText =
          'No problem at all. I have cancelled this request. Let me know if you would like to explore our villas, dining, or experiences.';
      }
    }

    // -------------------------------------------------------------
    // Branch D: BOOKING / CUSTOM PACKAGE SLOT FILLING
    // -------------------------------------------------------------
    else if (
      intent === INTENTS.BOOKING_REQUEST ||
      intent === INTENTS.CUSTOM_PACKAGE_REQUEST ||
      (conversation.slots?.destination && !conversation.isEnquirySubmitted)
    ) {
      const updatedSlots = extractSlots(cleanMessage, conversation.slots || {});
      conversation.slots = updatedSlots;

      const nextPrompt = getNextSlotPrompt(updatedSlots, effectiveLanguage);

      if (nextPrompt) {
        replyText = nextPrompt;
      } else {
        // All core slots collected -> Build confirmation summary
        const confirmationData = buildConfirmationSummary(updatedSlots, effectiveLanguage);
        replyText = confirmationData.summaryText;
        requiresConfirmation = true;
        conversation.requiresConfirmation = true;
      }
    }

    // -------------------------------------------------------------
    // Branch E: GREETING (Fast Path)
    // -------------------------------------------------------------
    else if (intent === INTENTS.GREETING) {
      if (effectiveLanguage === 'hi') {
        replyText =
          'नमस्ते! 🏨🌴 कंट्री हॉलीडेज होटल्स एंड रिसॉर्ट्स में आपका स्वागत है। मैं आपका AI ट्रेवल कंसीयज हूँ। मैं आज आपकी लक्ज़री स्टे, विला या पैकेज प्लानिंग में क्या मदद कर सकता हूँ?';
      } else if (effectiveLanguage === 'hinglish') {
        replyText =
          'Namaste & Welcome to Country Holidays Hotels & Resorts! 🏨✨ Main aapka AI Travel Concierge hoon. Bataiye, aapke liye kaunsi luxury destination, villa ya holiday package plan karein?';
      } else {
        replyText =
          'Namaste & Welcome to **Country Holidays Hotels & Resorts** 🏨🌴\n\nI am your digital luxury concierge. How may I assist you with your luxury stay, cliffside villas, dining, or bespoke holiday packages today?';
      }
    }

    // -------------------------------------------------------------
    // Branch F: GENERAL AI CONVERSATION (Direct LLM, no heavy RAG)
    // -------------------------------------------------------------
    else if (intent === INTENTS.GENERAL_CONVERSATION) {
      try {
        const response = await gemini.generateResponse({
          prompt: cleanMessage,
          systemPrompt:
            'You are a friendly and intelligent luxury resort assistant. Answer the user clearly, concisely, and helpfully in 2-3 sentences. Do not use raw asterisks.',
          conversationHistory: conversation.messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          temperature: 0.3,
          maxTokens: 350,
        });
        replyText = response.text;
      } catch (err) {
        replyText =
          'I am happy to assist you. Could you please specify your question or travel requirements?';
      }
    }

    // -------------------------------------------------------------
    // Branch G: WEBSITE, PACKAGES, POLICIES & DESTINATIONS (RAG Grounding)
    // -------------------------------------------------------------
    else {
      const groundedResult = await generateGroundedResponse({
        message: cleanMessage,
        conversationHistory: conversation.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        language: effectiveLanguage,
        intent,
      });
      replyText = groundedResult.text;
    }

    // Clean any unwanted raw asterisks from reply
    const finalReplyText = (replyText || '').replace(/\*\*\*/g, '').trim();

    // 4. Update Conversation Memory
    conversation.messages.push({
      role: 'user',
      content: cleanMessage,
      intent,
      timestamp: new Date(),
    });

    conversation.messages.push({
      role: 'assistant',
      content: finalReplyText,
      intent,
      timestamp: new Date(),
    });

    // Keep memory compact (max 20 turns)
    if (conversation.messages.length > 20) {
      conversation.messages = conversation.messages.slice(-20);
    }

    conversation.lastActive = new Date();
    await conversation.save();

    return res.status(200).json({
      success: true,
      conversationId,
      message: finalReplyText,
      intent,
      language: effectiveLanguage,
      requiresConfirmation,
      slots: conversation.slots || {},
      isEnquirySubmitted,
      inquiryId: createdInquiryId,
    });
  } catch (error) {
    console.error('Error in handleChat controller:', error);
    return res.status(500).json({
      success: false,
      message:
        "Sorry, I'm having trouble responding right now. Please try again or connect directly with our 24/7 concierge.",
    });
  }
};

/**
 * @desc    Get Chatbot Health / Info
 * @route   GET /api/v1/chat/info or GET /api/chat/info
 * @access  Public
 */
const getChatInfo = async (req, res) => {
  return res.status(200).json({
    success: true,
    status: 'online',
    provider: 'Gemini AI Provider',
    features: ['RAG Knowledge Base', 'Multi-turn Slot Filling', 'Multilingual Hindi/English/Hinglish'],
  });
};

module.exports = {
  handleChat,
  getChatInfo,
};
