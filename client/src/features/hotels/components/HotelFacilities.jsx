import React from 'react';
import { Waves, Sparkles, Utensils, Laptop, Dumbbell, Wine, Briefcase, Car, Trees } from 'lucide-react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';

const iconMap = {
  Waves: Waves,
  Sparkles: Sparkles,
  Utensils: Utensils,
  Laptop: Laptop,
  Dumbbell: Dumbbell,
  Wine: Wine,
  Briefcase: Briefcase,
  Car: Car,
  Trees: Trees,
};

export default function HotelFacilities({ facilities }) {
  if (!facilities || facilities.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-luxury-black text-luxury-light">
      <Container>
        <SectionHeading
          tagline="Hotel Amenities"
          title="FACILITIES & SERVICES"
          subtitle="World-class executive, culinary, and wellness facilities designed for discerning urban stays."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((item, idx) => {
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
