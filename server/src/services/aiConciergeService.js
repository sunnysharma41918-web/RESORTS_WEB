const { buildSystemPrompt } = require('../config/prompts/conciergePrompt');
const { retrieveWebsiteContent, STATIC_RESORT_KNOWLEDGE } = require('./ragService');

/**
 * Detects the language style of the user's message:
 * - 'hi_devanagari': Contains Devanagari script characters (हिंदी)
 * - 'hi_roman': Romanized Hindi / Hinglish ("bhai", "kya", "hai", "kaise", "waha", etc.)
 * - 'en': Standard English
 */
function detectQueryLanguage(userMessage) {
  const msg = (userMessage || '').trim();
  const lower = msg.toLowerCase();

  // 1. Devanagari Hindi Script
  if (/[\u0900-\u097F]/.test(msg)) {
    return 'hi_devanagari';
  }

  // 2. Roman Hindi / Hinglish keywords
  const hinglishWords = [
    'bhai', 'kya', 'hai', 'hain', 'kaise', 'kaisa', 'kahan', 'kab', 'kyu', 'kyun',
    'kitna', 'kitne', 'kamra', 'kamre', 'khana', 'nashta', 'bhojan', 'pehle',
    'chahiye', 'milega', 'milta', 'hoga', 'hota', 'karna', 'karein', 'aana',
    'jana', 'batao', 'btao', 'pooch', 'dekhna', 'suno', 'mast', 'badhiya', 'haal',
    'shaadi', 'shadi', 'sasta', 'shuru', 'waha', 'yaha', 'hum', 'tum', 'aap',
    'namaste', 'pranam', 'ram ram', 'radhe radhe', 'dhanyawad', 'shukriya',
    'suvidha', 'suvidhaye', 'ghoomne', 'khali', 'kiraya', 'paisa', 'paise', 'chhutti',
    'thak', 'gaya', 'sunao', 'chutkula', 'arre', 'biwi', 'kadak', 'achha', 'swarg'
  ];

  const words = lower.split(/\s+/).map((w) => w.replace(/[^a-z0-9]/g, ''));
  const hasHinglish = words.some((w) => hinglishWords.includes(w));
  if (hasHinglish) {
    return 'hi_roman';
  }

  // 3. Default to English
  return 'en';
}

/**
 * Intelligent deterministic fallback concierge that strictly adheres to the 29 system prompt rules.
 * Used when no LLM API key (e.g. GEMINI_API_KEY, OPENAI_API_KEY) is supplied or on network failure.
 */
