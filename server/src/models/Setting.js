const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: true,
      default: 'global_site_settings',
    },
    siteConfig: {
      name: {
        type: String,
        default: 'Country Holidays Hotels & Resorts',
      },
      tagline: {
        type: String,
        default: 'Sanctuaries of Distinction & Wonder',
      },
      description: {
        type: String,
        default: 'An international collection of world-class architectural resorts, tranquil nature escapes, and boutique hotels.',
      },
      url: {
        type: String,
        default: 'https://countryholidaysresorts.com',
      },
    },
    contactInfo: {
      legalEntityName: {
        type: String,
        default: 'COUNTRY HOLIDAYS HOTELS and RESORTS PRIVATE LIMITED',
      },
      companyName: {
        type: String,
        default: 'COUNTRY HOLIDAYS HOTELS and RESORTS PRIVATE LIMITED',
      },
      phone: {
        type: String,
        default: '+91 98991 08543',
      },
      phoneRaw: {
        type: String,
        default: '+919899108543',
      },
      whatsapp: {
        type: String,
        default: '+919899108543',
      },
      whatsappMessage: {
        type: String,
        default: 'Hello Country Holidays Concierge, I would like to enquire about your luxury stays.',
      },
      email: {
        type: String,
        default: 'dharmendra@countryholidaysresorts.com',
      },
      enquiriesEmail: {
        type: String,
        default: 'dharmendra@countryholidaysresorts.com',
      },
      registeredAddress: {
        type: String,
        default: 'F-10, SECOND FLOOR KALKAJI, NEAR UNION BANK, Delhi, Delhi, PIN: 110019',
      },
      operationalAddress: {
        type: String,
        default: 'F-10, SECOND FLOOR KALKAJI, NEAR UNION BANK, Delhi, Delhi, PIN: 110019',
      },
      address: {
        type: String,
        default: 'F-10, SECOND FLOOR KALKAJI, NEAR UNION BANK, Delhi, Delhi, PIN: 110019',
      },
      hours: {
        type: String,
        default: '24/7 Global Luxury Concierge',
      },
    },
    tickerOffers: [
      {
        id: {
          type: String,
          default: () => `t-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        },
        badge: {
          type: String,
          default: 'SPECIAL OFFER',
        },
        badgeColor: {
          type: String,
          default: 'bg-[#FF1F02] text-white',
        },
        text: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          default: '/offers',
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Setting', settingSchema);
