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
      <div className="bg-[#0c1824]/90 backdrop-blur-2xl border border-sky-500/25 rounded-3xl sm:rounded-full p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-sky-400/40">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-2 items-center">
          
          {/* 1. CHECK-IN */}
          <div className="flex items-center space-x-3 px-4 py-2 sm:py-1 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer">
            <Calendar className="w-4 h-4 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="block text-[10px] uppercase tracking-widest text-white/50 font-medium">
                Check-In
              </span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>

          {/* 2. CHECK-OUT */}
          <div className="flex items-center space-x-3 px-4 py-2 sm:py-1 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border-t sm:border-t-0 sm:border-l border-white/10">
            <Calendar className="w-4 h-4 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="block text-[10px] uppercase tracking-widest text-white/50 font-medium">
                Check-Out
              </span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>

          {/* 3. GUESTS */}
          <div className="flex items-center space-x-3 px-4 py-2 sm:py-1 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border-t sm:border-t-0 sm:border-l border-white/10">
            <Users className="w-4 h-4 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="block text-[10px] uppercase tracking-widest text-white/50 font-medium">
                Guests
              </span>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer [color-scheme:dark]"
              >
                <option value="1 Guest" className="bg-[#0c1824] text-white">1 Guest</option>
                <option value="2 Guests" className="bg-[#0c1824] text-white">2 Guests</option>
                <option value="3 Guests" className="bg-[#0c1824] text-white">3 Guests</option>
                <option value="4+ Guests" className="bg-[#0c1824] text-white">4+ Guests</option>
              </select>
            </div>
          </div>

          {/* 4. STATE SELECTION */}
          <div className="flex items-center space-x-3 px-4 py-2 sm:py-1 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border-t lg:border-t-0 lg:border-l border-white/10">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="block text-[10px] uppercase tracking-widest text-white/50 font-medium">
                State / Location
              </span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer [color-scheme:dark]"
              >
                {STATES.map((state) => (
                  <option key={state} value={state} className="bg-[#0c1824] text-white">
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. CTA BUTTON */}
          <div className="pt-2 sm:pt-0">
            <Link
              to="/resorts"
              className="w-full py-3.5 px-6 rounded-full bg-[#dcf838] hover:bg-[#cbe628] text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(220,248,56,0.3)] hover:scale-[1.02]"
            >
              <span>Check Availability</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
