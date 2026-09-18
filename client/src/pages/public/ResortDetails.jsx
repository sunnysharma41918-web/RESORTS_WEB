import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResort } from '../../features/resorts/hooks/useResort';
import ResortHero from '../../features/resorts/components/ResortHero';
import ResortOverview from '../../features/resorts/components/ResortOverview';
import ResortGallery from '../../features/resorts/components/ResortGallery';
import ResortRooms from '../../features/resorts/components/ResortRooms';
import ResortAmenities from '../../features/resorts/components/ResortAmenities';
import ResortExperiences from '../../features/resorts/components/ResortExperiences';
import ResortLocation from '../../features/resorts/components/ResortLocation';
import ResortContact from '../../features/resorts/components/ResortContact';
import Loader from '../../components/common/Loader';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../components/common/RoyalOrnamentDivider';

export default function ResortDetails() {
  const { slug } = useParams();
  const { resort, loading, error } = useResort(slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0]">
        <Loader size="lg" text="Curating sanctuary details..." />
      </div>
    );
  }

  if (error || !resort) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] text-center p-8 space-y-6 font-sans">
        <h2 className="text-3xl font-serif">Sanctuary Not Found</h2>
        <RoyalOrnamentDivider color="#8F6B2E" />
        <p className="text-[#6E5D4F] dark:text-[#B8A89A] text-sm max-w-md font-serif">
          The sanctuary property you requested could not be located in our registry.
        </p>
        <Link
          to="/resorts"
          className="px-8 py-3 rounded-full bg-[#8F6B2E] hover:bg-[#6E511E] text-white font-serif text-xs uppercase tracking-widest transition-all"
        >
          Return to Sanctuary Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] overflow-hidden transition-colors duration-500">
      <ResortHero resort={resort} />
      <ResortOverview resort={resort} />
      <ResortGallery gallery={resort.gallery} resortName={resort.name} />
      <ResortRooms rooms={resort.rooms} resortName={resort.name} />
      <ResortAmenities amenities={resort.amenities} />
      <ResortExperiences experiences={resort.experiences} resortName={resort.name} />
      <ResortLocation resort={resort} />
      <ResortContact resort={resort} />
      <div className="w-full">
        <IndianJaaliBorder />
      </div>
    </div>
  );
}
