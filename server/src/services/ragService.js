const mongoose = require('mongoose');
const Accommodation = require('../models/Accommodation');
const Offer = require('../models/Offer');
const Setting = require('../models/Setting');

// Fallback static website content if DB is not populated or offline
const STATIC_RESORT_KNOWLEDGE = {
  resortName: 'Country Holidays Hotels & Resorts',
  tagline: 'Sanctuaries of Distinction & Wonder',
  overview:
    'Country Holidays Hotels & Resorts is an international luxury hospitality brand offering curated sanctuaries across breathtaking cliffside, alpine, spice garden, and palace locations.',
  contact: {
    legalEntityName: 'COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED',
    phone: '+91 98991 08543',
    whatsapp: '+919899108543',
    email: 'dharmendra@countryholidaysresorts.com',
    registeredAddress: 'F-10, SECOND FLOOR KALKAJI, NEAR UNION BANK, Delhi, Delhi, PIN: 110019',
    operationalAddress: 'F-10, SECOND FLOOR KALKAJI, NEAR UNION BANK, Delhi, Delhi, PIN: 110019',
    address: 'F-10, SECOND FLOOR KALKAJI, NEAR UNION BANK, Delhi, Delhi, PIN: 110019',
    hours: '24/7 Global Luxury Concierge',
    bookingUrl: '/accommodations',
    contactUrl: '/contact',
    offersUrl: '/offers',
    galleryUrl: '/gallery'
  },
  accommodations: [
    {
      name: 'THE FOREST POOL VILLA',
      category: 'Cantilevered Over Emerald Cliffs',
      specs: ['Private Pool', '2–4 Guests', '1,990 SQ FT'],
      description:
        'Private infinity plunge pool cantilevered over emerald coastal cliffs, featuring floor-to-ceiling glass pavilions, private sundeck, and outdoor stone soaking tub.',
      price: '₹45,000 / Night'
    },
    {
      name: 'THE MONOLITH GLASS CHALET',
      category: 'Alpine Pine Ridge Sanctuary',
      specs: ['Skyroof Stargazing', '4–6 Guests', '2,580 SQ FT'],
      description:
        'Heated timber floors, a panoramic glass sky-roof for celestial stargazing, and an outdoor cedarwood hot tub directly overlooking high-altitude pine peaks.',
      price: '₹55,000 / Night'
    },
    {
      name: 'BOTANICAL SANCTUARY SUITE',
      category: 'Ancient Spice Garden Estate',
      specs: ['Zen Courtyard', '2 Guests', '1,500 SQ FT'],
      description:
        'Surrounded by ancient spice trees and a private zen water courtyard, hand-crafted with locally quarried slate, teak finishings, and open-air botanical garden bath.',
      price: '₹35,000 / Night'
    }
  ],
  dining: [
    {
      name: 'The Cliffside Pavilion & Hearth',
      cuisine: 'Contemporary Coastal & Pan-Asian Gastronomy',
      timings: 'Breakfast: 07:00 – 10:30 | Lunch: 12:30 – 15:30 | Dinner: 19:30 – 23:00',
      highlights: 'Farm-to-table organic ingredients, wood-fired hearth, ocean/cliff panorama.'
    },
    {
      name: 'Subterranean Sommelier Wine Vault',
      cuisine: 'Bespoke Charcuterie, Artisanal Cheeses & Biodynamic Vintages',
      timings: 'Evenings: 18:00 – 00:00 (Reservations required)',
      highlights: 'Over 600 curated rare vintage labels, private sommelier tasting sessions.'
    },
    {
      name: 'In-Villa Dining & Sunrise Breakfast',
      cuisine: '24-hour à la carte menu served in private villa sundeck or plunge pool floating tray',
      timings: '24 Hours Available',
      highlights: 'Floating pool breakfast upon request, private chef barbecue available.'
    }
  ],
  facilities: [
    'Cantilevered Infinity Plunge Pools & Horizon Main Pool',
    'Geothermal Mineral Thermal Lagoon & Ayurvedic Wellness Spa (38°C Spring Water)',
    'High-Speed Encrypted Starlink Wi-Fi across all villas and pavilions',
    'Helicopter Pad & Private Chauffeur Fleet',
    'State-of-the-art Executive Amphitheater & Boardrooms',
    'Secure Valet Parking with EV Charging Stations',
    'Zen Meditation Water Courtyards & Botanical Trails'
  ],
  activities: [
    'Celestial Stargazing Sessions with Astronomer Guide',
    'Botanical Spice Garden Guided Walking Tours',
    'Sunrise & Sunset Yoga on Cantilevered Decks',
    'Private Sommelier Wine Tasting & Pairing Sessions',
    'Curated High-Altitude Guided Nature Treks',
    'Helicopter Scenic Tours'
  ],
  policies: {
    checkIn: '14:00 (2:00 PM)',
    checkOut: '11:00 (11:00 AM)',
    earlyCheckIn: 'Subject to room availability upon arrival; guaranteed early check-in requires reservation from previous night.',
    cancellation:
      'Complimentary cancellation up to 72 hours prior to scheduled arrival date. Cancellations within 72 hours are subject to a one-night tariff fee.',
    childPolicy:
      'Children aged 0–5 stay complimentary using existing bedding. Extra beds available for children/guests aged 6+ at supplementary charge.',
    petPolicy: 'Pet-friendly accommodations available in selected ground-level Botanical Sanctuary Suites upon prior request.',
    paymentMethods: 'All major Credit Cards (Visa, Mastercard, Amex), UPI, Bank Wire, and Net Banking.'
  },
  offers: [
    {
      title: 'Royal Destination Wedding Package',
      discount: '20% Royal Privilege',
      description:
        'All-inclusive royal wedding curation across our private palace lawns and banquets. Includes bespoke floral decor, royal banquet feasts, and complimentary bridal suites.',
      inclusions: ['Exclusive Lawns', 'Master Chef Tasting', 'Bridal Suite Upgrade', 'Helicopter Arrival'],
      validTill: 'December 2026'
    },
    {
      title: 'Corporate Leadership Conclave Privilege',
      discount: '15% Group Tariff',
      description:
        'High-level executive board retreats featuring state-of-the-art amphitheaters, high-speed encrypted telepresence, private wine cellar networking, and bespoke outdoor team expeditions.',
      inclusions: ['Private Boardroom', 'Sommelier Dinner', 'High-Speed Starlink', 'Executive Chauffeur'],
      validTill: 'Quarterly Booking'
    }
  ]
};

