import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHotel } from '../../features/hotels/hooks/useHotel';
import HotelHero from '../../features/hotels/components/HotelHero';
import HotelOverview from '../../features/hotels/components/HotelOverview';
import HotelGallery from '../../features/hotels/components/HotelGallery';
import HotelRooms from '../../features/hotels/components/HotelRooms';
import HotelFacilities from '../../features/hotels/components/HotelFacilities';
import HotelLocation from '../../features/hotels/components/HotelLocation';
import HotelContact from '../../features/hotels/components/HotelContact';
import Loader from '../../components/common/Loader';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../components/common/RoyalOrnamentDivider';

export default function HotelDetails() {
  const { slug } = useParams();
  const { hotel, loading, error } = useHotel(slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0]">
        <Loader size="lg" text="Curating palatial hotel details..." />
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] text-center p-8 space-y-6 font-sans">
        <h2 className="text-3xl font-serif">Property Not Found</h2>
        <RoyalOrnamentDivider color="#8F6B2E" />
        <p className="text-[#6E5D4F] dark:text-[#B8A89A] text-sm max-w-md font-serif">
          The heritage property you requested could not be located in our registry.
        </p>
        <Link
          to="/hotels"
          className="px-8 py-3 rounded-full bg-[#8F6B2E] hover:bg-[#6E511E] text-white font-serif text-xs uppercase tracking-widest transition-all"
        >
          Return to Hotel Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] overflow-hidden transition-colors duration-500">
      <HotelHero hotel={hotel} />
      <HotelOverview hotel={hotel} />
      <HotelGallery gallery={hotel.gallery} hotelName={hotel.name} />
      <HotelRooms rooms={hotel.rooms} hotelName={hotel.name} />
      <HotelFacilities facilities={hotel.facilities} />
      <HotelLocation hotel={hotel} />
      <HotelContact hotel={hotel} />
      <div className="w-full">
        <IndianJaaliBorder />
      </div>
    </div>
  );
}
