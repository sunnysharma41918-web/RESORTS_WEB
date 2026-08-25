import React from 'react';
import { Sparkles, MapPin, Phone, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../../../data/contact';

export default function ResortOverview({ resort }) {
  const { description, location, contact } = resort || {};
  const phone = contact?.phone || CONTACT_INFO.phone;
  const whatsapp = contact?.whatsapp || CONTACT_INFO.whatsapp;

  return (
    <section className="py-20 bg-luxury-dark text-luxury-light px-6 sm:px-12 lg:px-16 xl:px-20 border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md text-xs uppercase tracking-luxury text-luxury-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architectural Narrative</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Crafted for Unbroken Stillness & Natural Splendor
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-luxury-muted font-light leading-relaxed">
            {description ? (
              description.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))
            ) : (
              <p>
                Nestled within untamed landscapes, this sanctuary was conceived as a living sculpture where modern monolithic design merges with the surrounding horizon.
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 bg-luxury-card border border-luxury-border p-8 rounded-3xl space-y-6 shadow-2xl">
          <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight">
            Concierge Coordination
          </h3>

          <p className="text-xs text-luxury-muted font-light leading-relaxed">
            Private villa arrivals, helicopter charter transfers, and bespoke dining coordination.
          </p>

          <div className="space-y-3 pt-2">
            <a
              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-white text-luxury-black hover:bg-luxury-sand text-xs uppercase tracking-luxury font-bold transition-all shadow-xl"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Call Direct</span>
            </a>

            <a
              href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-xs uppercase tracking-luxury font-bold text-white transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 text-green-400" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
