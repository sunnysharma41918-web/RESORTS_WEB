import React, { useState, useEffect, useId } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  CheckCircle2,
  Phone,
  Sparkles,
  Crown,
  Feather,
  Calendar,
  Users,
  Send,
  MessageSquare,
  Building2,
  Heart,
  HeartHandshake,
  Mail,
  User,
  ShieldCheck,
  Clock,
  Loader2
} from 'lucide-react';
import ScrollReveal from '../../components/common/ScrollReveal';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import MagneticButton from '../../components/common/MagneticButton';
import EditorialBackgroundElements from '../../components/common/EditorialBackgroundElements';
import { inquiryService } from '../../services/inquiryService';
import { getWhatsAppBookingUrl } from '../../data/contact';

/**
 * DESIGN NOTE — v2 "The Royal Almanac"
 * ------------------------------------------------------------------
 * Same palette as before — cream #FAFDF2, ink #0E0E0E / #1C1C1C,
 * vermilion #FF1F02, gold #EAB308, hairline #E9E9DE — but the
 * structure moves away from the "hero + icon grid + alternating
 * image blocks" template toward an almanac / ledger conceit that
 * fits a royal-events brand: entries are stamped, torn-edged photo
 * plates, dot-leader spec rows (menu/ledger convention), and a
 * fixed index rail you thumb through rather than a card grid.
 *
 * Display face: Fraunces (high-contrast, ornamental serif — reads
 * as engraved invitation type). Body stays Manrope. If this project
 * doesn't already load Fraunces, move the @import below into your
 * index.html <head> for best performance.
 */

