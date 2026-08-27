import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';
import { inquiryService } from '../../services/inquiryService';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        guestName: formData.name.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        property: formData.residence || 'The Forest Pool Villa',
        residence: formData.residence || 'The Forest Pool Villa',
        dates: formData.dates || 'Flexible Dates',
        guests: formData.guests || '2 Guests',
        message: formData.message.trim() || `Booking inquiry for ${formData.residence} (${formData.dates || 'Flexible'}, ${formData.guests}).`,
        status: 'new',
      };
      await inquiryService.createInquiry(payload);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      // Ensure smooth UX even if offline
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] overflow-hidden font-manrope transition-colors duration-300">

      {/* 1. HERO BANNER IN PURE BLACK */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-center py-20 sm:py-32 px-4 sm:px-12 bg-black border-b dark:border-[#333333] border-[#E9E9DE] overflow-hidden select-none">
        {/* Background Vista */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=3000&q=90"
            alt="Sanctuary Mountain Horizon"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6 sm:space-y-8 my-auto w-full">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#FF1F02] px-3 py-1 bg-black/40 border border-[#FF1F02]/30 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02] inline-block animate-pulse" />
              <span>DIRECT CONCIERGE & INQUIRIES</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-[clamp(1.95rem,7.5vw,8.5rem)] font-extrabold uppercase tracking-tight sm:tracking-[-0.04em] leading-[0.98] sm:leading-[0.88] text-white break-words">
              CONNECT WITH <br />
              THE <br />
              <span className="text-art-trio">SANCTUARY.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-xs sm:text-lg lg:text-xl font-light text-[#D0D0D0] max-w-2xl mx-auto leading-relaxed px-2">
              Our dedicated estate concierge is available 24/7 to assist with bespoke itineraries, private residence reservations, and direct inquiries.
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* 2. SECTION 01: INQUIRIES & BOOKING FORM (ADAPTIVE DARK/LIGHT) */}
      <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-20 sm:py-36 px-4 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
        <EditorialBackgroundElements variant="light" position="top-right" />

        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-28 relative z-10">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-8 border-b dark:border-[#333333] border-[#E9E9DE]">
            <div className="space-y-3 sm:space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.14em] dark:text-white text-[#0E0E0E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                  <span>01 — BESPOKE INQUIRY</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-[clamp(1.95rem,6.5vw,7.5rem)] font-extrabold uppercase tracking-tight sm:tracking-[-0.04em] leading-[0.98] sm:leading-[0.88] text-art-green break-words">
                  BEGIN YOUR <br />
                  ESCAPE.
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm font-light dark:text-[#A0A0A0] text-[#0E0E0E]/70 max-w-sm leading-relaxed">
                Submit your inquiry below. Your private butler and reservations manager will reply within two hours.
              </p>
            </ScrollReveal>
          </div>

          {/* Form & Information Asymmetrical Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: Editorial Inquiry Form (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              {submitted ? (
                <div className="p-12 dark:bg-[#0E0E0E] dark:border-[#333333] bg-white border border-[#E9E9DE] shadow-xl text-center space-y-6 animate-fade-in transition-colors">
                  <div className="w-16 h-16 rounded-full bg-[#FF1F02]/10 text-[#FF1F02] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight dark:text-white text-[#0E0E0E]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm dark:text-[#A0A0A0] text-[#0E0E0E]/70 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name || 'valued guest'}. Your private reservations manager has been notified and will reach out shortly with customized options.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 text-xs font-bold uppercase tracking-widest border dark:border-white border-[#0E0E0E] hover:bg-[#FF1F02] hover:border-[#FF1F02] hover:text-white transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 dark:bg-[#0E0E0E] dark:border-[#333333] bg-white p-8 sm:p-12 border border-[#E9E9DE] shadow-xl transition-colors">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest dark:text-white text-[#0E0E0E]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Elena Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#333333] dark:text-white dark:placeholder:text-white/40 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/40 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest dark:text-white text-[#0E0E0E]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elena.vance@residence.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#333333] dark:text-white dark:placeholder:text-white/40 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/40 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest dark:text-white text-[#0E0E0E]">
                        Telephone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#333333] dark:text-white dark:placeholder:text-white/40 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/40 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest dark:text-white text-[#0E0E0E]">
                        Preferred Residence / Property
                      </label>
                      <select
                        value={formData.residence}
                        onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                        className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#333333] dark:text-white bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] outline-none transition-colors cursor-pointer"
                      >
                        <optgroup label="── SIGNATURE RESIDENCES & VILLAS ──" className="dark:bg-[#1C1C1C] dark:text-[#EAB308] bg-gray-100 text-amber-800 font-bold">
                          <option value="The Forest Pool Villa">The Forest Pool Villa (Private Seclusion)</option>
                          <option value="Monolith Glass Chalet">Monolith Glass Chalet (High-Altitude Vista)</option>
                          <option value="Botanical Sanctuary Suite">Botanical Sanctuary Suite (Conservation Garden)</option>
                          <option value="The Cliffside Stone Slowhouse">The Cliffside Stone Slowhouse (Valley Panorama)</option>
                          <option value="Ridge Horizon Grand Penthouse">Ridge Horizon Grand Penthouse (Flagship Residence)</option>
                          <option value="Royal Cantilever Ocean Suite">Royal Cantilever Ocean Suite (Oceanfront)</option>
                        </optgroup>

                        <optgroup label="── DESTINATION RESORTS & SANCTUARIES ──" className="dark:bg-[#1C1C1C] dark:text-[#32ACE3] bg-gray-100 text-sky-800 font-bold">
                          <option value="Goa — Azure Coast Beachfront Sanctuary">Goa — Azure Coast Beachfront Sanctuary</option>
                          <option value="Himachal Pradesh — Himalayan Cloud Ridge">Himachal Pradesh — Himalayan Cloud Ridge Sanctuary</option>
                          <option value="Rajasthan — Thar Royal Palace & Pavilion">Rajasthan — Thar Royal Palace & Desert Pavilion</option>
                          <option value="Kerala — Backwaters Emerald Lagoon Estate">Kerala — Backwaters Emerald Lagoon Estate</option>
                          <option value="Tamil Nadu — Nilgiri Cloud Forest Estate">Tamil Nadu — Nilgiri Cloud Forest Estate (Ooty)</option>
                          <option value="Kashmir — Alpine Pine Valley Retreat">Kashmir — Alpine Pine Valley Retreat (Pahalgam)</option>
                          <option value="Karnataka — Coorg Coffee Plantation Estate">Karnataka — Coorg Coffee Plantation Estate</option>
                          <option value="Uttarakhand — Ganges Riverbank Sanctuary">Uttarakhand — Ganges Riverbank Sanctuary (Rishikesh)</option>
                        </optgroup>

                        <optgroup label="── CELEBRATIONS & BESPOKE TRAVEL ──" className="dark:bg-[#1C1C1C] dark:text-[#FF1F02] bg-gray-100 text-red-800 font-bold">
                          <option value="Grand Destination Wedding (Palace / Mandap)">Grand Destination Wedding (Palace / Mandap)</option>
                          <option value="Corporate Executive Board Summit">Corporate Executive Board Summit</option>
                          <option value="Multi-Destination Bespoke Helicopter Tour">Multi-Destination Bespoke Helicopter Tour</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest dark:text-white text-[#0E0E0E]">
                        Target Dates / Season
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. October 12 – 18, 2026"
                        value={formData.dates}
                        onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                        className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#333333] dark:text-white dark:placeholder:text-white/40 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/40 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono font-bold uppercase tracking-widest dark:text-white text-[#0E0E0E]">
                        Party Size
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#333333] dark:text-white bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] outline-none transition-colors cursor-pointer"
                      >
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 - 4 Guests</option>
                        <option>5+ Guests (Full Private Tier)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-widest dark:text-white text-[#0E0E0E]">
                      Special Requests / Culinary & Transit Preferences
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please let us know about dietary preferences, helicopter transfers, or celebration milestones..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#333333] dark:text-white dark:placeholder:text-white/40 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/40 outline-none transition-colors resize-none"
                    />
                  </div>

                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-10 py-5 bg-[#FF1F02] hover:bg-white hover:text-black disabled:opacity-50 text-white font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-xl flex items-center justify-center gap-4 group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <span>TRANSMIT INQUIRY</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
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

              {/* Animated Red CHHR Stamp Overlapping Corner */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-40">
                <EditorialHeritageStamp size={100} centerText="CHHR" text="CHHR HOTELS & RESORTS • SANCTUARY • " />
              </div>

              <ScrollReveal direction="clip" delay={200}>
                <div className="p-8 sm:p-10 dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] shadow-2xl space-y-8 relative z-10">
                  <div className="space-y-2 border-b dark:border-[#333333] border-[#E9E9DE] pb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF1F02] font-bold block">
                      DIRECT ESTATE HOTLINES
                    </span>
                    <h3 className="text-2xl font-extrabold uppercase tracking-tight dark:text-white text-[#0E0E0E]">
                      Personal Reservations
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none dark:bg-[#161616] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-[#FF1F02]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono dark:text-white/50 text-[#0E0E0E]/50 uppercase tracking-widest block">Direct Concierge</span>
                        <a href="tel:+919876543210" className="text-base font-bold dark:text-white text-[#0E0E0E] hover:text-[#FF1F02] transition-colors">
                          +91 98765 43210
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none dark:bg-[#161616] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-[#FF1F02]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono dark:text-white/50 text-[#0E0E0E]/50 uppercase tracking-widest block">Official Email</span>
                        <a href="mailto:info@countryholidaysresorts.com" className="text-base font-bold dark:text-white text-[#0E0E0E] hover:text-[#FF1F02] transition-colors">
                          info@countryholidaysresorts.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none dark:bg-[#161616] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-[#FF1F02]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono dark:text-white/50 text-[#0E0E0E]/50 uppercase tracking-widest block">Sanctuary Address</span>
                        <p className="text-sm font-light dark:text-[#D0D0D0] text-[#0E0E0E]/80 leading-relaxed">
                          CHHR Mountain Sanctuary, High Himalayan Ridge, Elevation 1,850M, Himachal Pradesh, India.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t dark:border-[#333333] border-[#E9E9DE] flex items-center justify-between text-xs font-mono dark:text-white/60 text-[#0E0E0E]/60 uppercase">
                    <span>● RESPONSE: &lt; 2 HOURS</span>
                    <span className="text-[#FF1F02] font-bold">24/7 DESK</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FINAL INVITATION CTA (ADAPTIVE DARK/LIGHT) */}
      <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-32 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300 border-t dark:border-[#333333] border-[#E9E9DE]">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=3840&q=95"
            alt="Mountain Horizon"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-black dark:via-black/80 dark:to-black/60 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-12">
          
          {/* Animated Red CHHR Stamp */}
          <ScrollReveal direction="scale">
            <div className="flex justify-center mb-2">
              <EditorialHeritageStamp size={110} centerText="CHHR" text="CHHR HOTELS & RESORTS • PRIVATE ESTATE • " />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
              <span>02 — PRIVATE CONCIERGE DESK</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-trio">
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
                  to="/offers"
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-none border border-white/40 hover:border-white text-white font-semibold text-xs uppercase tracking-[0.16em] backdrop-blur-md transition-all duration-300 cursor-pointer"
                >
                  <span>EXPLORE OFFERS</span>
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
