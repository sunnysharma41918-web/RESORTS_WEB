import React from 'react';
import HomeHero from '../../features/home/components/HomeHero';
import ResortStory from '../../features/home/components/ResortStory';
import RoomsSuitesSection from '../../features/home/components/RoomsSuitesSection';
import ResortExperiencesSection from '../../features/home/components/ResortExperiencesSection';
import DestinationSection from '../../features/home/components/DestinationSection';
import GuestReviewsSection from '../../features/home/components/GuestReviewsSection';
import CustomerCareSection from '../../features/home/components/CustomerCareSection';
import ConnectingVisualSpine from '../../components/common/ConnectingVisualSpine';
import { useHomeData } from '../../features/home/hooks/useHomeData';
import Loader from '../../components/common/Loader';

export default function Home() {
  const { hero } = useHomeData();

  return (
    <div className="relative w-full overflow-hidden dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] transition-colors duration-300">
      {/* 1. HERO */}
      <HomeHero data={hero} />

      {/* CONTINUOUS CONNECTING COLOR GRAPHIC SPINE ACROSS ALL SECTIONS */}
      <div className="relative w-full">
        <ConnectingVisualSpine />

        {/* 1. RESORT STORY */}
        <ResortStory />

        {/* 2. ACCOMMODATION */}
        <RoomsSuitesSection />

        {/* 3. EXPERIENCES & SPECIALIZATIONS */}
        <ResortExperiencesSection />

        {/* 4. LOCATION / DESTINATIONS */}
        <DestinationSection />

        {/* 5. TESTIMONIALS */}
        <GuestReviewsSection />

        {/* 6. 24/7 CUSTOMER CARE & CONCIERGE */}
        <CustomerCareSection />
      </div>
    </div>
  );
}
