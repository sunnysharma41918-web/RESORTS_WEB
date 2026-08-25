import React from 'react';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

export default function ExperienceDetails({ experience }) {
  if (!experience) return null;

  return (
    <div className="p-6 bg-luxury-card border border-luxury-border space-y-4">
      <h3 className="text-2xl font-serif text-luxury-light">{experience.title}</h3>
      <p className="text-sm text-luxury-muted leading-relaxed">{experience.description}</p>
      <div className="pt-4">
        <Button to="/contact" variant="primary" size="sm">
          Enquire About Experience
        </Button>
      </div>
    </div>
  );
}
