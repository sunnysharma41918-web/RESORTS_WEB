import { CONTACT_INFO } from '../../data/contact';

export const CONTACT_PAGE_DATA = {
  hero: {
    tagline: 'Direct Concierge & Inquiries',
    title: 'CONNECT WITH OUR CONCIERGE',
    subtitle: 'Whether you wish to arrange a private resort exploration, inquire about bespoke itineraries, or connect with our guest relations team.',
  },
  contacts: CONTACT_INFO,
  headquarters: {
    title: 'COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED',
    legalEntityName: CONTACT_INFO.legalEntityName,
    registeredAddress: CONTACT_INFO.registeredAddress,
    operationalAddress: CONTACT_INFO.operationalAddress,
    address: CONTACT_INFO.address,
    coordinates: { lat: 28.5385, lng: 77.2605 },
    phone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
  },
};
