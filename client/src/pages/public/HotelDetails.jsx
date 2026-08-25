import React from 'react';
import { useParams } from 'react-router-dom';
import { useHotel } from '../../features/hotels/hooks/useHotel';
import HotelHero from '../../features/hotels/components/HotelHero';
import HotelOverview from '../../features/hotels/components/HotelOverview';
import HotelGallery from '../../features/hotels/components/HotelGallery';
import HotelRooms from '../../features/hotels/components/HotelRooms';
import HotelFacilities from '../../features/hotels/components/HotelFacilities';
import HotelLocation from '../../features/hotels/components/HotelLocation';
import HotelContact from '../../features/hotels/components/HotelContact';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';

export default function HotelDetails() {
  const { slug } = useParams();
  const { hotel, loading, error } = useHotel(slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-black">
        <Loader size="lg" text="Loading hotel details..." />
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-luxury-black text-luxury-light text-center p-8 space-y-6">
        <h2 className="text-3xl font-serif">Hotel Not Found</h2>
        <p className="text-luxury-muted text-sm max-w-md">
          The property you requested could not be located in our registry.
        </p>
        <Button to="/hotels" variant="primary">
          Back to All Hotels
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <HotelHero hotel={hotel} />
      <HotelOverview hotel={hotel} />
      <HotelGallery gallery={hotel.gallery} hotelName={hotel.name} />
      <HotelRooms rooms={hotel.rooms} hotelName={hotel.name} />
      <HotelFacilities facilities={hotel.facilities} />
      <HotelLocation hotel={hotel} />
      <HotelContact hotel={hotel} />
    </div>
  );
}
