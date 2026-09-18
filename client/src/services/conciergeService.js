import api from './api';
import { CONTACT_INFO } from '../data/contact';

const FALLBACK_STATIC_ANSWERS = [
  {
    keywords: [
      'aur bhai',
      'aur btao',
      'kya scene',
      'kya chal rha',
      'kya chal raha',
      'ram ram',
      'radhe radhe',
      'bhai suno',
      'arre bhai',
      'kay haal',
      'kya haal',
      'kya hal',
      'kaise ho',
      'how are you',
      'aur batao',
      'sab badhiya'
    ],
    reply:
      'Haan bhai! Sab ekdum first-class aur shandaar hai! 😊 Main Country Holidays Hotels & Resorts ka aapka **Personal Travel & Luxury Resort Concierge** hoon 🏨🌴✈️\n\nBatao bhai, kya scene hai aaj ka? Koi mast vacation, weekend escape ya honeymoon trip plan karni hai? Hamare cliffside plunge pool villas aur luxury dining ekdum ready hain!'
  },
  {
    keywords: ['who are you', 'aap kaun ho', 'tum kaun ho', 'what can you do'],
    reply:
      'Main Country Holidays Hotels & Resorts ka official **AI Personal Travel & Resort Concierge** hoon 🏨✨\n\nMain aapki luxury vacations, suite selection, dining reservations, bespoke packages, travel itineraries aur check-in details plan karne me 24/7 madad karta hoon.'
  },
  {
    keywords: ['free me', 'free room', 'discount do', 'sasta', 'kam karo'],
    reply:
      'Bhai, free me to sirf hamari taaza pahaadi hawa aur shaandar nazare milte hain! 🏔️✨😉\n\nLekin fikar mat kijiye — hamare luxury packages me world-class hospitality, private plunge pool aur sukoon 100% complimentary hai! Special deals ke liye hamari **Offers** page ya direct WhatsApp desk check karein.'
  },
  {
    keywords: ['bore ho', 'bored', 'mood kharab'],
    reply:
      'Zindagi boring nahi hoti dost, bas ek luxury vacation ki kami hoti hai! 🌴🍹\n\nLaptop band kijiye, bag pack kijiye aur hamare cliffside infinity pool me jump lagaiye. Bataiye, aapko emerald cliff views pasand hain ya pine forest chalets?'
  },
  {
    keywords: ['stress', 'thak gaya', 'need vacation', 'chhutti', 'boss'],
    reply:
      'Doctor\'s Diagnosis: **Severe Vitamin \'Resort\' Deficiency!** 🩺🌴🏖️\n\nIlaaj: 3 din **The Monolith Glass Chalet** me stargazing aur geothermal hot spring bath! Boss ko bol dijiye — "Mental peace emergency hai, resort jaana zaroori hai!" 😉\n\nDates bataiye, booking hum abhi shuru karte hain?'
  },
  {
    keywords: ['tell me a joke', 'joke sunao', 'chutkula', 'funny'],
    reply:
      'Ek traveler ne pucha: "Swarg ka rasta kahan se jaata hai?" 😄\n\nHumne kaha: "Seedha Country Holidays Resorts ke cantilevered plunge pool me sunset ke waqt floating breakfast order kijiye — swarg ka direct live experience mil jayega!" 🏨✨🥂'
  },
  {
    keywords: ['chai', 'tea', 'coffee'],
    reply:
      'Chai to hamare pahaadi cliffside deck par kadak adrak-elaichi wali milegi, wo bhi sunset ke shaandar nazare ke saath! ☕🌅 Saath me farm-fresh snacks aur bespoke chef tasting bhi arrange karein?'
  },
  {
    keywords: ['girlfriend', 'wife', 'romantic', 'partner', 'biwi'],
    reply:
      'Arre wah! Romantic getaway planning on point! ❤️🌹\n\nUnko impress karne ke liye hamara **Celestial Honeymoon Stargazer Package** ya **The Forest Pool Villa** best hai — private candlelight cliffside dinner aur heated cedar tub ke saath! Date bataiye, special romantic setup hum ready kar denge!'
  },
  {
    keywords: ['what is a resort', 'what is resort', 'what is a hotel'],
    reply:
      'A resort is a full-service luxury hospitality destination offering world-class accommodations, fine dining, wellness spas, and curated experiences in scenic natural settings.'
  },
  {
    keywords: ['what is infinity pool', 'infinity pool kya hota'],
    reply:
      'An infinity pool is a swimming pool where water flows over one or more edges, producing a visual effect of water extending into the landscape. At Country Holidays Hotels & Resorts, our suites feature private cantilevered cliffside infinity plunge pools.'
  },
  {
    keywords: ['what is spa', 'spa kya hota'],
    reply:
      'A spa is a dedicated sanctuary offering health, relaxation, and rejuvenation treatments such as Ayurvedic massages, herbal body therapies, and hydrotherapy.'
  },
  {
    keywords: ['forest pool', 'pool villa', 'cliff villa'],
    reply:
      '**The Forest Pool Villa** (₹45,000 / Night according to website listing):\n• Features a private infinity plunge pool cantilevered over emerald coastal cliffs\n• Floor-to-ceiling glass pavilions, private sundeck, and outdoor stone soaking tub\n• Accommodates 2–4 guests (1,990 SQ FT).'
  },
  {
    keywords: ['monolith', 'chalet', 'glass', 'skyroof'],
    reply:
      '**The Monolith Glass Chalet** (₹55,000 / Night according to website listing):\n• Panoramic glass sky-roof for celestial stargazing\n• Heated timber floors and outdoor cedarwood hot tub overlooking pine peaks\n• Accommodates 4–6 guests (2,580 SQ FT).'
  },
  {
    keywords: ['botanical', 'sanctuary', 'spice', 'zen'],
    reply:
      '**Botanical Sanctuary Suite** (₹35,000 / Night according to website listing):\n• Surrounded by ancient spice trees with a private zen water courtyard\n• Teak finishings and open-air botanical garden bath\n• Accommodates 2 guests (1,500 SQ FT).'
  },
  {
    keywords: ['room', 'suite', 'villa', 'stay', 'accommodation', 'kamre', 'कमरे', 'कमरा', 'विला'],
    reply:
      'We offer three distinctive luxury living experiences:\n\n• **The Forest Pool Villa** — ₹45,000 / Night (Private Pool, 2–4 Guests)\n• **The Monolith Glass Chalet** — ₹55,000 / Night (Skyroof Stargazing, 4–6 Guests)\n• **Botanical Sanctuary Suite** — ₹35,000 / Night (Zen Courtyard, 2 Guests)\n\nWhich setting would you like to explore?'
  },
  {
    keywords: ['available', 'availability', 'tomorrow', 'tonight', 'vacant', 'उपलब्ध', 'khali hai'],
    reply:
      "I can't confirm live room availability from here. Please use our booking page or contact our resort team directly on WhatsApp (+91 98765 43210) to check real-time availability."
  },
  {
    keywords: ['check in', 'check out', 'checkin', 'checkout', 'timing', 'time', 'समय'],
    reply:
      'Resort Timings:\n• **Check-in**: 14:00 (2:00 PM)\n• **Check-out**: 11:00 (11:00 AM)\n\nEarly check-in and late check-out are subject to room availability upon arrival.'
  },
  {
    keywords: ['dining', 'food', 'restaurant', 'breakfast', 'dinner', 'lunch', 'menu', 'खाना', 'भोजन'],
    reply:
      'Our dining venues include:\n• **The Cliffside Pavilion & Hearth** — Coastal & Pan-Asian gastronomy (Breakfast: 07:00–10:30, Lunch: 12:30–15:30, Dinner: 19:30–23:00)\n• **Subterranean Sommelier Wine Vault** — Biodynamic vintages & tastings\n• **In-Villa Dining** — 24-hour à la carte service.'
  },
  {
    keywords: ['cancel', 'refund', 'रद्द'],
    reply:
      '**Cancellation Policy**:\nComplimentary cancellation is available up to 72 hours prior to scheduled arrival date. Cancellations within 72 hours are subject to a one-night tariff fee.'
  },
  {
    keywords: ['child', 'kid', 'family', 'बच्चे'],
    reply:
      '**Child Policy**:\nChildren aged 0–5 stay complimentary using existing bedding. Extra beds are available for guests aged 6+. For families, we recommend **The Monolith Glass Chalet** (accommodates 4–6 guests).'
  },
  {
    keywords: ['pet', 'dog', 'cat', 'पालतू'],
    reply:
      '**Pet Policy**:\nPet-friendly accommodations are available in selected ground-level **Botanical Sanctuary Suites** upon prior request.'
  },
  {
    keywords: ['monsoon', 'wellness retreat'],
    reply:
      '**Bespoke Monsoon Wellness Retreat** (₹1,20,000 / Couple for 5 Nights):\n• 5-day rejuvenating Ayurvedic wellness retreat with daily herbal therapies\n• Sattvic detox dining, daily doctor consultation, and private yoga sessions\n• Includes 2 specialized spa therapies daily and complimentary airport transfers.'
  },
  {
    keywords: ['offer', 'package', 'wedding', 'honeymoon', 'deal', 'discount', 'शादी', 'पैकेज'],
    reply:
      'Current Featured Packages:\n• **Royal Destination Wedding Package** (20% Royal Privilege) — Lawns, bridal suite upgrade & chef tasting\n• **Corporate Leadership Conclave** (15% Group Tariff) — Boardroom, Starlink & sommelier dinner\n• **Bespoke Monsoon Wellness Retreat** — 5-night Ayurvedic rejuvenation.'
  },
  {
    keywords: ['contact', 'phone', 'email', 'whatsapp', 'address', 'where', 'location', 'पता'],
    reply: `**Contact & Concierge Desk**:\n• **Phone**: ${CONTACT_INFO.phone}\n• **WhatsApp**: ${CONTACT_INFO.whatsapp}\n• **Email**: ${CONTACT_INFO.email}\n• **Address**: ${CONTACT_INFO.address}\n• **Hours**: 24/7 Luxury Concierge Support.`
  }
];

