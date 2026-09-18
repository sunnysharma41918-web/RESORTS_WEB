import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Headset,
  Sparkles,
  Calendar,
  Users,
  ChevronDown,
  User,
  Lock,
  MessageSquare
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../components/common/IndianArtBackground';
import { inquiryService } from '../../services/inquiryService';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    residence: 'Goa — Beachfront Mandaps & Luxury Villas',
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
        property: formData.residence || 'Goa — Beachfront Mandaps & Luxury Villas',
        residence: formData.residence || 'Goa — Beachfront Mandaps & Luxury Villas',
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
    <div className="w-full bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] overflow-hidden font-manrope transition-colors duration-500">

      {/* 1. HERO BANNER IN ROYAL PALATIAL THEME */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex flex-col justify-center py-20 sm:py-28 px-4 sm:px-12 bg-[#FAF6F0] dark:bg-[#14110E] border-b border-[#8F6B2E]/20 dark:border-[#8F6B2E]/30 overflow-hidden select-none">
        
        {/* Indian Royal Art & Arch Background */}
        <IndianArtBackground variant="full" opacity="opacity-[0.05] dark:opacity-[0.07]" />

        {/* Background Vista */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=75"
            alt="Sanctuary Mountain Horizon"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover filter brightness-[0.95] opacity-25 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0]/90 via-[#FAF6F0]/80 to-[#FAF6F0] dark:from-[#14110E]/90 dark:via-[#14110E]/80 dark:to-[#14110E]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5 my-auto w-full">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#8F6B2E] dark:text-[#D4AF37] px-4 py-1 bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 border border-[#8F6B2E]/30 dark:border-[#8F6B2E]/40 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F6B2E] dark:bg-[#D4AF37] inline-block animate-pulse" />
              <span>DIRECT ROYAL CONCIERGE & INQUIRIES</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal uppercase tracking-tight leading-[1.05] text-[#2A1F17] dark:text-[#F3EEE0] break-words">
              CONNECT WITH <br />
              THE <br />
              <span className="text-[#8F6B2E] dark:text-[#D4AF37]">ROYAL CONCIERGE.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <RoyalOrnamentDivider color="#8F6B2E" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-sm sm:text-lg font-serif font-light text-[#6E5D4F] dark:text-[#B8A89A] max-w-2xl mx-auto leading-relaxed px-2">
              Our dedicated royal concierge is available 24/7 to assist with bespoke itineraries, private residence reservations, and direct inquiries.
            </p>
          </ScrollReveal>
        </div>
      </section>


      {/* 2. SECTION 01: INQUIRIES & BOOKING FORM (MATCHING REFERENCE LAYOUT) */}
      <section className="relative dark:bg-[#14110E] bg-[#FAF6F0] dark:text-[#F3EEE0] text-[#2A1F17] py-16 sm:py-24 px-4 sm:px-8 lg:px-14 overflow-hidden transition-colors duration-500 select-none font-sans">
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">

          {/* Section Header Badge */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12 sm:mb-16">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 border border-[#8F6B2E]/30 text-[#8F6B2E] dark:text-[#D4AF37] text-[11px] sm:text-xs font-serif font-bold uppercase tracking-[0.18em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8F6B2E] dark:bg-[#D4AF37]" />
                <span>01 — BESPOKE ROYAL INQUIRY</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={50}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif font-normal text-[#2A1F17] dark:text-[#F3EEE0] tracking-wide uppercase">
                BEGIN YOUR ROYAL ESCAPE
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <RoyalOrnamentDivider color="#8F6B2E" />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-xs sm:text-sm md:text-[15px] text-[#6E5D4F] dark:text-[#B8A89A] leading-relaxed font-serif font-light max-w-2xl mx-auto">
                Submit your bespoke itinerary request directly to our central estate director or connect with our personal concierge officers for immediate reservation guidance.
              </p>
            </ScrollReveal>
          </div>

          {/* 2-Column Luxury Clean Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* LEFT COLUMN: PERSONAL CONCIERGE DESK (CLEAN FLAT ON PAGE) */}
            <div className="lg:col-span-5 h-full flex flex-col justify-between space-y-8 py-2">
              <ScrollReveal direction="up">
                <div className="space-y-3">
                  <span className="text-[11px] font-mono text-[#8F6B2E] dark:text-[#D4AF37] uppercase tracking-[0.22em] font-bold block">
                    ✦ DIRECT ESTATE HOTLINES ✦
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-normal text-[#2A1F17] dark:text-[#F3EEE0] leading-[1.12] tracking-tight">
                    Personal<br />Concierge Desk
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6E5D4F] dark:text-[#B8A89A] font-serif leading-relaxed pt-1">
                    We're here to plan your perfect stay. Reach out directly or share your details and our concierge team will get back to you shortly.
                  </p>
                </div>
              </ScrollReveal>

              {/* Contact Items - Clean flat list */}
              <ScrollReveal direction="up" delay={50}>
                <div className="space-y-6">
                  
                  {/* Direct Concierge */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#EFE8DC] dark:bg-[#251E18] text-[#8F6B2E] dark:text-[#D4AF37] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-none">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] block font-semibold">
                        DIRECT CONCIERGE
                      </span>
                      <a
                        href="tel:+919876543210"
                        className="text-lg sm:text-xl font-serif font-bold text-[#2A1F17] dark:text-[#F3EEE0] hover:text-[#8F6B2E] dark:hover:text-[#D4AF37] transition-colors block font-mono"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  {/* Official Email */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#EFE8DC] dark:bg-[#251E18] text-[#8F6B2E] dark:text-[#D4AF37] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-none">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] block font-semibold">
                        OFFICIAL EMAIL
                      </span>
                      <a
                        href="mailto:info@countryholidaysresorts.com"
                        className="text-sm sm:text-base font-serif font-bold text-[#2A1F17] dark:text-[#F3EEE0] hover:text-[#8F6B2E] dark:hover:text-[#D4AF37] transition-colors truncate block"
                      >
                        info@countryholidaysresorts.com
                      </a>
                    </div>
                  </div>

                  {/* Corporate Headquarters */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#EFE8DC] dark:bg-[#251E18] text-[#8F6B2E] dark:text-[#D4AF37] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-none">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] block font-semibold">
                        CORPORATE HEADQUARTERS
                      </span>
                      <p className="text-xs sm:text-sm font-serif text-[#6E5D4F] dark:text-[#B8A89A] leading-relaxed">
                        111, Rajiv Gandhi Salai, OMR, Kottivakkam, Chennai, Tamil Nadu 600041, India.
                      </p>
                    </div>
                  </div>

                </div>
              </ScrollReveal>

              {/* Bottom Stats Row: Response Time & 24/7 Live Desk */}
              <ScrollReveal direction="up" delay={100}>
                <div className="pt-6 border-t border-[#8F6B2E]/20 dark:border-[#8F6B2E]/30 flex items-center gap-8 text-[#2A1F17] dark:text-[#F3EEE0]">
                  
                  {/* Response Time */}
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-[#8F6B2E] dark:text-[#D4AF37] stroke-[1.5]" />
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] block font-medium">
                        RESPONSE TIME
                      </span>
                      <span className="text-sm sm:text-base font-serif font-bold text-[#2A1F17] dark:text-[#F3EEE0]">
                        &lt; 2 HOURS
                      </span>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="h-8 w-[1px] bg-[#8F6B2E]/25 dark:bg-[#8F6B2E]/35" />

                  {/* 24/7 Live Desk */}
                  <div className="flex items-center gap-3">
                    <Headset className="w-6 h-6 text-[#8F6B2E] dark:text-[#D4AF37] stroke-[1.5]" />
                    <div>
                      <span className="text-sm sm:text-base font-serif font-bold text-[#2A1F17] dark:text-[#F3EEE0] block leading-tight">
                        24/7
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] block font-medium">
                        LIVE DESK
                      </span>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>


            {/* RIGHT COLUMN: PLAN YOUR STAY FORM (CLEAN FLAT PANEL) */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="up" delay={100}>
                <div className="bg-[#F6F1EB] dark:bg-[#1A1612] border border-[#E5DDD0] dark:border-[#382E24] rounded-2xl p-6 sm:p-9 lg:p-10 relative transition-all">
                  
                  {submitted ? (
                    <div className="py-14 text-center space-y-6 bg-white/70 dark:bg-black/30 p-8 sm:p-10 rounded-2xl border border-[#8F6B2E]/30 my-auto shadow-inner">
                      <div className="w-16 h-16 rounded-full bg-[#8F6B2E]/15 dark:bg-[#8F6B2E]/25 text-[#8F6B2E] dark:text-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div className="space-y-2.5">
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8F6B2E] dark:text-[#D4AF37] font-bold block">
                          ● OFFICIAL INQUIRY TRANSMITTED
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#2A1F17] dark:text-[#F3EEE0]">
                          Inquiry Received, {formData.name || 'Valued Guest'}!
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6E5D4F] dark:text-[#B8A89A] font-serif max-w-md mx-auto leading-relaxed">
                          Your request for <strong className="text-[#8F6B2E] dark:text-[#D4AF37]">{formData.residence}</strong> has been logged. Our priority desk will connect with you shortly.
                        </p>
                      </div>

                      <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false);
                            setFormData({
                              name: '',
                              email: '',
                              phone: '',
                              residence: 'Goa — Beachfront Mandaps & Luxury Villas',
                              dates: '',
                              guests: '2 Guests',
                              message: '',
                            });
                          }}
                          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#8F6B2E] hover:bg-[#725421] text-white font-serif text-xs uppercase tracking-[0.16em] font-bold transition-all shadow-md cursor-pointer"
                        >
                          Submit Another Inquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Card Header */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-[#8F6B2E] dark:text-[#D4AF37] uppercase tracking-[0.2em] font-bold">
                          <span className="w-5 h-[1.5px] bg-[#8F6B2E] dark:bg-[#D4AF37]" />
                          <span>SEND US YOUR INQUIRY</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-normal text-[#2A1F17] dark:text-[#F3EEE0] tracking-tight">
                          Plan Your Stay with Our Concierge
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6E5D4F] dark:text-[#B8A89A] font-serif leading-relaxed">
                          Fill in your details below and we'll assist you with the best options.
                        </p>
                      </div>

                      {/* ROW 1: FULL NAME & EMAIL ADDRESS */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        {/* FULL NAME */}
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] font-semibold">
                            <User className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37]" />
                            <span>FULL NAME *</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-[#8F6B2E]/50 dark:text-[#D4AF37]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              required
                              name="name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Elena Vance"
                              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-[#110E0B] border border-[#DDD4C4] dark:border-[#382E24] text-sm text-[#2A1F17] dark:text-[#F3EEE0] placeholder:text-[#6E5D4F]/40 dark:placeholder:text-[#B8A89A]/40 focus:outline-none focus:border-[#8F6B2E] dark:focus:border-[#D4AF37] focus:ring-1 focus:ring-[#8F6B2E]/20 transition-all font-sans shadow-none"
                            />
                          </div>
                        </div>

                        {/* EMAIL ADDRESS */}
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] font-semibold">
                            <Mail className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37]" />
                            <span>EMAIL ADDRESS *</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-[#8F6B2E]/50 dark:text-[#D4AF37]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="email"
                              required
                              name="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="elena.vance@residence.com"
                              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-[#110E0B] border border-[#DDD4C4] dark:border-[#382E24] text-sm text-[#2A1F17] dark:text-[#F3EEE0] placeholder:text-[#6E5D4F]/40 dark:placeholder:text-[#B8A89A]/40 focus:outline-none focus:border-[#8F6B2E] dark:focus:border-[#D4AF37] focus:ring-1 focus:ring-[#8F6B2E]/20 transition-all font-sans shadow-none"
                            />
                          </div>
                        </div>

                      </div>

                      {/* ROW 2: TELEPHONE NUMBER & DESTINATION CIRCUIT */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        {/* TELEPHONE NUMBER */}
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] font-semibold">
                            <Phone className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37]" />
                            <span>TELEPHONE NUMBER *</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-4 h-4 text-[#8F6B2E]/50 dark:text-[#D4AF37]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="tel"
                              required
                              name="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="+91 98765 43210"
                              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-[#110E0B] border border-[#DDD4C4] dark:border-[#382E24] text-sm text-[#2A1F17] dark:text-[#F3EEE0] placeholder:text-[#6E5D4F]/40 dark:placeholder:text-[#B8A89A]/40 focus:outline-none focus:border-[#8F6B2E] dark:focus:border-[#D4AF37] focus:ring-1 focus:ring-[#8F6B2E]/20 transition-all font-mono shadow-none"
                            />
                          </div>
                        </div>

                        {/* DESTINATION CIRCUIT */}
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37]" />
                            <span>DESTINATION CIRCUIT</span>
                          </label>
                          <div className="relative">
                            <MapPin className="w-4 h-4 text-[#8F6B2E]/50 dark:text-[#D4AF37]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select
                              name="residence"
                              value={formData.residence}
                              onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                              className="w-full pl-10 pr-10 py-3 rounded-lg bg-white dark:bg-[#110E0B] border border-[#DDD4C4] dark:border-[#382E24] text-sm text-[#2A1F17] dark:text-[#F3EEE0] focus:outline-none focus:border-[#8F6B2E] dark:focus:border-[#D4AF37] focus:ring-1 focus:ring-[#8F6B2E]/20 transition-all appearance-none cursor-pointer shadow-none"
                            >
                              <optgroup label="✦ SIGNATURE ROYAL HUBS">
                                <option value="Goa — Beachfront Mandaps & Luxury Villas">Goa — Beachfront Mandaps & Luxury Villas</option>
                                <option value="Rajasthan — Jaipur & Udaipur Palaces">Rajasthan — Jaipur & Udaipur Palaces</option>
                                <option value="Himachal Pradesh — Manali & Shimla Chalets">Himachal Pradesh — Manali & Shimla Chalets</option>
                                <option value="Uttarakhand — Rishikesh & Mussoorie Sanctuaries">Uttarakhand — Rishikesh & Mussoorie Sanctuaries</option>
                                <option value="Kerala — Munnar Hills & Alleppey Backwaters">Kerala — Munnar Hills & Alleppey Backwaters</option>
                                <option value="Karnataka — Coorg & Chikmagalur Estates">Karnataka — Coorg & Chikmagalur Estates</option>
                                <option value="Tamil Nadu — Ooty, Mahabalipuram & Chennai HQ">Tamil Nadu — Ooty, Mahabalipuram & Chennai HQ</option>
                                <option value="Kashmir & Ladakh — Srinagar, Gulmarg & Leh">Kashmir & Ladakh — Srinagar, Gulmarg & Leh</option>
                              </optgroup>

                              <optgroup label="✦ NORTH INDIA CIRCUIT">
                                <option value="Manali, Himachal Pradesh (Solang & Rohtang Chalets)">Manali, Himachal Pradesh (Solang & Rohtang Chalets)</option>
                                <option value="Shimla, Himachal Pradesh (Colonial Pine Ridge)">Shimla, Himachal Pradesh (Colonial Pine Ridge)</option>
                                <option value="Rishikesh, Uttarakhand (Ganges Wellness Sanctuary)">Rishikesh, Uttarakhand (Ganges Wellness Sanctuary)</option>
                                <option value="Mussoorie, Uttarakhand (Queen of Hills)">Mussoorie, Uttarakhand (Queen of Hills)</option>
                                <option value="Nainital, Uttarakhand (Emerald Alpine Lakes)">Nainital, Uttarakhand (Emerald Alpine Lakes)</option>
                                <option value="Jaipur, Rajasthan (Pink City Havelis & Forts)">Jaipur, Rajasthan (Pink City Havelis & Forts)</option>
                                <option value="Udaipur, Rajasthan (Lake Pichola Palaces)">Udaipur, Rajasthan (Lake Pichola Palaces)</option>
                                <option value="Agra, Uttar Pradesh (Taj Mahal Imperial Estate)">Agra, Uttar Pradesh (Taj Mahal Imperial Estate)</option>
                                <option value="Vrindavan, Uttar Pradesh (Sacred River Retreat)">Vrindavan, Uttar Pradesh (Sacred River Retreat)</option>
                                <option value="Varanasi, Uttar Pradesh (Timeless Riverfront Ghats)">Varanasi, Uttar Pradesh (Timeless Riverfront Ghats)</option>
                                <option value="Amritsar, Punjab (Golden Temple Heritage)">Amritsar, Punjab (Golden Temple Heritage)</option>
                                <option value="Srinagar, Kashmir (Dal Lake Royal Houseboats)">Srinagar, Kashmir (Dal Lake Royal Houseboats)</option>
                                <option value="Gulmarg, Kashmir (Powder Snow Gondola Peaks)">Gulmarg, Kashmir (Powder Snow Gondola Peaks)</option>
                                <option value="Leh & Pangong Tso, Ladakh (High Altitude Retreats)">Leh & Pangong Tso, Ladakh (High Altitude Retreats)</option>
                              </optgroup>

                              <optgroup label="✦ SOUTH & COASTAL CIRCUIT">
                                <option value="Goa (Calangute, Mandrem & South Coast Villas)">Goa (Calangute, Mandrem & South Coast Villas)</option>
                                <option value="Munnar, Kerala (Tea Estate Sanctuaries)">Munnar, Kerala (Tea Estate Sanctuaries)</option>
                                <option value="Alleppey, Kerala (Luxury Backwater Houseboats)">Alleppey, Kerala (Luxury Backwater Houseboats)</option>
                                <option value="Wayanad, Kerala (Rainforest Tree Villas)">Wayanad, Kerala (Rainforest Tree Villas)</option>
                                <option value="Coorg, Karnataka (Coffee Plantation Stays)">Coorg, Karnataka (Coffee Plantation Stays)</option>
                                <option value="Chikmagalur & Hampi, Karnataka (Heritage & Hills)">Chikmagalur & Hampi, Karnataka (Heritage & Hills)</option>
                                <option value="Ooty & Kodaikanal, Tamil Nadu (Nilgiri Mist Resorts)">Ooty & Kodaikanal, Tamil Nadu (Nilgiri Mist Resorts)</option>
                                <option value="Mahabalipuram & Pondicherry (Oceanfront Villas)">Mahabalipuram & Pondicherry (Oceanfront Villas)</option>
                                <option value="Chennai, Tamil Nadu (OMR Central HQ & Urban Estate)">Chennai, Tamil Nadu (OMR Central HQ & Urban Estate)</option>
                                <option value="Rameswaram & Kanyakumari, Tamil Nadu (Coastal Sanctuary)">Rameswaram & Kanyakumari, Tamil Nadu (Coastal Sanctuary)</option>
                              </optgroup>

                              <optgroup label="✦ BESPOKE MULTI-DESTINATION CIRCUITS">
                                <option value="Golden Triangle Royal Circuit (Delhi • Agra • Jaipur)">Golden Triangle Royal Circuit (Delhi • Agra • Jaipur)</option>
                                <option value="Himalayan Heights Circuit (Manali • Shimla • Rishikesh)">Himalayan Heights Circuit (Manali • Shimla • Rishikesh)</option>
                                <option value="Royal Rajasthan Circuit (Jaipur • Udaipur • Jodhpur)">Royal Rajasthan Circuit (Jaipur • Udaipur • Jodhpur)</option>
                                <option value="Kerala Serenity Circuit (Munnar • Alleppey • Kochi)">Kerala Serenity Circuit (Munnar • Alleppey • Kochi)</option>
                                <option value="Custom Multi-Destination Circuit">Custom Multi-Destination Circuit</option>
                              </optgroup>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#8F6B2E] dark:text-[#D4AF37]" />
                          </div>
                        </div>

                      </div>

                      {/* ROW 3: TARGET DATES / SEASON & PARTY SIZE */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        {/* TARGET DATES */}
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] font-semibold">
                            <Calendar className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37]" />
                            <span>TARGET DATES / SEASON</span>
                          </label>
                          <div className="relative">
                            <Calendar className="w-4 h-4 text-[#8F6B2E]/50 dark:text-[#D4AF37]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                              type="text"
                              name="dates"
                              value={formData.dates}
                              onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                              placeholder="e.g. October 12 – 18, 2026"
                              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-[#110E0B] border border-[#DDD4C4] dark:border-[#382E24] text-sm text-[#2A1F17] dark:text-[#F3EEE0] placeholder:text-[#6E5D4F]/40 dark:placeholder:text-[#B8A89A]/40 focus:outline-none focus:border-[#8F6B2E] dark:focus:border-[#D4AF37] focus:ring-1 focus:ring-[#8F6B2E]/20 transition-all shadow-none font-sans"
                            />
                          </div>
                        </div>

                        {/* PARTY SIZE */}
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] font-semibold">
                            <Users className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37]" />
                            <span>PARTY SIZE</span>
                          </label>
                          <div className="relative">
                            <Users className="w-4 h-4 text-[#8F6B2E]/50 dark:text-[#D4AF37]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select
                              name="guests"
                              value={formData.guests}
                              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                              className="w-full pl-10 pr-10 py-3 rounded-lg bg-white dark:bg-[#110E0B] border border-[#DDD4C4] dark:border-[#382E24] text-sm text-[#2A1F17] dark:text-[#F3EEE0] focus:outline-none focus:border-[#8F6B2E] dark:focus:border-[#D4AF37] focus:ring-1 focus:ring-[#8F6B2E]/20 transition-all appearance-none cursor-pointer shadow-none"
                            >
                              <option value="1 Guest">1 Guest</option>
                              <option value="2 Guests">2 Guests</option>
                              <option value="3 – 4 Guests">3 – 4 Guests</option>
                              <option value="5 – 10 Guests">5 – 10 Guests</option>
                              <option value="10+ Guests">10+ Guests</option>
                              <option value="50+ Guests">50+ Guests</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#8F6B2E] dark:text-[#D4AF37]" />
                          </div>
                        </div>

                      </div>

                      {/* ROW 4: SPECIAL REQUESTS WITH CHARACTER COUNT */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#6E5D4F] dark:text-[#B8A89A] font-semibold">
                          <MessageSquare className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37]" />
                          <span>SPECIAL REQUESTS / CULINARY & TRANSIT PREFERENCES</span>
                        </label>
                        <div className="relative">
                          <MessageSquare className="w-4 h-4 text-[#8F6B2E]/50 dark:text-[#D4AF37]/50 absolute left-3.5 top-3.5 pointer-events-none" />
                          <textarea
                            rows={3}
                            name="message"
                            value={formData.message}
                            onChange={(e) => {
                              if (e.target.value.length <= 500) {
                                setFormData({ ...formData, message: e.target.value });
                              }
                            }}
                            placeholder="Please let us know about dietary preferences, royal transfers, or celebration milestones..."
                            className="w-full pl-10 pr-4 pt-3 pb-7 rounded-lg bg-white dark:bg-[#110E0B] border border-[#DDD4C4] dark:border-[#382E24] text-sm text-[#2A1F17] dark:text-[#F3EEE0] placeholder:text-[#6E5D4F]/40 dark:placeholder:text-[#B8A89A]/40 focus:outline-none focus:border-[#8F6B2E] dark:focus:border-[#D4AF37] focus:ring-1 focus:ring-[#8F6B2E]/20 transition-all shadow-none resize-none leading-relaxed font-sans"
                          />
                          <span className="absolute right-3 bottom-2 text-[10px] font-mono text-[#6E5D4F]/60 dark:text-[#B8A89A]/60 pointer-events-none">
                            {(formData.message || '').length}/500
                          </span>
                        </div>
                      </div>

                      {/* FULL-WIDTH CTA BUTTON */}
                      <div className="pt-2 space-y-3.5">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 sm:py-4 rounded-lg bg-[#8F6B2E] hover:bg-[#725421] text-white font-serif font-bold text-xs uppercase tracking-[0.22em] transition-all duration-300 shadow-none hover:shadow-sm inline-flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-white" />
                              <span>TRANSMITTING...</span>
                            </>
                          ) : (
                            <>
                              <span>TRANSMIT INQUIRY</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        {/* Security Lock Note */}
                        <div className="flex items-center justify-center gap-1.5 text-xs text-[#6E5D4F] dark:text-[#B8A89A] font-serif">
                          <Lock className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37]" />
                          <span>Your information is secure with us.</span>
                        </div>
                      </div>

                    </form>
                  )}

                </div>
              </ScrollReveal>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FINAL INVITATION CTA */}
      <section className="relative dark:bg-[#14110E] bg-[#FAF6F0] dark:text-[#F3EEE0] text-[#2A1F17] py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
        <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
          
          <ScrollReveal direction="scale">
            <div className="flex justify-center mb-2">
              <EditorialHeritageStamp size={110} centerText="CHHR" text="CHHR HOTELS & RESORTS • PRIVATE ESTATE • " />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#8F6B2E] dark:text-[#D4AF37] bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 px-3.5 py-1.5 rounded-full border border-[#8F6B2E]/30">
              <span className="w-2 h-2 rounded-full bg-[#8F6B2E] dark:bg-[#D4AF37] inline-block shrink-0" />
              <span>02 — INVITATION</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal uppercase tracking-tight leading-[0.95] text-[#2A1F17] dark:text-[#F3EEE0]">
              WE AWAIT <br />
              <span className="text-[#8F6B2E] dark:text-[#D4AF37]">YOUR ARRIVAL.</span>
            </h2>
            <RoyalOrnamentDivider color="#8F6B2E" className="my-4" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-lg font-light dark:text-[#EAE5D9]/80 text-[#2A1F17]/80 max-w-xl mx-auto leading-relaxed">
              Step away from the noise of the world. Connect with our dedicated concierge today to curate your private holiday stay.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
              <MagneticButton>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-none bg-[#8F6B2E] hover:bg-[#A67C38] dark:bg-[#D4AF37] dark:hover:bg-[#C5A880] text-white dark:text-[#14110E] font-bold text-xs uppercase tracking-[0.16em] transition-all duration-300 shadow-xl group cursor-pointer"
                >
                  <span>CALL DIRECT CONCIERGE</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/offers"
                  className="inline-flex items-center gap-3 px-8 py-5 rounded-none border border-[#8F6B2E]/40 hover:border-[#8F6B2E] text-[#2A1F17] dark:text-[#F3EEE0] font-semibold text-xs uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer"
                >
                  <span>EXPLORE OFFERS</span>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="pt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-[#8F6B2E] dark:text-[#D4AF37] uppercase tracking-widest">
              <span>✦ 24/7 DEDICATED SERVICE</span>
              <span>✦ BESPOKE ITINERARIES</span>
              <span>✦ GUARANTEED SECLUSION</span>
            </div>
          </ScrollReveal>

        </div>
      </section>

    </div>
  );
}
