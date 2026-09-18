import React, { useState } from 'react';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STATES = [
  'Tamil Nadu',
  'Goa',
  'Rajasthan',
  'Kerala',
  'Himachal Pradesh',
  'Karnataka',
  'Uttarakhand',
  'Kashmir',
  'Maharashtra',
  'Delhi NCR',
];

export default function BookingBar() {
  const [checkIn, setCheckIn] = useState('2026-10-15');
  const [checkOut, setCheckOut] = useState('2026-10-20');
  const [guests, setGuests] = useState('2 Guests');
  const [selectedState, setSelectedState] = useState('Tamil Nadu');

  return (
    <section className="relative z-30 -mt-10 sm:-mt-14 max-w-6xl mx-auto px-4 sm:px-6 select-none">
      <div className="relative bg-[#FAF6ED]/95 dark:bg-[#140F0A]/95 backdrop-blur-2xl border-2 border-[#B38738]/40 rounded-3xl sm:rounded-full p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#E8C97E]/60 overflow-hidden">

        {/* Seamlessly Blended Indian Jaali Texture */}
        <div
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] mix-blend-color-burn dark:mix-blend-screen pointer-events-none transition-opacity duration-500"
          style={{
            backgroundImage: `url('/images/art/indian_jaali_pattern.jpg')`,
            backgroundSize: '240px 240px',
            backgroundRepeat: 'repeat',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 95%)',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-2 items-center">

          {/* 1. CHECK-IN */}
          <div className="flex items-center space-x-3 px-4 py-2 sm:py-1 rounded-2xl hover:bg-[#B38738]/10 transition-colors group cursor-pointer">
            <Calendar className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="block text-[10px] uppercase font-cinzel font-bold tracking-widest text-[#B38738] dark:text-[#E8C97E]">
                Check-In
              </span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#241A12] dark:text-[#F5EFE6] outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>

          {/* 2. CHECK-OUT */}
          <div className="flex items-center space-x-3 px-4 py-2 sm:py-1 rounded-2xl hover:bg-[#B38738]/10 transition-colors group cursor-pointer border-t sm:border-t-0 sm:border-l border-[#B38738]/20">
            <Calendar className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="block text-[10px] uppercase font-cinzel font-bold tracking-widest text-[#B38738] dark:text-[#E8C97E]">
                Check-Out
              </span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#241A12] dark:text-[#F5EFE6] outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>

          {/* 3. GUESTS */}
          <div className="flex items-center space-x-3 px-4 py-2 sm:py-1 rounded-2xl hover:bg-[#B38738]/10 transition-colors group cursor-pointer border-t sm:border-t-0 sm:border-l border-[#B38738]/20">
            <Users className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="block text-[10px] uppercase font-cinzel font-bold tracking-widest text-[#B38738] dark:text-[#E8C97E]">
                Guests
              </span>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#241A12] dark:text-[#F5EFE6] outline-none cursor-pointer [color-scheme:dark]"
              >
                <option value="1 Guest" className="bg-[#FAF6ED] dark:bg-[#140F0A] text-[#241A12] dark:text-[#F5EFE6]">1 Guest</option>
                <option value="2 Guests" className="bg-[#FAF6ED] dark:bg-[#140F0A] text-[#241A12] dark:text-[#F5EFE6]">2 Guests</option>
                <option value="3 Guests" className="bg-[#FAF6ED] dark:bg-[#140F0A] text-[#241A12] dark:text-[#F5EFE6]">3 Guests</option>
                <option value="4+ Guests" className="bg-[#FAF6ED] dark:bg-[#140F0A] text-[#241A12] dark:text-[#F5EFE6]">4+ Guests</option>
              </select>
            </div>
          </div>

          {/* 4. STATE SELECTION */}
          <div className="flex items-center space-x-3 px-4 py-2 sm:py-1 rounded-2xl hover:bg-[#B38738]/10 transition-colors group cursor-pointer border-t lg:border-t-0 lg:border-l border-[#B38738]/20">
            <MapPin className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="block text-[10px] uppercase font-cinzel font-bold tracking-widest text-[#B38738] dark:text-[#E8C97E]">
                State / Location
              </span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#241A12] dark:text-[#F5EFE6] outline-none cursor-pointer [color-scheme:dark]"
              >
                {STATES.map((state) => (
                  <option key={state} value={state} className="bg-[#FAF6ED] dark:bg-[#140F0A] text-[#241A12] dark:text-[#F5EFE6]">
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. CTA BUTTON */}
          <div className="pt-2 sm:pt-0">
            <Link
              to={`/resorts?state=${encodeURIComponent(selectedState)}`}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] hover:from-[#A87B2A] hover:to-[#966819] text-white font-cinzel font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_4px_16px_rgba(179,135,56,0.35)] hover:scale-[1.02] cursor-pointer"
            >
              <span>EXPLORE STAYS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
