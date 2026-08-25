import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { animatePageIn } from '../animations/pageTransition';

export function usePageTransition() {
  const location = useLocation();
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (pageRef.current) {
      animatePageIn(pageRef.current);
    }
  }, [location.pathname]);

  return { pageRef, pathname: location.pathname };
}
