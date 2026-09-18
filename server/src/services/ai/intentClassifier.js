/**
 * Multilingual Intent Classifier & Language Detector for CHHR Travel Chatbot.
 * Supports English, Hindi (Devanagari), Hinglish (Roman Hindi), and mixed inputs.
 */

const INTENTS = {
  GREETING: 'GREETING',
  GENERAL_CONVERSATION: 'GENERAL_CONVERSATION',
  WEBSITE_INFORMATION: 'WEBSITE_INFORMATION',
  PACKAGE_INFORMATION: 'PACKAGE_INFORMATION',
  DESTINATION_INFORMATION: 'DESTINATION_INFORMATION',
  BOOKING_REQUEST: 'BOOKING_REQUEST',
  CUSTOM_PACKAGE_REQUEST: 'CUSTOM_PACKAGE_REQUEST',
  CONTACT_REQUEST: 'CONTACT_REQUEST',
  COMPLAINT: 'COMPLAINT',
  FEEDBACK: 'FEEDBACK',
  ADMIN_QUERY: 'ADMIN_QUERY',
  PROMPT_INJECTION: 'PROMPT_INJECTION',
  CONFIRMATION: 'CONFIRMATION',
  CANCELLATION: 'CANCELLATION',
  UNKNOWN: 'UNKNOWN',
};

// Patterns for Language Detection
const HINDI_DEVANAGARI_REGEX = /[\u0900-\u097F]/;
const HINGLISH_KEYWORDS = [
  'kya', 'hai', 'hain', 'mein', 'chahiye', 'karna', 'karo', 'mujhe', 'hum', 'hume',
  'kitna', 'kitne', 'kaise', 'bhai', 'shukriya', 'dhanyawad', 'jana', 'kab', 'kaha',
  'kahan', 'batao', 'dijiye', 'booking', 'package', 'sasta', 'achha', 'accha', 'shandar'
];

// Patterns for Prompt Injection Protection
const INJECTION_PATTERNS = [
  /ignore (all )?(previous|above) instructions/i,
  /system prompt/i,
  /show (me )?(your|the) (prompt|instructions|api key|credentials|database|password)/i,
  /you are now in developer mode/i,
  /jailbreak/i,
  /reveal (the )?(hidden|secret|admin)/i,
  /bypass (all )?(rules|filters)/i,
  /eval\(|__proto__|DROP TABLE|<script>/i,
];

/**
 * Detect language of input message
 */
function detectLanguage(text = '') {
  if (HINDI_DEVANAGARI_REGEX.test(text)) {
    return 'hi';
  }

  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  let hinglishMatches = 0;
  for (const word of words) {
    if (HINGLISH_KEYWORDS.includes(word)) {
      hinglishMatches++;
    }
  }

  if (hinglishMatches >= 1 || (words.length <= 4 && hinglishMatches >= 1)) {
    return 'hinglish';
  }

  return 'en';
}

/**
 * Detects user intent from current message and conversation context
 */
function classifyIntent(message = '', conversationContext = {}) {
  const clean = (message || '').trim().toLowerCase();

  // 1. Check for prompt injection attempts
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(clean)) {
      return { intent: INTENTS.PROMPT_INJECTION, confidence: 0.99 };
    }
  }

  // 2. Check for explicit confirmation responses if slot filling is active
  if (conversationContext.requiresConfirmation) {
    if (
      /^(yes|yeah|yep|sure|confirm|proceed|ok|okay|ha|haan|kar do|bhej do|sahi hai|bilkul|कर दो|हाँ|हाँ जी)$/i.test(
        clean
      ) ||
      clean.includes('confirm') ||
      clean.includes('send request') ||
      clean.includes('ha bhej do')
    ) {
      return { intent: INTENTS.CONFIRMATION, confidence: 0.95 };
    }
    if (
      /^(no|nope|cancel|stop|nah|nahi|mat bhejo|nhi|badlo|नहीं|रद्द करो)$/i.test(clean) ||
      clean.includes('cancel') ||
      clean.includes('edit')
    ) {
      return { intent: INTENTS.CANCELLATION, confidence: 0.95 };
    }
  }

  // 3. Simple Greetings
  if (
    /^(hi|hello|hey|namaste|namaskar|salaam|good morning|good evening|good afternoon|hola|kem cho|pranam|नमस्ते|नमस्कार|हेलो|हाय)\b/i.test(
      clean
    ) &&
    !/(package|book|booking|cost|price|suite|villa|destination)/i.test(clean)
  ) {
    return { intent: INTENTS.GREETING, confidence: 0.95 };
  }

  // 4. Booking & Custom Package Enquiry Requests
  if (
    /(book|reserve|booking|inquiry|enquiry|chahiye|lena hai|package lena|booking karni|mujhe jana|we want to visit|trip plan|plan a trip|plan trip|बुकिंग|बुक करना)/i.test(
      clean
    ) &&
    !/(how to book|booking policy|cancellation)/i.test(clean)
  ) {
    if (/(custom|tailor|corporate|wedding|group|badi family)/i.test(clean)) {
      return { intent: INTENTS.CUSTOM_PACKAGE_REQUEST, confidence: 0.9 };
    }
    return { intent: INTENTS.BOOKING_REQUEST, confidence: 0.9 };
  }

  // 5. Contact Requests
  if (
    /(contact|phone|number|whatsapp|email|address|call|reach you|customer care|helpline|संपर्क|फोन नंबर|कॉल)/i.test(
      clean
    )
  ) {
    return { intent: INTENTS.CONTACT_REQUEST, confidence: 0.9 };
  }

  // 6. Specific Package queries
  if (
    /(package|packages|deal|offer|discount|price|cost|tariff|rate|kitne ka|kitna price|पैकेज|ऑफर|कीमत)/i.test(
      clean
    )
  ) {
    return { intent: INTENTS.PACKAGE_INFORMATION, confidence: 0.85 };
  }

  // 7. Destination queries
  if (
    /(destination|destinations|kashmir|manali|goa|shimla|kerala|ooty|munnar|udaipur|jaipur|places to visit|ghumne ki jagah|जगह|डेस्टिनेशन)/i.test(
      clean
    )
  ) {
    return { intent: INTENTS.DESTINATION_INFORMATION, confidence: 0.85 };
  }

  // 8. Website, Policies & Amenities queries
  if (
    /(resort|hotel|villa|chalet|suite|pool|checkin|checkout|check-in|check-out|policy|cancellation|refund|food|dining|restaurant|spa|wi-fi|wifi|parking|activities|country holidays)/i.test(
      clean
    )
  ) {
    return { intent: INTENTS.WEBSITE_INFORMATION, confidence: 0.85 };
  }

  // 9. Complaints / Feedback
  if (/(complaint|issue|problem|bad|refund not received|शिकायत)/i.test(clean)) {
    return { intent: INTENTS.COMPLAINT, confidence: 0.85 };
  }

  // 10. General AI queries (Coding, Math, Facts, General World)
  if (
    /(what is|who is|explain|python|javascript|sql|joke|story|capital of|tell me about|weather in|how to code|ai|artificial intelligence)/i.test(
      clean
    )
  ) {
    return { intent: INTENTS.GENERAL_CONVERSATION, confidence: 0.8 };
  }

  return { intent: INTENTS.UNKNOWN, confidence: 0.5 };
}

module.exports = {
  INTENTS,
  detectLanguage,
  classifyIntent,
};
