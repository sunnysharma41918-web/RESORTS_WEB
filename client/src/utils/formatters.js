export function formatPhoneNumber(phone) {
  if (!phone) return '';
  return phone.replace(/(\+?\d{2})(\d{5})(\d{5})/, '$1 $2 $3');
}

export function formatNumberWithLeadingZero(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

export function truncateText(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}
