import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import Button from '../../../components/common/Button';

export default function ResortLocation({ resort }) {
  if (!resort) return null;

  return (
    <section className="py-20 md:py-32 bg-luxury-black text-luxury-light">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              tagline="Location & Access"
              title="GETTING THERE"
              subtitle={`Nestled in ${resort.location}. Private airport and helipad transfers coordinated by your concierge.`}
            />

            <div className="p-6 bg-luxury-stone/40 border border-luxury-border space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-luxury-accent mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-luxury text-luxury-light font-medium">
                    Sanctuary Address
                  </h4>
                  <p className="text-sm text-luxury-muted mt-1">{resort.contact?.address || resort.location}</p>
                </div>
              </div>
            </div>

            <div>
              <Button
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resort.name + ' ' + resort.location)}`}
                variant="outline"
                icon={<Navigation className="w-4 h-4" />}
              >
                Open Navigation
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 bg-luxury-card border border-luxury-border text-center space-y-4">
            <span className="text-xs uppercase tracking-luxury text-luxury-accent">Private Transfer Fleet</span>
            <h4 className="text-2xl font-serif text-luxury-light">Helicopter & Luxury Chauffeur</h4>
            <p className="text-xs text-luxury-muted leading-relaxed max-w-md mx-auto">
              Our direct guest arrival protocol ensures seamless, private passage from executive airports directly to your villa veranda.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