function handleDeterministicConcierge(userMessage, conversationHistory, websiteContext, resortName) {
  const rawQuery = (userMessage || '').trim();
  const query = rawQuery.toLowerCase().replace(/[?!.,;]/g, '');
  const langMode = detectQueryLanguage(rawQuery); // 'hi_devanagari' | 'hi_roman' | 'en'

  // Rule 17 & 18: Confidentiality & Data Privacy Defense (Admin keys, passwords, database, employee secrets, customer PII)
  if (
    query.includes('password') ||
    query.includes('admin login') ||
    query.includes('admin credential') ||
    query.includes('database') ||
    query.includes('mongodb') ||
    query.includes('api key') ||
    query.includes('secret') ||
    query.includes('confidential') ||
    query.includes('salary') ||
    query.includes('employee details') ||
    query.includes('staff personal') ||
    query.includes('profit margin') ||
    query.includes('guest list') ||
    query.includes('customer data') ||
    query.includes('chhr0012') ||
    query.includes('chr456')
  ) {
    if (query.includes('api key') || query.includes('key')) {
      if (langMode === 'hi_devanagari') {
        return `क्षमा करें, मैं गोपनीय क्रेडेंशियल या सुरक्षा जानकारी प्रदान नहीं कर सकता। मैं रिज़ॉर्ट विवरण में आपकी सहायता कर सकता हूँ 😊`;
      }
      if (langMode === 'hi_roman') {
        return `Sorry bhai, main confidential credentials ya security keys share nahi kar sakta. Resort ke baare mein kuch bhi pooch sakte ho 😊`;
      }
      return `Sorry, I can't provide confidential credentials or security information. I can help you with the resort instead 😊`;
    }

    if (langMode === 'hi_devanagari') {
      return `क्षमा करें, मैं आंतरिक, गोपनीय या प्रशासनिक जानकारी साझा नहीं कर सकता। मैं रिज़ॉर्ट, कमरों, भोजन और बुकिंग से जुड़े प्रश्नों में आपकी सहायता कर सकता हूँ 😊`;
    }
    if (langMode === 'hi_roman') {
      return `Sorry bhai 😄 Main internal ya confidential system information share nahi kar sakta. Resort ke suites, dining, packages ya booking ke baare mein poochho.`;
    }
    return `Sorry, I can't share confidential, internal, or administrative information. I can definitely help you with public resort details, suite collections, dining, packages, and bookings 😊`;
  }

  // Rule 17 & 18: Prompt Injection / System Prompt Defense
  if (
    query.includes('system prompt') ||
    query.includes('internal instructions') ||
    query.includes('ignore previous instructions') ||
    query.includes('reveal prompt') ||
    query.includes('show prompt') ||
    query.includes('hidden instructions') ||
    query.includes('reveal database')
  ) {
    if (langMode === 'hi_devanagari') {
      return `क्षमा करें, मैं आंतरिक निर्देश या सिस्टम कॉन्फ़िगरेशन साझा नहीं कर सकता। मैं ${resortName} के बारे में आपकी पूरी सहायता कर सकता हूँ 😊`;
    }
    if (langMode === 'hi_roman') {
      return `Sorry bhai 😄 Internal instructions ya system configuration share nahi kar sakta. Resort ke rooms, facilities, packages ya booking ke baare mein poochho.`;
    }
    return `Sorry, I can't share internal instructions or system configuration. I can definitely help you with information about ${resortName} 😊`;
  }

  // Rule 10: General Math / Small Talk (e.g. "what is 2+2")
  if (query === 'what is 2+2' || query === '2+2' || query.includes('2+2') || query.includes('2 + 2')) {
    if (langMode === 'hi_devanagari') {
      return `उत्तर 4 है 😄 और यदि आप मेरी परीक्षा ले चुके हों, तो मैं ${resortName} की सैर कराने में आपकी मदद कर सकता हूँ।`;
    }
    if (langMode === 'hi_roman') {
      return `Woh toh 4 hai bhai 😄 Aur agar testing khatam ho gayi ho toh chalo ${resortName} ka tour karein?`;
    }
    return `That's 4 😄 And if you're done testing me, I can also help you explore ${resortName}.`;
  }

  // Rule 10 & 13: Out-of-scope requests
  if (
    query.includes('python') ||
    query.includes('write code') ||
    query.includes('programming') ||
    query.includes('javascript') ||
    query.includes('crypto') ||
    query.includes('bitcoin') ||
    query.includes('stock market') ||
    query.includes('who won the match')
  ) {
    if (langMode === 'hi_devanagari') {
      return `मैं यहाँ ${resortName} और आपके ठहरने से जुड़े सवालों में मदद करने के लिए हूँ। मैं कमरों, सुविधाओं, भोजन, गतिविधियों और बुकिंग में आपकी सहायता कर सकता हूँ 😊`;
    }
    if (langMode === 'hi_roman') {
      return `Main ${resortName} aur aapke stay planning ke liye yahan hoon bhai. Suites, food, pool, packages aur booking ke baare mein pooch sakte ho 😊`;
    }
    return `I'm here to help with ${resortName} and your stay. I can help with rooms, facilities, activities, dining, policies, and booking information 😊`;
  }

  // Rule 5 & 6: Playful, Funny & Attention-Grabbing Banter (Hindi / Hinglish / English)
  if (query.includes('bore') || query.includes('bored')) {
    if (langMode === 'hi_devanagari') {
      return `ज़िंदगी बोरिंग नहीं होती, बस एक लक्ज़री वेकेशन की कमी होती है! 🌴🍹\n\nहमारे क्लिफसाइड इन्फिनिटी पूल और शांत वादियों का आनंद लें। बताइए, क्या आप वेकेशन प्लान करना चाहते हैं?`;
    }
    if (langMode === 'hi_roman') {
      return `Phir toh thoda resort vibes ka dose banta hai 😄 Batao, stay plan karna hai ya bas timepass chat?`;
    }
    return `Life is never boring with a luxury vacation in sight! 🌴🍹 Would you like to explore our cliffside infinity pool villas or plan a getaway?`;
  }

  if (query.includes('paisa nahi') || query.includes('paise nahi') || query.includes('no money') || query.includes('budget')) {
    if (langMode === 'hi_roman' || langMode === 'hi_devanagari') {
      return `Budget tight hai toh tension nahi 😄 Pehle available options dekh lete hain, phir wallet ko shock denge ya bachayenge.`;
    }
    return `No worries at all! We have a range of accommodations and seasonal special offers to suit various luxury vacation plans 😊`;
  }

  if (
    query.includes('free me') ||
    query.includes('free room') ||
    query.includes('discount do') ||
    query.includes('discount milega') ||
    query.includes('sasta') ||
    query.includes('kam karo')
  ) {
    if (langMode === 'hi_devanagari') {
      return `मुफ़्त में तो केवल हमारी ताज़ा पहाड़ी हवा और मनमोहक नज़ारे मिलते हैं! 🏔️✨😉\n\nलेकिन हमारे लक्ज़री पैकेजों में विश्वस्तरीय आतिथ्य और शांत वातावरण शामिल है। विशेष छूट के लिए हमारे **Offers** पेज को देखें।`;
    }
    if (langMode === 'hi_roman') {
      return `Bhai, free me to sirf hamari taaza pahaadi hawa aur shaandar nazare milte hain! 🏔️✨😉\n\nLekin fikar mat kijiye — hamare luxury packages me world-class hospitality, private plunge pool aur sukoon 100% complimentary hai! Special deals ke liye hamara **Offers** section dekhein.`;
    }
    return `While the mountain breeze and scenic views are complimentary, our luxury villas and experiences are worth every moment! Please check our **Offers** page for exclusive privileges.`;
  }

  if (
    query.includes('stress') ||
    query.includes('thak gaya') ||
    query.includes('need vacation') ||
    query.includes('chhutti chahiye') ||
    query.includes('boss')
  ) {
    if (langMode === 'hi_roman' || langMode === 'hi_devanagari') {
      return `Doctor's Diagnosis: **Severe Vitamin 'Resort' Deficiency!** 🩺🌴🏖️\n\nIlaaj: 3 din **The Monolith Glass Chalet** me stargazing aur geothermal hot spring bath! Boss ko bol dijiye — "Mental peace emergency hai, resort jaana zaroori hai!" 😉\n\nDates bataiye, booking hum abhi shuru karte hain?`;
    }
    return `Sounds like the perfect time for a rejuvenating escape! Our private pool villas and geothermal Ayurvedic spa are ideal for unwinding. Would you like to check dates?`;
  }

  if (query.includes('thanks') || query.includes('thank you') || query.includes('shukriya') || query.includes('dhanyawad')) {
    if (langMode === 'hi_devanagari') {
      return `आपका स्वागत है! 😊 यदि रिज़ॉर्ट के बारे में कुछ और पूछना हो तो अवश्य बताएं।`;
    }
    if (langMode === 'hi_roman') {
      return `Anytime! 😊 Agar resort ke baare mein aur kuch poochna ho toh batao.`;
    }
    return `You're very welcome! 😊 Please let me know if you need anything else regarding ${resortName}.`;
  }

  // Rule 9: Multi-topic question detection (e.g. room price + pool + breakfast)
  const asksRoom = query.includes('room') || query.includes('kamr') || query.includes('price') || query.includes('rate') || query.includes('kitne ka') || query.includes('किराया');
  const asksPool = query.includes('pool') || query.includes('swimming') || query.includes('पूल');
  const asksFood = query.includes('breakfast') || query.includes('nashta') || query.includes('khana') || query.includes('food') || query.includes('dining') || query.includes('खाना') || query.includes('नाश्ता');

  if ((asksRoom && asksPool) || (asksRoom && asksFood) || (asksPool && asksFood)) {
    if (langMode === 'hi_devanagari') {
      let parts = ['बिल्कुल 👍\n'];
      if (asksRoom) {
        parts.push('• **कमरों का किराया**: Botanical Sanctuary Suite (₹35,000/रात्रि), The Forest Pool Villa (₹45,000/रात्रि), The Monolith Glass Chalet (₹55,000/रात्रि)।');
      }
      if (asksPool) {
        parts.push('• **स्विमिंग पूल**: हाँ, रिज़ॉर्ट में प्राइवेट इन्फिनिटी प्लंज पूल्स और लैगून पूल उपलब्ध हैं।');
      }
      if (asksFood) {
        parts.push('• **भोजन व नाश्ता**: The Cliffside Pavilion में स्वादिष्ट व्यंजन, बुफे नाश्ता (07:00–10:30) और 24-घंटे इन-विला डाइनिंग सुविधा उपलब्ध है।');
      }
      return parts.join('\n');
    }

    if (langMode === 'hi_roman') {
      let parts = ['Bilkul 👍\n'];
      if (asksRoom) {
        parts.push('• **Room Price**: Botanical Sanctuary Suite (₹35,000/night), The Forest Pool Villa (₹45,000/night), The Monolith Glass Chalet (₹55,000/night).');
      }
      if (asksPool) {
        parts.push('• **Swimming Pool**: Haan, resort mein Cantilevered Infinity Plunge Pools aur Horizon Lagoon Pool available hai.');
      }
      if (asksFood) {
        parts.push('• **Dining & Breakfast**: The Cliffside Pavilion & Hearth mein coastal/pan-asian cuisines, buffet breakfast (07:00–10:30) aur 24-hr in-villa dining available hai.');
      }
      return parts.join('\n');
    }

    // Pure English
    let parts = ['Certainly! Here are the details:\n'];
    if (asksRoom) {
      parts.push('• **Room Rates**: Botanical Sanctuary Suite (₹35,000/night), The Forest Pool Villa (₹45,000/night), The Monolith Glass Chalet (₹55,000/night).');
    }
    if (asksPool) {
      parts.push('• **Swimming Pool**: Yes, the resort features private cantilevered infinity plunge pools and a horizon lagoon pool.');
    }
    if (asksFood) {
      parts.push('• **Dining & Breakfast**: The Cliffside Pavilion offers gourmet cuisines, breakfast buffet (07:00–10:30), and 24-hour in-villa dining.');
    }
    return parts.join('\n');
  }

  // 1. Live Availability (Rule 5)
  if (
    query.includes('available') ||
    query.includes('availability') ||
    query.includes('vacant') ||
    query.includes('tomorrow') ||
    query.includes('tonight') ||
    query.includes('उपलब्ध') ||
    query.includes('khali hai') ||
    query.includes('milega kya') ||
    query.includes('kamra milega')
  ) {
    if (langMode === 'hi_devanagari') {
      return `मैं यहाँ से लाइव उपलब्धता की पुष्टि नहीं कर सकता। कृपया रीयल-टाइम उपलब्धता और बुकिंग के लिए हमारे बुकिंग पेज पर जाएँ या हमारी रिज़ॉर्ट टीम से WhatsApp (+91 98991 08543) पर संपर्क करें।`;
    }
    if (langMode === 'hi_roman') {
      return `Main live availability confirm nahi kar sakta bhai. Booking page ya resort team se direct WhatsApp (+91 98991 08543) par check karna best rahega.`;
    }
    return `I can't confirm live room availability from here. Please use our booking page or contact our resort team directly on WhatsApp (+91 98991 08543) to check real-time availability.`;
  }

  // 2. Booking & Reservations (Rule 6)
  if (
    query.includes('book') ||
    query.includes('reservation') ||
    query.includes('reserve') ||
    query.includes('बुकिंग') ||
    query.includes('बुक')
  ) {
    if (langMode === 'hi_devanagari') {
      return `**${resortName}** में बुकिंग करने के लिए, आप हमारे **Accommodations** पेज पर जाकर विला चुन सकते हैं या हमारी 24/7 कॉन्सिएर्ज टीम से सीधे WhatsApp (**+91 98991 08543**) या ईमेल (**dharmendra@countryholidaysresorts.com**) पर संपर्क कर सकते हैं।`;
    }
    if (langMode === 'hi_roman') {
      return `Stay book karne ke liye aap hamare **Accommodations** page par ja sakte hain ya direct 24/7 WhatsApp (**+91 98991 08543**) par message kar sakte hain bhai. Upar diye gaye **Inquiry** button se bhi direct request bhej sakte ho.`;
    }
    return `To book your stay at **${resortName}**, please visit our **Accommodations** page or connect directly with our 24/7 Concierge team via WhatsApp at **+91 98991 08543** or email at **dharmendra@countryholidaysresorts.com**.`;
  }

  // 3. Room comparison & Recommendations (Rule 9 & 10)
  if (
    (query.includes('which room') || query.includes('compare') || query.includes('better') || query.includes('kaunsa achha') || query.includes('kaunsa best') || query.includes('family ke liye') || query.includes('couple ke liye')) &&
    (query.includes('room') || query.includes('suite') || query.includes('villa') || query.includes('kamra') || query.includes('कमरा') || query.includes('कमरे'))
  ) {
    if (langMode === 'hi_devanagari') {
      return `वेबसाइट की जानकारी के अनुसार हमारे विला:\n\n• **The Forest Pool Villa** (₹45,000 / रात्रि) — प्राइवेट इन्फिनिटी प्लंज पूल और क्लिफ व्यू, 2–4 मेहमानों के लिए उत्तम।\n• **The Monolith Glass Chalet** (₹55,000 / रात्रि) — पैनोरमिक ग्लास रूफ और आउटडोर हॉट टब, 4–6 मेहमानों या परिवारों के लिए सर्वश्रेष्ठ।\n• **Botanical Sanctuary Suite** (₹35,000 / रात्रि) — ज़ेन वाटर कोर्टयार्ड और गार्डन बाथ, कपल्स (2 मेहमान) के लिए एकदम शांत वातावरण।\n\nयदि आप परिवार के साथ आ रहे हैं तो **The Monolith Glass Chalet** सबसे उपयुक्त रहेगा।`;
    }
    if (langMode === 'hi_roman') {
      return `Website ke according comparison ye raha bhai:\n\n• **The Forest Pool Villa** (₹45,000 / Night) — Cantilevered private plunge pool, 2–4 guests ke liye mast hai.\n• **The Monolith Glass Chalet** (₹55,000 / Night) — Glass sky-roof stargazing aur outdoor hot tub, 4–6 guests ya family ke liye best hai.\n• **Botanical Sanctuary Suite** (₹35,000 / Night) — Zen courtyard aur garden bath, couples (2 guests) ke liye ideal hai.`;
    }
    return `Based on the website information:\n\n• **The Forest Pool Villa** (₹45,000 / Night) — Features a private plunge pool and cliffside vistas, ideal for 2–4 guests.\n• **The Monolith Glass Chalet** (₹55,000 / Night) — Panoramic glass sky-roof and heated outdoor cedar hot tub, best for 4–6 guests or families.\n• **Botanical Sanctuary Suite** (₹35,000 / Night) — Private zen water courtyard and garden bath, perfect for couples (2 guests).\n\nIf you are traveling with family, the **Monolith Glass Chalet** is the most suitable option.`;
  }

  // 4. Specific Room / Price / Tariff Queries
  if (
    query.includes('कमरे') ||
    query.includes('कमरा') ||
    query.includes('कमरों') ||
    query.includes('सुइट') ||
    query.includes('विला') ||
    query.includes('kamre') ||
    query.includes('kamra') ||
    query.includes('room') ||
    query.includes('suite') ||
    query.includes('villa') ||
    query.includes('room ka price') ||
    query.includes('kitna kharcha') ||
    query.includes('kiraya') ||
    query.includes('kitne ka hai') ||
    query.includes('tariff') ||
    query.includes('price') ||
    query.includes('cost') ||
    query.includes('rate') ||
    query.includes('how much') ||
    query.includes('कीमत') ||
    query.includes('दाम') ||
    query.includes('rates')
  ) {
    if (query.includes('forest') || query.includes('फॉरेस्ट')) {
      if (langMode === 'hi_devanagari') {
        return `**The Forest Pool Villa** (वेबसाइट के अनुसार ₹45,000 / रात्रि):\n• प्राइवेट इन्फिनिटी प्लंज पूल और कोस्टल क्लिफ व्यू\n• फ्लोर-टू-सीलिंग ग्लास पैविलियन, सनडेक और स्टोन बाथटब\n• 2–4 मेहमानों के लिए आदर्श (1,990 SQ FT)।`;
      }
      if (langMode === 'hi_roman') {
        return `**The Forest Pool Villa** (₹45,000 / Night website listing ke according):\n• Private infinity plunge pool over emerald coastal cliffs\n• Glass pavilion, private sundeck aur stone soaking tub\n• Accommodates 2–4 guests (1,990 SQ FT).`;
      }
      return `**The Forest Pool Villa** (₹45,000 / Night according to website listing):\n• Features a private infinity plunge pool cantilevered over coastal cliffs\n• Floor-to-ceiling glass pavilions, private sundeck, and outdoor stone soaking tub\n• Accommodates 2–4 guests (1,990 SQ FT).`;
    }

    if (query.includes('monolith') || query.includes('मोनोलिथ') || query.includes('chalet') || query.includes('ग्लास')) {
      if (langMode === 'hi_devanagari') {
        return `**The Monolith Glass Chalet** (वेबसाइट के अनुसार ₹55,000 / रात्रि):\n• स्टारगेजिंग के लिए पैनोरमिक ग्लास स्काईरूफ\n• गर्म लकड़ी के फर्श और आउटडोर सीडरवूड हॉट टब\n• 4–6 मेहमानों के लिए उत्तम (2,580 SQ FT)।`;
      }
      if (langMode === 'hi_roman') {
        return `**The Monolith Glass Chalet** (₹55,000 / Night website listing ke according):\n• Panoramic glass sky-roof celestial stargazing ke liye\n• Heated timber floors aur outdoor cedarwood hot tub\n• Accommodates 4–6 guests (2,580 SQ FT).`;
      }
      return `**The Monolith Glass Chalet** (₹55,000 / Night according to website listing):\n• Panoramic glass sky-roof for celestial stargazing\n• Heated timber floors and outdoor cedarwood hot tub overlooking pine peaks\n• Accommodates 4–6 guests (2,580 SQ FT).`;
    }

    if (query.includes('botanical') || query.includes('बोटैनिकल') || query.includes('sanctuary')) {
      if (langMode === 'hi_devanagari') {
        return `**Botanical Sanctuary Suite** (वेबसाइट के अनुसार ₹35,000 / रात्रि):\n• सुगंधित प्राचीन मसालों के पेड़ों के बीच स्थित, प्राइवेट ज़ेन वाटर कोर्टयार्ड\n• टीक वुड इंटीरियर और ओपन-एयर बोटैनिकल गार्डन बाथ\n• 2 मेहमानों के लिए आदर्श (1,500 SQ FT)।`;
      }
      if (langMode === 'hi_roman') {
        return `**Botanical Sanctuary Suite** (₹35,000 / Night website listing ke according):\n• Ancient spice trees aur private zen water courtyard\n• Teak wood finishings aur open-air botanical garden bath\n• Accommodates 2 guests (1,500 SQ FT).`;
      }
      return `**Botanical Sanctuary Suite** (₹35,000 / Night according to website listing):\n• Surrounded by ancient spice trees with a private zen water courtyard\n• Teak finishings and open-air botanical garden bath\n• Accommodates 2 guests (1,500 SQ FT).`;
    }

    // General rooms list & rates
    if (langMode === 'hi_devanagari') {
      return `**${resortName}** में उपलब्ध लक्ज़री विला व सुइट्स (वेबसाइट के अनुसार):\n\n• **Botanical Sanctuary Suite**: ₹35,000 / रात्रि (ज़ेन कोर्टयार्ड, 2 मेहमान)\n• **The Forest Pool Villa**: ₹45,000 / रात्रि (प्राइवेट इन्फिनिटी पूल, 2–4 मेहमान)\n• **The Monolith Glass Chalet**: ₹55,000 / रात्रि (ग्लास स्काईरूफ, 4–6 मेहमान)\n\nलाइव उपलब्धता और कस्टम पैकेज के लिए हमारी रिज़ॉर्ट टीम से संपर्क करें।`;
    }
    if (langMode === 'hi_roman') {
      return `Sure bhai 👍 Website par available rate ke according:\n\n• **Botanical Sanctuary Suite**: ₹35,000 / Night (Zen Courtyard, 2 Guests)\n• **The Forest Pool Villa**: ₹45,000 / Night (Private Pool, 2–4 Guests)\n• **The Monolith Glass Chalet**: ₹55,000 / Night (Glass Skyroof, 4–6 Guests)\n\nLive availability aur custom deals ke liye resort team se contact kar sakte hain.`;
    }
    return `We offer three distinctive luxury living experiences:\n\n• **Botanical Sanctuary Suite** — ₹35,000 / Night (Zen Courtyard, 2 Guests)\n• **The Forest Pool Villa** — ₹45,000 / Night (Private Pool, 2–4 Guests)\n• **The Monolith Glass Chalet** — ₹55,000 / Night (Skyroof Stargazing, 4–6 Guests)\n\nPrices are based on website information. Would you like more details on any specific villa?`;
  }

  // 5. Dining, Food & Restaurants
  if (
    query.includes('खाना') ||
    query.includes('भोजन') ||
    query.includes('नाश्ता') ||
    query.includes('रेस्टोरेंट') ||
    query.includes('डाइनिंग') ||
    query.includes('khana') ||
    query.includes('bhojan') ||
    query.includes('nashta') ||
    query.includes('dining') ||
    query.includes('food') ||
    query.includes('restaurant') ||
    query.includes('breakfast') ||
    query.includes('dinner') ||
    query.includes('lunch') ||
    query.includes('menu') ||
    query.includes('wine')
  ) {
    if (langMode === 'hi_devanagari') {
      return `**${resortName}** में डाइनिंग विकल्प:\n\n• **The Cliffside Pavilion & Hearth**: कोस्टल व पैन-एशियन व्यंजन (नाश्ता: 07:00–10:30, लंच: 12:30–15:30, डिनर: 19:30–23:00)\n• **Subterranean Sommelier Wine Vault**: ऑर्गेनिक विंटेज वाइन और प्राइवेट शेफ टेस्टिंग (18:00–00:00)\n• **इन-विला डाइनिंग**: 24-घंटे रूम सर्विस और फ्लोटिंग पूल ब्रेकफास्ट सुविधा।`;
    }
    if (langMode === 'hi_roman') {
      return `Haan bhai! Hamare paas dining ke shaandar options available hain:\n\n• **The Cliffside Pavilion & Hearth**: Coastal aur Pan-Asian gastronomy (Breakfast: 07:00–10:30, Lunch: 12:30–15:30, Dinner: 19:30–23:00)\n• **Subterranean Sommelier Wine Vault**: Rare vintages aur private sommelier tastings (18:00–00:00)\n• **In-Villa Dining**: 24-hour room service aur floating pool breakfast.`;
    }
    return `Our dining experiences include:\n\n• **The Cliffside Pavilion & Hearth**: Contemporary coastal & Pan-Asian gastronomy (Breakfast: 07:00–10:30, Lunch: 12:30–15:30, Dinner: 19:30–23:00).\n• **Subterranean Sommelier Wine Vault**: Rare vintages and private sommelier tastings (18:00–00:00).\n• **In-Villa Dining**: 24-hour à la carte menu with floating pool breakfast options.`;
  }

  // 6. Special Packages & Offers (Weddings, Honeymoon, Monsoon Retreat)
  if (
    query.includes('शादी') ||
    query.includes('हनीमून') ||
    query.includes('ऑफर') ||
    query.includes('पैकेज') ||
    query.includes('shadi') ||
    query.includes('honeymoon') ||
    query.includes('offer') ||
    query.includes('package') ||
    query.includes('wedding') ||
    query.includes('discount') ||
    query.includes('deal') ||
    query.includes('corporate') ||
    query.includes('monsoon') ||
    query.includes('wellness')
  ) {
    if (langMode === 'hi_devanagari') {
      return `हमारे विशेष पैकेज और ऑफर्स:\n\n• **रॉयल डेस्टिनेशन वेडिंग पैकेज** (20% रॉयल प्रिविलेज): प्राइवेट पैलेस लॉन, शेफ टेस्टिंग मेनू, ब्राइडल सुइट अपग्रेड व हेलिकॉप्टर अराइवल।\n• **कॉर्पोरेट लीडरशिप कॉन्क्लेव** (15% ग्रुप छूट): प्राइवेट बोर्डरूम, स्टारलिंक टेलीप्रेजेंस, वाइन सेलर नेटवर्किंग व शॉफर सुविधा।\n• **मानसून वेलनेस रिट्रीट** (₹1,20,000 / 5 रात्रि): 5-दिवसीय आयुर्वेदिक स्पा, सात्विक डिटॉक्स डाइनिंग, डॉक्टर परामर्श और एयरपोर्ट ट्रांसफर।`;
    }
    if (langMode === 'hi_roman') {
      return `Hamare featured packages ye rahe bhai:\n\n• **Royal Destination Wedding Package** (20% Privilege): Private palace lawns, chef tasting, bridal suite upgrade aur helicopter arrival.\n• **Corporate Leadership Conclave** (15% Group Discount): Private boardroom, high-speed telepresence aur executive chauffeur.\n• **Bespoke Monsoon Wellness Retreat** (₹1,20,000 / 5 Nights): 5-day Ayurvedic spa, sattvic dining aur airport transfer.`;
    }
    return `Current Featured Packages:\n\n• **Royal Destination Wedding Package** (20% Royal Privilege): Inclusive of private palace lawns, Master Chef tasting, bridal suite upgrade, and helicopter arrival.\n• **Corporate Leadership Conclave** (15% Group Tariff): Includes private boardroom, sommelier dinner, Starlink telepresence, and executive chauffeur.\n• **Bespoke Monsoon Wellness Retreat** (₹1,20,000 / 5 Nights): 5-night curated Ayurvedic spa therapies & sattvic detox dining.`;
  }

  // 7. Resort Facilities & Amenities (Pool, Spa, Gym, Wi-Fi, Parking)
  if (
    query.includes('सुविधाएं') ||
    query.includes('सुविधा') ||
    query.includes('स्विमिंग पूल') ||
    query.includes('पूल') ||
    query.includes('स्पा') ||
    query.includes('वाई-फाई') ||
    query.includes('पार्किंग') ||
    query.includes('pool') ||
    query.includes('spa') ||
    query.includes('gym') ||
    query.includes('wifi') ||
    query.includes('parking') ||
    query.includes('facility') ||
    query.includes('facilities') ||
    query.includes('amenit')
  ) {
    if (query.includes('gym')) {
      if (langMode === 'hi_devanagari') {
        return `हाँ 💪 रिज़ॉर्ट में आधुनिक फिटनेस सेंटर और जिम की सुविधा उपलब्ध है।`;
      }
      if (langMode === 'hi_roman') {
        return `Haan bhai 💪 Gym available hai.`;
      }
      return `Yes 💪 A state-of-the-art fitness center and gym are available at ${resortName}.`;
    }

    if (langMode === 'hi_devanagari') {
      return `**${resortName}** की मुख्य सुविधाएं:\n\n• कैंटिलीवर्ड प्राइवेट इन्फिनिटी प्लंज पूल्स व होराइजन लैगून पूल\n• जियोथर्मल मिनरल थर्मल लैगून व आयुर्वेदिक वेलनेस स्पा\n• हाई-स्पीड एन्क्रिप्टेड स्टारलिंक वाई-फाई सभी सुइट्स में\n• हेलिपैड व एग्जीक्यूटिव शॉफर फ्लीट\n• ईवी चार्जिंग स्टेशनों के साथ वैलेट पार्किंग।`;
    }
    if (langMode === 'hi_roman') {
      return `Bilkul 😄 Website ke according resort mein ye facilities available hain:\n\n• Cantilevered Infinity Plunge Pools aur Horizon Lagoon Pool\n• Geothermal Mineral Thermal Lagoon aur Ayurvedic Spa\n• High-Speed Starlink Wi-Fi sabhi suites mein\n• Helipad aur Executive Chauffeur Fleet\n• Valet Parking with EV Charging Stations.`;
    }
    return `The resort offers a comprehensive range of luxury facilities:\n\n• Cantilevered Infinity Plunge Pools & Horizon Lagoon Pool\n• Geothermal Mineral Thermal Lagoon & Ayurvedic Spa\n• High-Speed Encrypted Starlink Wi-Fi across all suites\n• Helicopter Pad & Private Chauffeur Fleet\n• Valet Parking with EV Charging Stations.`;
  }

  // 8. Activities & Experiences
  if (
    query.includes('गतिविधियां') ||
    query.includes('घूमने') ||
    query.includes('एक्सपीरियंस') ||
    query.includes('activit') ||
    query.includes('experience') ||
    query.includes('trek') ||
    query.includes('yoga') ||
    query.includes('stargazing')
  ) {
    if (langMode === 'hi_devanagari') {
      return `अतिथियों के लिए खास गतिविधियां:\n\n• खगोलशास्त्री गाइड के साथ **सेलेस्टियल स्टारगेजिंग**\n• बोटैनिकल स्पाइस गार्डन गाइडेड Nature Walk\n• सूर्योदय व सूर्यास्त के समय कैंटिलीवर्ड डेक पर योग सत्र\n• प्राइवेट सोमेलियर वाइन टेस्टिंग और हिल ट्रेल्स।`;
    }
    if (langMode === 'hi_roman') {
      return `Signature guest activities ye hain bhai:\n\n• Guided Astronomer ke saath **Celestial Stargazing**\n• Botanical Spice Garden Guided Walks\n• Sunrise & Sunset Yoga on Cantilevered Decks\n• Private Sommelier Wine Tasting aur Nature Treks.`;
    }
    return `Signature guest experiences include:\n\n• Celestial Stargazing Sessions with Astronomer Guide\n• Botanical Spice Garden Guided Walks\n• Sunrise & Sunset Yoga on Cantilevered Decks\n• Private Sommelier Wine Tasting & Nature Treks.`;
  }

  // 9. Timings & Policies (Check-in, Check-out, Cancellation, Kids, Pets)
  if (
    query.includes('समय') ||
    query.includes('टाइम') ||
    query.includes('कब आना') ||
    query.includes('कब जाना') ||
    query.includes('kab aana') ||
    query.includes('timing') ||
    query.includes('check in') ||
    query.includes('check out') ||
    query.includes('checkin') ||
    query.includes('checkout')
  ) {
    if (langMode === 'hi_devanagari') {
      return `रिज़ॉर्ट समय:\n• **चेक-इन**: दोपहर 14:00 (2:00 PM)\n• **चेक-आउट**: सुबह 11:00 (11:00 AM)\n\nअर्ली चेक-इन और लेट चेक-आउट आगमन पर कमरों की उपलब्धता पर निर्भर करता है।`;
    }
    if (langMode === 'hi_roman') {
      return `Resort timings ye hain bhai:\n• **Check-in**: 14:00 (2:00 PM)\n• **Check-out**: 11:00 (11:00 AM)\n\nEarly check-in aur late check-out arrival ke waqt room availability par depend karta hai.`;
    }
    return `Resort Timings:\n• **Check-in**: 14:00 (2:00 PM)\n• **Check-out**: 11:00 (11:00 AM)\n\nEarly check-in and late check-out are subject to availability upon arrival.`;
  }

  if (query.includes('रद्द') || query.includes('cancel') || query.includes('refund') || query.includes('वापसी')) {
    if (langMode === 'hi_devanagari') {
      return `**रद्दीकरण व धनवापसी नीति (COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED)**:\n• ऑर्डर/बुकिंग तुरंत बाद रद्दीकरण के लिए अनुरोध किया जा सकता है, बशर्ते वेंडर द्वारा शिपिंग/प्रसंस्करण प्रक्रिया शुरू न हुई हो।\n• खराब होने वाली वस्तुओं (फूल, खाद्य पदार्थ आदि) के लिए रद्दीकरण मान्य नहीं है, सिवाय गुणवत्ता खराबी स्थापित होने पर।\n• क्षतिग्रस्त या उम्मीद अनुसार न होने वाली वस्तुओं की सूचना प्राप्ति के **7 दिनों** के भीतर देनी होगी।\n• स्वीकृत रिफंड **16–30 दिनों** में मूल भुगतान माध्यम में प्रोसेस किया जाता है।`;
    }
    if (langMode === 'hi_roman') {
      return `**Cancellation & Refund Policy (COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED)**:\n• Order/booking request turant karne par cancellation consider hoti hai, agar vendor ne shipping/processing shuru na ki ho.\n• Perishable items (flowers, eatables) cancel nahi hote jab tak quality issue prove na ho.\n• Damaged ya mismatch products 7 days ke andar customer service ko report karein.\n• Approved refunds 16–30 days mein process ho jate hain bhai.`;
    }
    return `**Cancellation & Refund Policy (COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED)**:\n• Cancellations are considered if requested immediately after placing the order, provided shipping/vendor processing has not been initiated.\n• Perishable items (e.g. flowers, eatables) are non-cancellable unless quality defects are established.\n• Damaged or mismatched items must be reported within **7 Days** of delivery to our Customer Service.\n• Approved refunds are credited within **16–30 Days** to the customer.`;
  }

  if (query.includes('बच्चे') || query.includes('child') || query.includes('kid') || query.includes('baby') || query.includes('family')) {
    if (langMode === 'hi_devanagari') {
      return `**बाल नीति (Child Policy)**:\n0 से 5 वर्ष तक के बच्चों का ठहरना मौजूदा बेडिंग के साथ निःशुल्क है। 6 वर्ष से अधिक उम्र के बच्चों/अतिथियों के लिए अतिरिक्त बिस्तर उपलब्ध कराया जाता है। परिवारों के लिए **The Monolith Glass Chalet** सबसे उपयुक्त है।`;
    }
    if (langMode === 'hi_roman') {
      return `**Child Policy**:\n0–5 saal ke bachhon ke liye stay complimentary hai. Families ke liye **The Monolith Glass Chalet** (4–6 guests) best option hai bhai.`;
    }
    return `**Child Policy**:\nChildren aged 0–5 stay complimentary using existing bedding. Extra beds for children/guests aged 6+ are available upon request. For families, we recommend **The Monolith Glass Chalet** (accommodates 4–6 guests).`;
  }

  if (query.includes('पालतू') || query.includes('pet') || query.includes('dog') || query.includes('cat') || query.includes('कुत्ता')) {
    if (langMode === 'hi_devanagari') {
      return `**पालतू पशु नीति (Pet Policy)**:\nपूर्व सूचना और अनुरोध पर चुनिंदा ग्राउंड-लेवल **Botanical Sanctuary Suites** में पेट-फ्रेंडली ठहरने की सुविधा उपलब्ध है।`;
    }
    if (langMode === 'hi_roman') {
      return `**Pet Policy**:\nPrior request par select ground-level **Botanical Sanctuary Suites** mein pet-friendly accommodations available hain.`;
    }
    return `**Pet Policy**:\nPet-friendly accommodations are available in selected ground-level **Botanical Sanctuary Suites** upon prior request.`;
  }

  // 10. Location, Address & Contact Details
  if (
    query.includes('contact') ||
    query.includes('phone') ||
    query.includes('email') ||
    query.includes('whatsapp') ||
    query.includes('location') ||
    query.includes('address') ||
    query.includes('where') ||
    query.includes('पता') ||
    query.includes('स्थान') ||
    query.includes('कहाँ') ||
    query.includes('kahan hai') ||
    query.includes('kaise pahunche') ||
    query.includes('sampark') ||
    query.includes('संपर्क')
  ) {
    if (langMode === 'hi_devanagari') {
      return `**${resortName} संपर्क व स्थान विवरण**:\n\n• **कंपनी**: COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED\n• **फ़ोन**: +91 98991 08543\n• **WhatsApp**: +91 98991 08543\n• **ईमेल**: dharmendra@countryholidaysresorts.com\n• **पंजीकृत व परिचालन पता**: F-10, Second Floor Kalkaji, Near Union Bank, Delhi, PIN: 110019\n• **हेल्पडेस्क सेवा**: 24/7 उपलब्ध।`;
    }
    if (langMode === 'hi_roman') {
      return `**${resortName} Contact Details**:\n\n• **Company**: COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED\n• **Phone / WhatsApp**: +91 98991 08543\n• **Email**: dharmendra@countryholidaysresorts.com\n• **Registered & Operational Address**: F-10, Second Floor Kalkaji, Near Union Bank, Delhi, PIN: 110019\n• **Executive Desk**: 24/7 Available.`;
    }
    return `**Contact & Location Details**:\n\n• **Merchant Legal Entity**: COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED\n• **Phone**: +91 98991 08543\n• **WhatsApp**: +91 98991 08543\n• **Email**: dharmendra@countryholidaysresorts.com\n• **Registered & Operational Address**: F-10, SECOND FLOOR KALKAJI, NEAR UNION BANK, Delhi, Delhi, PIN: 110019\n• **Executive Desk**: 24/7 Global Luxury Support.`;
  }

  // 11. Conversational Local Hindi Greetings & Slang ("Aur Bhai", "Kya Scene Hai", "Ram Ram", "Kay Haal Hai", etc.)
  if (query === 'hey bro' || query === 'hey bhai') {
    return `Hey bhai 😄 Kya scene hai? Resort ke baare mein kuch jaan'na hai?`;
  }

  if (query === 'kaise ho' || query.startsWith('kaise ho')) {
    return `Bilkul badhiya 😄 Tum batao, resort ke baare mein kya help chahiye?`;
  }

  if (query === 'bhai kya haal hai' || query === 'bhai kaisa hai') {
    return `Ekdam five-star haal hai bhai 😄 Tum batao, room dekhna hai ya bas haal-chaal lene aaye ho?`;
  }

  if (
    query === 'kay haal hai bhai' ||
    query === 'kya haal hai bhai' ||
    query.includes('kay haal') ||
    query.includes('kya haal') ||
    query.includes('kya hal')
  ) {
    return `Ekdam mast bhai 😄 Batao, stay plan kar rahe ho ya bas resort ka scene dekh rahe ho?`;
  }

  if (
    query === 'aur bhai' ||
    query.startsWith('aur bhai') ||
    query.includes('aur bhai') ||
    query.includes('aur btao') ||
    query.includes('aur batao') ||
    query.includes('kya scene') ||
    query.includes('kya chal rha') ||
    query.includes('kya chal raha') ||
    query.includes('ram ram') ||
    query.includes('radhe radhe') ||
    query.includes('jai shree ram') ||
    query.includes('bhai suno') ||
    query.includes('arre bhai') ||
    query.includes('kaisa hai') ||
    query.includes('sab theek') ||
    query.includes('sab badhiya')
  ) {
    return `Ekdam badhiya bhai 😄 Batao, resort ke baare mein kya jaan'na hai?`;
  }

  // 12. "Who are you" / "Aap kaun ho" / "CHHR AI Assistant"
  if (
    query.includes('who are you') ||
    query.includes('aap kaun ho') ||
    query.includes('tum kaun ho') ||
    query.includes('what can you do') ||
    query.includes('kya kar sakte ho') ||
    query.includes('chhr ai assistant') ||
    query.includes('chhr assistant') ||
    query.includes('chhr ai') ||
    query.includes('ai assistant') ||
    query.includes('आप कौन हो')
  ) {
    if (langMode === 'hi_devanagari') {
      return `मैं **Country Holidays Hotels & Resorts (CHHR)** का आधिकारिक **AI पर्सनल ट्रैवल असिस्टेंट** हूँ 🏨✨\n\nमैं आपकी छुट्टियाँ, लक्ज़री विला चयन, डाइनिंग रिज़र्वेशन, विशेष पैकेज, यात्रा योजना और बुकिंग पूछताछ में 24/7 सहायता करता हूँ। बताइए, आज मैं आपकी क्या सहायता कर सकता हूँ?`;
    }
    if (langMode === 'hi_roman') {
      return `Main **Country Holidays Hotels & Resorts (CHHR)** ka official **AI Personal Travel Assistant** hoon 🏨✨\n\nMain aapki luxury vacations, suite selection, dining reservations, bespoke packages aur booking inquiries mein 24/7 help karta hoon. Batao bhai, aaj kya plan karein?`;
    }
    return `I am the official **CHHR AI Assistant & Luxury Resort Guide** for **Country Holidays Hotels & Resorts** 🏨✨\n\nI can help you explore our luxury villas, dining experiences, wellness retreats, bespoke packages, resort policies, and assist directly with your stay inquiries and booking planning. How may I assist you today?`;
  }

  // 13. General Greetings (English, Hindi, Hinglish)
  if (query === 'hi') {
    return `Hey! 👋 Welcome to Country Holidays. How can I help you today?`;
  }

  if (query === 'hello') {
    return `Hello! 😊 What would you like to know about ${resortName}?`;
  }

  if (query.includes('नमस्ते') || query.includes('प्रणाम')) {
    return `नमस्ते! **${resortName}** के AI कॉन्सिएर्ज और पर्सनल ट्रैवल असिस्टेंट में आपका स्वागत है 🏨🌴\n\nमैं आपकी क्या सहायता कर सकता हूँ? आप कमरों, भोजन, स्पा, स्पेशल पैकेज या अपनी यात्रा योजना के बारे में पूछ सकते हैं।`;
  }

  if (query === 'namaste' || query === 'pranam') {
    return `Namaste! 🙏 Welcome to **Country Holidays**. How can I help you explore **${resortName}** today?`;
  }

  if (query === 'hey' || query.includes('good morning') || query.includes('good evening') || query.includes('how are you')) {
    if (langMode === 'hi_roman') {
      return `Hey bhai 😄 Welcome to **Country Holidays**. Bataiye, ${resortName} ke baare mein kya help chahiye?`;
    }
    return `Hello! 😊 Welcome to **Country Holidays**. How may I assist your luxury stay and travel planning today?`;
  }

  // 14. Strict RAG fallback rule (Rule 20)
  if (langMode === 'hi_devanagari') {
    return `मुझे हमारी वेबसाइट पर यह जानकारी नहीं मिली। कृपया अधिक जानकारी और सहायता के लिए हमारी रिज़ॉर्ट टीम (+91 98991 08543) से संपर्क करें।`;
  }
  if (langMode === 'hi_roman') {
    return `Ye information mujhe website par nahi mili bhai. Latest details ke liye resort team se contact karna best rahega (+91 98991 08543).`;
  }
  return `I couldn't find that information on our website. Please contact our resort team for further assistance.`;
}

