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
      phone: {
        type: String,
        default: '+91 98765 43210',
      },
      phoneRaw: {
        type: String,
        default: '+919876543210',
      },
      whatsapp: {
        type: String,
        default: '+919876543210',
      },
      whatsappMessage: {
        type: String,
        default: 'Hello Country Holidays Concierge, I would like to enquire about your luxury stays.',
      },
      email: {
        type: String,
        default: 'info@countryholidaysresorts.com',
      },
      enquiriesEmail: {
        type: String,
        default: 'info@countryholidaysresorts.com',
      },
      address: {
        type: String,
        default: 'Country Holidays Corporate Pavilion, Ocean Avenue, Goa, India',
      },
      hours: {
        type: String,
        default: '24/7 Global Luxury Concierge',
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Setting', settingSchema);
