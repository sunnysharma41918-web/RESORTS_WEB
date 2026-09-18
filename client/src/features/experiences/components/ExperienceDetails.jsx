import React from 'react';
import { MessageCircle } from 'lucide-react';
import Container from '../../../components/common/Container';
import { getWhatsAppBookingUrl } from '../../../data/contact';

export default function ExperienceDetails({ experience }) {
  if (!experience) return null;

  return (
    <div className="p-6 bg-luxury-card border border-luxury-border space-y-4">
      <h3 className="text-2xl font-serif text-luxury-light">{experience.title}</h3>
      <p className="text-sm text-luxury-muted leading-relaxed">{experience.description}</p>
      <div className="pt-4">
        <a
          href={getWhatsAppBookingUrl(`Hello Country Holidays Hotels & Resorts, I would like to enquire about the experience: ${experience.title}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#22C55E] hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
          <span>Enquire About Experience</span>
        </a>
      </div>
    </div>
  );
}
