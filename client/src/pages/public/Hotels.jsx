import React from 'react';
import { Building2 } from 'lucide-react';
import HotelCard from '../../features/hotels/components/HotelCard';
import ContactCTA from '../../features/home/components/ContactCTA';
import { useHotels } from '../../features/hotels/hooks/useHotels';
import Loader from '../../components/common/Loader';

export default function Hotels() {
  const { hotels, loading } = useHotels();

  return (
    <div className="w-full bg-luxury-black text-luxury-light min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-end overflow-hidden bg-luxury-black pt-32 pb-16 px-6 sm:px-12 lg:px-16 xl:px-20 select-none">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2560&q=85"
            alt="Boutique Hotels & Towers"
            className="w-full h-full object-cover object-center brightness-[0.70] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-black/40 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 via-transparent to-black/50" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-sky-500/40 backdrop-blur-xl text-xs uppercase tracking-luxury text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <Building2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Urban Boutique Collection</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[0.95] text-white uppercase">
            Boutique Hotels & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-400">
              Skyline Towers
            </span>
          </h1>

          <p className="text-base sm:text-xl text-white/80 font-light max-w-xl leading-relaxed">
            High-rise architectural modernity and discrete luxury suites in prime metropolitan centers.
          </p>
        </div>
      </section>

      {/* Hotels Grid Area */}
      <div className="py-16 px-6 sm:px-12 lg:px-16 xl:px-20 max-w-7xl mx-auto space-y-12">
        {loading ? (
          <div className="py-24 flex justify-center">
            <Loader text="Curating hotel towers..." />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>

      <ContactCTA />
    </div>
  );
}
