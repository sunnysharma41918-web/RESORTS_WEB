import { useState, useEffect } from 'react';
import { resortService } from '../../../services/resortService';

export function useResort(slug) {
  const [resort, setResort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchResort() {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await resortService.getResortBySlug(slug);
        if (isMounted) {
          setResort(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }
    fetchResort();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { resort, loading, error };
}