const celebrationSections = [
  {
    id: 'destination-wedding',
    number: '01',
    title: 'Destination Wedding',
    tagline: 'Palatial Grandeur & Coastal Royal Mandaps',
    overlayText: 'VIVAH',
    iconType: 'rings',
    description:
      'Immerse your vows in imperial Indian majesty. From grand palace courtyards in Rajasthan and lakefront heritage estates in Udaipur to oceanfront mandaps in Goa, our bespoke wedding concierges choreograph royal Baraat entries with live Shehnai, opulent marigold and jasmine floral canopies, and 7-course royal banquets.',
    capacity: '250 – 2,500 Guests',
    venues: ['Royal Palace Courtyard', 'Oceanfront Sunken Lawn', 'Grand Mughal Ballroom'],
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=90',
    curations: [
      'Royal Vintage Car / Decorated Elephant Baraat Procession',
      'Live Shehnai, Classical Sitar & Sufi Symphony Orchestrations',
      'Michelin-Caliber Awadhi Dum Pukht & Royal Vedic Menus',
      'Dedicated Master Bridal & Groom Sanctum Suites'
    ],
    theme: 'light'
  },
  {
    id: 'engagement',
    number: '02',
    title: 'Engagement',
    tagline: 'Intimate Ring Ceremonies & Cocktail Sundowners',
    overlayText: 'ENGAGE',
    iconType: 'rings-duo',
    description:
      'The magical prelude to lifelong togetherness. Celebrate your ring exchange overlooking sweeping sunset vistas with artisanal champagne cascades, live acoustic jazz, ambient candlelit chandeliers, and exquisite finger-food tasting plates.',
    capacity: '50 – 400 Guests',
    venues: ['Infinity Pool Deck', 'Cliffside Glass Pavilion', 'Sunset Terrace'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90',
    curations: [
      'Curated French Champagne & Artisanal Wine Bars',
      'Custom Sculpted Ring Platter & Fresh Rose Floral Stages',
      'Cinematic Drone & 4K Memory Videography',
      'International DJ & Sunset Sangeet Sundowner'
    ],
    theme: 'light'
  },
  {
    id: 'anniversary',
    number: '03',
    title: 'Anniversary Celebrations',
    tagline: 'Milestone Silver & Golden Jubilees',
    overlayText: 'JUBILEE',
    iconType: 'heart',
    description:
      'Reignite cherished memories with timeless elegance. Exclusive private dining under starlit desert skies, secluded island banquets, and personalized memory galas crafted by master private chefs, violinists, and world-class sommeliers.',
    capacity: '20 – 300 Guests',
    venues: ['Private Palace Gazebo', 'Starlit Dune Amphitheater', 'Candlelit Vineyard'],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=90',
    curations: [
      'Dedicated Master Sommelier & Rare Vintage Pairings',
      'Private 5-Course Candlelit Tasting Menu by Master Chef',
      'Acoustic Violin & Santoor Serenade under the Stars',
      'Chauffeured Luxury Transfers & Private Suite Styling'
    ],
    theme: 'dark'
  },
  {
    id: 'birthday-party',
    number: '04',
    title: 'Birthday Soirée',
    tagline: 'Opulent Milestone & Themed Galas',
    overlayText: 'SOIRÉE',
    iconType: 'cake',
    description:
      'Turn milestone birthdays into unforgettable royal galas. From high-energy themed pool parties to glamorous black-tie ballroom dinners with bespoke multi-tiered confectionery sculptures and live celebrity entertainment.',
    capacity: '30 – 500 Guests',
    venues: ['Lakeside Panorama Deck', 'VIP Lounge Pavilion', 'Grand Ballroom'],
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=90',
    curations: [
      'Custom Multi-Tier Confectionery Sculpture by Master Pâtissier',
      'Live Molecular Cocktail & Royal Mocktail Bar',
      'Bespoke Spatial Lighting & Photo Immersion Zones',
      'Live Bands, Illusionists & Celebrity DJs'
    ],
    theme: 'light'
  },
  {
    id: 'corporate-meetings',
    number: '05',
    title: 'Corporate Meetings & Events',
    tagline: 'High-Level Summits, Conclaves & Retreats',
    overlayText: 'SUMMIT',
    iconType: 'corporate',
    description:
      'Where visionary leadership meets sanctuary tranquility. State-of-the-art acoustic boardrooms, panoramic executive summit halls, high-speed fiber connectivity, and seamless VIP hospitality for leadership conclaves, product launches, and annual shareholder galas.',
    capacity: '40 – 1,200 Delegates',
    venues: ['Executive Summit Hall', 'Acoustic Conclave Suite', 'Open-Air Lawn Breakouts'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=90',
    curations: [
      '4K Seamless Video Walls & Interpretation Consoles',
      'Executive Ayurvedic Mindfulness & Spa Wellness Breaks',
      'Gala Networking Dinners & Live Cultural Showcases',
      'Helicopter Pad & VIP Executive Convoy Coordination'
    ],
    theme: 'dark'
  },
  {
    id: 'pool-parties-concerts',
    number: '06',
    title: 'Pool Parties, Concert & Shows',
    tagline: 'Infinity Pool Sundowners & Live Performances',
    overlayText: 'SUNDOWN',
    iconType: 'stage',
    description:
      'Electrifying audio-visual extravaganzas set against tranquil waters and dramatic mountain peaks. Host world-tour concerts, Sufi nights, Bollywood musical showcases, and sunset infinity pool carnivals with cutting-edge line arrays and pyrotechnics.',
    capacity: '200 – 3,500 Attendees',
    venues: ['Olympic Infinity Pool Deck', 'Natural Rock Amphitheater', 'Festival Grounds'],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=90',
    curations: [
      'Festival Grade Line-Array Sound & Laser Lighting Rigs',
      'Private Poolside Cabana VIP Lounges & Bottle Service',
      'Gourmet Live Barbecue Grills & Royal Street Food Stalls',
      'Synchronized Pyrotechnic & Sky Illumination Shows'
    ],
    theme: 'light'
  }
];

const DISPLAY_FONT = "'Fraunces', 'Cormorant Garamond', serif";

/* ---------------------------------------------------------------- */
/* Icons — unchanged linework language, still fits the brief        */
/* ---------------------------------------------------------------- */
function CategoryIcon({ type, className = 'w-6 h-6' }) {
  if (type === 'rings') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <circle cx="8" cy="13" r="5" />
        <circle cx="16" cy="13" r="5" />
        <path d="M7 8l1-2h2l1 2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 8l1-2h2l1 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'mandala') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
        <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'rings-duo') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <circle cx="9" cy="14" r="4.5" />
        <circle cx="15" cy="14" r="4.5" />
        <path d="M9 9.5L10 7.5L12 7.5L13 9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'heart') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'cake') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" strokeLinecap="round" />
        <path d="M4 21h16" strokeLinecap="round" />
        <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" strokeLinecap="round" />
        <path d="M9 5V3M12 5V2M15 5V3" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'corporate') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'stage') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <rect x="2" y="4" width="20" height="13" rx="1" strokeLinecap="round" />
        <path d="M2 17h20v4H2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 4l10 8 10-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return <Sparkles className={className} />;
}

