import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  Sparkles,
  Crown,
  Heart,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Phone,
  ArrowRight,
  MessageSquare,
  Building2,
  ShieldCheck,
  Music,
  Utensils,
  PartyPopper,
  Send,
  Loader2,
  Check
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../components/common/IndianArtBackground';
import { inquiryService } from '../../services/inquiryService';
import { getWhatsAppBookingUrl } from '../../data/contact';

// THE EXACT 7 SPECIALIZATIONS FROM COUNTRY HOLIDAYS
const SPECIALIZATIONS = [
  {
    id: 'destination-wedding',
    title: 'Destination Wedding',
    tagline: 'Palaces & Oceanfront Mandaps',
    capacity: '200 – 2,500 Guests',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    icon: Crown,
    color: '#B38738',
    highlights: ['Palace Courtyards & Beachfronts', 'Elephant / Vintage Car Baraat', 'Awadhi & Regional Feasts', 'Bridal Sanctum Suites'],
    locations: 'Rajasthan • Goa • Chennai'
  },
  {
    id: 'regional-wedding',
    title: 'Regional Wedding',
    tagline: 'Vedic Rites & Cultural Traditions',
    capacity: '150 – 1,800 Guests',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
    icon: Heart,
    color: '#9E1C3F',
    highlights: ['Traditional Vedic Mandaps', 'Live Shehnai & Nadaswaram', 'Pure Satvik & Jain Kitchens', 'Custom Floral Garlands'],
    locations: 'Jaipur • Varanasi • South India'
  },
  {
    id: 'engagement',
    title: 'Engagement & Roka',
    tagline: 'Sagai, Roka & Ring Ceremonies',
    capacity: '50 – 400 Guests',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    icon: Sparkles,
    color: '#B38738',
    highlights: ['Floral Ring Trays & Backdrops', 'Live Sangeet DJ & Dhol Rhythms', 'Artisanal Street Chaat Counters', 'Sundowner Sunset Views'],
    locations: 'Delhi NCR • Mumbai • Goa'
  },
  {
    id: 'anniversary',
    title: 'Anniversary Celebrations',
    tagline: 'Silver, Golden & Diamond Jubilees',
    capacity: '30 – 350 Guests',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85',
    icon: Heart,
    color: '#D4AF37',
    highlights: ['Vow Renewal Ceremonies', 'Candlelit Gazebo Dinners', 'Live Sitar & Ghazal Recitals', '5-Course Heritage Tasting'],
    locations: 'Udaipur • Solang • Kerala'
  },
  {
    id: 'birthday-party',
    title: 'Birthday Soirée',
    tagline: 'Shahi Janamotsav & Milestone Galas',
    capacity: '30 – 500 Guests',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85',
    icon: PartyPopper,
    color: '#E07A5F',
    highlights: ['Thematic Decor & Sculpted Cakes', 'Live Tandoor & Chaat Stations', 'High-Energy DJ & Entertainment', 'Custom Family Return Gifts'],
    locations: 'Chennai • Bengaluru • Delhi NCR'
  },
  {
    id: 'corporate-meetings',
    title: 'Corporate Meetings & Events',
    tagline: 'Executive Summits & Conclaves',
    capacity: '40 – 1,200 Delegates',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
    icon: Building2,
    color: '#3D5A80',
    highlights: ['4K Seamless Video Walls & AV', 'Executive High-Tea & Breakfasts', 'Networking Gala Dinners', 'VIP Concierge Coordination'],
    locations: 'Mumbai • Delhi NCR • Bengaluru'
  },
  {
    id: 'pool-parties-concerts',
    title: 'Pool Parties & Concerts',
    tagline: 'Sangeet Nights, Melas & Shows',
    capacity: '200 – 3,000 Attendees',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85',
    icon: Music,
    color: '#0077B6',
    highlights: ['Line-Array Concert Sound Rig', 'Live Sufi & Bollywood Bands', 'Poolside VIP Cabana Service', 'Desi Mela Bazaars & Grills'],
    locations: 'Goa Beach • Jaipur Grounds'
  }
];

