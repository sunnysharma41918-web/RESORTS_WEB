import { useState, useEffect } from 'react';
import { resortService } from '../../../services/resortService';

export function useResorts() {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchResorts() {
      try {
        const data = await resortService.getAllResorts();
        if (isMounted) {
          setResorts(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }
    fetchResorts();
    return () => {
      isMounted = false;
    };
  }, []);

  return { resorts, loading, error };
}
