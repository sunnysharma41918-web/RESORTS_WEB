import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

export default function ResortContact({ resort }) {
  if (!resort) return null;

  const phone = resort.contact?.phone || '+91 98765 43210';
  const whatsapp = resort.contact?.whatsapp || '+919876543210';
  const email = resort.contact?.email || 'concierge@aura-resorts.com';

  return (
    <section className="py-20 md:py-32 bg-luxury-dark text-luxury-light border-t border-luxury-border">
      <Container className="text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-luxury text-luxury-accent">
            Inquire About {resort.name}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">
            PLAN YOUR PRIVATE ESCAPE
          </h2>

          <p className="text-sm md:text-base text-luxury-muted font-light leading-relaxed">
            Our private sanctuary host is ready to assist with personalized itineraries, suite recommendations, and special requests.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Button href={`tel:${phone}`} variant="primary" icon={<Phone className="w-4 h-4" />}>
              Call Sanctuary
            </Button>
            <Button
              href={`https://wa.me/${whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(`Hello, I would like to inquire about ${resort.name}.`)}`}
              variant="secondary"
              icon={<MessageSquare className="w-4 h-4" />}
            >
              WhatsApp
            </Button>
            <Button href={`mailto:${email}?subject=${encodeURIComponent(`Inquiry for ${resort.name}`)}`} variant="outline" icon={<Mail className="w-4 h-4" />}>
              Email Concierge
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
