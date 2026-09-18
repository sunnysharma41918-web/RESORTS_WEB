const Inquiry = require('../../models/Inquiry');

/**
 * Known destinations in India / International for travel heuristic extraction
 */
const KNOWN_DESTINATIONS = [
  'kashmir', 'manali', 'goa', 'shimla', 'kerala', 'ooty', 'munnar',
  'udaipur', 'jaipur', 'rishikesh', 'mussoorie', 'ladakh', 'darjeeling',
  'andaman', 'bali', 'maldives', 'dubai', 'switzerland', 'paris',
  'jim corbett', 'coorg', 'lonavala', 'mount abu', 'gangtok'
];

/**
 * Extract slots from text
 */
function extractSlots(message = '', currentSlots = {}) {
  const clean = message.trim();
  const lower = clean.toLowerCase();
  const updatedSlots = { ...currentSlots };

  // 1. Destination Extraction
  if (!updatedSlots.destination) {
    for (const dest of KNOWN_DESTINATIONS) {
      if (lower.includes(dest)) {
        updatedSlots.destination = dest.charAt(0).toUpperCase() + dest.slice(1);
        break;
      }
    }
  }

  // 2. Travellers / Guest Count Extraction
  if (!updatedSlots.travellers) {
    const peopleMatch = lower.match(/(\d+)\s*(people|person|persons|guests|adults|pax|log|members|members)/i) ||
      lower.match(/family of\s*(\d+)/i) ||
      lower.match(/hum\s*(\d+)\s*log/i);
    if (peopleMatch) {
      updatedSlots.travellers = `${peopleMatch[1]} Travellers`;
    } else if (/\b(couple|2 people|do log|two people|husband and wife)\b/i.test(lower)) {
      updatedSlots.travellers = '2 Travellers (Couple)';
    } else if (/\bsolo\b/i.test(lower)) {
      updatedSlots.travellers = '1 Traveller (Solo)';
    }
  }

  // 3. Travel Date / Month Extraction
  if (!updatedSlots.travelDate) {
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june', 'july',
      'august', 'september', 'october', 'november', 'december',
      'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
    ];
    for (const m of months) {
      if (lower.includes(m)) {
        updatedSlots.travelDate = m.charAt(0).toUpperCase() + m.slice(1);
        break;
      }
    }
    if (!updatedSlots.travelDate) {
      if (/next week/i.test(lower)) updatedSlots.travelDate = 'Next Week';
      else if (/next month/i.test(lower)) updatedSlots.travelDate = 'Next Month';
      else if (/diwali|christmas|new year|summer|weekend/i.test(lower)) {
        const seasonMatch = lower.match(/(diwali|christmas|new year|summer|weekend)/i);
        if (seasonMatch) updatedSlots.travelDate = seasonMatch[0].toUpperCase();
      }
    }
  }

  // 4. Phone / WhatsApp Number Extraction
  if (!updatedSlots.phone) {
    const phoneMatch = clean.match(/(?:\+91|91|0)?[6-9]\d{9}/);
    if (phoneMatch) {
      updatedSlots.phone = phoneMatch[0];
    }
  }

  // 5. Email Extraction
  if (!updatedSlots.email) {
    const emailMatch = clean.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      updatedSlots.email = emailMatch[0];
    }
  }

  // 6. Guest Name Extraction (if user replies with "My name is X" or "I am X" or "X here")
  if (!updatedSlots.guestName) {
    const nameMatch = clean.match(/(?:my name is|i am|naam hai|name:?)\s+([A-Za-z\s]{2,25})/i);
    if (nameMatch) {
      updatedSlots.guestName = nameMatch[1].trim();
    }
  }

  // 7. Budget extraction
  if (!updatedSlots.budget) {
    const budgetMatch = clean.match(/(?:budget|around|approx|upto)\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,kK\s]*)/i) ||
      clean.match(/(\d+k|\d+,\d{3}|\d{5,7})\s*(?:budget|inr|rs)/i);
    if (budgetMatch) {
      updatedSlots.budget = `₹${budgetMatch[1].trim()}`;
    }
  }

  return updatedSlots;
}

/**
 * Determines next conversational prompt for slot filling based on missing slots and language
 */
