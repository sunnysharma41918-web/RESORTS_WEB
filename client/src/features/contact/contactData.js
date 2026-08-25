import { CONTACT_INFO } from '../../data/contact';

export const CONTACT_PAGE_DATA = {
  hero: {
    tagline: 'Direct Concierge & Inquiries',
    title: 'CONNECT WITH OUR CONCIERGE',
    subtitle: 'Whether you wish to arrange a private resort exploration, inquire about bespoke itineraries, or connect with our guest relations team.',
  },
  contacts: CONTACT_INFO,
  headquarters: {
    title: 'Country Holidays Travel Resorts Headquarters',
    address: 'Pavilion 7, Ocean Crest Boulevard, Morjim, Goa 403512, India',
    coordinates: { lat: 15.6333, lng: 73.7333 },
    phone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
  },
};
