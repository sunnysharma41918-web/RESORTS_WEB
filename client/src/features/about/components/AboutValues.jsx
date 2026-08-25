import React from 'react';
import Container from '../../../components/common/Container';
import { ABOUT_DATA } from '../aboutData';

export default function AboutValues() {
  const { values } = ABOUT_DATA;

  return (
    <section className="py-20 bg-luxury-dark text-luxury-light border-y border-luxury-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {values.map((v, i) => (
            <div key={i} className="space-y-2">
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxury-accent block">
                {v.value}
              </span>
              <span className="text-xs uppercase tracking-luxury text-luxury-muted">
                {v.title}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