/* ---------------------------------------------------------------- */
/* Signature element 1: wax-seal stamp — marks every ledger entry   */
/* ---------------------------------------------------------------- */
function WaxSeal({ label = 'CHHR', caption = 'ROYAL SEAL', rotate = -8, size = 96 }) {
  const safeId = (label || 'chhr').replace(/[^a-zA-Z0-9]/g, '');
  const gradId = `seal-grad-${safeId}-${rotate < 0 ? 'neg' : 'pos'}${Math.abs(rotate)}`;
  return (
    <div
      className="relative shrink-0 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
      style={{ width: size, height: size * 1.08, transform: `rotate(${rotate}deg)` }}
    >
      <svg viewBox="0 0 100 108" width={size} height={size * 1.08}>
        <defs>
          <radialGradient id={gradId} cx="36%" cy="30%" r="78%">
            <stop offset="0%" stopColor="#FF5C3D" />
            <stop offset="55%" stopColor="#FF1F02" />
            <stop offset="100%" stopColor="#A00E00" />
          </radialGradient>
        </defs>
        {/* wax drip */}
        <path d="M41 90 Q39 103 50 106 Q61 103 59 90 Z" fill={`url(#${gradId})`} />
        {/* pressed base */}
        <circle cx="50" cy="47" r="46" fill={`url(#${gradId})`} />
        <circle cx="50" cy="47" r="46" fill="none" stroke="#EAB308" strokeWidth="1.3" strokeDasharray="2.2 2.8" opacity="0.9" />
        <circle cx="50" cy="47" r="37" fill="none" stroke="#FFDCCB" strokeWidth="0.8" opacity="0.4" />
        {/* stamped-in highlight, off-center like an uneven wax press */}
        <ellipse cx="38" cy="30" rx="20" ry="12" fill="#FFFFFF" opacity="0.12" />
        <text x="50" y="44" textAnchor="middle" fontSize="15" fontFamily={DISPLAY_FONT} fontWeight="700" fill="#FCEEDA">
          {label}
        </text>
        <text x="50" y="60" textAnchor="middle" fontSize="6.2" fontFamily="monospace" letterSpacing="2" fill="#FCEEDA" opacity="0.85">
          {caption}
        </text>
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Signature element 2: torn deckle-edge strip on every photo plate */
/* ---------------------------------------------------------------- */
function buildZigzag(teeth) {
  const pts = ['0% 100%'];
  for (let i = 0; i <= teeth; i++) {
    pts.push(`${(i / teeth) * 100}% ${i % 2 === 0 ? 0 : 100}%`);
  }
  pts.push('100% 100%');
  return `polygon(${pts.join(', ')})`;
}
const ZIGZAG = buildZigzag(28);

function TornEdge({ color }) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-0 right-0 bottom-0 h-4 sm:h-5 translate-y-1/2"
      style={{ background: color, clipPath: ZIGZAG }}
    />
  );
}

/* ---------------------------------------------------------------- */
/* Rotating mandala watermark — dialed back, used sparingly now     */
/* ---------------------------------------------------------------- */
function RotatingIndianMandala({ className = '' }) {
  return (
    <motion.svg
      animate={{ rotate: 360 }}
      transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
      viewBox="0 0 100 100"
      className={`absolute pointer-events-none select-none opacity-[0.07] ${className}`}
    >
      <circle cx="50" cy="50" r="46" fill="none" stroke="#EAB308" strokeWidth="1" strokeDasharray="2 3" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="#FF1F02" strokeWidth="1" />
      <circle cx="50" cy="50" r="24" fill="none" stroke="#EAB308" strokeWidth="1" strokeDasharray="4 2" />
      <circle cx="50" cy="50" r="10" fill="none" stroke="#EAB308" strokeWidth="1.5" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line key={deg} x1="50" y1="14" x2="50" y2="24" stroke="#EAB308" strokeWidth="1.5" transform={`rotate(${deg} 50 50)`} />
      ))}
    </motion.svg>
  );
}

