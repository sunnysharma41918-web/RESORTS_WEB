import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/common/ScrollReveal';
import { RoyalOrnamentDivider } from '../../../components/common/RoyalOrnamentDivider';
import IndianArtBackground from '../../../components/common/IndianArtBackground';
import { getWhatsAppBookingUrl } from '../../../data/contact';

const FAQS = [
  {
    q: 'How do I reserve a stay across your destinations?',
    a: 'Reservations can be made directly through our website, or by connecting with our dedicated 24/7 Royal Concierge Desk via WhatsApp or telephone for bespoke itinerary assistance and tailored rates.',
  },
  {
    q: 'What are the standard check-in and check-out timings?',
    a: 'Standard check-in begins at 02:00 PM, and check-out is until 11:00 AM. Early check-in and extended late departures can be coordinated in advance based on availability.',
  },
  {
    q: 'Is artisanal dining and breakfast included in reservations?',
    a: 'Yes, our signature stays feature daily gourmet royal breakfast crafted with fresh regional ingredients. Multi-course meal plans and royal fine dining packages are available across all properties.',
  },
  {
    q: 'Do you arrange airport transfers and private sightseeing tours?',
    a: 'Absolutely. We provide sanitized luxury chauffeur transfers from nearby airports and railway hubs, along with guided private heritage excursions, safari passes, and riverboat tours.',
  },
  {
    q: 'What is your cancellation and date rescheduling policy?',
    a: 'We offer flexible cancellation up to 72 hours prior to arrival with full refund eligibility or seamless date rescheduling throughout the operational season.',
  },
  {
    q: 'Can Country Holidays host destination weddings and corporate summits?',
    a: 'Yes. Our properties feature grand pillarless banquet halls, scenic outdoor lawns, and executive boardrooms accommodating from 20 to 800 guests with complete event decor and catering management.',
  },
  {
    q: 'Are private villas suitable for families and children?',
    a: 'All our pool villas and royal suites are child-friendly, equipped with dedicated kids play zones, babysitting support on request, and custom culinary menus for young guests.',
  },
  {
    q: 'How can I plan a multi-destination circuit across North or South India?',
    a: 'Our central estate director curates seamless multi-city circuits (such as Rajasthan Palaces, Himalayan Heights, or Kerala Backwaters) complete with inter-property transfers and dedicated concierge guidance.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] py-20 sm:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden transition-colors duration-500 font-sans select-none border-t border-[#8F6B2E]/20">
      
      {/* Indian Heritage Art: Palace Jaali & Mandala Motifs */}
      <IndianArtBackground variant="full" opacity="opacity-[0.045] dark:opacity-[0.07]" showMandala={true} />
      
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8F6B2E]/10 dark:bg-[#8F6B2E]/20 border border-[#8F6B2E]/30 text-[#8F6B2E] dark:text-[#D4AF37] text-[11px] sm:text-xs font-serif font-bold uppercase tracking-[0.18em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F6B2E] dark:bg-[#D4AF37]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={50}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif font-normal text-[#2A1F17] dark:text-[#F3EEE0] tracking-wide uppercase">
              EVERYTHING YOU NEED TO KNOW
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <RoyalOrnamentDivider color="#8F6B2E" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#6E5D4F] dark:text-[#B8A89A] leading-relaxed font-serif font-light max-w-2xl mx-auto">
              Clear and transparent guidance to ensure your arrival, dining, and luxury retreat experience across India is completely effortless.
            </p>
          </ScrollReveal>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 pt-2">
          {FAQS.map((faq, idx) => {
            const isOpen = idx === openIndex;
            return (
              <ScrollReveal key={faq.q} direction="up" delay={idx * 40}>
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#F6F1EB] dark:bg-[#1A1612] border-[#8F6B2E]/50 dark:border-[#D4AF37]/50 shadow-sm'
                      : 'bg-white dark:bg-[#14110E] border-[#8F6B2E]/20 dark:border-[#8F6B2E]/25 hover:border-[#8F6B2E]/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg font-normal text-[#2A1F17] dark:text-[#F3EEE0] leading-snug">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isOpen
                          ? 'bg-[#8F6B2E] text-white dark:bg-[#D4AF37] dark:text-[#14110E] rotate-180'
                          : 'bg-[#EFE8DC] dark:bg-[#251E18] text-[#8F6B2E] dark:text-[#D4AF37]'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#6E5D4F] dark:text-[#B8A89A] font-serif leading-relaxed border-t border-[#8F6B2E]/15 dark:border-[#8F6B2E]/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Concierge Help Callout */}
        <ScrollReveal direction="up" delay={150}>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F6F1EB] dark:bg-[#1A1612] border border-[#8F6B2E]/25 dark:border-[#8F6B2E]/35 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#EFE8DC] dark:bg-[#251E18] text-[#8F6B2E] dark:text-[#D4AF37] flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm sm:text-base font-serif font-bold text-[#2A1F17] dark:text-[#F3EEE0]">
                  Have a Bespoke Request or Custom Itinerary?
                </h4>
                <p className="text-xs text-[#6E5D4F] dark:text-[#B8A89A] font-serif">
                  Our central concierge desk is available 24/7 to assist with your personalized stay.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-lg bg-[#8F6B2E] hover:bg-[#725421] text-white font-serif font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm"
              >
                <span>Inquire Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={getWhatsAppBookingUrl('Hello, I have an inquiry regarding Country Holidays Resorts.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-transparent border border-[#8F6B2E]/40 text-[#2A1F17] dark:text-[#F3EEE0] hover:border-[#8F6B2E] font-serif text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#8F6B2E] dark:text-[#D4AF37]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
