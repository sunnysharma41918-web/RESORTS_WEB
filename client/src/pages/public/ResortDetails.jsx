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
import Button from '../../components/common/Button';

export default function ResortDetails() {
  const { slug } = useParams();
  const { resort, loading, error } = useResort(slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-black">
        <Loader size="lg" text="Loading sanctuary details..." />
      </div>
    );
  }

  if (error || !resort) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-black text-luxury-light text-center p-8 space-y-6">
        <h2 className="text-3xl font-serif">Sanctuary Not Found</h2>
        <p className="text-luxury-muted text-sm max-w-md">
          The property you requested could not be located in our registry.
        </p>
        <Button to="/resorts" variant="primary">
          Back to All Resorts
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <ResortHero resort={resort} />
      <ResortOverview resort={resort} />
      <ResortGallery gallery={resort.gallery} resortName={resort.name} />
      <ResortRooms rooms={resort.rooms} resortName={resort.name} />
      <ResortAmenities amenities={resort.amenities} />
      <ResortExperiences experiences={resort.experiences} resortName={resort.name} />
      <ResortLocation resort={resort} />
      <ResortContact resort={resort} />
    </div>
  );
}
