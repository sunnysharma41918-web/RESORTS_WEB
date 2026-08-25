import React from 'react';
import { usePageTransition } from '../../hooks/usePageTransition';

export default function PageTransition({ children }) {
  const { pageRef } = usePageTransition();

  return (
    <div ref={pageRef} className="w-full min-h-screen">
      {children}
    </div>
  );
}
