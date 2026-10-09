export const CONTACT_INFO = {
  legalEntityName: 'COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED',
  companyName: 'COUNTRY HOLIDAYS HOTELS & RESORTS PRIVATE LIMITED',
  brandName: 'Country Holidays Hotels & Resorts',
  phone: '+91 98991 08543',
  phoneRaw: '+919899108543',
  whatsapp: '+919899108543',
  whatsappMessage: 'Hello Country Holidays Hotels & Resorts, I would like to book our stay.',
  email: 'dharmendra@countryholidaysresorts.com',
  registeredAddress: 'F-10, SECOND FLOOR KALKAJI, NEAR UNION BANK, Delhi, Delhi, PIN: 110019',
  operationalAddress: 'F-10, SECOND FLOOR KALKAJI, NEAR UNION BANK, Delhi, Delhi, PIN: 110019',
  address: 'F-10, SECOND FLOOR KALKAJI, NEAR UNION BANK, Delhi, Delhi, PIN: 110019',
  hours: '24/7 Global Luxury Concierge',
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    pinterest: 'https://pinterest.com'
  }
};

/**
 * Returns dynamic WhatsApp booking link with pre-filled message
 */
export function getWhatsAppBookingUrl(customMessage) {
  let whatsappNumber = CONTACT_INFO.whatsapp;
  let defaultMsg = CONTACT_INFO.whatsappMessage;

  try {
    const settingsStr = localStorage.getItem('resorts_cms_settings');
    if (settingsStr) {
      const parsed = JSON.parse(settingsStr);
      if (parsed?.contactInfo?.whatsapp) {
        whatsappNumber = parsed.contactInfo.whatsapp;
      }
      if (parsed?.contactInfo?.whatsappMessage) {
        defaultMsg = parsed.contactInfo.whatsappMessage;
      }
    }
  } catch (e) {
    // fallback
  }

  const cleanNumber = (whatsappNumber || CONTACT_INFO.phoneRaw || '+919899108543').replace(/[^0-9]/g, '');
  const message = encodeURIComponent(customMessage || defaultMsg || 'Hello Country Holidays Hotels & Resorts, I would like to book our stay.');
  return `https://wa.me/${cleanNumber}?text=${message}`;
}

