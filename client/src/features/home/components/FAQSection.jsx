import React, { useState } from 'react';
import { Sparkles, Plus, Minus, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'What are the standard check-in and check-out times?',
      a: 'Check-in begins at 02:00 PM, and check-out is until 12:00 PM. Flexible early check-in and late departures can be arranged directly with your dedicated butler upon reservation.',
    },
    {
      q: 'Is daily artisanal breakfast and dining included in our stay?',
      a: 'Yes, all villa reservations include complimentary multi-course champagne breakfast served either in your private pavilion or at The Glass Pavilion restaurant.',
    },
    {
      q: 'Do you provide private airport transfers and helicopter charters?',
      a: 'We offer complimentary luxury chauffeur sedan transfers from nearby international airports for suites and villas. Direct helicopter charter transfers to our on-site helipad are available upon request.',
    },
    {
      q: 'What is the resort cancellation and rescheduling policy?',
      a: 'We offer 100% flexible cancellation up to 72 hours prior to arrival with full refund or seamless date modification throughout the 2026 season.',
    },
    {
      q: 'Are children and families accommodated in private pool villas?',
      a: 'Yes, we warmly welcome families. Dedicated children amenities, child-safe pool fencing, organic infant dining, and certified private childcare can be arranged seamlessly.',
    },
    {
      q: 'Can special dietary, vegan, or kosher preferences be catered to?',
      a: 'Our executive culinary team accommodates all dietary requirements. A pre-arrival consultation ensures your in-villa pantry and dining menus are tailored to your exact specifications.',
    },
  ];

  return (
    <section className="relative py-28 sm:py-36 bg-[#171C28] text-white overflow-hidden select-none border-t border-[#5E6575]/25">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rokkitt:wght@700;800;900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
        .fq-display { font-family: 'Rokkitt', Georgia, serif; }
        .fq-body { font-family: 'Ubuntu', sans-serif; }
      `}</style>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3FD3C9]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-10 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-[#3FD3C9] text-xs uppercase tracking-[0.25em] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FREQUENT INQUIRIES</span>
          </div>
          <h2 className="fq-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            Everything You Need <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FD3C9] via-white to-[#B72257]">To Know</span>
          </h2>
          <p className="fq-body text-xs sm:text-sm text-white/65 font-light max-w-lg mx-auto">
            Clear, transparent answers to make your arrival and stay completely effortless.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = idx === openIndex;
            return (
              <div
                key={faq.q}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#1F2536] border-[#3FD3C9]/60 shadow-2xl'
                    : 'bg-[#1F2536]/40 border-[#5E6575]/25 hover:border-[#5E6575]/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="fq-display text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen
                        ? 'bg-[#3FD3C9] text-[#171C28] rotate-180'
                        : 'bg-[#171C28] text-white/60 border border-[#5E6575]/30'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-white/70 font-light leading-relaxed border-t border-[#5E6575]/25">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Question Help */}
        <div className="p-6 rounded-3xl bg-[#1F2536]/60 border border-[#5E6575]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3 text-white/80">
            <HelpCircle className="w-5 h-5 text-[#3FD3C9] shrink-0" />
            <span className="fq-body text-xs sm:text-sm">Have a bespoke request or private charter inquiry?</span>
          </div>
          <Link
            to="/contact"
            className="px-6 py-2.5 rounded-full bg-[#3FD3C9] hover:bg-[#2EC4BA] text-[#171C28] font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-md"
          >
            Ask Concierge
          </Link>
        </div>

      </div>
    </section>
  );
}
