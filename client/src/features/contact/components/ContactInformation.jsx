import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../../../data/contact';

export default function ContactInformation() {
  return (
    <div className="space-y-8 bg-luxury-card border border-luxury-border p-8 md:p-12">
      <div>
        <span className="text-xs uppercase tracking-luxury text-luxury-accent block mb-2">
          Concierge Relations
        </span>
        <h3 className="text-2xl font-serif text-luxury-light">
          AURA GLOBAL HEADQUARTERS
        </h3>
      </div>

      <div className="space-y-6 text-sm text-luxury-muted">
        <div className="flex items-start space-x-4">
          <MapPin className="w-5 h-5 text-luxury-accent shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs uppercase tracking-luxury text-luxury-light font-medium">
              Physical Location
            </h5>
            <p className="mt-1 font-light leading-relaxed">{CONTACT_INFO.address}</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Phone className="w-5 h-5 text-luxury-accent shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs uppercase tracking-luxury text-luxury-light font-medium">
              Direct Phone Concierge
            </h5>
            <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="mt-1 block font-light hover:text-luxury-accent">
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <MessageSquare className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs uppercase tracking-luxury text-luxury-light font-medium">
              WhatsApp Concierge
            </h5>
            <p className="mt-1 font-light leading-relaxed">Instant messaging & itinerary requests</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Mail className="w-5 h-5 text-luxury-accent shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs uppercase tracking-luxury text-luxury-light font-medium">
              General Inquiries
            </h5>
            <a href={`mailto:${CONTACT_INFO.email}`} className="mt-1 block font-light hover:text-luxury-accent">
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Clock className="w-5 h-5 text-luxury-accent shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs uppercase tracking-luxury text-luxury-light font-medium">
              Hours of Service
            </h5>
            <p className="mt-1 font-light leading-relaxed">{CONTACT_INFO.hours}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
