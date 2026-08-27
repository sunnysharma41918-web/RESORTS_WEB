import React, { useState, useEffect } from 'react';

const FLOATING_WORDS = [
  '✦ SANCTUARY',
  'CHHR',
  '✨ ESCAPE',
  '🌿 STILLNESS',
  '✦ SERENITY',
  'BREATHE',
  'RESTORE',
  'RECONNECT',
  'ELEVATION 1,850M',
  'SLOW LIVING',
  'HOSPITALITY',
];

const COLORS = ['#FF1F02', '#EAB308', '#16A34A', '#FFFFFF'];

export default function FloatingClickParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Check if target is or contains text
      const target = e.target;
      if (!target) return;

      const isText =
        ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'BLOCKQUOTE', 'A', 'BUTTON'].includes(
          target.tagName
        ) || target.closest('h1, h2, h3, h4, p, span, blockquote');

      // Create 2 to 3 floating particles on text click
      const particleCount = isText ? 2 : 1;
      const newParticles = [];

      for (let i = 0; i < particleCount; i++) {
        const id = Date.now() + Math.random();
        const word = FLOATING_WORDS[Math.floor(Math.random() * FLOATING_WORDS.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        // Random trajectory offsets
        const offsetX = (Math.random() - 0.5) * 80;
        const offsetY = -40 - Math.random() * 60;
        const rotation = (Math.random() - 0.5) * 25;
        const scale = 0.85 + Math.random() * 0.3;

        newParticles.push({
          id,
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 20,
          word,
          color,
          offsetX,
          offsetY,
          rotation,
          scale,
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      // Remove after animation finishes (1.2s)
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.some((np) => np.id === p.id))
        );
      }, 1200);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-xs sm:text-sm font-extrabold uppercase font-mono tracking-widest px-2.5 py-1 rounded-none border border-current shadow-lg backdrop-blur-sm animate-float-fade"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            color: p.color,
            borderColor: `${p.color}40`,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            transform: `translate(-50%, -50%)`,
            '--offset-x': `${p.offsetX}px`,
            '--offset-y': `${p.offsetY}px`,
            '--rot': `${p.rotation}deg`,
            '--scale': p.scale,
          }}
        >
          {p.word}
        </div>
      ))}
    </div>
  );
}
