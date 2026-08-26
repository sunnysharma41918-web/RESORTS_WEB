import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';

const ALL_STATES = [
  { id: '01', name: 'Andaman & Nicobar Islands' },
  { id: '02', name: 'Andhra Pradesh' },
  { id: '03', name: 'Arunachal Pradesh' },
  { id: '04', name: 'Assam' },
  { id: '05', name: 'Bihar' },
  { id: '06', name: 'Chandigarh' },
  { id: '07', name: 'Chhattisgarh' },
  { id: '08', name: 'Dadra & Nagar Haveli and Daman & Diu' },
  { id: '09', name: 'Delhi NCR' },
  { id: '10', name: 'Goa' },
  { id: '11', name: 'Gujarat' },
  { id: '12', name: 'Haryana' },
  { id: '13', name: 'Himachal Pradesh' },
  { id: '14', name: 'Jammu & Kashmir' },
  { id: '15', name: 'Jharkhand' },
  { id: '16', name: 'Karnataka' },
  { id: '17', name: 'Kerala' },
  { id: '18', name: 'Ladakh' },
  { id: '19', name: 'Lakshadweep' },
  { id: '20', name: 'Madhya Pradesh' },
  { id: '21', name: 'Maharashtra' },
  { id: '22', name: 'Manipur' },
  { id: '23', name: 'Meghalaya' },
  { id: '24', name: 'Mizoram' },
  { id: '25', name: 'Nagaland' },
  { id: '26', name: 'Odisha' },
  { id: '27', name: 'Puducherry' },
  { id: '28', name: 'Punjab' },
  { id: '29', name: 'Rajasthan' },
  { id: '30', name: 'Sikkim' },
  { id: '31', name: 'Tamil Nadu' },
  { id: '32', name: 'Telangana' },
  { id: '33', name: 'Tripura' },
  { id: '34', name: 'Uttar Pradesh' },
  { id: '35', name: 'Uttarakhand' },
  { id: '36', name: 'West Bengal' },
];

export default function DestinationSection() {
  return (
    <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden font-manrope transition-colors duration-300">
      {/* Background Subtle Graphic */}
      <EditorialBackgroundElements variant="light" position="top-right" />

      <div className="max-w-7xl mx-auto space-y-14 sm:space-y-16 relative z-10">

        {/* 1. SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b dark:border-[#333333] border-[#E9E9DE]">
          <div className="space-y-4">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] dark:text-white text-[#0E0E0E]">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                <span>04 — OUR WIDE RANGE OF LOCATIONS</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-green">
                OUR WIDE RANGE <br />
                OF LOCATIONS.
              </h2>
            </ScrollReveal>
          </div>

          <div className="space-y-4 max-w-md">
            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm font-light dark:text-[#D0D0D0] text-[#0E0E0E]/75 leading-relaxed">
                Country Holidays Hotels & Resorts delivers warm hospitality, comfortable stays, and memorable celebrations across every state nationwide.
              </p>
            </ScrollReveal>
          </div>
        </div>


        {/* 2. STATIC CLEAN TEXT-ONLY STATES LISTING */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF1F02]">
              ● PAN-INDIA PRESENCE ({ALL_STATES.length} STATES & UTs)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {ALL_STATES.map((st) => (
              <div
                key={st.id}
                className="p-3.5 border flex items-center justify-between select-none transition-colors dark:bg-[#0E0E0E] dark:border-[#333333] bg-white border-[#E9E9DE]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono dark:text-white/40 text-[#0E0E0E]/40">
                    {st.id}
                  </span>
                  <span className="text-sm font-bold uppercase dark:text-white text-[#0E0E0E]">
                    {st.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* 3. PROMINENT CHECK AVAILABILITY BUTTON */}
        <ScrollReveal direction="up" delay={200}>
          <div className="p-8 sm:p-10 bg-black text-white border border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#EAB308] uppercase tracking-widest font-bold block">
                ✦ PAN-INDIA RESERVATIONS & EVENT CONCIERGE ✦
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-white">
                Looking for Stays or Event Venues Across India?
              </h3>
              <p className="text-xs sm:text-sm text-[#A0A0A0] font-light">
                Explore our celebrations and submit a structured inquiry to check venue dates and pricing.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                to="/celebrations#inquiry"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#FF1F02] hover:bg-white text-white hover:text-black font-bold text-xs uppercase font-mono tracking-widest transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
              >
                <span>CHECK AVAILABILITY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}