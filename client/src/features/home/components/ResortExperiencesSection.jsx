import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Crown, 
  Sparkles, 
  Cake, 
  Users, 
  Waves, 
  Music, 
  Briefcase, 
  ArrowRight,
  Phone,
  MessageCircle
} from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import { RoyalOrnamentDivider } from '../../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../../components/common/IndianArtBackground';
import { getWhatsAppBookingUrl } from '../../../data/contact';

// The 7 Core Specializations from the Country Holidays Banquets Infographic
const SPECIALIZATIONS = [
  {
    id: 'destination-wedding',
    title: 'Destination Wedding',
    tag: 'Palatial & Beach Mandaps',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    icon: Crown,
    link: '/celebrations#destination-wedding',
    color: '#B38738'
  },
  {
    id: 'regional-wedding',
    title: 'Regional Wedding',
    tag: 'Traditional Vedic Rituals',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    icon: Heart,
    link: '/celebrations#regional-wedding',
    color: '#8F661E'
  },
  {
    id: 'engagement',
    title: 'Engagement',
    tag: 'Roka & Sangeet Soirées',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
    icon: Sparkles,
    link: '/celebrations#engagement',
    color: '#B38738'
  },
  {
    id: 'anniversary',
    title: 'Anniversary',
    tag: 'Romantic Milestone Galas',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
    icon: Heart,
    link: '/celebrations#anniversary',
    color: '#C59B4E'
  },
  {
    id: 'birthday-party',
    title: 'Birthday Party',
    tag: 'Festive Themed Banquets',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    icon: Cake,
    link: '/celebrations#birthday',
    color: '#8F661E'
  },
  {
    id: 'corporate-meetings',
    title: 'Corporate Meetings & Events',
    tag: 'Summits & Executive Retreats',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    icon: Briefcase,
    link: '/celebrations#corporate',
    color: '#B38738'
  },
  {
    id: 'pool-parties',
    title: 'Pool Parties, Concert & Shows',
    tag: 'Sunset DJ & Live Galas',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80',
    icon: Waves,
    link: '/celebrations#pool-party',
    color: '#C59B4E'
  },
];

