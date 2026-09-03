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
    loading: false,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const [resorts, hotels, rooms, exps, testimonials, gallery] = await Promise.all([
          resortService.getFeaturedResorts().catch(() => []),
          hotelService.getFeaturedHotels().catch(() => []),
          roomService.getFeaturedRooms().catch(() => []),
          experienceService.getFeaturedExperiences().catch(() => []),
          testimonialService.getTestimonials().catch(() => []),
          galleryService.getGalleryItems().catch(() => []),
        ]);

        if (isMounted) {
          setData({
            hero: HOME_HERO_DATA,
            intro: HOME_INTRO_DATA,
            featuredResorts: resorts || [],
            featuredHotels: hotels || [],
            featuredRooms: rooms || [],
            experiences: exps || [],
            testimonials: testimonials || [],
            gallery: gallery || [],
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (isMounted) {
          setData((prev) => ({ ...prev, loading: false, error: err?.message || null }));
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

