import { useState, useEffect } from 'react';
import { hotelService } from '../../../services/hotelService';

export function useHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchHotels() {
      try {
        const data = await hotelService.getAllHotels();
        if (isMounted) {
          setHotels(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }
    fetchHotels();
    return () => {
      isMounted = false;
    };
  }, []);

  return { hotels, loading, error };
}
