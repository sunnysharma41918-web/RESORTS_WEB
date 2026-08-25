import React from 'react';
import { Phone, MessageSquare, Mail, Compass } from 'lucide-react';
import { CONTACT_INFO } from '../../../data/contact';

export default function ContactCTA() {
  return (
    <section className="relative py-28 md:py-40 bg-luxury-black text-luxury-light overflow-hidden px-6 sm:px-12 lg:px-16 xl:px-20 select-none">
      {/* Background Image: Mist Alpine Lake Chalet */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2560&q=85"
          alt="Contact Country Holidays Concierge"
          className="w-full h-full object-cover object-center brightness-[0.70] contrast-[1.10]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-black/45 to-black/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/60 border border-sky-500/30 backdrop-blur-xl text-xs uppercase tracking-luxury text-sky-400 shadow-xl">
          <Compass className="w-3.5 h-3.5 text-sky-400" />
          <span>Global Slowhouse Concierge</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white uppercase leading-[0.98]">
          Begin Your Private <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
            Journey of Stillness
          </span>
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-white/80 font-light max-w-xl mx-auto leading-relaxed">
          Direct communication for bespoke villa bookings, helicopter transfers, and custom dining itineraries.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={`tel:${CONTACT_INFO.phoneRaw}`}
            className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-sky-400 text-black font-bold text-xs uppercase tracking-luxury transition-all duration-300 shadow-2xl hover:scale-105 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>{CONTACT_INFO.phone}</span>
          </a>

          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-black/60 hover:bg-black/80 border border-sky-500/40 text-white font-medium text-xs uppercase tracking-luxury transition-all duration-300 shadow-xl hover:border-sky-300"
          >
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>WhatsApp Concierge</span>
          </a>

          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white/90 font-medium text-xs uppercase tracking-luxury transition-all duration-300 shadow-xl"
          >
            <Mail className="w-4 h-4 text-sky-400" />
            <span>Email Desk</span>
          </a>
        </div>
      </div>
    </section>
  );
}
