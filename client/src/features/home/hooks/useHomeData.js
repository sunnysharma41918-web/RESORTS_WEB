import { useState, useEffect } from 'react';
import { resortService } from '../../../services/resortService';
import { hotelService } from '../../../services/hotelService';
import { roomService } from '../../../services/roomService';
import { experienceService } from '../../../services/experienceService';
import { testimonialService } from '../../../services/testimonialService';
import { galleryService } from '../../../services/galleryService';
import { HOME_HERO_DATA, HOME_INTRO_DATA } from '../homeData';

export function useHomeData() {
  const [data, setData] = useState({
    hero: HOME_HERO_DATA,
    intro: HOME_INTRO_DATA,
    featuredResorts: [],
    featuredHotels: [],
    featuredRooms: [],
    experiences: [],
    testimonials: [],
    gallery: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const [resorts, hotels, rooms, exps, testimonials, gallery] = await Promise.all([
          resortService.getFeaturedResorts(),
          hotelService.getFeaturedHotels(),
          roomService.getFeaturedRooms(),
          experienceService.getFeaturedExperiences(),
          testimonialService.getTestimonials(),
          galleryService.getGalleryItems(),
        ]);

        if (isMounted) {
          setData({
            hero: HOME_HERO_DATA,
            intro: HOME_INTRO_DATA,
            featuredResorts: resorts,
            featuredHotels: hotels,
            featuredRooms: rooms,
            experiences: exps,
            testimonials,
            gallery,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (isMounted) {
          setData((prev) => ({ ...prev, loading: false, error: err.message }));
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return data;
}
