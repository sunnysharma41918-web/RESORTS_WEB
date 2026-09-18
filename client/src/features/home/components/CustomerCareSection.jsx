import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Headphones,
  Headset,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  MessageSquare,
  Sparkles,
  Calendar,
  Users,
  ChevronDown,
  User,
  Lock
} from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../../components/common/IndianArtBackground';
import { CONTACT_INFO, getWhatsAppBookingUrl } from '../../../data/contact';
import { inquiryService } from '../../../services/inquiryService';

export default function CustomerCareSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: 'Goa — Beachfront Mandaps & Luxury Villas',
    targetDates: '',
    partySize: '2 Guests',
    specialRequests: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'specialRequests' && value.length > 500) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setLoading(true);

    try {
      const payload = {
        guestName: formData.fullName.trim(),
        email: formData.email.trim() || 'N/A',
        phone: formData.phone.trim(),
        property: `Bespoke Inquiry: ${formData.destination}`,
        budget: 'Direct Estate Tariff',
        city: 'Online Concierge Desk',
        guestCount: formData.partySize,
        message: `[DATES: ${formData.targetDates || 'Flexible'}] | [GUESTS: ${formData.partySize}] | [CIRCUIT: ${formData.destination}] | [PREFERENCES: ${formData.specialRequests || 'Standard Luxury Package'}]`,
        preferredContact: 'WhatsApp Priority',
        status: 'new',
      };

      await inquiryService.createInquiry(payload);
      setLoading(false);
      setSubmitted(true);

      const supportMsg = `Hello Country Holidays Concierge, my name is ${formData.fullName} (${formData.phone}). I would like to inquire about: ${formData.destination} for ${formData.partySize}. Dates: ${formData.targetDates || 'Flexible'}.${formData.specialRequests ? ` Preferences: ${formData.specialRequests}` : ''}`;
      setTimeout(() => {
        window.open(getWhatsAppBookingUrl(supportMsg), '_blank');
      }, 700);
    } catch {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section className="relative bg-[#FAF6ED] dark:bg-[#0D0A07] text-[#241A12] dark:text-[#F5EFE6] py-16 sm:py-24 px-4 sm:px-8 lg:px-14 overflow-hidden transition-colors duration-500 font-sans select-none border-t border-[#B38738]/20 dark:border-[#B38738]/30">
      
      {/* Indian Royal Art & Arch Background */}
      <IndianArtBackground variant="full" opacity="opacity-[0.045] dark:opacity-[0.065]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* 1. SECTION HEADER: YOUR LUXURY, OUR RESPONSIBILITY */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12 sm:mb-16">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B38738]/10 dark:bg-[#B38738]/20 border border-[#B38738]/30 text-[#B38738] dark:text-[#E8C97E] text-[11px] sm:text-xs font-cinzel font-bold uppercase tracking-[0.25em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38738] dark:bg-[#E8C97E]" />
              <span>YOUR LUXURY, OUR RESPONSIBILITY</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={50}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-marcellus font-bold text-[#241A12] dark:text-[#F5EFE6] tracking-[0.02em] uppercase">
              RESERVE YOUR ROYAL RETREAT
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <RoyalOrnamentDivider color="#B38738" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#635142] dark:text-[#BFB0A2] leading-relaxed font-sans font-light max-w-2xl mx-auto">
              Submit your bespoke itinerary request directly to our central estate director or connect with our personal concierge officers for immediate reservation guidance.
            </p>
          </ScrollReveal>
        </div>

        {/* 2. 2-COLUMN LUXURY CLEAN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ========================================================== */}
          {/* LEFT COLUMN: PERSONAL CONCIERGE DESK (CLEAN FLAT ON PAGE) */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 h-full flex flex-col justify-between space-y-8 py-2">
            <ScrollReveal direction="up">
              <div className="space-y-4">
                
                {/* Royal Welcoming Greeting Tag */}
                <div className="inline-flex items-center gap-3 p-2 pr-4 rounded-2xl bg-[#F8F4EC] dark:bg-[#140F0A] border border-[#B38738]/30 shadow-sm">
                  <img
                    src="/images/padharo_mhare_desh.png"
                    alt="Padharo Mhare Desh"
                    className="w-11 h-11 object-contain rounded-xl border border-[#B38738]/40 bg-[#FAF6ED] dark:bg-[#1A130D] p-0.5"
                  />
                  <div className="text-left">
                    <span className="text-[10px] font-cinzel text-[#B38738] dark:text-[#E8C97E] uppercase tracking-[0.2em] font-bold block">
                      ✦ PADHARO MHARE DESH ✦
                    </span>
                    <span className="text-xs font-cormorant italic text-[#241A12] dark:text-[#F5EFE6]">
                      Warm Welcoming Concierge
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-[11px] sm:text-xs font-cinzel text-[#B38738] dark:text-[#E8C97E] uppercase tracking-[0.24em] font-bold block">
                    ✦ YOUR LUXURY, OUR RESPONSIBILITY ✦
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-marcellus font-bold text-[#241A12] dark:text-[#F5EFE6] leading-[1.12] tracking-[0.02em]">
                    Personal<br />Concierge Desk
                  </h2>
                  <p className="text-xs sm:text-sm text-[#635142] dark:text-[#BFB0A2] font-sans font-light leading-relaxed pt-1">
                    We're here to plan your perfect stay. Reach out directly or share your details and our concierge team will get back to you shortly.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Items - Clean flat list directly on page */}
            <ScrollReveal direction="up" delay={50}>
              <div className="space-y-6">
                
                {/* 1. Direct Concierge */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[#EFE8DC] dark:bg-[#1C160E] text-[#B38738] dark:text-[#E8C97E] border border-[#B38738]/20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#635142] dark:text-[#BFB0A2] block font-semibold">
                      DIRECT CONCIERGE
                    </span>
                    <a
                      href={`tel:${CONTACT_INFO.phoneRaw || '+919876543210'}`}
                      className="text-lg sm:text-xl font-serif font-bold text-[#241A12] dark:text-[#F5EFE6] hover:text-[#B38738] dark:hover:text-[#E8C97E] transition-colors block font-mono"
                    >
                      {CONTACT_INFO.phone || '+91 98765 43210'}
                    </a>
                  </div>
                </div>

                {/* 2. Official Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[#EFE8DC] dark:bg-[#1C160E] text-[#B38738] dark:text-[#E8C97E] border border-[#B38738]/20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#635142] dark:text-[#BFB0A2] block font-semibold">
                      OFFICIAL EMAIL
                    </span>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-sm sm:text-base font-serif font-bold text-[#241A12] dark:text-[#F5EFE6] hover:text-[#B38738] dark:hover:text-[#E8C97E] transition-colors truncate block"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                {/* 3. Corporate Headquarters */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[#EFE8DC] dark:bg-[#1C160E] text-[#B38738] dark:text-[#E8C97E] border border-[#B38738]/20 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#635142] dark:text-[#BFB0A2] block font-semibold">
                      CORPORATE HEADQUARTERS
                    </span>
                    <p className="text-xs sm:text-sm font-serif text-[#635142] dark:text-[#BFB0A2] leading-relaxed">
                      111, Rajiv Gandhi Salai, OMR, Kottivakkam, Chennai, Tamil Nadu 600041, India.
                    </p>
                  </div>
                </div>

              </div>
            </ScrollReveal>

            {/* Bottom Stats Row: Response Time & 24/7 Live Desk */}
            <ScrollReveal direction="up" delay={100}>
              <div className="pt-6 border-t border-[#B38738]/20 dark:border-[#B38738]/30 flex items-center gap-8 text-[#241A12] dark:text-[#F5EFE6]">
                
                {/* Response Time */}
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#B38738] dark:text-[#E8C97E] stroke-[1.5]" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#635142] dark:text-[#BFB0A2] block font-medium">
                      RESPONSE TIME
                    </span>
                    <span className="text-sm sm:text-base font-serif font-bold text-[#241A12] dark:text-[#F5EFE6]">
                      &lt; 2 HOURS
                    </span>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="h-8 w-[1px] bg-[#B38738]/25 dark:bg-[#B38738]/35" />

                {/* 24/7 Live Desk */}
                <div className="flex items-center gap-3">
                  <Headset className="w-6 h-6 text-[#B38738] dark:text-[#E8C97E] stroke-[1.5]" />
                  <div>
                    <span className="text-sm sm:text-base font-serif font-bold text-[#241A12] dark:text-[#F5EFE6] block leading-tight">
                      24/7
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#635142] dark:text-[#BFB0A2] block font-medium">
                      LIVE DESK
                    </span>
                  </div>
                </div>

              </div>
            </ScrollReveal>

            {/* 3D Social Media Channels */}
            <ScrollReveal direction="up" delay={150}>
              <div className="pt-4 space-y-3">
                <span className="text-[10px] sm:text-[11px] font-cinzel uppercase tracking-[0.22em] text-[#B38738] dark:text-[#E8C97E] font-bold block">
                  ✦ CONNECT ON SOCIAL SANCTUARIES ✦
                </span>
                <div className="flex items-center gap-3 sm:gap-4">
                  
                  {/* Instagram 3D */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Follow on Instagram"
                    className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-1 bg-gradient-to-br from-[#E8C97E]/30 via-[#B38738]/20 to-transparent border border-[#B38738]/40 hover:border-[#E8C97E] shadow-[0_4px_14px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_24px_rgba(179,135,56,0.35)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 block overflow-hidden"
                  >
                    <img
                      src="/images/icon_3d_instagram.jpg"
                      alt="Instagram 3D"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </a>

                  {/* WhatsApp 3D */}
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Chat on WhatsApp"
                    className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-1 bg-gradient-to-br from-[#E8C97E]/30 via-[#B38738]/20 to-transparent border border-[#B38738]/40 hover:border-[#E8C97E] shadow-[0_4px_14px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_24px_rgba(179,135,56,0.35)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 block overflow-hidden"
                  >
                    <img
                      src="/images/icon_3d_whatsapp.jpg"
                      alt="WhatsApp 3D"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </a>

                  {/* YouTube 3D */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Watch on YouTube"
                    className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-1 bg-gradient-to-br from-[#E8C97E]/30 via-[#B38738]/20 to-transparent border border-[#B38738]/40 hover:border-[#E8C97E] shadow-[0_4px_14px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_24px_rgba(179,135,56,0.35)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 block overflow-hidden"
                  >
                    <img
                      src="/images/icon_3d_youtube.jpg"
                      alt="YouTube 3D"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </a>

                  {/* Facebook 3D */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Connect on Facebook"
                    className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-1 bg-gradient-to-br from-[#E8C97E]/30 via-[#B38738]/20 to-transparent border border-[#B38738]/40 hover:border-[#E8C97E] shadow-[0_4px_14px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_24px_rgba(179,135,56,0.35)] transition-all duration-300 hover:scale-110 hover:-translate-y-1 block overflow-hidden"
                  >
                    <img
                      src="/images/icon_3d_facebook.jpg"
                      alt="Facebook 3D"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </a>

                </div>
              </div>
            </ScrollReveal>
          </div>


          {/* ========================================================== */}
          {/* RIGHT COLUMN: PLAN YOUR STAY FORM (CLEAN FLAT PANEL)       */}
          {/* ========================================================== */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={100}>
              <div className="bg-[#F8F4EC] dark:bg-[#140F0A] border border-[#B38738]/30 dark:border-[#B38738]/40 rounded-2xl p-6 sm:p-9 lg:p-10 relative transition-all shadow-[0_8px_30px_rgba(179,135,56,0.12)]">
                
                {submitted ? (
                  <div className="py-14 text-center space-y-6 bg-white/70 dark:bg-black/40 p-8 sm:p-10 rounded-2xl border border-[#B38738]/40 my-auto shadow-inner">
                    <div className="w-16 h-16 rounded-full bg-[#B38738]/15 dark:bg-[#B38738]/25 text-[#B38738] dark:text-[#E8C97E] flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2.5">
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#B38738] dark:text-[#E8C97E] font-bold block">
                        ● OFFICIAL INQUIRY TRANSMITTED
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#241A12] dark:text-[#F5EFE6]">
                        Inquiry Received, {formData.fullName}!
                      </h3>
                      <p className="text-xs sm:text-sm text-[#635142] dark:text-[#BFB0A2] font-serif max-w-md mx-auto leading-relaxed">
                        Your request for <strong className="text-[#B38738] dark:text-[#E8C97E]">{formData.destination}</strong> has been logged. Connecting you with our priority desk on WhatsApp...
                      </p>
                    </div>

                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                      <a
                        href={getWhatsAppBookingUrl(`Hello Country Holidays Concierge, my name is ${formData.fullName} (${formData.phone}). I have submitted an inquiry for ${formData.destination}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] hover:from-[#A87B2A] hover:to-[#966819] text-white font-serif text-xs uppercase tracking-[0.16em] font-bold transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Continue to WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            destination: 'Goa — Beachfront Mandaps & Luxury Villas',
                            targetDates: '',
                            partySize: '2 Guests',
                            specialRequests: '',
                          });
                        }}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-transparent border border-[#B38738]/40 text-[#241A12] dark:text-[#F5EFE6] font-serif text-xs uppercase tracking-[0.16em] font-medium hover:border-[#B38738] transition-colors cursor-pointer"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Card Header matching image */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-cinzel text-[#B38738] dark:text-[#E8C97E] uppercase tracking-[0.2em] font-bold">
                        <span className="w-5 h-[1.5px] bg-[#B38738] dark:bg-[#E8C97E]" />
                        <span>SEND US YOUR INQUIRY</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-marcellus font-normal text-[#241A12] dark:text-[#F5EFE6] tracking-[0.02em]">
                        Plan Your Stay with Our Concierge
                      </h3>
                      <p className="text-xs sm:text-sm text-[#635142] dark:text-[#BFB0A2] font-sans font-light leading-relaxed">
                        Fill in your details below and we'll assist you with the best options.
                      </p>
                    </div>

                    {/* ROW 1: FULL NAME & EMAIL ADDRESS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* FULL NAME */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#635142] dark:text-[#BFB0A2] font-semibold">
                          <User className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E]" />
                          <span>FULL NAME *</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[#B38738]/50 dark:text-[#E8C97E]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            required
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Elena Vance"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-[#1A130D] border border-[#DDD4C4] dark:border-[#3A2C17] text-sm text-[#241A12] dark:text-[#F5EFE6] placeholder:text-[#635142]/40 dark:placeholder:text-[#BFB0A2]/40 focus:outline-none focus:border-[#B38738] dark:focus:border-[#E8C97E] focus:ring-1 focus:ring-[#B38738]/20 transition-all font-sans shadow-none"
                          />
                        </div>
                      </div>

                      {/* EMAIL ADDRESS */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#635142] dark:text-[#BFB0A2] font-semibold">
                          <Mail className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E]" />
                          <span>EMAIL ADDRESS *</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#B38738]/50 dark:text-[#E8C97E]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="elena.vance@residence.com"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-[#1A130D] border border-[#DDD4C4] dark:border-[#3A2C17] text-sm text-[#241A12] dark:text-[#F5EFE6] placeholder:text-[#635142]/40 dark:placeholder:text-[#BFB0A2]/40 focus:outline-none focus:border-[#B38738] dark:focus:border-[#E8C97E] focus:ring-1 focus:ring-[#B38738]/20 transition-all font-sans shadow-none"
                          />
                        </div>
                      </div>

                    </div>

                    {/* ROW 2: TELEPHONE NUMBER & DESTINATION CIRCUIT */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* TELEPHONE NUMBER */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#635142] dark:text-[#BFB0A2] font-semibold">
                          <Phone className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E]" />
                          <span>TELEPHONE NUMBER *</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#B38738]/50 dark:text-[#E8C97E]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="tel"
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-[#1A130D] border border-[#DDD4C4] dark:border-[#3A2C17] text-sm text-[#241A12] dark:text-[#F5EFE6] placeholder:text-[#635142]/40 dark:placeholder:text-[#BFB0A2]/40 focus:outline-none focus:border-[#B38738] dark:focus:border-[#E8C97E] focus:ring-1 focus:ring-[#B38738]/20 transition-all font-mono shadow-none"
                          />
                        </div>
                      </div>

                      {/* DESTINATION CIRCUIT */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#635142] dark:text-[#BFB0A2] font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E]" />
                          <span>DESTINATION CIRCUIT</span>
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-[#B38738]/50 dark:text-[#E8C97E]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-10 py-3 rounded-lg bg-white dark:bg-[#1A130D] border border-[#DDD4C4] dark:border-[#3A2C17] text-sm text-[#241A12] dark:text-[#F5EFE6] focus:outline-none focus:border-[#B38738] dark:focus:border-[#E8C97E] focus:ring-1 focus:ring-[#B38738]/20 transition-all appearance-none cursor-pointer shadow-none"
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
                          <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#B38738] dark:text-[#E8C97E]" />
                        </div>
                      </div>

                    </div>

                    {/* ROW 3: TARGET DATES / SEASON & PARTY SIZE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      {/* TARGET DATES */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#635142] dark:text-[#BFB0A2] font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E]" />
                          <span>TARGET DATES / SEASON</span>
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-[#B38738]/50 dark:text-[#E8C97E]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            name="targetDates"
                            value={formData.targetDates}
                            onChange={handleInputChange}
                            placeholder="e.g. October 12 – 18, 2026"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-[#1A130D] border border-[#DDD4C4] dark:border-[#3A2C17] text-sm text-[#241A12] dark:text-[#F5EFE6] placeholder:text-[#635142]/40 dark:placeholder:text-[#BFB0A2]/40 focus:outline-none focus:border-[#B38738] dark:focus:border-[#E8C97E] focus:ring-1 focus:ring-[#B38738]/20 transition-all shadow-none font-sans"
                          />
                        </div>
                      </div>

                      {/* PARTY SIZE */}
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#635142] dark:text-[#BFB0A2] font-semibold">
                          <Users className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E]" />
                          <span>PARTY SIZE</span>
                        </label>
                        <div className="relative">
                          <Users className="w-4 h-4 text-[#B38738]/50 dark:text-[#E8C97E]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            name="partySize"
                            value={formData.partySize}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-10 py-3 rounded-lg bg-white dark:bg-[#1A130D] border border-[#DDD4C4] dark:border-[#3A2C17] text-sm text-[#241A12] dark:text-[#F5EFE6] focus:outline-none focus:border-[#B38738] dark:focus:border-[#E8C97E] focus:ring-1 focus:ring-[#B38738]/20 transition-all appearance-none cursor-pointer shadow-none"
                          >
                            <option value="1 Guest">1 Guest</option>
                            <option value="2 Guests">2 Guests</option>
                            <option value="3 – 4 Guests">3 – 4 Guests</option>
                            <option value="5 – 10 Guests">5 – 10 Guests</option>
                            <option value="10+ Guests">10+ Guests</option>
                            <option value="50+ Guests">50+ Guests</option>
                          </select>
                          <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#B38738] dark:text-[#E8C97E]" />
                        </div>
                      </div>

                    </div>

                    {/* ROW 4: SPECIAL REQUESTS WITH CHARACTER COUNT */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#635142] dark:text-[#BFB0A2] font-semibold">
                        <MessageSquare className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E]" />
                        <span>SPECIAL REQUESTS / CULINARY & TRANSIT PREFERENCES</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="w-4 h-4 text-[#B38738]/50 dark:text-[#E8C97E]/50 absolute left-3.5 top-3.5 pointer-events-none" />
                        <textarea
                          rows={3}
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          placeholder="Please let us know about dietary preferences, royal transfers, or celebration milestones..."
                          className="w-full pl-10 pr-4 pt-3 pb-7 rounded-lg bg-white dark:bg-[#1A130D] border border-[#DDD4C4] dark:border-[#3A2C17] text-sm text-[#241A12] dark:text-[#F5EFE6] placeholder:text-[#635142]/40 dark:placeholder:text-[#BFB0A2]/40 focus:outline-none focus:border-[#B38738] dark:focus:border-[#E8C97E] focus:ring-1 focus:ring-[#B38738]/20 transition-all shadow-none resize-none leading-relaxed font-sans"
                        />
                        <span className="absolute right-3 bottom-2 text-[10px] font-mono text-[#635142]/60 dark:text-[#BFB0A2]/60 pointer-events-none">
                          {formData.specialRequests.length}/500
                        </span>
                      </div>
                    </div>

                    {/* FULL-WIDTH CTA BUTTON */}
                    <div className="pt-2 space-y-3.5">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 sm:py-4 rounded-lg bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] hover:from-[#A87B2A] hover:to-[#966819] text-white font-serif font-bold text-xs uppercase tracking-[0.22em] transition-all duration-300 shadow-[0_4px_20px_rgba(179,135,56,0.3)] inline-flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                      >
                        <span>{loading ? 'TRANSMITTING...' : 'TRANSMIT INQUIRY'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Security Lock Note */}
                      <div className="flex items-center justify-center gap-1.5 text-xs text-[#635142] dark:text-[#BFB0A2] font-serif">
                        <Lock className="w-3.5 h-3.5 text-[#B38738] dark:text-[#E8C97E]" />
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
  );
}