/**
 * Main chat handler connecting to LLM (Gemini or OpenAI) with RAG context injection
 * or gracefully falling back to deterministic response.
 */
async function generateConciergeResponse({ message, conversationHistory = [] }) {
  const { resortName, retrievedContent, contactInfo } = await retrieveWebsiteContent(message);
  const companyName = 'Country Holidays Hotels & Resorts';
  const brandName = 'Country Holidays';
  const systemPrompt = buildSystemPrompt(resortName, retrievedContent, companyName, brandName);

  // 1. If GEMINI_API_KEY is available
  if (process.env.GEMINI_API_KEY) {
    const modelsToTry = ['gemini-2.5-flash', 'gemini-flash-latest'];
    for (const modelName of modelsToTry) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }]
                }
              ],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 800
              }
            })
          }
        );
        clearTimeout(timeoutId);

        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          return {
            reply: data.candidates[0].content.parts[0].text,
            resortName,
            contactInfo,
            source: `gemini-rag (${modelName})`
          };
        }
      } catch (err) {
        console.warn(`Gemini (${modelName}) attempt error:`, err.message);
      }
    }
  }

  // 2. If OPENAI_API_KEY is available
  if (process.env.OPENAI_API_KEY) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...conversationHistory.map((item) => ({
              role: item.role === 'assistant' ? 'assistant' : 'user',
              content: item.content
            })),
            { role: 'user', content: message }
          ],
          temperature: 0.2,
          max_tokens: 800
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]?.message?.content) {
        return {
          reply: data.choices[0].message.content,
          resortName,
          contactInfo,
          source: 'openai-rag'
        };
      }
    } catch (err) {
      console.warn('OpenAI API call failed, falling back to deterministic RAG engine:', err.message);
    }
  }

  // 3. Fallback to Strict Deterministic Concierge Engine
  const reply = handleDeterministicConcierge(message, conversationHistory, retrievedContent, resortName);
  return {
    reply,
    resortName,
    contactInfo,
    source: 'deterministic-rag'
  };
}

module.exports = {
  generateConciergeResponse,
  detectQueryLanguage,
  handleDeterministicConcierge
};
