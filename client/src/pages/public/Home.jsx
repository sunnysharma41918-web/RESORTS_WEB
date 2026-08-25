import React from 'react';
import HomeHero from '../../features/home/components/HomeHero';
import ResortIntro from '../../features/home/components/ResortIntro';
import ResortStory from '../../features/home/components/ResortStory';
import RoomsSuitesSection from '../../features/home/components/RoomsSuitesSection';
import ResortExperiencesSection from '../../features/home/components/ResortExperiencesSection';
import AmenitiesSection from '../../features/home/components/AmenitiesSection';
import CinematicSection from '../../features/home/components/CinematicSection';
import DiningSection from '../../features/home/components/DiningSection';
import WellnessSection from '../../features/home/components/WellnessSection';
import DestinationSection from '../../features/home/components/DestinationSection';
import GuestReviewsSection from '../../features/home/components/GuestReviewsSection';
import ResortGallerySection from '../../features/home/components/ResortGallerySection';
import FinalBookingCTA from '../../features/home/components/FinalBookingCTA';
import ConnectingVisualSpine from '../../components/common/ConnectingVisualSpine';
import { useHomeData } from '../../features/home/hooks/useHomeData';
import Loader from '../../components/common/Loader';

export default function Home() {
  const { hero, loading } = useHomeData();

  if (loading) {
    return <Loader fullscreen text="Sculpting Architectural Serenity" />;
  }

  return (
    <div className="relative w-full overflow-hidden bg-[#1C1C1C] text-white">
      {/* 1. HERO (100% UNTOUCHED AS INSTRUCTED) */}
      <HomeHero data={hero} />

      {/* CONTINUOUS CONNECTING COLOR GRAPHIC SPINE ACROSS ALL SECTIONS */}
      <div className="relative w-full">
        <ConnectingVisualSpine />

        {/* 2. IVORY: ABOUT ("A QUIETER WAY TO ESCAPE.") */}
        <ResortIntro />

        {/* 3. BLACK: RESORT STORY ("NOT JUST A PLACE TO STAY.") */}
        <ResortStory />

        {/* 4. IVORY: ACCOMMODATION ("STAY YOUR WAY.") */}
        <RoomsSuitesSection />

        {/* 5. DARK: EXPERIENCES ("EXPERIENCES THAT STAY WITH YOU.") */}
        <ResortExperiencesSection />

        {/* 6. IVORY: AMENITIES ("CURATED FOR EFFORTLESS LIVING.") */}
        <AmenitiesSection />

        {/* 7. CINEMATIC IMAGE ("THE SANCTUARY JOURNEY") */}
        <CinematicSection />

        {/* 7. IVORY: DINING ("FOOD WORTH REMEMBERING.") */}
        <DiningSection />

        {/* 8. BLACK: WELLNESS ("REST. RESET. RECONNECT.") */}
        <WellnessSection />

        {/* 9. IVORY: LOCATION ("FAR FROM THE ORDINARY.") */}
        <DestinationSection />

        {/* 10. BLACK: TESTIMONIAL ("Some places are visited. Others are remembered.") */}
        <GuestReviewsSection />

        {/* 11. IVORY: GALLERY ("THE LIVING GALLERY.") */}
        <ResortGallerySection />

        {/* 12. BLACK: FINAL CTA ("YOUR NEXT ESCAPE STARTS HERE.") */}
        <FinalBookingCTA />
      </div>
    </div>
  );
}
