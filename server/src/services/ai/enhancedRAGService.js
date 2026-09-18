const Accommodation = require('../../models/Accommodation');
const Offer = require('../../models/Offer');
const Setting = require('../../models/Setting');
const VectorStore = require('./VectorStore');
const GeminiProvider = require('./GeminiProvider');

const gemini = new GeminiProvider();

/**
 * Retrieves live public website data from MongoDB collections.
 * Never exposes passwords, internal secrets, or draft items.
 */
async function retrieveStructuredWebsiteData() {
  try {
    const [accommodations, offers, setting] = await Promise.all([
      Accommodation.find({}).select('name category specs description price tier').lean(),
      Offer.find({}).select('title tag badge description link').lean(),
      Setting.findOne().select('resortName phone whatsapp email address hours').lean(),
    ]);

    const resortName = setting?.resortName || 'Country Holidays Hotels & Resorts';
    const contact = {
      phone: setting?.phone || '+91 98765 43210',
      whatsapp: setting?.whatsapp || '+919876543210',
      email: setting?.email || 'info@countryholidaysresorts.com',
      address: setting?.address || '111, Rajiv Gandhi Salai, OMR, Chennai, Tamil Nadu 600041',
      hours: setting?.hours || '24/7 Global Luxury Concierge',
    };

    return {
      resortName,
      contact,
      accommodations: accommodations || [],
      offers: offers || [],
    };
  } catch (err) {
    console.error('Error fetching structured website data:', err);
    return {
      resortName: 'Country Holidays Hotels & Resorts',
      contact: {
        phone: '+91 98765 43210',
        whatsapp: '+919876543210',
        email: 'info@countryholidaysresorts.com',
        address: '111, Rajiv Gandhi Salai, OMR, Chennai, Tamil Nadu 600041',
        hours: '24/7 Global Luxury Concierge',
      },
      accommodations: [],
      offers: [],
    };
  }
}

/**
 * Builds grounded RAG context combining structured database data and vector chunks.
 */
async function buildRAGContext(userMessage, queryEmbedding = null) {
  const structuredData = await retrieveStructuredWebsiteData();

  // 1. Vector Search for relevant Knowledge Base chunks
  let retrievedChunks = [];
  try {
    let embedding = queryEmbedding;
    if (!embedding) {
      embedding = await gemini.generateEmbeddings(userMessage);
    }

    retrievedChunks = await VectorStore.search({
      queryEmbedding: embedding,
      queryText: userMessage,
      topK: 4,
      scoreThreshold: 0.28,
      filter: { 'metadata.isActive': true, 'metadata.visibility': 'public' },
    });
  } catch (vectorErr) {
    console.warn('Vector search warning:', vectorErr.message);
  }

  // 2. Format Structured Data
  const accText = structuredData.accommodations
    .map(
      (a) =>
        `- ${a.name} (${a.category}): Price ${a.price}. Specs: ${a.specs?.join(', ')}. Description: ${a.description}`
    )
    .join('\n');

  const offersText = structuredData.offers
    .map((o) => `- ${o.title}: ${o.badge || o.tag || ''} — ${o.description}`)
    .join('\n');

  // 3. Format Vector Chunks
  const chunksText = retrievedChunks
    .map((c, i) => `[Document Snippet ${i + 1} (${c.metadata?.title || 'Knowledge Base'})]:\n${c.content}`)
    .join('\n\n');

  return {
    resortName: structuredData.resortName,
    contact: structuredData.contact,
    structuredText: `### LIVE ACCOMMODATIONS & VILLAS:\n${accText || 'Luxury Cliffside, Alpine Chalets, and Botanical Suites.'}\n\n### LIVE PACKAGES & OFFERS:\n${offersText || 'Curated celebration packages, honeymoon retreats, and bespoke itineraries.'}\n\n### OFFICIAL CONTACT DESK:\n- Phone: ${structuredData.contact.phone}\n- WhatsApp: ${structuredData.contact.whatsapp}\n- Email: ${structuredData.contact.email}\n- Address: ${structuredData.contact.address}\n- Hours: ${structuredData.contact.hours}`,
    chunksText,
    hasChunks: retrievedChunks.length > 0,
  };
}

/**
 * Master System Prompt for CHHR AI Travel Assistant
 */
function buildMasterSystemPrompt(ragContext, userLanguage = 'en') {
  return `You are the official AI Travel Assistant & Luxury Concierge for **${ragContext.resortName}**.

# CORE PRINCIPLES:
1. You are warm, professional, sophisticated, and helpful.
2. Provide fast, concise, and clear answers.
3. For website & business questions, ONLY use verified information provided in the REFERENCE CONTEXT.
4. NEVER invent prices, availability, or policies.
5. If information is not in the context, state: "I don't have confirmed information about that right now, but I would be delighted to connect you with our travel team."
6. Respond naturally in the user's preferred language (English, Hindi, or Hinglish).
7. Format with clean sentences and clean bullet points without unnecessary asterisks or raw markdown symbols.

# REFERENCE CONTEXT (OFFICIAL TRAVEL DATA):
${ragContext.structuredText}

${ragContext.hasChunks ? `### APPROVED KNOWLEDGE BASE CONTENT:\n${ragContext.chunksText}` : ''}
`;
}

/**
 * Executes Grounded Generation with Gemini
 */
async function generateGroundedResponse({
  message,
  conversationHistory = [],
  language = 'en',
  intent = 'WEBSITE_INFORMATION',
}) {
  // 1. Build RAG Context
  const ragContext = await buildRAGContext(message);

  // 2. Build Master System Prompt
  const systemPrompt = buildMasterSystemPrompt(ragContext, language);

  try {
    const result = await gemini.generateResponse({
      prompt: message,
      systemPrompt,
      conversationHistory,
      temperature: 0.2,
      maxTokens: 350,
    });

    // Clean any unwanted raw asterisk clusters
    const cleanText = (result.text || '').replace(/\*\*\*/g, '').trim();

    return {
      text: cleanText,
      grounded: true,
      hasKnowledgeBaseSnippets: ragContext.hasChunks,
    };
  } catch (error) {
    console.error('Gemini Grounded Response error:', error.message);
    // Fallback response if Gemini fails
    if (language === 'hi') {
      return {
        text: `नमस्ते! मैं ${ragContext.resortName} का डिजिटल कंसीयज हूँ। हमारी लक्ज़री विला, पैकेज और बुकिंग से जुड़ी जानकारी के लिए आप सीधे हमारे 24/7 हेल्पलाइन ${ragContext.contact.phone} या WhatsApp ${ragContext.contact.whatsapp} पर भी संपर्क कर सकते हैं।`,
        grounded: false,
      };
    }
    if (language === 'hinglish') {
      return {
        text: `Namaste! Main ${ragContext.resortName} ka AI Concierge hoon. Hamare luxury stays, packages aur bookings ke liye aap direct hamari team se WhatsApp (${ragContext.contact.whatsapp}) ya Call (${ragContext.contact.phone}) par connect kar sakte hain.`,
        grounded: false,
      };
    }
    return {
      text: `Welcome to ${ragContext.resortName}. For instant assistance regarding our luxury villas, bespoke packages, or reservations, you may also connect directly with our 24/7 concierge at ${ragContext.contact.phone} or WhatsApp at ${ragContext.contact.whatsapp}.`,
      grounded: false,
    };
  }
}

module.exports = {
  retrieveStructuredWebsiteData,
  buildRAGContext,
  buildMasterSystemPrompt,
  generateGroundedResponse,
};
