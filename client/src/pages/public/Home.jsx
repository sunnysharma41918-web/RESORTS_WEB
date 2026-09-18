import React from 'react';
import HomeHero from '../../features/home/components/HomeHero';
import ResortStory from '../../features/home/components/ResortStory';
import RoomsSuitesSection from '../../features/home/components/RoomsSuitesSection';
import DestinationSection from '../../features/home/components/DestinationSection';
import GuestReviewsSection from '../../features/home/components/GuestReviewsSection';
import FAQSection from '../../features/home/components/FAQSection';
import ConnectingVisualSpine from '../../components/common/ConnectingVisualSpine';
import { useHomeData } from '../../features/home/hooks/useHomeData';
import Loader from '../../components/common/Loader';

export default function Home() {
  const { hero } = useHomeData();

  return (
    <div className="relative w-full overflow-hidden bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] transition-colors duration-500">
      {/* 1. HERO (Kept untouched as requested) */}
      <HomeHero data={hero} />

      {/* CONTINUOUS CONNECTING COLOR GRAPHIC SPINE ACROSS ALL SECTIONS */}
      <div className="relative w-full">
        <ConnectingVisualSpine />

        {/* 1. RESORT STORY */}
        <ResortStory />

        {/* 2. ACCOMMODATION */}
        <RoomsSuitesSection />

        {/* 3. LOCATION / DESTINATIONS */}
        <DestinationSection />

        {/* 4. TESTIMONIALS */}
        <GuestReviewsSection />

        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        <FAQSection />
      </div>
    </div>
  );
}