export default function ResortExperiencesSection() {
  const whatsappUrl = getWhatsAppBookingUrl('Hello Country Holidays Banquets, I would like to inquire about event arrangements.');

  return (
    <section className="relative bg-[#FAF6ED] dark:bg-[#0D0A07] text-[#241A12] dark:text-[#F5EFE6] py-20 sm:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden transition-colors duration-500 font-sans border-t border-[#B38738]/20 dark:border-[#B38738]/30">
      
      {/* Indian Royal Art & Jaali Lattice Background */}
      <IndianArtBackground variant="full" opacity="opacity-[0.05] dark:opacity-[0.07]" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">

        {/* 1. CLEAN SECTION HEADER WITH PROPER ALIGNMENT */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12 sm:mb-16">
          
          {/* Section Eyebrow Tag */}
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B38738]/10 dark:bg-[#B38738]/20 border border-[#B38738]/30 text-[#B38738] dark:text-[#E8C97E] text-[11px] sm:text-xs font-cinzel font-bold uppercase tracking-[0.22em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38738] dark:bg-[#E8C97E]" />
              <span>✦ OUR FACILITIES & CELEBRATIONS ✦</span>
            </div>
          </ScrollReveal>

          {/* Main Title */}
          <ScrollReveal direction="up" delay={50}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-marcellus font-bold text-[#241A12] dark:text-[#F5EFE6] tracking-[0.02em] uppercase leading-tight">
              Our Specializations
            </h2>
          </ScrollReveal>

          {/* Royal Ornamental Spearhead Divider */}
          <ScrollReveal direction="up" delay={100}>
            <RoyalOrnamentDivider color="#B38738" />
          </ScrollReveal>

          {/* Subtitle Paragraph matching exact reference */}
          <ScrollReveal direction="up" delay={150}>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#635142] dark:text-[#BFB0A2] font-sans font-light leading-relaxed max-w-2xl mx-auto">
              Get special arrangements for your special events. At Country Holidays, we have <strong className="text-[#B38738] dark:text-[#E8C97E] font-semibold">expert event planners and advisors</strong> who will make your day memorable.
            </p>
          </ScrollReveal>
        </div>


        {/* 2. THE 7 ROYAL SPECIALIZATION CARDS (FACETED GOLD FRAMES & FILIGREE MEDALLIONS) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5 sm:gap-4 lg:gap-4 items-stretch">
          {SPECIALIZATIONS.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <ScrollReveal key={spec.id} direction="up" delay={idx * 60}>
                <Link
                  to={spec.link}
                  className="group relative flex flex-col items-center text-center h-full p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#FAF6ED] to-[#F3EADB] dark:from-[#17120C] dark:to-[#0F0C08] border-2 border-[#B38738]/40 dark:border-[#B38738]/50 hover:border-[#E8C97E] hover:shadow-[0_16px_40px_rgba(179,135,56,0.28)] hover:-translate-y-2 transition-all duration-400 backdrop-blur-md cursor-pointer overflow-hidden"
                >
                  {/* Subtle Golden Radial Glow on Hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#B38738]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />

                  {/* ✦ Faceted Hexagonal / Arched Photo Shield (Matching Reference Graphic) ✦ */}
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-3.5 border-2 border-[#B38738]/60 group-hover:border-[#E8C97E] shadow-[0_4px_16px_rgba(0,0,0,0.15)] bg-[#1A130D] transition-colors duration-400">
                    <img
                      src={spec.image}
                      alt={spec.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115 filter brightness-[0.95] group-hover:brightness-105"
                    />
                    
                    {/* Gradient Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-50 transition-opacity" />
                    
                    {/* Top Gold Corner Accent */}
                    <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-[#B38738]/60 text-[9px] font-cinzel font-bold text-[#E8C97E] shadow-sm">
                      0{idx + 1}
                    </div>

                    {/* Bottom Micro Tag */}
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <span className="text-[10px] font-cormorant italic text-white font-medium block leading-tight truncate drop-shadow-md">
                        {spec.tag}
                      </span>
                    </div>
                  </div>

                  {/* ✦ Ornamental Golden Filigree Medallion (Matching Infographic) ✦ */}
                  <div className="relative mb-2.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8C97E] via-[#B38738] to-[#8F661E] p-[1.5px] shadow-[0_4px_12px_rgba(179,135,56,0.3)] group-hover:scale-110 group-hover:shadow-[0_6px_18px_rgba(232,201,126,0.5)] transition-all duration-300">
                      <div className="w-full h-full rounded-full bg-[#FAF6ED] dark:bg-[#140F0A] flex items-center justify-center text-[#B38738] dark:text-[#E8C97E] group-hover:bg-[#B38738] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* ✦ Specialization Title ✦ */}
                  <div className="space-y-1 flex-1 flex flex-col justify-center w-full px-1">
                    <h3 className="text-xs sm:text-[13px] lg:text-[14px] font-marcellus font-bold text-[#241A12] dark:text-[#F5EFE6] leading-snug group-hover:text-[#B38738] dark:group-hover:text-[#E8C97E] transition-colors">
                      {spec.title}
                    </h3>
                  </div>

                  {/* Bottom Explore Indicator */}
                  <div className="pt-2 mt-auto flex items-center justify-center gap-1 text-[10px] font-cinzel text-[#B38738] dark:text-[#E8C97E] uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>


        {/* 3. BOTTOM GOLDEN RIBBON: PREMIUM BANQUETS SERVICES & INQUIRY CTA */}
        <ScrollReveal direction="up" delay={250}>
          <div className="relative rounded-2xl overflow-hidden p-5 sm:p-7 bg-gradient-to-r from-[#8F661E] via-[#B38738] to-[#805915] text-white shadow-[0_8px_32px_rgba(179,135,56,0.35)] border border-[#E8C97E]/40">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-center md:text-left">
              
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-cinzel font-bold uppercase tracking-[0.25em] text-[#FFE5A3]">
                  <span>✦</span>
                  <span>PREMIUM BANQUETS SERVICES</span>
                  <span>✦</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-marcellus font-bold text-white tracking-wide">
                  Planning a Grand Celebration or Corporate Gathering?
                </h4>
                <p className="text-xs sm:text-sm text-white/90 font-sans font-light">
                  Direct ballroom booking, bespoke catering, thematic decor, and 24/7 dedicated event managers.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white text-[#8F661E] hover:bg-[#FAF6ED] font-cinzel font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#8F661E]" />
                  <span>RESERVE BANQUET</span>
                </a>

                <Link
                  to="/celebrations"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/60 hover:bg-white/10 text-white font-cinzel font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  <span>ALL CELEBRATIONS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}