/* ---------------------------------------------------------------- */
/* Small corner flourish for the invitation-card hero               */
/* ---------------------------------------------------------------- */
function CornerFlourish({ className = '' }) {
  return (
    <svg viewBox="0 0 60 60" width="40" height="40" className={className} aria-hidden="true">
      <path d="M2 2 Q2 30 30 30" fill="none" stroke="#EAB308" strokeWidth="1.4" />
      <path d="M2 2 Q30 2 30 30" fill="none" stroke="#EAB308" strokeWidth="1.4" />
      <circle cx="2" cy="2" r="2.6" fill="#FF1F02" />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/* Dot-leader spec row — ledger / menu convention, encodes meaning  */
/* ---------------------------------------------------------------- */
function DotLeader({ label, value, dark }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className={`text-[10px] font-mono uppercase tracking-widest shrink-0 ${dark ? 'text-[#EAB308]' : 'text-[#9A7B0E]'}`}>
        {label}
      </span>
      <span className={`flex-1 border-b border-dotted -translate-y-[3px] ${dark ? 'border-white/25' : 'border-[#0E0E0E]/25'}`} />
      <span className={`text-xs font-semibold text-right ${dark ? 'text-white' : 'text-[#0E0E0E]'}`}>{value}</span>
    </div>
  );
}

export default function Celebrations() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    city: '',
    celebrationType: 'Destination Wedding',
    destination: 'Tamil Nadu (Main HQ - Chennai)',
    budget: '',
    guestCount: '',
    roomCount: '',
    eventDuration: '2 Days (1 Night)',
    preferredContact: 'WhatsApp Priority',
    eventDate: '',
    message: '',
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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
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
        roomCount: formData.roomCount,
        eventDuration: formData.eventDuration,
        preferredContact: formData.preferredContact,
        eventDate: formData.eventDate,
        message: `[BUDGET: ${formData.budget}] | [GUESTS: ${formData.guestCount}] | [ROOMS: ${formData.roomCount}] | [DURATION: ${formData.eventDuration}] | [HOST CITY: ${formData.city || 'N/A'}] | [CALLBACK PREF: ${formData.preferredContact}] | [DATE: ${formData.eventDate || 'Flexible'}] | [REQUIREMENTS: ${formData.message || 'Standard Celebration Package'}]`,
      };

      const result = await inquiryService.createInquiry(payload);
      setSubmittedInquiry({ ...result, ...payload });
    } catch (err) {
      console.error('Failed to submit inquiry', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] overflow-hidden font-manrope selection:bg-[#FF1F02] selection:text-white transition-colors duration-300">
      {/* Load the display face. */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&display=swap');`}</style>

      {/* ============================================================ */}
      {/* 1. HERO SECTION: CINEMATIC MONUMENTAL BANNER IN PURE BLACK   */}
      {/* ============================================================ */}
      <section className="relative min-h-[85vh] flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-12 bg-black border-b dark:border-[#333333] border-[#E9E9DE] overflow-hidden select-none">
        {/* Background Royal Celebration Vista */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=75"
            alt="Royal Celebrations & Weddings"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8 my-auto">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#FF1F02]">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block" />
              <span>ROYAL CELEBRATIONS & BESPOKE WEDDINGS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-white">
              WHERE MOMENTS <br />
              BECOME <br />
              <span className="text-art-trio">ROYAL MEMORIES.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-xl font-light text-[#D0D0D0] max-w-3xl mx-auto leading-relaxed">
              Palatial destination weddings, imperial banquets, and unforgettable milestone galas curated by our master event planners across India's most breathtaking sanctuaries.
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom Editorial Coordinates */}
        <div className="relative z-10 max-w-6xl mx-auto w-full pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#B0B0B0] uppercase tracking-widest gap-4">
          <span>● COUNTRY HOLIDAYS HOTELS & RESORTS (CHHR)</span>
          <span>WEDDING • BANQUETS • ANNIVERSARY • SOIRÉE</span>
          <span>EST. 2026</span>
        </div>
      </section>

      {/* Category Marquee Strip */}
      <div className="overflow-hidden border-b dark:border-[#333333] border-[#E9E9DE] py-4 dark:bg-[#161616] bg-white transition-colors duration-300">
        <motion.div
          className="flex gap-10 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          {[...celebrationSections, ...celebrationSections].map((s, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(s.id)}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest dark:text-[#D0D0D0] text-[#0E0E0E]/70 hover:text-[#FF1F02] dark:hover:text-[#FF1F02] whitespace-nowrap transition-colors cursor-pointer"
            >
              <CategoryIcon type={s.iconType} className="w-3.5 h-3.5 text-[#EAB308]" />
              {s.title}
              <span className="text-[#FF1F02]">✦</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 6 LEDGER SPREADS                                              */}
      {/* ============================================================ */}
      <div className="space-y-0">
        {celebrationSections.map((section, idx) => {
          const isDark = section.theme === 'dark';
          const isReversed = idx % 2 !== 0;
          const plateBg = isDark ? '#1C1C1C' : '#FAFDF2';

          return (
            <section
              key={section.id}
              id={section.id}
              className={`py-20 sm:py-28 px-6 sm:px-12 lg:px-16 xl:px-20 border-b relative scroll-mt-32 overflow-hidden ${isDark ? 'bg-[#1C1C1C] text-white border-[#333333]' : 'bg-[#FAFDF2] text-[#0E0E0E] border-[#E9E9DE]'
                }`}
            >
              {idx === 0 && <EditorialBackgroundElements variant={isDark ? 'dark' : 'light'} position="top-right" />}

              <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  {/* Photo plate */}
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-6 relative ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    <div className="relative aspect-[4/5] sm:aspect-[16/12] overflow-hidden shadow-2xl bg-black">
                      <img
                        src={section.image}
                        alt={section.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      <div className="absolute -top-1 -left-1 z-20 bg-[#0E0E0E] px-4 pt-2 pb-3 shadow-xl">
                        <span
                          className="block leading-none select-none text-[#FAFDF2]"
                          style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 'clamp(2.75rem, 5vw, 4rem)' }}
                        >
                          {section.number}
                        </span>
                      </div>

                      <div className="absolute bottom-8 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                        <span className="px-3 py-1.5 bg-black/75 backdrop-blur-md border border-[#EAB308]/50 uppercase tracking-widest text-[#EAB308] flex items-center gap-2 shadow-lg">
                          <CategoryIcon type={section.iconType} className="w-4 h-4 text-[#EAB308]" />
                          <span className="font-bold">{section.overlayText}</span>
                        </span>
                      </div>

                      <TornEdge color={plateBg} />
                    </div>

                    <div className={`absolute -bottom-8 z-30 ${isReversed ? '-left-4 sm:-left-6' : '-right-4 sm:-right-6'}`}>
                      <WaxSeal label={section.overlayText.slice(0, 5)} rotate={isReversed ? 9 : -9} size={94} />
                    </div>
                  </motion.div>

                  {/* Ledger entry text */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`lg:col-span-6 space-y-7 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <div className={`space-y-3 border-b pb-6 ${isDark ? 'border-[#333333]' : 'border-[#E9E9DE]'}`}>
                      <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#FF1F02]">
                        <span>Entry No. {section.number}</span>
                        <span className="opacity-30">/</span>
                        <span className={isDark ? 'text-[#D0D0D0]' : 'text-[#4A4A4A]'}>{section.tagline}</span>
                      </div>

                      <h2
                        className="text-3xl sm:text-5xl leading-[1.05]"
                        style={{ fontFamily: DISPLAY_FONT, fontWeight: 600 }}
                      >
                        {section.title}
                      </h2>

                      <p className={`text-sm font-light leading-relaxed pt-1 ${isDark ? 'text-[#D0D0D0]' : 'text-[#4A4A4A]'}`}>
                        {section.description}
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <DotLeader label="Guest Capacity" value={section.capacity} dark={isDark} />
                      {section.venues.map((venue) => (
                        <DotLeader key={venue} label="Venue" value={venue} dark={isDark} />
                      ))}
                    </div>

                    <div className="space-y-2.5 pt-1">
                      <span className={`text-[11px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#0E0E0E]'}`}>
                        <Feather className="w-3.5 h-3.5 text-[#EAB308]" />
                        <span>Signature Inclusions</span>
                      </span>
                      <ul className="space-y-2">
                        {section.curations.map((cur) => (
                          <li key={cur} className={`flex items-start gap-2.5 text-xs ${isDark ? 'text-[#D0D0D0]' : 'text-[#4A4A4A]'}`}>
                            <CheckCircle2 className="w-4 h-4 text-[#FF1F02] shrink-0 mt-0.5" />
                            <span>{cur}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* STRUCTURED LUXURY CELEBRATION INQUIRY DOSSIER                 */}
      {/* ============================================================ */}
      <section id="inquiry" className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 xl:px-20 dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] border-t dark:border-[#333333] border-[#E9E9DE] relative overflow-hidden transition-colors duration-300">
        <EditorialBackgroundElements variant="light" position="top-right" />

        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-20 relative z-10">

          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b dark:border-[#333333] border-[#E9E9DE]">
            <div className="space-y-4">
              <ScrollReveal direction="up">
                <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
                  <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                  <span>02 — BESPOKE INQUIRY & AVAILABILITY</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] text-art-trio">
                  COMMISSION YOUR <br />
                  CELEBRATION.
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm font-light dark:text-[#D0D0D0] text-[#0E0E0E]/75 max-w-md leading-relaxed">
                Connect directly with our senior event planners and royal concierge team to verify date availability, banquet capacities, and bespoke culinary packages across all properties.
              </p>
            </ScrollReveal>
          </div>

          {submittedInquiry ? (
            <div className="dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] p-8 sm:p-14 shadow-2xl text-center max-w-2xl mx-auto space-y-8">
              <div className="w-20 h-20 dark:bg-[#161616] bg-[#FAFDF2] border-2 border-[#FF1F02] text-[#FF1F02] rounded-full flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-mono text-[#FF1F02] uppercase font-bold tracking-widest block">
                  ● OFFICIAL DOSSIER LOGGED
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold uppercase dark:text-white text-[#0E0E0E] tracking-tight">
                  Inquiry Received, {submittedInquiry.guestName}!
                </h3>
                <p className="text-sm dark:text-[#D0D0D0] text-[#0E0E0E]/75 leading-relaxed font-light">
                  Your occasion brief for <strong className="text-[#FF1F02]">{submittedInquiry.property}</strong> has been transmitted to our central event director. A designated planner will reach out via <strong className="dark:text-white text-[#0E0E0E]">{submittedInquiry.preferredContact}</strong>.
                </p>
              </div>

              <div className="p-5 dark:bg-[#161616] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] text-left text-xs font-mono space-y-2">
                <div className="text-[10px] text-[#FF1F02] uppercase tracking-widest font-bold">TRANSMISSION SUMMARY:</div>
                <div className="dark:text-white text-[#0E0E0E]"><span className="dark:text-white/60 text-[#0E0E0E]/60">Host Contact:</span> {submittedInquiry.phone} {submittedInquiry.email !== 'N/A' && `• ${submittedInquiry.email}`}</div>
                <div className="dark:text-white text-[#0E0E0E]"><span className="dark:text-white/60 text-[#0E0E0E]/60">Location / City:</span> {submittedInquiry.city || 'India'}</div>
                <div className="dark:text-white text-[#0E0E0E]"><span className="dark:text-white/60 text-[#0E0E0E]/60">Parameters:</span> Budget: {submittedInquiry.budget || 'Flexible'} • Guests: {submittedInquiry.guestCount || 'TBD'} • Rooms: {submittedInquiry.roomCount || 'TBD'}</div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={getWhatsAppBookingUrl(`Hello Country Holidays, I have submitted an event inquiry for ${submittedInquiry.property} (Host: ${submittedInquiry.guestName}, Phone: ${submittedInquiry.phone}). Please share availability and banquet options.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#FF1F02] hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>INSTANT WHATSAPP DESK</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  onClick={() => {
                    setSubmittedInquiry(null);
                    setFormData({
                      guestName: '',
                      email: '',
                      phone: '',
                      city: '',
                      celebrationType: 'Destination Wedding',
                      destination: 'Tamil Nadu (Main HQ - Chennai)',
                      budget: '',
                      guestCount: '',
                      roomCount: '',
                      eventDuration: '2 Days (1 Night)',
                      preferredContact: 'WhatsApp Priority',
                      eventDate: '',
                      message: '',
                    });
                  }}
                  className="w-full sm:w-auto px-7 py-4 dark:bg-[#161616] dark:border-[#333333] dark:text-white bg-white border border-[#E9E9DE] hover:border-[#FF1F02] text-[#0E0E0E] text-xs font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer"
                >
                  SUBMIT ANOTHER BRIEF
                </button>
              </div>
            </div>
          ) : (
            /* 2-Column Luxury Concierge Dossier Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

              {/* LEFT RAIL: CONCIERGE IDENTITY & COMMITMENTS (4 COLS) */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                
                {/* Active Selection Summary Card */}
                <div className="p-7 sm:p-8 dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] shadow-xl space-y-6 relative overflow-hidden">
                  <div className="space-y-2 border-b dark:border-[#333333] border-[#E9E9DE] pb-5">
                    <span className="text-[10px] font-mono text-[#FF1F02] uppercase tracking-widest font-bold block">
                      ● SELECTED OCCASION
                    </span>
                    <h3 className="text-2xl font-extrabold uppercase tracking-tight dark:text-white text-[#0E0E0E]">
                      {formData.celebrationType}
                    </h3>
                  </div>

                  {/* Curated Perks */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-none dark:bg-[#161616] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-[#FF1F02]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase dark:text-white text-[#0E0E0E] block">15-Min Response Guarantee</span>
                        <p className="text-[11px] font-light dark:text-[#A0A0A0] text-[#0E0E0E]/70">Central event concierge reviews your dates instantly.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-none dark:bg-[#161616] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] flex items-center justify-center shrink-0">
                        <Crown className="w-4 h-4 text-[#EAB308]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase dark:text-white text-[#0E0E0E] block">Master Menu & Decor Tasting</span>
                        <p className="text-[11px] font-light dark:text-[#A0A0A0] text-[#0E0E0E]/70">Complimentary chef consultation for booked dates.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-none dark:bg-[#161616] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase dark:text-white text-[#0E0E0E] block">Guaranteed Transparent Pricing</span>
                        <p className="text-[11px] font-light dark:text-[#A0A0A0] text-[#0E0E0E]/70">Direct-from-property rates with no hidden fees.</p>
                      </div>
                    </div>
                  </div>

                  {/* Direct Contact Hotline Strip */}
                  <div className="pt-5 border-t dark:border-[#333333] border-[#E9E9DE] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="dark:text-white/60 text-[#0E0E0E]/60 uppercase">Direct Desk</span>
                      <a href="tel:+919876543210" className="font-bold text-[#FF1F02] hover:underline">
                        +91 98765 43210
                      </a>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="dark:text-white/60 text-[#0E0E0E]/60 uppercase">Desk Hours</span>
                      <span className="font-bold dark:text-white text-[#0E0E0E]">24/7 Priority</span>
                    </div>
                  </div>
                </div>

                {/* Overlapping Heritage Stamp Badge */}
                <div className="flex justify-center pt-2">
                  <EditorialHeritageStamp size={110} centerText="CHHR" text="COUNTRY HOLIDAYS • ROYAL EVENTS DESK • " year="EST 2026" />
                </div>

              </div>

              {/* RIGHT RAIL: THE LUXURY INQUIRY DOSSIER FORM (8 COLS) */}
              <div className="lg:col-span-8">
                <form onSubmit={handleSubmitInquiry} className="p-7 sm:p-10 lg:p-12 dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] shadow-2xl space-y-10 transition-colors">
                  
                  {/* 1. OCCASION TYPE SELECTOR */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF1F02] flex items-center gap-2">
                        <span>● STEP 01</span>
                        <span className="dark:text-white/40 text-[#0E0E0E]/40">—</span>
                        <span className="dark:text-white text-[#0E0E0E]">CHOOSE CELEBRATION TYPE *</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                      {[
                        { title: 'Destination Wedding', icon: Crown },
                        { title: 'Engagement', icon: Heart },
                        { title: 'Anniversary', icon: Sparkles },
                        { title: 'Birthday Soirée', icon: Sparkles },
                        { title: 'Corporate Event', icon: Building2 },
                        { title: 'Pool Party & Concert', icon: Sparkles },
                        { title: 'Banquet Hall Booking', icon: Building2 },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = formData.celebrationType === item.title;
                        return (
                          <button
                            key={item.title}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, celebrationType: item.title }))}
                            className={`p-4 text-left border transition-all duration-300 flex flex-col justify-between h-24 group cursor-pointer ${
                              isSelected
                                ? 'border-[#FF1F02] dark:bg-[#161616] bg-[#FAFDF2] shadow-md ring-1 ring-[#FF1F02]'
                                : 'dark:bg-[#121212] bg-white dark:border-[#262626] border-[#E9E9DE] hover:border-[#FF1F02]/70'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <Icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-[#FF1F02]' : 'dark:text-white/40 text-[#0E0E0E]/40 group-hover:text-[#FF1F02]'}`} />
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF1F02]" />}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-tight line-clamp-2 leading-tight ${isSelected ? 'dark:text-white text-[#0E0E0E]' : 'dark:text-white/70 text-[#0E0E0E]/70 group-hover:text-[#FF1F02]'}`}>
                              {item.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. PRIMARY HOST IDENTIFICATION */}
                  <div className="space-y-4 pt-6 border-t dark:border-[#262626] border-[#E9E9DE]">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF1F02] flex items-center gap-2">
                      <span>● STEP 02</span>
                      <span className="dark:text-white/40 text-[#0E0E0E]/40">—</span>
                      <span className="dark:text-white text-[#0E0E0E]">HOST IDENTITY & CONTACT</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Host Name */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/75 uppercase tracking-wider block">
                          Host / Organizer Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="guestName"
                            required
                            value={formData.guestName}
                            onChange={handleInputChange}
                            placeholder="e.g. Rajesh Sharma"
                            className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#2E2E2E] dark:text-white dark:placeholder:text-white/30 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/30 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Phone / WhatsApp */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/75 uppercase tracking-wider block">
                          Phone / WhatsApp Number *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#2E2E2E] dark:text-white dark:placeholder:text-white/30 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/30 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/75 uppercase tracking-wider block">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. rajesh@example.com"
                            className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#2E2E2E] dark:text-white dark:placeholder:text-white/30 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/30 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Host Origin City */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/75 uppercase tracking-wider block">
                          Host Current City
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="e.g. Chennai / Delhi / Mumbai"
                            className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#2E2E2E] dark:text-white dark:placeholder:text-white/30 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/30 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. EVENT SCOPE, BUDGET & VENUE PARAMETERS */}
                  <div className="space-y-4 pt-6 border-t dark:border-[#262626] border-[#E9E9DE]">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF1F02] flex items-center gap-2">
                      <span>● STEP 03</span>
                      <span className="dark:text-white/40 text-[#0E0E0E]/40">—</span>
                      <span className="dark:text-white text-[#0E0E0E]">EVENT SCOPE & LOCATION PARAMETERS</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Estimated Budget */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/75 uppercase tracking-wider block">
                          Estimated Budget
                        </label>
                        <input
                          type="text"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          placeholder="e.g. ₹20 Lakhs / Flexible"
                          className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#2E2E2E] dark:text-white dark:placeholder:text-white/30 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/30 focus:outline-none transition-colors font-medium"
                        />
                      </div>

                      {/* Destination / State */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/75 uppercase tracking-wider block">
                          Target State / Region
                        </label>
                        <select
                          name="destination"
                          value={formData.destination}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#2E2E2E] dark:text-white bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] focus:outline-none cursor-pointer"
                        >
                          <option value="Tamil Nadu (Main HQ - Chennai)">Tamil Nadu (Main HQ - Chennai)</option>
                          <option value="Goa">Goa (Beachfront Mandaps & Lawns)</option>
                          <option value="Rajasthan">Rajasthan (Jaipur / Udaipur Palaces)</option>
                          <option value="Kerala">Kerala (Backwaters & Hilltop Stays)</option>
                          <option value="Karnataka">Karnataka (Bengaluru / Coorg)</option>
                          <option value="Delhi NCR">Delhi NCR & Noida Hub</option>
                          <option value="Maharashtra">Maharashtra (Mumbai / Lonavala)</option>
                          <option value="Himachal Pradesh">Himachal Pradesh (Shimla / Manali)</option>
                          <option value="Uttarakhand">Uttarakhand (Rishikesh / Mussoorie)</option>
                          <option value="West Bengal">West Bengal (Kolkata / Darjeeling)</option>
                          <option value="Telangana">Telangana (Hyderabad Hub)</option>
                          <option value="Andhra Pradesh">Andhra Pradesh (Visakhapatnam)</option>
                          <option value="Gujarat">Gujarat (Ahmedabad / Kutch)</option>
                          <option value="Other Pan-India Location">Other Pan-India Location</option>
                        </select>
                      </div>

                      {/* Guest Count */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/75 uppercase tracking-wider block">
                          Guest Count
                        </label>
                        <input
                          type="text"
                          name="guestCount"
                          value={formData.guestCount}
                          onChange={handleInputChange}
                          placeholder="e.g. 250 Guests / 150-200"
                          className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#2E2E2E] dark:text-white dark:placeholder:text-white/30 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/30 focus:outline-none transition-colors font-medium"
                        />
                      </div>

                      {/* Room Requirement */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/75 uppercase tracking-wider block">
                          Rooms / Suites Needed
                        </label>
                        <input
                          type="text"
                          name="roomCount"
                          value={formData.roomCount}
                          onChange={handleInputChange}
                          placeholder="e.g. 30 Rooms / Venue Only"
                          className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#2E2E2E] dark:text-white dark:placeholder:text-white/30 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/30 focus:outline-none transition-colors font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4. DURATION, DATES & CONTACT PREFERENCE */}
                  <div className="space-y-4 pt-6 border-t dark:border-[#262626] border-[#E9E9DE]">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF1F02] flex items-center gap-2">
                      <span>● STEP 04</span>
                      <span className="dark:text-white/40 text-[#0E0E0E]/40">—</span>
                      <span className="dark:text-white text-[#0E0E0E]">TIMELINE & CALLBACK PREFERENCE</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Event Duration */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/75 uppercase tracking-wider block">
                          Event Duration
                        </label>
                        <select
                          name="eventDuration"
                          value={formData.eventDuration}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#2E2E2E] dark:text-white bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] focus:outline-none cursor-pointer"
                        >
                          <option value="1 Day (Single Function)">1 Day (Single Function)</option>
                          <option value="2 Days (1 Night)">2 Days (1 Night)</option>
                          <option value="3 Days (2 Nights - Traditional)">3 Days (2 Nights - Traditional)</option>
                          <option value="4+ Days Multi-Day Celebration">4+ Days Multi-Day Celebration</option>
                        </select>
                      </div>

                      {/* Tentative Event Date */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/75 uppercase tracking-wider block">
                          Tentative Event Date
                        </label>
                        <input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#2E2E2E] dark:text-white bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Callback / Contact Preference */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-mono dark:text-[#A0A0A0] text-[#0E0E0E]/75 uppercase tracking-wider block">
                          Preferred Callback Channel
                        </label>
                        <select
                          name="preferredContact"
                          value={formData.preferredContact}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 dark:bg-[#161616] dark:border-[#2E2E2E] dark:text-white bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] focus:outline-none cursor-pointer"
                        >
                          <option value="WhatsApp Priority">WhatsApp Priority</option>
                          <option value="Phone Call (Morning 10 AM – 1 PM)">Phone Call (Morning 10 AM – 1 PM)</option>
                          <option value="Phone Call (Evening 4 PM – 8 PM)">Phone Call (Evening 4 PM – 8 PM)</option>
                          <option value="Email Detailed Proposal First">Email Detailed Proposal First</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 5. BESPOKE NOTES & THEME VISION */}
                  <div className="space-y-2 pt-6 border-t dark:border-[#262626] border-[#E9E9DE]">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider dark:text-white text-[#0E0E0E] block">
                      Special Mandap, Decor Themes, Sound/Lighting or Culinary Visions
                    </label>
                    <textarea
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please share any specific Mandap concepts, stage requirements, dietary choices (Awadhi, Jain, Continental), or VIP arrangements..."
                      className="w-full p-4 dark:bg-[#161616] dark:border-[#2E2E2E] dark:text-white dark:placeholder:text-white/30 bg-[#FAFDF2] border border-[#E9E9DE] focus:border-[#FF1F02] text-sm text-[#0E0E0E] placeholder:text-[#0E0E0E]/30 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* 6. PRIMARY SUBMIT BUTTON */}
                  <div className="pt-4 space-y-4">
                    <MagneticButton>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-[#FF1F02] hover:bg-white hover:text-black text-white font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>TRANSMITTING INQUIRY DOSSIER...</span>
                          </>
                        ) : (
                          <>
                            <span>TRANSMIT CELEBRATION DOSSIER TO CENTRAL DESK</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </MagneticButton>

                    <div className="flex items-center justify-center gap-6 text-[10px] font-mono dark:text-white/40 text-[#0E0E0E]/40 uppercase tracking-widest text-center">
                      <span>● ENCRYPTED TRANSMISSION</span>
                      <span>● ZERO SERVICE FEES</span>
                      <span>● DIRECT PROPERTY CONFIRMATION</span>
                    </div>
                  </div>

                </form>
              </div>

            </div>
          )}

        </div>
      </section>

    </div>
  );
}