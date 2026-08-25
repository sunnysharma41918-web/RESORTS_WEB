import React from 'react';
import { Waves, Sparkles, Utensils, Compass, Wifi, ShieldCheck } from 'lucide-react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';

const iconMap = {
  Waves: Waves,
  Sparkles: Sparkles,
  Utensils: Utensils,
  Compass: Compass,
  Wifi: Wifi,
  ShieldCheck: ShieldCheck,
};

export default function ResortAmenities({ amenities }) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-luxury-black text-luxury-light">
      <Container>
        <SectionHeading
          tagline="Bespoke Comfort"
          title="PROPERTY AMENITIES"
          subtitle="Crafted amenities and high-touch services designed to elevate your stay."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="p-6 bg-luxury-stone/30 border border-luxury-border flex items-center space-x-4"
              >
                <div className="p-3 bg-luxury-stone border border-white/5 text-luxury-accent">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-luxury-light tracking-wide">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
