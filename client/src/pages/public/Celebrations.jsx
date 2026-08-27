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
      'Celebrate your wedding in the timeless grandeur of India. From magnificent palace courtyards in Rajasthan and serene lakefront heritage estates in Udaipur to breathtaking oceanfront mandaps in Goa, every celebration is thoughtfully crafted around Indian traditions, royal hospitality, and your unique love story.\n\nOur dedicated wedding concierges orchestrate every detail — from a grand Baraat entry with a royal vintage car or decorated elephant to live Shehnai and classical music, exquisite marigold and jasmine floral mandaps, sacred Vedic ceremonies, and lavish Indian wedding feasts.',
    capacity: '250 – 2,500 Guests',
    venues: ['Royal Palace Courtyard', 'Oceanfront Sunken Lawn', 'Grand Mughal Ballroom'],
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=90',
    curations: [
      'Royal Vintage Car / Decorated Elephant Baraat Procession',
      'Live Shehnai, Classical Sitar & Sufi Music Performances',
      'Grand Indian Wedding Feast featuring Awadhi, Rajasthani & Royal Indian Cuisine',
      'Dedicated Luxury Bridal & Groom Sanctum Suites',
      'Traditional Vedic Ceremony & Sacred Mandap Décor',
      'Marigold & Jasmine Floral Canopies with Bespoke Wedding Décor'
    ],
    theme: 'light'
  },
  {
    id: 'engagement',
    number: '02',
    title: 'Engagement & Ring Ceremony',
    tagline: 'Roka, Sagai & Sangeet Sundowners',
    overlayText: 'SAGAI',
    iconType: 'rings-duo',
    description:
      'The cherished auspicious beginning of two families uniting. Celebrate your Roka and Sagai with traditional Indian warmth, royal flower petal cascades, and vibrant Sangeet rhythms under golden evening skies.\n\nFrom ceremonial silver ring platters and fresh mogra flower backdrops to live Dhol beats and interactive Indian street chaat counters, every moment is filled with festivity and joy.',
    capacity: '50 – 400 Guests',
    venues: ['Lakeside Heritage Lawn', 'Sunset Palace Courtyard', 'Royal Glass Pavilion'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90',
    curations: [
      'Grand Dhol Tasha Welcome & Rose Petal Showers',
      'Live Punjabi & Bollywood Sangeet DJ with LED Dance Floor',
      'Artisanal Live Chaat Street & Royal Indian Sweet Counters',
      'Custom Floral Ring Tray & Traditional Sagai Stage Decor',
      'Professional Henna & Mehendi Artist Lounges',
      'Cinematic 4K Candid Photography & Drone Highlights'
    ],
    theme: 'light'
  },
  {
    id: 'anniversary',
    number: '03',
    title: 'Anniversary Celebrations',
    tagline: 'Silver, Golden & Milestone Vivah Jubilees',
    overlayText: 'MILAN',
    iconType: 'heart',
    description:
      'Honor lifelong companionship with traditional Indian grace and regal hospitality. Reaffirm your vows in intimate candlelit palace courtyards with family blessings, soulful melodies, and timeless culinary traditions.\n\nFrom sacred renewal rituals by the holy ghats or lakeside gazebos to classical sitar serenades and bespoke royal feasts, we create heartfelt milestones that your family will treasure for generations.',
    capacity: '20 – 300 Guests',
    venues: ['Private Palace Gazebo', 'Lakeside Heritage Courtyard', 'Royal Dining Pavilion'],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=90',
    curations: [
      'Traditional Vow Renewal & Mangalsutra Blessing Ceremony',
      'Classical Sitar, Santoor & Ghazal Evening Performances',
      'Master Chef 5-Course Royal Thali & Heritage Tasting Menu',
      'Vintage Open-Top Car Procession for the Anniversary Couple',
      'Diyas & Lantern Floatation on Heritage Water Bodies',
      'Chauffeured Luxury Transfers & Private Royal Suite Styling'
    ],
    theme: 'dark'
  },
  {
    id: 'birthday-party',
    number: '04',
    title: 'Birthday Soirée & Janamotsav',
    tagline: 'Shahi Janamotsav & Milestone Galas',
    overlayText: 'UTSAV',
    iconType: 'cake',
    description:
      'Transform milestone birthdays into majestic Indian celebrations. From energetic pool party carnival lunches to grand evening royal galas filled with live music, dancing, and mouthwatering Indian delicacies.\n\nWhether an intimate 1st birthday, a sweet 16, or a 50th Shahi Janamotsav, our planners design thematic decor, customized royal sweet displays, and captivating live entertainment for all ages.',
    capacity: '30 – 500 Guests',
    venues: ['Lakeside Panorama Lawn', 'Royal Banquet Pavilion', 'Poolside Sunset Terrace'],
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=90',
    curations: [
      'Grand Thematic Stage Decor & Customized Royal Cake Sculptures',
      'Live Tandoor, Royal Biryani & Regional Indian Food Stations',
      'Interactive Live Magic, Puppet Shows & Illusionist Acts',
      'High-Energy Bollywood DJ & Festive Dance Light Rig',
      'Special Mocktail & Desi Kulhad Chai/Thandai Bar',
      'Personalized Traditional Gift Hampers & Return Favors'
    ],
    theme: 'light'
  },
  {
    id: 'corporate-meetings',
    number: '05',
    title: 'Corporate Meetings & Conclaves',
    tagline: 'High-Level Summits, Conclaves & Retreats',
    overlayText: 'SAMMELAN',
    iconType: 'corporate',
    description:
      'Where visionary corporate leadership meets prestigious Indian hospitality. Host executive summits, annual conclaves, and stakeholder galas with world-class audio-visual technology and seamless boardroom comfort.\n\nCombine productive high-tech strategy sessions with authentic regional networking dinners, cultural performances, and peaceful sanctuary retreats across premier business hubs.',
    capacity: '40 – 1,200 Delegates',
    venues: ['Executive Summit Hall', 'Acoustic Conclave Suite', 'Open-Air Manicured Lawn Breakouts'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=90',
    curations: [
      '4K Seamless Video Walls, High-Speed Starlink & AV Rigs',
      'Royal High-Tea & Morning Conclave Breakfast Buffets',
      'Grand Networking Dinners with Live Regional Indian Gastronomy',
      'Dedicated Business Concierge & Executive VIP Convoy Coordination',
      'Team-Building Lawn Activities & Cultural Evening Showcases',
      'Executive Presidential Suite & Boardroom Facilities'
    ],
    theme: 'dark'
  },
  {
    id: 'pool-parties-concerts',
    number: '06',
    title: 'Pool Parties, Concerts & Melas',
    tagline: 'Sangeet Nights, Desi Melas & Live Shows',
    overlayText: 'JALSA',
    iconType: 'stage',
    description:
      'Electrifying audio-visual extravaganzas blending vibrant Indian culture with spectacular open-air settings. Host unforgettable Bollywood concert nights, Sufi musical evenings, and colorful poolside festive melas.\n\nWith world-class stage acoustics, royal street food bazaars, and mesmerizing fireworks displays, every gathering becomes a legendary celebration of life.',
    capacity: '200 – 3,500 Attendees',
    venues: ['Grand Festival Grounds', 'Olympic Infinity Pool Deck', 'Natural Rock Amphitheater'],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=90',
    curations: [
      'Festival-Grade Line-Array Concert Stage & Laser Lighting Rig',
      'Live Sufi, Qawwali & Bollywood Star Performance Setups',
      'Interactive Desi Mela Stalls, Live Chaat & Barbecue Grills',
      'Grand Synchronized Pyrotechnic & Sky Illumination Shows',
      'Exclusive Poolside VIP Cabanas & Royal Hospitality Service',
      'High-Capacity Crowd Management & Multi-Zone Sound Engineering'
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

                      <div className={`text-sm font-light leading-relaxed pt-1 space-y-2.5 ${isDark ? 'text-[#D0D0D0]' : 'text-[#4A4A4A]'}`}>
                        {section.description.split('\n\n').map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
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
      {/* SECTION 02: THE INQUIRY (MINIMALIST ARCHITECTURAL DOSSIER)   */}
      {/* ============================================================ */}
      <section id="inquiry" className="py-24 sm:py-36 px-4 sm:px-8 dark:bg-[#141414] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] border-t dark:border-[#2A2A2A] border-[#E9E9DE] relative overflow-hidden transition-colors duration-300">
        
        {/* Giant Faint 02 Background Watermark Numeral */}
        <div className="absolute top-6 right-8 sm:right-16 select-none pointer-events-none z-0">
          <span className="text-[12rem] sm:text-[18rem] lg:text-[22rem] font-bold font-mono leading-none tracking-tighter dark:text-white/[0.03] text-[#0E0E0E]/[0.04]">
            02
          </span>
        </div>

        {/* 80% SCREEN RATIO WRAPPER */}
        <div className="w-full max-w-[92vw] lg:max-w-[80vw] mx-auto relative z-10">

          {submittedInquiry ? (
            <div className="dark:bg-[#1A1A1A] bg-white border dark:border-[#333333] border-[#E5E5D8] p-8 sm:p-14 shadow-2xl text-center max-w-2xl mx-auto space-y-8">
              <div className="w-20 h-20 dark:bg-[#141414] bg-[#FAFDF2] border-2 border-[#FF1F02] text-[#FF1F02] rounded-full flex items-center justify-center mx-auto shadow-xl">
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

              <div className="p-5 dark:bg-[#141414] bg-[#FAFDF2] border dark:border-[#2E2E2E] border-[#E9E9DE] text-left text-xs font-mono space-y-2">
                <div className="text-[10px] text-[#FF1F02] uppercase tracking-widest font-bold">TRANSMISSION SUMMARY:</div>
                <div className="dark:text-white text-[#0E0E0E]"><span className="dark:text-white/60 text-[#0E0E0E]/60">Host Contact:</span> {submittedInquiry.phone} {submittedInquiry.email !== 'N/A' && `• ${submittedInquiry.email}`}</div>
                <div className="dark:text-white text-[#0E0E0E]"><span className="dark:text-white/60 text-[#0E0E0E]/60">Location / Region:</span> {submittedInquiry.city || 'India'}</div>
                <div className="dark:text-white text-[#0E0E0E]"><span className="dark:text-white/60 text-[#0E0E0E]/60">Parameters:</span> Budget: {submittedInquiry.budget || 'Flexible'} • Guests: {submittedInquiry.guestCount || 'TBD'} • Rooms: {submittedInquiry.roomCount || 'TBD'}</div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={getWhatsAppBookingUrl(`Hello Country Holidays, I have submitted an event inquiry for ${submittedInquiry.property} (Host: ${submittedInquiry.guestName}, Phone: ${submittedInquiry.phone}). Please share availability and banquet options.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#0E0E0E] hover:bg-[#FF1F02] text-white text-xs font-bold font-mono uppercase tracking-[0.16em] transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>OPEN WHATSAPP DESK</span>
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
                  className="w-full sm:w-auto px-7 py-4 dark:bg-[#141414] dark:border-[#333333] dark:text-white bg-white border border-[#E9E9DE] hover:border-[#FF1F02] text-[#0E0E0E] text-xs font-bold font-mono uppercase tracking-[0.16em] transition-colors cursor-pointer"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>
            </div>
          ) : (
            /* Minimalist 2-Column Swiss Editorial Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-start">

              {/* LEFT COLUMN: THE INQUIRY HEADLINE & SCOPE (4 COLS) */}
              <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                <ScrollReveal direction="up">
                  <div className="flex items-center gap-3 text-xs font-mono tracking-widest dark:text-white/60 text-[#0E0E0E]/60 uppercase">
                    <span className="w-8 h-[1px] bg-[#FF1F02]" />
                    <span>CHHR / 02</span>
                    <span>CONTACT</span>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E0E0E] dark:text-white leading-[0.95]">
                    The <br />
                    inquiry.
                  </h2>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={150}>
                  <p className="text-sm sm:text-base font-light dark:text-[#A8A8A8] text-[#0E0E0E]/70 leading-relaxed max-w-sm pt-2">
                    Tell us where you are now and where you want your celebration to go.
                  </p>
                </ScrollReveal>

                {/* Micro Assurance Strip */}
                <div className="pt-8 space-y-3 text-xs font-mono dark:text-white/40 text-[#0E0E0E]/40 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
                    <span>24/7 Dedicated Concierge Response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                    <span>Guaranteed Direct-From-Property Tariff</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
                    <span>Complimentary Tasting & Planning Consult</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: THE MINIMALIST UNDERLINED FORM (8 COLS) */}
              <div className="lg:col-span-8">
                <form onSubmit={handleSubmitInquiry} className="space-y-8 sm:space-y-10">

                  {/* ROW 1: NAME */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b dark:border-[#2D2D2D] border-[#D8D8CC] pb-4 focus-within:border-[#FF1F02] transition-colors">
                    <label className="w-28 sm:w-36 shrink-0 text-xs font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60">
                      NAME *
                    </label>
                    <input
                      type="text"
                      name="guestName"
                      required
                      value={formData.guestName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full bg-transparent text-base sm:text-lg dark:text-white text-[#0E0E0E] placeholder:text-[#999990] dark:placeholder:text-[#555555] focus:outline-none font-light"
                    />
                  </div>

                  {/* ROW 2: EMAIL */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b dark:border-[#2D2D2D] border-[#D8D8CC] pb-4 focus-within:border-[#FF1F02] transition-colors">
                    <label className="w-28 sm:w-36 shrink-0 text-xs font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full bg-transparent text-base sm:text-lg dark:text-white text-[#0E0E0E] placeholder:text-[#999990] dark:placeholder:text-[#555555] focus:outline-none font-light"
                    />
                  </div>

                  {/* ROW 3: PHONE */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b dark:border-[#2D2D2D] border-[#D8D8CC] pb-4 focus-within:border-[#FF1F02] transition-colors">
                    <label className="w-28 sm:w-36 shrink-0 text-xs font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60">
                      PHONE *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-transparent text-base sm:text-lg dark:text-white text-[#0E0E0E] placeholder:text-[#999990] dark:placeholder:text-[#555555] focus:outline-none font-light font-mono"
                    />
                  </div>

                  {/* ROW 4: CITY / ORIGIN */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b dark:border-[#2D2D2D] border-[#D8D8CC] pb-4 focus-within:border-[#FF1F02] transition-colors">
                    <label className="w-28 sm:w-36 shrink-0 text-xs font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60">
                      CITY / HUB
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Your current city (e.g. Chennai / Delhi / Mumbai)"
                      className="w-full bg-transparent text-base sm:text-lg dark:text-white text-[#0E0E0E] placeholder:text-[#999990] dark:placeholder:text-[#555555] focus:outline-none font-light"
                    />
                  </div>

                  {/* ROW 5: CELEBRATION TYPE */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b dark:border-[#2D2D2D] border-[#D8D8CC] pb-4 focus-within:border-[#FF1F02] transition-colors">
                    <label className="w-28 sm:w-36 shrink-0 text-xs font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60">
                      OCCASION TYPE *
                    </label>
                    <div className="w-full relative">
                      <select
                        name="celebrationType"
                        value={formData.celebrationType}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-base sm:text-lg dark:text-white text-[#0E0E0E] focus:outline-none font-light cursor-pointer appearance-none pr-8 py-0.5"
                      >
                        <option value="Destination Wedding" className="dark:bg-[#1A1A1A] bg-white">Destination Wedding (Palaces & Oceanfront Mandaps)</option>
                        <option value="Engagement" className="dark:bg-[#1A1A1A] bg-white">Engagement & Ring Ceremony (Sagai & Roka)</option>
                        <option value="Anniversary" className="dark:bg-[#1A1A1A] bg-white">Anniversary Celebrations (Silver & Golden Jubilees)</option>
                        <option value="Birthday Soirée" className="dark:bg-[#1A1A1A] bg-white">Birthday Soirée & Janamotsav Galas</option>
                        <option value="Corporate Event" className="dark:bg-[#1A1A1A] bg-white">Corporate Meetings, Summits & Conclaves</option>
                        <option value="Pool Party & Concert" className="dark:bg-[#1A1A1A] bg-white">Pool Parties, Sangeet Nights & Concerts</option>
                        <option value="Banquet Hall Booking" className="dark:bg-[#1A1A1A] bg-white">Grand Banquet Hall & Lawn Booking</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none dark:text-white/50 text-[#0E0E0E]/50 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* ROW 6: DESTINATION */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b dark:border-[#2D2D2D] border-[#D8D8CC] pb-4 focus-within:border-[#FF1F02] transition-colors">
                    <label className="w-28 sm:w-36 shrink-0 text-xs font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60">
                      DESTINATION
                    </label>
                    <div className="w-full relative">
                      <select
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-base sm:text-lg dark:text-white text-[#0E0E0E] focus:outline-none font-light cursor-pointer appearance-none pr-8 py-0.5"
                      >
                        <option value="Tamil Nadu (Main HQ - Chennai)" className="dark:bg-[#1A1A1A] bg-white">Tamil Nadu (Main HQ - Chennai)</option>
                        <option value="Goa" className="dark:bg-[#1A1A1A] bg-white">Goa (Beachfront Mandaps & Lawns)</option>
                        <option value="Rajasthan" className="dark:bg-[#1A1A1A] bg-white">Rajasthan (Jaipur & Udaipur Palaces)</option>
                        <option value="Kerala" className="dark:bg-[#1A1A1A] bg-white">Kerala (Backwaters & Hilltop Stays)</option>
                        <option value="Karnataka" className="dark:bg-[#1A1A1A] bg-white">Karnataka (Bengaluru & Coorg)</option>
                        <option value="Delhi NCR" className="dark:bg-[#1A1A1A] bg-white">Delhi NCR & Noida Hub</option>
                        <option value="Maharashtra" className="dark:bg-[#1A1A1A] bg-white">Maharashtra (Mumbai & Lonavala)</option>
                        <option value="Himachal Pradesh" className="dark:bg-[#1A1A1A] bg-white">Himachal Pradesh (Shimla & Manali)</option>
                        <option value="Uttarakhand" className="dark:bg-[#1A1A1A] bg-white">Uttarakhand (Rishikesh & Mussoorie)</option>
                        <option value="West Bengal" className="dark:bg-[#1A1A1A] bg-white">West Bengal (Kolkata & Darjeeling)</option>
                        <option value="Telangana" className="dark:bg-[#1A1A1A] bg-white">Telangana (Hyderabad Hub)</option>
                        <option value="Andhra Pradesh" className="dark:bg-[#1A1A1A] bg-white">Andhra Pradesh (Visakhapatnam)</option>
                        <option value="Gujarat" className="dark:bg-[#1A1A1A] bg-white">Gujarat (Ahmedabad & Kutch)</option>
                        <option value="Other Pan-India Location" className="dark:bg-[#1A1A1A] bg-white">Other Pan-India Location</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none dark:text-white/50 text-[#0E0E0E]/50 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* ROW 7: GUEST SCALE & ROOMS */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b dark:border-[#2D2D2D] border-[#D8D8CC] pb-4 focus-within:border-[#FF1F02] transition-colors">
                    <label className="w-28 sm:w-36 shrink-0 text-xs font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60">
                      GUEST SCALE
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      <input
                        type="text"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        placeholder="Estimated Guests (e.g. 250 – 500)"
                        className="w-full bg-transparent text-base sm:text-lg dark:text-white text-[#0E0E0E] placeholder:text-[#999990] dark:placeholder:text-[#555555] focus:outline-none font-light"
                      />
                      <input
                        type="text"
                        name="roomCount"
                        value={formData.roomCount}
                        onChange={handleInputChange}
                        placeholder="Rooms Needed (e.g. 30 Rooms / Venue Only)"
                        className="w-full bg-transparent text-base sm:text-lg dark:text-white text-[#0E0E0E] placeholder:text-[#999990] dark:placeholder:text-[#555555] focus:outline-none font-light"
                      />
                    </div>
                  </div>

                  {/* ROW 8: BUDGET */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b dark:border-[#2D2D2D] border-[#D8D8CC] pb-4 focus-within:border-[#FF1F02] transition-colors">
                    <label className="w-28 sm:w-36 shrink-0 text-xs font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60">
                      BUDGET
                    </label>
                    <div className="w-full relative">
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        placeholder="Select range (e.g. ₹15–25 Lakhs, ₹50 Lakhs+, Flexible Quote)"
                        className="w-full bg-transparent text-base sm:text-lg dark:text-white text-[#0E0E0E] placeholder:text-[#999990] dark:placeholder:text-[#555555] focus:outline-none font-light"
                      />
                    </div>
                  </div>

                  {/* ROW 9: TIMELINE & CALLBACK PREFERENCE */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b dark:border-[#2D2D2D] border-[#D8D8CC] pb-4 focus-within:border-[#FF1F02] transition-colors">
                    <label className="w-28 sm:w-36 shrink-0 text-xs font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60">
                      TIMELINE
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-base sm:text-lg dark:text-white text-[#0E0E0E] focus:outline-none font-light cursor-pointer"
                      />
                      <select
                        name="eventDuration"
                        value={formData.eventDuration}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-base sm:text-lg dark:text-white text-[#0E0E0E] focus:outline-none font-light cursor-pointer appearance-none py-0.5"
                      >
                        <option value="1 Day (Single Function)" className="dark:bg-[#1A1A1A] bg-white">1 Day (Single Function)</option>
                        <option value="2 Days (1 Night)" className="dark:bg-[#1A1A1A] bg-white">2 Days (1 Night)</option>
                        <option value="3 Days (2 Nights - Traditional)" className="dark:bg-[#1A1A1A] bg-white">3 Days (2 Nights - Traditional)</option>
                        <option value="4+ Days Multi-Day Celebration" className="dark:bg-[#1A1A1A] bg-white">4+ Days Multi-Day Celebration</option>
                      </select>
                    </div>
                  </div>

                  {/* ROW 10: MESSAGE / VISION */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b dark:border-[#2D2D2D] border-[#D8D8CC] pb-4 focus-within:border-[#FF1F02] transition-colors">
                    <label className="w-28 sm:w-36 shrink-0 text-xs font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60 pt-1">
                      VISION
                    </label>
                    <textarea
                      rows={2}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="What are you creating, and what should it become? (Mandap concepts, decor, cuisine, or VIP needs)"
                      className="w-full bg-transparent text-base sm:text-lg dark:text-white text-[#0E0E0E] placeholder:text-[#999990] dark:placeholder:text-[#555555] focus:outline-none font-light resize-none leading-relaxed"
                    />
                  </div>

                  {/* ROW 11: SUBMIT BUTTON */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-4">
                    <span className="w-28 sm:w-36 shrink-0 text-xs font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60 hidden sm:block">
                      SUBMIT
                    </span>
                    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-10 py-4 dark:bg-white dark:text-black bg-[#0E0E0E] text-white hover:bg-[#FF1F02] dark:hover:bg-[#FF1F02] dark:hover:text-white font-mono font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl cursor-pointer disabled:opacity-50 flex items-center justify-center gap-3 shrink-0"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>TRANSMITTING...</span>
                          </>
                        ) : (
                          <>
                            <span>SEND INQUIRY</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <div className="text-[11px] font-mono dark:text-white/40 text-[#0E0E0E]/40 uppercase tracking-wider">
                        Direct to central event director • Encrypted transmission
                      </div>
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