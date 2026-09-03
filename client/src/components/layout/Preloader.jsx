import React, { useState, useEffect } from 'react';
import Loader from '../common/Loader';

export default function Preloader({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Ultra fast, smooth entrance
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 150);
    }, 40);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-300 pointer-events-none ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Loader fullscreen text="WELCOME TO THE COUNTRY HOLIDAYS HOTELS AND RESORTS" />
    </div>
  );
}
