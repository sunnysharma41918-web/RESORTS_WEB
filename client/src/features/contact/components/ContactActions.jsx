import React from 'react';
import { Phone, Mail, MessageSquare, Navigation } from 'lucide-react';
import Button from '../../../components/common/Button';
import { CONTACT_INFO } from '../../../data/contact';

export default function ContactActions({ className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}>
      <Button
        href={`tel:${CONTACT_INFO.phoneRaw}`}
        variant="primary"
        size="lg"
        icon={<Phone className="w-4 h-4" />}
      >
        Call Direct
      </Button>

      <Button
        href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`}
        variant="secondary"
        size="lg"
        icon={<MessageSquare className="w-4 h-4" />}
      >
        WhatsApp
      </Button>

      <Button
        href={`mailto:${CONTACT_INFO.email}`}
        variant="outline"
        size="lg"
        icon={<Mail className="w-4 h-4" />}
      >
        Email Us
      </Button>
    </div>
  );
}