export const conciergeService = {
  /**
   * Send a query to the AI Concierge backend
   */
  async sendMessage({ message, conversationId, language = 'auto', confirmSubmission = false, conversationHistory = [] }) {
    try {
      const response = await api.post('/chat', {
        message,
        conversationId,
        language,
        confirmSubmission,
        conversationHistory,
      });

      if (response && response.success !== undefined) {
        return {
          ...response,
          reply: response.message || response.reply,
        };
      }
      if (response && (response.data || response.message || response.reply)) {
        return {
          success: true,
          conversationId: response.conversationId || conversationId,
          message: response.message || response.reply || response.data?.message,
          reply: response.message || response.reply || response.data?.message,
          intent: response.intent || 'GENERAL_CONVERSATION',
          language: response.language || 'en',
          requiresConfirmation: Boolean(response.requiresConfirmation),
          slots: response.slots || {},
          isEnquirySubmitted: Boolean(response.isEnquirySubmitted),
        };
      }
    } catch (error) {
      console.warn('AI Concierge API offline or busy, using local luxury concierge fallback:', error.message);
    }

    // Client-side instant fallback adhering strictly to prompt rules
    const q = (message || '').toLowerCase().trim();

    if (
      q.includes('system prompt') ||
      q.includes('internal instructions') ||
      q.includes('ignore previous instructions')
    ) {
      return {
        success: true,
        conversationId: conversationId || `local_${Date.now()}`,
        message: "I am the official travel assistant for Country Holidays Hotels & Resorts. I can only assist with resort accommodations, bespoke packages, and travel itineraries.",
        reply: "I am the official travel assistant for Country Holidays Hotels & Resorts. I can only assist with resort accommodations, bespoke packages, and travel itineraries.",
        intent: 'PROMPT_INJECTION',
        source: 'local-safety',
      };
    }

    for (const item of FALLBACK_STATIC_ANSWERS) {
      if (item.keywords.some((kw) => q.includes(kw))) {
        return {
          success: true,
          conversationId: conversationId || `local_${Date.now()}`,
          message: item.reply,
          reply: item.reply,
          intent: 'WEBSITE_INFORMATION',
          source: 'local-rag',
        };
      }
    }

    return {
      success: true,
      conversationId: conversationId || `local_${Date.now()}`,
      message: "I couldn't find confirmed information on that right now. Please connect directly with our 24/7 VIP concierge desk at +91 98765 43210 or email info@countryholidaysresorts.com.",
      reply: "I couldn't find confirmed information on that right now. Please connect directly with our 24/7 VIP concierge desk at +91 98765 43210 or email info@countryholidaysresorts.com.",
      intent: 'UNKNOWN',
      source: 'local-fallback',
    };
  },

  /**
   * Get concierge information and quick suggestions
   */
  async getConciergeInfo() {
    try {
      const response = await api.get('/chat/info');
      if (response && response.data) {
        return response.data;
      }
    } catch (e) {
      // ignore
    }

    return {
      resortName: 'Country Holidays Hotels & Resorts',
      status: 'online',
      suggestions: [
        'Explore Villa Collections',
        'What dining options are available?',
        'Manali package kitne din ka hai?',
        'Do you offer wedding or corporate packages?',
        'What is the cancellation policy?',
      ],
    };
  },
};

export default conciergeService;
