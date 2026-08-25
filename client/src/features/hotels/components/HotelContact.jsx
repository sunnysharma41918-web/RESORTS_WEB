import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

export default function HotelContact({ hotel }) {
  if (!hotel) return null;

  const phone = hotel.contact?.phone || '+91 98765 43220';
  const whatsapp = hotel.contact?.whatsapp || '+919876543220';
  const email = hotel.contact?.email || 'concierge@aura-resorts.com';

  return (
    <section className="py-20 md:py-32 bg-luxury-dark text-luxury-light border-t border-luxury-border">
      <Container className="text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-luxury text-luxury-accent">
            Inquire About {hotel.name}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif">
            ARRANGE YOUR STAY
          </h2>

          <p className="text-sm md:text-base text-luxury-muted font-light leading-relaxed">
            Connect directly with the guest relations desk for executive reservations, private dining suites, or corporate hospitality bookings.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Button href={`tel:${phone}`} variant="primary" icon={<Phone className="w-4 h-4" />}>
              Call Hotel Desk
            </Button>
            <Button
              href={`https://wa.me/${whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(`Hello, I would like to inquire about ${hotel.name}.`)}`}
              variant="secondary"
              icon={<MessageSquare className="w-4 h-4" />}
            >
              WhatsApp
            </Button>
            <Button href={`mailto:${email}?subject=${encodeURIComponent(`Inquiry for ${hotel.name}`)}`} variant="outline" icon={<Mail className="w-4 h-4" />}>
              Email Concierge
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
