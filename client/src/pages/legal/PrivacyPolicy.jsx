import React from 'react';
import Container from '../../components/common/Container';

export default function PrivacyPolicy() {
  return (
    <div className="w-full pt-32 pb-24 bg-luxury-black text-luxury-light min-h-screen">
      <Container className="max-w-4xl">
        <span className="text-xs uppercase tracking-luxury text-luxury-accent block mb-3">
          Legal & Privacy
        </span>
        <h1 className="text-4xl font-serif mb-8">PRIVACY POLICY</h1>
        
        <div className="space-y-6 text-sm text-luxury-muted font-light leading-relaxed">
          <p>
            At AURA Hospitality Group, the confidentiality and privacy of our guests is paramount. This Privacy Policy outlines our commitment to safeguarding all personal information collected through inquiries and reservations.
          </p>
          <h3 className="text-lg font-serif text-luxury-light pt-4">1. Collection of Personal Details</h3>
          <p>
            We collect personal details provided directly by you when you contact our concierge, including your name, contact phone number, email address, and tailored itinerary preferences.
          </p>
          <h3 className="text-lg font-serif text-luxury-light pt-4">2. Concierge Use Only</h3>
          <p>
            Your information is exclusively utilized to curate bespoke stays, provide airport transfers, and deliver personalized concierge services. We do not sell or monetize guest data to third parties.
          </p>
        </div>
      </Container>
    </div>
  );
}
