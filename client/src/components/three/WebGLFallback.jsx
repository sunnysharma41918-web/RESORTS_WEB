import React from 'react';

export default function WebGLFallback() {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-luxury-stone/40 border border-luxury-border p-8 text-center">
      <span className="text-xs uppercase tracking-luxury text-luxury-accent mb-2">Architectural Sculpture</span>
      <h4 className="text-xl font-serif text-luxury-light mb-2">Monolithic Geometric Sanctuary</h4>
      <p className="text-xs text-luxury-muted max-w-sm">
        Experience our bespoke architectural harmony designed for sensory stillness.
      </p>
    </div>
  );
}
