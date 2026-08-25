import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';

const travelDistances = [
  { destination: 'NEW DELHI (DEL)', time: '04 HRS', mode: 'Executive Chauffeur Service' },
  { destination: 'CHANDIGARH AIRPORT (IXC)', time: '02 HRS', mode: 'Scenic Highway Transit' },
  { destination: 'SHIMLA RIDGE', time: '45 MIN', mode: 'Mountain Private Road' },
  { destination: 'ON-SITE PRIVATE HELIPAD', time: 'DIRECT', mode: 'Coordinates: 31.1048° N, 77.1734° E' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    residence: 'The Forest Pool Villa',
    dates: '',
    guests: '2 Guests',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#1C1C1C] text-white overflow-hidden font-manrope">

      {/* 1. HERO BANNER IN PURE BLACK */}
      <section className="relative min-h-[85vh] flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-12 bg-black border-b border-[#333333] overflow-hidden select-none">
        {/* Background Vista */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=3000&q=90"
            alt="Sanctuary Mountain Horizon"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8 my-auto">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block" />
              <span>DIRECT CONCIERGE & INQUIRIES</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-5xl sm:text-7xl lg:text-[8.5rem] font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-white">
              CONNECT WITH <br />
              THE <br />
              <span className="text-art-trio">SANCTUARY.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-2xl mx-auto leading-relaxed">
              Our dedicated estate concierge is available 24/7 to assist with bespoke itineraries, private residence reservations, and helicopter transfers.
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom Coordinates */}
        <div className="relative z-10 max-w-6xl mx-auto w-full pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#B0B0B0] uppercase tracking-widest gap-4">
          <span>● 24/7 DEDICATED CONCIERGE</span>
          <span>DIRECT LINE: +91 98765 43210</span>
          <span>EST. 2026</span>
        </div>
      </section>


      {/* 2. SECTION 01: INQUIRIES & BOOKING FORM IN IVORY (#FAFDF2) */}
      <section className="relative bg-[#FAFDF2] text-[#0E0E0E] py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <EditorialBackgroundElements variant="light" position="top-right" />

        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#E9E9DE]">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#0E0E0E]">
                  <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                  <span>01 — BESPOKE INQUIRY</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-green">
                  BEGIN YOUR <br />
                  ESCAPE.
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm font-light text-[#0E0E0E]/70 max-w-sm leading-relaxed">
                Submit your inquiry below. Your private butler and reservations manager will reply within two hours.
              </p>
            </ScrollReveal>
          </div>

          {/* Form & Information Asymmetrical Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: Editorial Inquiry Form (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              {submitted ? (
                <div className="p-12 bg-white border border-[#E9E9DE] shadow-xl text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#FF1F02]/10 text-[#FF1F02] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#0E0E0E]/70 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name || 'valued guest'}. Your private reservations manager has been notified and will reach out shortly with customized options.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 text-xs font-bold uppercase tracking-widest border border-[#0E0E0E] hover:bg-[#FF1F02] hover:border-[#FF1F02] hover:text-white transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 sm:p-12 border border-[#E9E9DE] shadow-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0E0E0E]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Elena Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0E0E0E]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elena.vance@residence.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0E0E0E]">
                        Telephone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0E0E0E]">
                        Preferred Residence
                      </label>
                      <select
                        value={formData.residence}
                        onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] outline-none transition-colors cursor-pointer"
                      >
                        <option>The Forest Pool Villa</option>
                        <option>Monolith Glass Chalet</option>
                        <option>Botanical Sanctuary Suite</option>
                        <option>The Cliffside Stone Slowhouse</option>
                        <option>Ridge Horizon Grand Penthouse</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0E0E0E]">
                        Target Dates / Season
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. October 12 – 18, 2026"
                        value={formData.dates}
                        onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0E0E0E]">
                        Party Size
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] outline-none transition-colors cursor-pointer"
                      >
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 - 4 Guests</option>
                        <option>5+ Guests (Full Private Tier)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#0E0E0E]">
                      Special Requests / Culinary & Transit Preferences
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please let us know about dietary preferences, helicopter transfers, or celebration milestones..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] outline-none transition-colors resize-none"
                    />
                  </div>

                  <MagneticButton>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-5 bg-[#0E0E0E] hover:bg-[#FF1F02] text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-xl flex items-center justify-center gap-4 group cursor-pointer"
                    >
                      <span>TRANSMIT INQUIRY</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>

            {/* Right Column: Direct Channels with Upper CONTACT Typography (5 Cols) */}
            <div className="lg:col-span-5 relative pt-10 sm:pt-14">
              {/* Monumental Upper Overlaid Text - Scaled to fit page */}
              <div className="absolute top-0 left-0 z-30 pointer-events-none select-none">
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold uppercase tracking-tight leading-none text-art-orange block">
                  CONTACT
                </span>
              </div>

              {/* Animated Red CHTR Stamp Overlapping Corner */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-40">
                <EditorialHeritageStamp size={100} centerText="CHTR" year="EST 2026" />
              </div>

              <ScrollReveal direction="clip" delay={200}>
                <div className="p-8 sm:p-10 bg-white border border-[#E9E9DE] shadow-2xl space-y-8 relative z-10">
                  <div className="space-y-2 border-b border-[#E9E9DE] pb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF1F02] font-bold block">
                      DIRECT ESTATE HOTLINES
                    </span>
                    <h3 className="text-2xl font-extrabold uppercase tracking-tight text-[#0E0E0E]">
                      Personal Reservations
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none bg-[#FAFDF2] border border-[#E9E9DE] flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-[#FF1F02]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#0E0E0E]/50 uppercase tracking-widest block">Direct Concierge</span>
                        <a href="tel:+919876543210" className="text-base font-bold text-[#0E0E0E] hover:text-[#FF1F02] transition-colors">
                          +91 98765 43210
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none bg-[#FAFDF2] border border-[#E9E9DE] flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-[#FF1F02]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#0E0E0E]/50 uppercase tracking-widest block">Official Email</span>
                        <a href="mailto:concierge@chtr-resorts.com" className="text-base font-bold text-[#0E0E0E] hover:text-[#FF1F02] transition-colors">
                          concierge@chtr-resorts.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none bg-[#FAFDF2] border border-[#E9E9DE] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-[#FF1F02]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#0E0E0E]/50 uppercase tracking-widest block">Sanctuary Address</span>
                        <p className="text-sm font-light text-[#0E0E0E]/80 leading-relaxed">
                          CHTR Mountain Sanctuary, High Himalayan Ridge, Elevation 1,850M, Himachal Pradesh, India.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E9E9DE] flex items-center justify-between text-xs font-mono text-[#0E0E0E]/60 uppercase">
                    <span>● RESPONSE: &lt; 2 HOURS</span>
                    <span className="text-[#FF1F02] font-bold">24/7 DESK</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>


      {/* 3. SECTION 02: TRAVEL TIMES & ACCESS IN DARK (#1C1C1C) */}
      <section className="relative bg-[#1C1C1C] text-white py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <EditorialBackgroundElements variant="dark" position="bottom-left" />

        <div className="max-w-7xl mx-auto space-y-20 lg:space-y-28 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Heading & Travel Times (5 Cols) */}
            <div className="lg:col-span-5 space-y-8 sm:space-y-10">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
                  <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                  <span>02 — TRANSIT & LOCATION</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-white">
                  HOW TO <br />
                  REACH <br />
                  THE RIDGE.
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <p className="text-base sm:text-lg font-normal text-[#D0D0D0] leading-relaxed">
                  We coordinate door-to-door private executive transfers from all regional airports and city centers, ensuring your decompression begins the moment you step into the vehicle.
                </p>
              </ScrollReveal>

              {/* Travel Times Telemetry */}
              <ScrollReveal direction="up" delay={300}>
                <div className="space-y-4 pt-4 border-t border-[#333333]">
                  {travelDistances.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-[#333333]">
                      <div className="space-y-0.5">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                          {item.destination}
                        </span>
                        <span className="text-[10px] text-[#B0B0B0] uppercase tracking-widest block font-mono">
                          {item.mode}
                        </span>
                      </div>
                      <span className="text-xl sm:text-2xl font-extrabold text-[#FF1F02]">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: High-Res Panoramic Location Plate (7 Cols) */}
            <div className="lg:col-span-7 relative">
              <ScrollReveal direction="clip" delay={150}>
                <div className="relative rounded-none overflow-hidden aspect-[16/11] border border-[#333333] shadow-2xl group bg-black" data-cursor="VIEW">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=90"
                    alt="High Mountain Himalayan Ridge Location"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
                    <span className="tracking-widest uppercase">GPS: 31.1048° N, 77.1734° E</span>
                    <span className="text-[#FF1F02] font-bold">SECURE MOUNTAIN SANCTUARY</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>


      {/* 4. FINAL INVITATION CTA IN PURE BLACK */}
      <section className="relative bg-[#000000] text-white py-32 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=3840&q=95"
            alt="Mountain Horizon"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">
          
          {/* Animated Red CHTR Stamp */}
          <ScrollReveal direction="scale">
            <div className="flex justify-center mb-2">
              <EditorialHeritageStamp size={110} centerText="CHTR" year="EST 2026" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
              <span>03 — PRIVATE CONCIERGE DESK</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-orange-dark">
              WE AWAIT <br />
              YOUR ARRIVAL.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-xl mx-auto leading-relaxed">
              Step away from the noise of the world. Connect with our dedicated concierge today to curate your private mountain stay.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-none bg-white hover:bg-[#FF1F02] text-[#0E0E0E] hover:text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-2xl group cursor-pointer"
                >
                  <span>CALL DIRECT CONCIERGE</span>
                  <span className="w-6 h-6 rounded-full bg-[#FF1F02] group-hover:bg-white text-white group-hover:text-[#FF1F02] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/resorts"
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-none border border-white/40 hover:border-white text-white font-semibold text-xs uppercase tracking-[0.16em] backdrop-blur-md transition-all duration-300"
                >
                  <span>EXPLORE RESIDENCES</span>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="pt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-[#B0B0B0] uppercase tracking-widest">
              <span>● 24/7 DEDICATED SERVICE</span>
              <span>● BESPOKE ITINERARIES</span>
              <span>● GUARANTEED SECLUSION</span>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
}
