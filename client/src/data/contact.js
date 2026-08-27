export const CONTACT_INFO = {
  companyName: 'Country Holidays Hotels & Resorts Group',
  phone: '+91 98765 43210',
  phoneRaw: '+919876543210',
  whatsapp: '+919876543210', // Easy to update or configure later
  whatsappMessage: 'Hello Country Holidays Hotels & Resorts, I would like to book our stay.',
  email: 'info@countryholidaysresorts.com',
  address: '111, Rajiv Gandhi Salai, OMR, Kottivakkam, Chennai, Tamil Nadu 600041',
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

  const cleanNumber = (whatsappNumber || '+919876543210').replace(/[^0-9]/g, '');
  const message = encodeURIComponent(customMessage || defaultMsg || 'Hello Country Holidays Hotels & Resorts, I would like to book our stay.');
  return `https://wa.me/${cleanNumber}?text=${message}`;
}

