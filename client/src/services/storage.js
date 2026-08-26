import { RESORTS_DATA } from '../features/resorts/resortData';
import { HOTELS_DATA } from '../features/hotels/hotelData';
import { EXPERIENCES_DATA } from '../features/experiences/experienceData';
import { GALLERY_DATA } from '../features/gallery/galleryData';
import { OFFERS_DATA } from '../features/offers/offersData';
import { CONTACT_INFO } from '../data/contact';
import { SITE_CONFIG } from '../data/siteConfig';

const KEYS = {
  RESORTS: 'aura_resorts',
  HOTELS: 'aura_hotels',
  EXPERIENCES: 'aura_experiences',
  GALLERY: 'aura_gallery',
  OFFERS: 'aura_offers',
  SETTINGS: 'aura_settings',
  INQUIRIES: 'aura_inquiries',
};

const DEFAULT_INQUIRIES = [
  {
    id: 'inq-1',
    guestName: 'Lady Victoria Sterling',
    email: 'v.sterling@mayfair.co.uk',
    phone: '+44 7700 900077',
    property: 'Azure Coast Sanctuary',
    message: 'Requesting helicopter arrival coordination and 4-night stay in the Oceanfront Cantilever Villa for our anniversary.',
    status: 'new', // new, in-progress, resolved
    createdAt: '2026-08-23T10:30:00.000Z',
  },
  {
    id: 'inq-2',
    guestName: 'Aarav Singhania',
    email: 'aarav.s@singhaniacapital.com',
    phone: '+91 98200 11223',
    property: 'The Grand Vista Urban Tower',
    message: 'Corporate hospitality booking for senior board directors. Need private boardroom and presidential penthouse.',
    status: 'in-progress',
    createdAt: '2026-08-22T15:45:00.000Z',
  },
];

function initCollection(key, initialData) {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(stored);
  } catch {
    return initialData;
  }
}

export const storage = {
  getResorts() {
    return initCollection(KEYS.RESORTS, RESORTS_DATA);
  },
  saveResorts(data) {
    localStorage.setItem(KEYS.RESORTS, JSON.stringify(data));
  },

  getHotels() {
    const data = initCollection(KEYS.HOTELS, HOTELS_DATA);
    if (data.length < HOTELS_DATA.length) {
      localStorage.setItem(KEYS.HOTELS, JSON.stringify(HOTELS_DATA));
      return HOTELS_DATA;
    }
    return data;
  },
  saveHotels(data) {
    localStorage.setItem(KEYS.HOTELS, JSON.stringify(data));
  },

  getExperiences() {
    return initCollection(KEYS.EXPERIENCES, EXPERIENCES_DATA);
  },
  saveExperiences(data) {
    localStorage.setItem(KEYS.EXPERIENCES, JSON.stringify(data));
  },

  getGallery() {
    return initCollection(KEYS.GALLERY, GALLERY_DATA);
  },
  saveGallery(data) {
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(data));
  },

  getOffers() {
    return initCollection(KEYS.OFFERS, OFFERS_DATA);
  },
  saveOffers(data) {
    localStorage.setItem(KEYS.OFFERS, JSON.stringify(data));
  },

  getSettings() {
    return initCollection(KEYS.SETTINGS, {
      siteConfig: SITE_CONFIG,
      contactInfo: CONTACT_INFO,
    });
  },
  saveSettings(data) {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(data));
  },

  getInquiries() {
    return initCollection(KEYS.INQUIRIES, DEFAULT_INQUIRIES);
  },
  saveInquiries(data) {
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(data));
  },

  resetAllToDefault() {
    localStorage.setItem(KEYS.RESORTS, JSON.stringify(RESORTS_DATA));
    localStorage.setItem(KEYS.HOTELS, JSON.stringify(HOTELS_DATA));
    localStorage.setItem(KEYS.EXPERIENCES, JSON.stringify(EXPERIENCES_DATA));
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(GALLERY_DATA));
    localStorage.setItem(KEYS.OFFERS, JSON.stringify(OFFERS_DATA));
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify({ siteConfig: SITE_CONFIG, contactInfo: CONTACT_INFO }));
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(DEFAULT_INQUIRIES));
  },
};
