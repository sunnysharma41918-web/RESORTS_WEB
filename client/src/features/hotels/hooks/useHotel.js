import { useState, useEffect } from 'react';
import { hotelService } from '../../../services/hotelService';

export function useHotel(slug) {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchHotel() {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await hotelService.getHotelBySlug(slug);
        if (isMounted) {
          setHotel(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }
    fetchHotel();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { hotel, loading, error };
}
