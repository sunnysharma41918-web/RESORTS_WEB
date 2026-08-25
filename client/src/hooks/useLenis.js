import { useEffect } from 'react';

// Lightweight smooth scroll hook
export function useLenis() {
  useEffect(() => {
    // Window scroll optimization
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
}
