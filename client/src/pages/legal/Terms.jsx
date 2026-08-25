import React from 'react';
import Container from '../../components/common/Container';

export default function Terms() {
  return (
    <div className="w-full pt-32 pb-24 bg-luxury-black text-luxury-light min-h-screen">
      <Container className="max-w-4xl">
        <span className="text-xs uppercase tracking-luxury text-luxury-accent block mb-3">
          Terms & Conditions
        </span>
        <h1 className="text-4xl font-serif mb-8">TERMS OF EXPERIENCE</h1>

        <div className="space-y-6 text-sm text-luxury-muted font-light leading-relaxed">
          <p>
            Welcome to AURA. By accessing our showcase platform and interacting with our concierge channels, you agree to the following terms and guidelines.
          </p>
          <h3 className="text-lg font-serif text-luxury-light pt-4">1. Showcase Purpose</h3>
          <p>
            This website serves as a digital architectural showcase and direct inquiry platform for AURA properties. All reservations and stays are confirmed individually through personal concierge agreements.
          </p>
          <h3 className="text-lg font-serif text-luxury-light pt-4">2. Proprietary Imagery & Architectural IP</h3>
          <p>
            All architectural designs, photography, and editorial narratives presented on this website are proprietary to AURA Hospitality Group and its architectural partners.
          </p>
        </div>
      </Container>
    </div>
  );
}
