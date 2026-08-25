import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Users, Award } from 'lucide-react';

export default function WeddingsEventsSection() {
  const eventTypes = [
    {
      title: 'Destination Weddings',
      guests: '50 - 450 Guests',
      desc: 'Clifftop sunset vows, private beachfront banquets, and bespoke fireworks celebrations.',
      icon: Heart,
      accent: '#B72257',
    },
    {
      title: 'Executive Summits',
      guests: '10 - 120 Leaders',
      desc: 'High-security private pavilions with high-speed fiber links and private butler service.',
      icon: Users,
      accent: '#3FD3C9',
    },
    {
      title: 'Private Milestone Galas',
      guests: '20 - 200 Guests',
      desc: 'Intimate anniversaries, private birthdays, and sommelier-curated culinary galas.',
      icon: Award,
      accent: '#3FD3C9',
    },
  ];

  return (
    <section className="relative py-28 sm:py-36 bg-[#171C28] text-white overflow-hidden select-none border-t border-[#5E6575]/25">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rokkitt:wght@700;800;900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        .wd-display { font-family: 'Rokkitt', Georgia, serif; }
        .wd-body { font-family: 'Ubuntu', sans-serif; }
      `}</style>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-[#B72257]/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#3FD3C9]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 relative z-10">
        
        {/* Large Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT 6 Cols: Editorial Narrative & Event Pillars */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 text-[#3FD3C9] text-xs uppercase tracking-[0.25em] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CELEBRATIONS & EVENTS</span>
              </div>

              <h2 className="wd-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Celebrate Something <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FD3C9] via-white to-[#B72257]">
                  Beautiful.
                </span>
              </h2>
            </div>

            <p className="wd-body text-white/70 text-sm sm:text-base font-light leading-relaxed">
              Whether curating an unforgettable clifftop wedding surrounded by loved ones 
              or hosting an intimate C-suite summit, our dedicated event concierge orchestrates 
              every detail from custom floral styling to five-star banquets with effortless precision.
            </p>

            {/* 3 Event Cards */}
            <div className="space-y-3 pt-2">
              {eventTypes.map((ev) => {
                const Icon = ev.icon;
                return (
                  <div
                    key={ev.title}
                    className="p-5 rounded-2xl bg-[#1F2536]/80 border border-[#5E6575]/30 hover:border-[#3FD3C9]/50 transition-all flex items-start space-x-4 group shadow-lg"
                  >
                    <div className="p-3 rounded-xl bg-[#171C28] border border-[#5E6575]/30 flex items-center justify-center shrink-0 text-[#3FD3C9] group-hover:border-[#3FD3C9] transition-colors">
                      <Icon className="w-5 h-5" style={{ color: ev.accent }} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="wd-display text-base font-bold text-white group-hover:text-[#3FD3C9] transition-colors">
                          {ev.title}
                        </h4>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#171C28] border border-[#5E6575]/30 text-white/70">
                          {ev.guests}
                        </span>
                      </div>
                      <p className="wd-body text-xs text-white/60 font-light leading-relaxed">
                        {ev.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#3FD3C9] hover:bg-[#2EC4BA] text-[#171C28] font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(63,211,201,0.35)] hover:scale-105"
              >
                <span>Inquire For Events</span>
                <span className="w-6 h-6 rounded-full bg-[#B72257] text-white flex items-center justify-center">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>

          </div>

          {/* RIGHT 6 Cols: Master Photography with Floating Badges */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-[#5E6575]/35 group bg-[#1F2536]">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=90"
              alt="Luxury Destination Wedding"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171C28]/90 via-transparent to-transparent" />

            {/* Floating Top Venue Tag */}
            <div className="absolute top-6 left-6 z-20">
              <span className="px-4 py-1.5 rounded-full bg-[#171C28]/80 backdrop-blur-md border border-[#5E6575]/40 text-[11px] uppercase tracking-widest text-[#3FD3C9] font-bold shadow-lg">
                Exclusive Clifftop Lawn
              </span>
            </div>

            {/* Bottom Glass Card */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#171C28]/85 backdrop-blur-xl border border-[#5E6575]/30">
              <span className="text-[10px] uppercase tracking-widest text-[#3FD3C9] font-bold block mb-1">
                Full Buyout Available
              </span>
              <h4 className="wd-display text-lg text-white font-bold">12 Private Villas + Ocean Amphitheatre</h4>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