function getNextSlotPrompt(slots = {}, lang = 'en') {
  if (!slots.destination) {
    if (lang === 'hi') return 'आप किस जगह (डेस्टिनेशन) की यात्रा प्लान करना चाहते हैं? (उदा: कश्मीर, मनाली, गोवा)';
    if (lang === 'hinglish') return 'Aap kaunsi destination ya jagah travel karna chahte hain? (e.g. Kashmir, Manali, Goa)';
    return 'Which luxury destination would you like to explore? (e.g. Kashmir, Manali, Goa, Kerala)';
  }

  if (!slots.travellers) {
    if (lang === 'hi') return `${slots.destination} के लिए कितने लोग यात्रा करेंगे?`;
    if (lang === 'hinglish') return `${slots.destination} ke liye kitne log travel karenge?`;
    return `How many guests will be travelling to ${slots.destination}?`;
  }

  if (!slots.travelDate) {
    if (lang === 'hi') return 'आप किस महीने या तारीख पर यात्रा करने की योजना बना रहे हैं?';
    if (lang === 'hinglish') return 'Aap kis month ya tentative date par travel plan kar rahe hain?';
    return 'What are your tentative travel dates or preferred month?';
  }

  if (!slots.phone) {
    if (lang === 'hi') return 'हमारे ट्रेवल कंसीयज से कस्टम इटिनरेरी पाने के लिए कृपया अपना फोन या WhatsApp नंबर बताएं:';
    if (lang === 'hinglish') return 'Bespoke package details aur priority quote ke liye kripya apna Phone ya WhatsApp number share karein:';
    return 'Please share your contact Phone or WhatsApp number so our VIP concierge can curate your itinerary:';
  }

  return null; // All core slots collected!
}

/**
 * Builds user confirmation summary card before final submission to Admin CRM
 */
function buildConfirmationSummary(slots = {}, lang = 'en') {
  const dest = slots.destination || 'Luxury Sanctuary Holiday';
  const travellers = slots.travellers || '2 Travellers';
  const dates = slots.travelDate || 'Flexible / Upcoming';
  const phone = slots.phone || 'To be shared';
  const name = slots.guestName || 'Guest';

  if (lang === 'hi') {
    return {
      summaryText: `यहाँ आपकी पूछताछ का सारांश है:\n\n📍 **डेस्टिनेशन**: ${dest}\n👥 **यात्री**: ${travellers}\n📅 **तारीख/महीना**: ${dates}\n📞 **संपर्क**: ${phone}\n\nक्या आप चाहते हैं कि मैं यह रिक्वेस्ट हमारी ट्रेवल टीम को भेज दूँ?`,
      requiresConfirmation: true,
    };
  }

  if (lang === 'hinglish') {
    return {
      summaryText: `Yeh raha aapki trip inquiry ka summary:\n\n📍 **Destination**: ${dest}\n👥 **Travellers**: ${travellers}\n📅 **Travel Date**: ${dates}\n📞 **Contact**: ${phone}\n\nKya main yeh request hamari luxury concierge team ko forward kar doon?`,
      requiresConfirmation: true,
    };
  }

  return {
    summaryText: `Here is a summary of your bespoke travel inquiry:\n\n📍 **Destination**: ${dest}\n👥 **Travellers**: ${travellers}\n📅 **Travel Dates**: ${dates}\n📞 **Contact**: ${phone}\n\nWould you like me to send this request to our luxury concierge team?`,
    requiresConfirmation: true,
  };
}

/**
 * Submits confirmed inquiry to MongoDB Inquiry collection
 */
async function submitEnquiryToAdmin(slots = {}, conversationMessages = [], lang = 'en') {
  const summaryLines = conversationMessages
    .slice(-8)
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join('\n');

  const inquiry = await Inquiry.create({
    guestName: slots.guestName || 'Chatbot Guest Lead',
    email: slots.email || '',
    phone: slots.phone || '+91 Concierge Chat',
    property: slots.destination ? `${slots.destination} Holiday Package` : 'Bespoke Luxury Holiday',
    budget: slots.budget || 'Custom Quote',
    city: slots.destination || 'India',
    guestCount: slots.travellers || '',
    eventDate: slots.travelDate || '',
    preferredContact: 'WhatsApp Priority',
    message: slots.requirements || `AI Chatbot Inquiry for ${slots.destination || 'Luxury Stays'}.`,
    source: 'chatbot',
    destination: slots.destination || '',
    travellers: slots.travellers || '',
    language: lang,
    conversationSummary: summaryLines,
    status: 'new',
  });

  return inquiry;
}

module.exports = {
  extractSlots,
  getNextSlotPrompt,
  buildConfirmationSummary,
  submitEnquiryToAdmin,
};