// KEY VALUE PILLARS
const PILLARS = [
  { icon: Crown, title: '50+ Royal Venues', desc: 'Palaces, oceanfront lawns & grand ballrooms across India.' },
  { icon: Utensils, title: 'Master Chef Banquets', desc: 'Bespoke regional cuisines with separate pure Veg/Jain kitchens.' },
  { icon: Sparkles, title: '100% Tailored Décor', desc: 'Custom floral mandaps, lighting rigs & thematic styling.' },
  { icon: ShieldCheck, title: 'Dedicated Concierge', desc: '24/7 personal event director for seamless execution.' }
];

export default function Celebrations() {
  const location = useLocation();
  const [selectedSpec, setSelectedSpec] = useState(SPECIALIZATIONS[0]);

  // Inquiry form
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    city: '',
    celebrationType: 'Destination Wedding',
    destination: 'Rajasthan (Jaipur & Udaipur)',
    guestCount: '250 Guests',
    budget: 'Flexible',
    eventDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);

  useEffect(() => {
    if (location.hash === '#inquiry') {
      setTimeout(() => {
        const el = document.getElementById('inquiry');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [location]);

  const handleSelectForInquiry = (spec) => {
    setSelectedSpec(spec);
    setFormData((prev) => ({
      ...prev,
      celebrationType: spec.title,
      message: `[DIRECT INQUIRY]: Interested in ${spec.title} (${spec.tagline}).`
    }));
    const el = document.getElementById('inquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!formData.guestName || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const payload = {
        guestName: formData.guestName,
        email: formData.email || 'N/A',
        phone: formData.phone,
        property: `${formData.celebrationType} — ${formData.destination}`,
        budget: formData.budget,
        city: formData.city,
        guestCount: formData.guestCount,
        eventDate: formData.eventDate,
        message: `[OCCASION: ${formData.celebrationType}] | [GUESTS: ${formData.guestCount}] | [BUDGET: ${formData.budget}] | [HOST CITY: ${formData.city || 'N/A'}] | [DATE: ${formData.eventDate || 'Flexible'}] | [DETAILS: ${formData.message || 'Bespoke Banquet Inquiry'}]`,
      };

      const result = await inquiryService.createInquiry(payload);
      setSubmittedInquiry({ ...result, ...payload });
    } catch (err) {
      console.error('Failed to submit banquet inquiry', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF6F0] dark:bg-[#0E0C0A] text-[#2A1F17] dark:text-[#F3EEE0] overflow-hidden font-jakarta selection:bg-[#B38738] selection:text-white transition-colors duration-300">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO & BANQUET BRAND EMBLEM WITH ELEVATED FONTS           */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-8 border-b border-[#B38738]/20 text-center select-none overflow-hidden">
        
        {/* Subtle Indian Jaali Texture */}
        <IndianArtBackground variant="full" opacity="opacity-[0.04] dark:opacity-[0.05]" />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#B38738]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          
          {/* Circular Gold Seal Logo Emblem */}
          <div className="mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white dark:bg-[#16120E] border-2 border-[#B38738] p-2 shadow-2xl flex flex-col items-center justify-center relative group hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-full border border-dashed border-[#B38738]/60 flex flex-col items-center justify-center p-2 text-center">
              <Sparkles className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] mb-1 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-cinzel font-bold text-[#2A1F17] dark:text-[#FAF6ED] tracking-wide uppercase leading-tight">
                Country Holidays
              </span>
              <span className="text-[7.5px] sm:text-[8px] font-cinzel tracking-[0.2em] text-[#8F661E] dark:text-[#E8C97E] font-extrabold uppercase mt-0.5">
                Hotels & Resorts
              </span>
            </div>
          </div>

          {/* Main Title with Regal Marcellus / Cormorant Display Typography */}
          <ScrollReveal direction="up">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-marcellus font-normal text-[#2A1F17] dark:text-[#FAF6ED] tracking-tight uppercase leading-[1.05]">
              Our <span className="text-[#8F661E] dark:text-[#E8C97E] font-cormorant italic lowercase tracking-normal">Specializations</span>
            </h1>
          </ScrollReveal>

          <RoyalOrnamentDivider color="#B38738" className="my-1" />

          {/* Subtitle in Cormorant Garamond Editorial Font */}
          <ScrollReveal direction="up" delay={80}>
            <p className="text-base sm:text-xl text-[#6E5D4F] dark:text-[#C5BAAF] max-w-2xl mx-auto leading-relaxed font-cormorant font-light italic">
              Get special arrangements for your special events. At Country Holidays, we have <strong className="text-[#8F661E] dark:text-[#E8C97E] not-italic font-semibold font-jakarta text-sm sm:text-base">expert event planners and advisors</strong> who will make your day memorable.
            </p>
          </ScrollReveal>

          {/* Golden Badge in Cinzel Caps */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#8F661E]/20 via-[#B38738]/30 to-[#8F661E]/20 border border-[#B38738]/50 text-xs font-cinzel font-bold tracking-[0.25em] text-[#8F661E] dark:text-[#E8C97E] uppercase shadow-sm">
              ✦ PREMIUM BANQUETS SERVICES ✦
            </span>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. THE 7 HEXAGONAL SPECIALIZATIONS INTERACTIVE CARDS          */}
      {/* ------------------------------------------------------------- */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto select-none">
        
        {/* Grid of 7 Specializations (Centered & Balanced Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 lg:gap-3 items-stretch justify-center">
          {SPECIALIZATIONS.map((spec, idx) => {
            const isSelected = selectedSpec.id === spec.id;
            const IconComp = spec.icon;

            return (
              <motion.div
                key={spec.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedSpec(spec)}
                className={`rounded-3xl border transition-all duration-300 p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer text-center relative overflow-hidden group shadow-lg ${
                  isSelected
                    ? 'border-[#B38738] bg-white dark:bg-[#1A140F] ring-2 ring-[#B38738]/50 shadow-2xl scale-[1.02]'
                    : 'border-[#B38738]/20 bg-white/70 dark:bg-[#140F0A]/90 hover:border-[#B38738]/60 hover:bg-white dark:hover:bg-[#16110D]'
                }`}
              >
                {/* Photo Hexagon Frame */}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 border border-[#B38738]/30 shadow-inner group-hover:border-[#B38738] transition-colors">
                  <img
                    src={spec.image}
                    alt={spec.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-[#B38738]/60 flex items-center justify-center text-[#E8C97E]">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Title in Marcellus */}
                <div className="space-y-1 my-auto">
                  <h3 className="font-marcellus font-bold text-xs sm:text-sm text-[#2A1F17] dark:text-[#FAF6ED] leading-snug group-hover:text-[#8F661E] dark:group-hover:text-[#E8C97E] transition-colors">
                    {spec.title}
                  </h3>
                  <p className="text-[11px] font-jakarta text-[#6E5D4F] dark:text-[#A89B8F] line-clamp-1 font-normal">
                    {spec.tagline}
                  </p>
                </div>

                {/* Action CTA in Cinzel */}
                <div className="mt-3 pt-2 border-t border-[#B38738]/15">
                  <span className="text-[9px] font-cinzel uppercase tracking-[0.2em] font-bold text-[#8F661E] dark:text-[#E8C97E] block">
                    {isSelected ? '● ACTIVE VIEW' : 'EXPLORE ✦'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================== */}
        {/* ACTIVE SPECIALIZATION SHOWCASE PANEL                        */}
        {/* =========================================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSpec.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-white/95 dark:bg-[#16120E] border-2 border-[#B38738]/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Visual Banner */}
              <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-[#B38738]/30">
                <img
                  src={selectedSpec.image}
                  alt={selectedSpec.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-jakarta">
                  <span className="px-3.5 py-1 bg-black/70 backdrop-blur-md rounded-full border border-[#B38738]/50 text-[#E8C97E] font-semibold text-[11px] tracking-wide">
                    {selectedSpec.capacity}
                  </span>
                  <span className="flex items-center gap-1.5 bg-black/70 px-3 py-1 rounded-full text-[11px] text-white/90">
                    <MapPin className="w-3.5 h-3.5 text-[#E8C97E]" />
                    {selectedSpec.locations}
                  </span>
                </div>
              </div>

              {/* Right Column: Key Details & Booking Action */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-cinzel font-bold uppercase tracking-[0.2em] text-[#8F661E] dark:text-[#E8C97E]">
                    ✦ SPECIALIZATION OVERVIEW
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-marcellus text-[#2A1F17] dark:text-[#FAF6ED] leading-tight uppercase">
                  {selectedSpec.title}
                </h2>
                
                <p className="text-sm sm:text-base text-[#6E5D4F] dark:text-[#B8A89A] font-cormorant italic text-lg leading-relaxed">
                  "{selectedSpec.tagline}. Curated by master advisors with turnkey arrangements for mandap decor, signature buffets, audio-visuals, and VIP guest hosting."
                </p>

                {/* 4 Clean Highlights Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {selectedSpec.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF6F0] dark:bg-[#0E0C0A] border border-[#B38738]/20 text-xs font-jakarta font-medium text-[#2A1F17] dark:text-[#FAF6ED]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleSelectForInquiry(selectedSpec)}
                    className="px-7 py-3.5 bg-[#B38738] hover:bg-[#8F661E] text-white text-xs font-cinzel font-bold uppercase tracking-[0.2em] rounded-full shadow-lg transition-all flex items-center gap-2.5 cursor-pointer"
                  >
                    <span>INQUIRE FOR {selectedSpec.title.toUpperCase()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={getWhatsAppBookingUrl(`Hello Country Holidays Hotels & Resorts, I would like to inquire about ${selectedSpec.title} arrangements.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-transparent border border-[#B38738]/40 hover:border-[#B38738] text-[#2A1F17] dark:text-[#FAF6ED] text-xs font-cinzel font-semibold tracking-wider rounded-full transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#B38738] dark:text-[#E8C97E]" />
                    <span>WhatsApp Advisor</span>
                  </a>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. 4 KEY ADVANTAGES (WITH MARCELLUS & CINZEL)                 */}
      {/* ------------------------------------------------------------- */}
      <section className="py-14 sm:py-18 px-4 sm:px-8 lg:px-12 bg-[#F4EFE6] dark:bg-[#120F0C] border-y border-[#B38738]/20 transition-colors">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-[#18130F] border border-[#B38738]/25 shadow-md flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#B38738]/10 flex items-center justify-center text-[#B38738] dark:text-[#E8C97E] shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-marcellus font-bold text-base text-[#2A1F17] dark:text-[#FAF6ED]">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#6E5D4F] dark:text-[#A89B8F] font-jakarta font-normal mt-1 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. STREAMLINED INQUIRY DOSSIER FORM                           */}
      {/* ------------------------------------------------------------- */}
      <section id="inquiry" className="py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto scroll-mt-20">
        
        {submittedInquiry ? (
          <div className="bg-white dark:bg-[#18130F] border border-[#B38738]/40 p-8 sm:p-12 shadow-2xl text-center max-w-xl mx-auto space-y-6 rounded-3xl">
            <div className="w-16 h-16 bg-[#FAF6F0] dark:bg-[#0E0C0A] border-2 border-[#B38738] text-[#B38738] dark:text-[#E8C97E] rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-cinzel text-[#8F661E] dark:text-[#E8C97E] uppercase font-bold tracking-[0.2em] block">
                ● INQUIRY RECEIVED
              </span>
              <h3 className="text-2xl sm:text-3xl font-marcellus font-bold text-[#2A1F17] dark:text-[#FAF6ED]">
                Thank you, {submittedInquiry.guestName}!
              </h3>
              <p className="text-sm text-[#6E5D4F] dark:text-[#B8A89A] font-jakarta leading-relaxed">
                Your event brief for <strong className="text-[#8F661E] dark:text-[#E8C97E]">{submittedInquiry.property}</strong> has been sent to our banquet director. We will contact you at <strong className="text-[#2A1F17] dark:text-[#FAF6ED]">{submittedInquiry.phone}</strong>.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppBookingUrl(`Hello Country Holidays Hotels & Resorts, I have submitted an inquiry for ${submittedInquiry.property} (Host: ${submittedInquiry.guestName}, Phone: ${submittedInquiry.phone}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#B38738] hover:bg-[#8F661E] text-white text-xs font-bold font-cinzel uppercase tracking-[0.2em] rounded-full shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>OPEN WHATSAPP DESK</span>
              </a>

              <button
                onClick={() => setSubmittedInquiry(null)}
                className="w-full sm:w-auto px-6 py-3.5 border border-[#B38738]/40 text-[#2A1F17] dark:text-[#FAF6ED] text-xs font-cinzel tracking-wider rounded-full hover:border-[#B38738] cursor-pointer"
              >
                Submit Another
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/95 dark:bg-[#16120E] border border-[#B38738]/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            
            <div className="text-center space-y-2 max-w-lg mx-auto">
              <span className="text-xs font-cinzel font-bold uppercase tracking-[0.25em] text-[#8F661E] dark:text-[#E8C97E]">
                ✦ QUICK BANQUET INQUIRY
              </span>
              <h2 className="text-3xl sm:text-4xl font-marcellus text-[#2A1F17] dark:text-[#FAF6ED] uppercase">
                Plan Your <span className="text-[#8F661E] dark:text-[#E8C97E]">Special Event</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6E5D4F] dark:text-[#A89B8F] font-jakarta">
                Our dedicated event advisors will provide customized banquet and venue options.
              </p>
            </div>

            <form onSubmit={handleSubmitInquiry} className="space-y-4 max-w-3xl mx-auto font-jakarta">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-cinzel uppercase text-[#8F661E] dark:text-[#E8C97E] font-bold block mb-1 tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="guestName"
                    required
                    value={formData.guestName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 bg-[#FAF6F0] dark:bg-[#0E0C0A] border border-[#B38738]/25 focus:border-[#B38738] rounded-xl text-sm text-[#2A1F17] dark:text-[#FAF6ED] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-cinzel uppercase text-[#8F661E] dark:text-[#E8C97E] font-bold block mb-1 tracking-wider">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98991 08543"
                    className="w-full px-4 py-3 bg-[#FAF6F0] dark:bg-[#0E0C0A] border border-[#B38738]/25 focus:border-[#B38738] rounded-xl text-sm text-[#2A1F17] dark:text-[#FAF6ED] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Specialization & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-cinzel uppercase text-[#8F661E] dark:text-[#E8C97E] font-bold block mb-1 tracking-wider">
                    Specialization *
                  </label>
                  <select
                    name="celebrationType"
                    value={formData.celebrationType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#FAF6F0] dark:bg-[#0E0C0A] border border-[#B38738]/25 focus:border-[#B38738] rounded-xl text-sm text-[#2A1F17] dark:text-[#FAF6ED] focus:outline-none cursor-pointer"
                  >
                    {SPECIALIZATIONS.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-cinzel uppercase text-[#8F661E] dark:text-[#E8C97E] font-bold block mb-1 tracking-wider">
                    Preferred Location
                  </label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#FAF6F0] dark:bg-[#0E0C0A] border border-[#B38738]/25 focus:border-[#B38738] rounded-xl text-sm text-[#2A1F17] dark:text-[#FAF6ED] focus:outline-none cursor-pointer"
                  >
                    <option value="Rajasthan (Jaipur & Udaipur)">Rajasthan (Jaipur & Udaipur)</option>
                    <option value="Goa (Beachfront Mandaps & Lawns)">Goa (Beachfront Mandaps & Lawns)</option>
                    <option value="Tamil Nadu (Chennai Coast)">Tamil Nadu (Chennai Coast)</option>
                    <option value="Kerala (Backwaters)">Kerala (Backwaters)</option>
                    <option value="Delhi NCR Hub">Delhi NCR Hub</option>
                    <option value="Maharashtra (Mumbai & Lonavala)">Maharashtra (Mumbai & Lonavala)</option>
                    <option value="Himachal Pradesh (Shimla & Solang)">Himachal Pradesh (Shimla & Solang)</option>
                    <option value="Other Pan-India Location">Other Pan-India Location</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Guests & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-cinzel uppercase text-[#8F661E] dark:text-[#E8C97E] font-bold block mb-1 tracking-wider">
                    Estimated Guests
                  </label>
                  <input
                    type="text"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    placeholder="e.g. 150 – 300 Guests"
                    className="w-full px-4 py-3 bg-[#FAF6F0] dark:bg-[#0E0C0A] border border-[#B38738]/25 focus:border-[#B38738] rounded-xl text-sm text-[#2A1F17] dark:text-[#FAF6ED] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-cinzel uppercase text-[#8F661E] dark:text-[#E8C97E] font-bold block mb-1 tracking-wider">
                    Event Date (Tentative)
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#FAF6F0] dark:bg-[#0E0C0A] border border-[#B38738]/25 focus:border-[#B38738] rounded-xl text-sm text-[#2A1F17] dark:text-[#FAF6ED] focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Submit CTA in Cinzel */}
              <div className="pt-3 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-[#B38738] hover:bg-[#8F661E] text-white font-cinzel font-bold text-xs uppercase tracking-[0.25em] rounded-full shadow-xl transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SUBMIT BANQUET INQUIRY</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        )}

      </section>

      {/* Bottom Heritage Border */}
      <IndianJaaliBorder />

    </div>
  );
}