/**
 * Retrieves dynamic or static website knowledge relevant to the user query.
 * @param {string} userQuery - The visitor's question
 * @returns {Promise<{resortName: string, retrievedContent: string}>}
 */
async function retrieveWebsiteContent(userQuery = '') {
  let accommodations = STATIC_RESORT_KNOWLEDGE.accommodations;
  let offers = STATIC_RESORT_KNOWLEDGE.offers;
  let contact = STATIC_RESORT_KNOWLEDGE.contact;
  let resortName = STATIC_RESORT_KNOWLEDGE.resortName;

  try {
    // Only query MongoDB if actively connected (readyState === 1)
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const [dbAccs, dbOffers, dbSetting] = await Promise.all([
        Accommodation.find({}).lean().catch(() => null),
        Offer.find({}).lean().catch(() => null),
        Setting.findOne({ key: 'global_site_settings' }).lean().catch(() => null)
      ]);

      if (dbAccs && dbAccs.length > 0) {
        accommodations = dbAccs;
      }
      if (dbOffers && dbOffers.length > 0) {
        offers = dbOffers;
      }
      if (dbSetting?.contactInfo) {
        contact = { ...contact, ...dbSetting.contactInfo };
      }
      if (dbSetting?.siteConfig?.name) {
        resortName = dbSetting.siteConfig.name;
      }
    }
  } catch (err) {
    // Graceful fallback to static knowledge
  }

  // Construct structured markdown chunks of the website content
  const sections = [];

  // Resort Overview
  sections.push(`### RESORT OVERVIEW
- Name: ${resortName}
- Tagline: ${STATIC_RESORT_KNOWLEDGE.tagline}
- Overview: ${STATIC_RESORT_KNOWLEDGE.overview}`);

  // Contact & Links
  sections.push(`### CONTACT & OFFICIAL WEBSITE LINKS
- Legal Entity: ${contact.legalEntityName || 'COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED'}
- Phone: ${contact.phone || contact.phoneRaw || '+91 98991 08543'}
- WhatsApp: ${contact.whatsapp || '+919899108543'}
- Email: ${contact.email || 'dharmendra@countryholidaysresorts.com'}
- Registered & Operational Address: ${contact.address || 'F-10, SECOND FLOOR KALKAJI, NEAR UNION BANK, Delhi, Delhi, PIN: 110019'}
- Hours: ${contact.hours || '24/7 Global Luxury Concierge'}
- Booking Page: /accommodations
- Offers Page: /offers
- Contact Page: /contact
- Gallery: /gallery`);

  // Accommodations & Room Types
  const accList = accommodations
    .map(
      (acc) =>
        `• **${acc.name}** (${acc.category || 'Luxury Suite'}):
  - Price: ${acc.price ? `${acc.price} (according to website listing)` : 'Price on request'}
  - Specs: ${Array.isArray(acc.specs) ? acc.specs.join(' • ') : acc.specs || 'N/A'}
  - Details: ${acc.description || 'Luxury appointed suite with panoramic views.'}`
    )
    .join('\n');
  sections.push(`### ROOMS & SUITES\n${accList}`);

  // Dining
  const diningList = STATIC_RESORT_KNOWLEDGE.dining
    .map(
      (d) =>
        `• **${d.name}**:
  - Cuisine: ${d.cuisine}
  - Hours: ${d.timings}
  - Highlights: ${d.highlights}`
    )
    .join('\n');
  sections.push(`### DINING & RESTAURANTS\n${diningList}`);

  // Facilities & Amenities
  const facilitiesList = STATIC_RESORT_KNOWLEDGE.facilities.map((f) => `• ${f}`).join('\n');
  sections.push(`### RESORT FACILITIES & AMENITIES\n${facilitiesList}`);

  // Activities & Experiences
  const activitiesList = STATIC_RESORT_KNOWLEDGE.activities.map((a) => `• ${a}`).join('\n');
  sections.push(`### ACTIVITIES & EXPERIENCES\n${activitiesList}`);

  // Policies
  sections.push(`### RESORT POLICIES
- Check-In Time: ${STATIC_RESORT_KNOWLEDGE.policies.checkIn}
- Check-Out Time: ${STATIC_RESORT_KNOWLEDGE.policies.checkOut}
- Early Check-In / Late Check-Out: ${STATIC_RESORT_KNOWLEDGE.policies.earlyCheckIn}
- Cancellation Policy: ${STATIC_RESORT_KNOWLEDGE.policies.cancellation}
- Child & Extra Guest Policy: ${STATIC_RESORT_KNOWLEDGE.policies.childPolicy}
- Pet Policy: ${STATIC_RESORT_KNOWLEDGE.policies.petPolicy}
- Payment Methods: ${STATIC_RESORT_KNOWLEDGE.policies.paymentMethods}`);

  // Offers & Packages
  const offersList = offers
    .map(
      (o) =>
        `• **${o.title}** (${o.discount || 'Special Tariff'}):
  - Description: ${o.description}
  - Inclusions: ${Array.isArray(o.inclusions) ? o.inclusions.join(', ') : o.inclusions || 'Complimentary amenities'}
  - Validity: ${o.validTill || 'Current Season'}`
    )
    .join('\n');
  sections.push(`### OFFERS & PACKAGES\n${offersList}`);

  // Read all custom documents & packages from knowledge_vault directory
  try {
    const fs = require('fs');
    const path = require('path');
    const vaultDir = path.join(__dirname, '../data/knowledge_vault');

    if (fs.existsSync(vaultDir)) {
      const vaultFiles = fs.readdirSync(vaultDir);
      for (const file of vaultFiles) {
        const filePath = path.join(vaultDir, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
          const content = fs.readFileSync(filePath, 'utf8');
          if (file.endsWith('.json')) {
            try {
              const parsed = JSON.parse(content);
              if (Array.isArray(parsed.packages)) {
                const pkgText = parsed.packages
                  .map(
                    (p) =>
                      `• **${p.packageName || p.title}** (${p.category || 'Package'} - ${p.price || p.pricing || 'Tariff on request'}):\n  - Inclusions: ${Array.isArray(p.inclusions) ? p.inclusions.join(', ') : p.inclusions || 'Complimentary amenities'}\n  - Validity: ${p.validity || p.validTill || 'Current season'}`
                  )
                  .join('\n');
                sections.push(`### BESPOKE PACKAGES VAULT (${file})\n${pkgText}`);
              } else {
                sections.push(`### UPLOADED KNOWLEDGE (${file})\n${content}`);
              }
            } catch (e) {
              sections.push(`### UPLOADED DOCUMENT (${file})\n${content}`);
            }
          } else {
            sections.push(`### UPLOADED DOCUMENT (${file})\n${content}`);
          }
        }
      }
    }

    // Also read legacy customKnowledge.json if present
    const customPath = path.join(__dirname, '../data/customKnowledge.json');
    if (fs.existsSync(customPath)) {
      const rawData = fs.readFileSync(customPath, 'utf8');
      const customData = JSON.parse(rawData);

      if (Array.isArray(customData.customPackages) && customData.customPackages.length > 0) {
        const customPkgList = customData.customPackages
          .map(
            (p) =>
              `• **${p.title}** (${p.category || 'Special Package'}${p.pricing ? ` - ${p.pricing}` : ''}):\n  - Description: ${p.description}\n  - Inclusions: ${Array.isArray(p.inclusions) ? p.inclusions.join(', ') : p.inclusions || 'Complimentary amenities'}\n  - Validity: ${p.validTill || 'Current Season'}`
          )
          .join('\n');
        sections.push(`### UPLOADED BESPOKE PACKAGES\n${customPkgList}`);
      }

      if (Array.isArray(customData.customHighlights) && customData.customHighlights.length > 0) {
        const highlightsList = customData.customHighlights.map((h) => `• ${h}`).join('\n');
        sections.push(`### ADDITIONAL RESORT HIGHLIGHTS\n${highlightsList}`);
      }
    }
  } catch (err) {
    // Gracefully ignore file read errors
  }

  return {
    resortName,
    retrievedContent: sections.join('\n\n'),
    contactInfo: contact
  };
}

module.exports = {
  retrieveWebsiteContent,
  STATIC_RESORT_KNOWLEDGE
};
