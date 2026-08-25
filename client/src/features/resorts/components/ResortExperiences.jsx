import React from 'react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import LazyImage from '../../../components/common/LazyImage';

export default function ResortExperiences({ experiences, resortName }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-luxury-dark text-luxury-light">
      <Container>
        <SectionHeading
          tagline="Tailored Journeys"
          title="SIGNATURE EXPERIENCES"
          subtitle={`Exclusive adventures and wellness rituals hosted at ${resortName}.`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-luxury-card border border-luxury-border flex flex-col justify-between overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <LazyImage
                  src={exp.image}
                  alt={exp.title}
                  aspect="aspect-[16/10]"
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-luxury-black/80 backdrop-blur-md text-[10px] uppercase tracking-luxury text-luxury-accent">
                  {exp.category}
                </span>
              </div>

              <div className="p-6 md:p-8 space-y-3 flex-1">
                <h3 className="text-xl font-serif text-luxury-light">{exp.title}</h3>
                <p className="text-xs md:text-sm text-luxury-muted font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
