import React from 'react';
import { ArrowRight, Sparkles, Heart, Cake, Building2, Music, Calendar } from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import { getWhatsAppBookingUrl } from '../../../data/contact';

const specializations = [
  {
    id: '01',
    title: 'Destination Wedding',
    tag: 'Grand Celebration',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=75',
    desc: 'Bespoke scenic oceanfront mandaps, clifftop vow exchanges, and grand multi-day luxury weddings.',
  },
  {
    id: '02',
    title: 'Grand Banquets & Lawns',
    tag: 'Celebration Venues',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=75',
    desc: 'Sprawling lush green lawns, pillarless AC grand ballrooms, and customized thematic stage setups.',
  },
  {
    id: '03',
    title: 'Engagement',
    tag: 'Ring Ceremony',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=75',
    desc: 'Intimate ring ceremonies, floral pathways, and champagne toasts under starlit canopies.',
  },
  {
    id: '04',
    title: 'Anniversary',
    tag: 'Milestone Romance',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=75',
    desc: 'Private candlelight dinners, customized floral suites, and milestone celebration retreats.',
  },
  {
    id: '05',
    title: 'Birthday Party',
    tag: 'Festive Gathering',
    icon: Cake,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=75',
    desc: 'Vibrant celebrations with gourmet banqueting, curated themes, and joyous moments for all ages.',
  },
  {
    id: '06',
    title: 'Corporate Meetings & Events',
    tag: 'Executive Offsite',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=75',
    desc: 'High-tech boardroom suites, corporate leadership offsites, and private amphitheatre keynote venues.',
  },
  {
    id: '07',
    title: 'Pool Parties, Concert & Shows',
    tag: 'Entertainment',
    icon: Music,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=75',
    desc: 'Illuminated infinity pool decks, live acoustic concerts, and curated evening entertainment.',
  },
];

export default function ResortExperiencesSection() {
  return (
    <section className="relative dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-28 sm:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">

        {/* TOP SUB-SECTION: WHAT WE PROVIDE / OUR SPECIALIZATIONS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b dark:border-[#333333] border-[#E9E9DE]">
          <div className="space-y-4">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0" />
                <span>03 — WHAT WE PROVIDE</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[-0.04em] leading-[0.88] dark:text-white text-[#0E0E0E]">
                OUR SPECIALIZATIONS.
              </h2>
            </ScrollReveal>
          </div>

          <div className="space-y-3 max-w-lg">
            <ScrollReveal direction="up" delay={200}>
              <p className="text-sm sm:text-base font-normal text-[#EAB308] leading-relaxed">
                Get special arrangements for your special events.
              </p>
              <p className="text-xs sm:text-sm font-light dark:text-[#D0D0D0] text-[#0E0E0E]/75 leading-relaxed">
                At Country Holidays, we have <strong className="dark:text-white text-[#0E0E0E] font-semibold">expert event planners and advisors</strong> who will make your day truly memorable.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Specializations 7-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {specializations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.id} direction="up" delay={idx * 60}>
                <div className="dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] hover:border-[#FF1F02] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group h-full overflow-hidden">
                  
                  {/* Card Visual Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                    {/* Tag badge top-right */}
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-black/80 backdrop-blur-sm text-[10px] font-mono text-[#EAB308] uppercase tracking-wider font-semibold border border-white/10">
                      {item.tag}
                    </div>

                    {/* Number top-left */}
                    <div className="absolute top-3 left-3 text-xs font-mono font-bold text-[#FF1F02]">
                      {item.id}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#FF1F02]" />
                        <h3 className="text-base sm:text-lg font-extrabold uppercase dark:text-white text-[#0E0E0E] tracking-tight group-hover:text-[#FF1F02] transition-colors leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs dark:text-[#A0A0A0] text-[#0E0E0E]/75 font-light leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>
                    </div>

                    {/* 1-Click WhatsApp Inquire Link */}
                    <a
                      href={getWhatsAppBookingUrl(`Hello Country Holidays, I would like to inquire about arrangements for: ${item.title} (${item.tag}).`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-[#FF1F02] hover:text-[#0E0E0E] dark:hover:text-white transition-colors pt-2 border-t dark:border-[#222222] border-[#E9E9DE] cursor-pointer"
                    >
                      <span>Inquire for Event</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}

          {/* Banquet Banner Ribbon Card */}
          <ScrollReveal direction="up" delay={500}>
            <div className="bg-gradient-to-br from-[#1C1C1C] via-[#0E0E0E] to-black border-2 border-dashed border-[#EAB308]/40 p-6 flex flex-col justify-between text-center space-y-4 h-full">
              <div className="space-y-2 my-auto">
                <span className="text-[10px] font-mono text-[#EAB308] uppercase tracking-widest block font-bold">
                  ✦ BESPOKE HOSPITALITY ✦
                </span>
                <h4 className="text-xl font-black uppercase text-white leading-tight">
                  PREMIUM BANQUETS SERVICES
                </h4>
                <p className="text-xs text-[#B0B0B0] font-light leading-relaxed">
                  Customized culinary feasts, private floral styling, and dedicated event coordinators.
                </p>
              </div>
              <a
                href={getWhatsAppBookingUrl('Hello Country Holidays, I would like to request Premium Banquets Services for our upcoming event.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#EAB308] hover:bg-white text-black font-bold text-xs uppercase font-mono tracking-wider transition-all"
              >
                CONTACT EVENT DESK
              </a>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}