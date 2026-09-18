import React, { useState, useEffect } from 'react';
import Loader from '../common/Loader';

export default function Preloader({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Pure, clean 2.6s single door/parda open transition
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 500);
    }, 2600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 150);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] transition-all duration-500 cursor-pointer ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <Loader 
        fullscreen 
        text="THE COUNTRY HOLIDAYS HOTELS & RESORTS" 
      />
    </div>
  );
}
