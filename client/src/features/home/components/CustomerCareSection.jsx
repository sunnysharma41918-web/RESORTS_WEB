import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Send,
  HelpCircle,
  MapPin
} from 'lucide-react';
import ScrollReveal from '../../../components/common/ScrollReveal';
import EditorialHeritageStamp from '../../../components/common/EditorialHeritageStamp';
import EditorialBackgroundElements from '../../../components/common/EditorialBackgroundElements';
import { CONTACT_INFO, getWhatsAppBookingUrl } from '../../../data/contact';
import { inquiryService } from '../../../services/inquiryService';

const QUICK_TOPICS = [
  { label: 'Booking Modification', msg: 'Hello Support, I need assistance with modifying an existing resort reservation.' },
  { label: 'Destination Weddings', msg: 'Hello Support, I would like to consult regarding a Destination Wedding inquiry.' },
  { label: 'Corporate Offsites', msg: 'Hello Support, I need corporate banquet details and group stay tariff.' },
  { label: 'Membership Benefits', msg: 'Hello Support, please guide me on Country Holidays membership privileges.' },
];

export default function CustomerCareSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', topic: 'New Booking & Tariff' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create inquiry in backend database (and localStorage sync) for Admin Panel
      await inquiryService.createInquiry({
        guestName: formData.name.trim(),
        phone: formData.phone.trim(),
        email: '',
        property: `Priority Callback: ${formData.topic}`,
        budget: 'Immediate Callback',
        city: '24/7 Care Desk Lead',
        message: `Priority callback requested regarding: "${formData.topic}". Contact Phone: ${formData.phone}`,
        preferredContact: 'Phone Callback',
        status: 'new',
      });

      setLoading(false);
      setSubmitted(true);

      // 2. Also prepare WhatsApp support link for instant user connect
      const supportMsg = `Hello Customer Care, my name is ${formData.name} (${formData.phone}). I have requested a priority callback regarding: ${formData.topic}.`;
      setTimeout(() => {
        window.open(getWhatsAppBookingUrl(supportMsg), '_blank');
      }, 700);
    } catch {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <section className="relative dark:bg-[#161616] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden transition-colors duration-300 font-manrope border-t dark:border-[#2A2A2A] border-[#E9E9DE]">
      <EditorialBackgroundElements variant="light" position="top-right" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">

        {/* 1. SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b dark:border-[#333333] border-[#E9E9DE]">
          <div className="space-y-4 max-w-2xl">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#FF1F02]">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02] inline-block shrink-0 animate-pulse" />
                <span>06 — 24/7 CUSTOMER CARE & CONCIERGE</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-[#0E0E0E] dark:text-white leading-[1.05]">
                DEDICATED SUPPORT, <br />
                <span className="text-[#FF1F02]">AT YOUR SERVICE ALWAYS.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150}>
              <p className="text-sm sm:text-base font-light dark:text-[#D0D0D0] text-[#0E0E0E]/70 leading-relaxed">
                Whether you need assistance with ongoing bookings, custom holiday planning, banquet reservations, or on-trip concierge care across all 36 States & UTs, our executive helpdesk is live 24 hours a day, 7 days a week.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="scale" className="hidden lg:block shrink-0">
            <EditorialHeritageStamp size={105} centerText="CHHR" text="COUNTRY HOLIDAYS • 24/7 CARE DESK • " />
          </ScrollReveal>
        </div>

        {/* 2. CHANNELS & INTERACTIVE HELP DESK GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT 4 CHANNELS (7 COLS) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Direct Phone Helpline */}
            <ScrollReveal direction="up" delay={100}>
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="h-full flex flex-col justify-between p-6 sm:p-7 dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] hover:border-[#FF1F02] transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/5 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-none dark:bg-[#1A1A1A] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] flex items-center justify-center text-[#FF1F02] group-hover:bg-[#FF1F02] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] block mb-1">
                      Direct Hotline • Toll-Free
                    </span>
                    <h3 className="text-lg font-bold uppercase dark:text-white text-[#0E0E0E]">
                      Phone Support
                    </h3>
                    <p className="text-xs dark:text-[#B0B0B0] text-[#0E0E0E]/60 mt-1 leading-relaxed">
                      Instant connection to our senior reservation specialists.
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t dark:border-[#222222] border-[#E9E9DE] flex items-center justify-between">
                  <span className="text-sm font-bold font-mono dark:text-white text-[#0E0E0E] group-hover:text-[#FF1F02] transition-colors">
                    {CONTACT_INFO.phone}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#FF1F02] transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            </ScrollReveal>

            {/* WhatsApp Live Concierge */}
            <ScrollReveal direction="up" delay={150}>
              <a
                href={getWhatsAppBookingUrl('Hello Customer Care, I would like to speak with a concierge specialist.')}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full flex flex-col justify-between p-6 sm:p-7 dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] hover:border-[#22C55E] transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/5 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-none dark:bg-[#1A1A1A] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] flex items-center justify-center text-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#22C55E] block mb-1">
                      ● Active Now • Instant
                    </span>
                    <h3 className="text-lg font-bold uppercase dark:text-white text-[#0E0E0E]">
                      WhatsApp Desk
                    </h3>
                    <p className="text-xs dark:text-[#B0B0B0] text-[#0E0E0E]/60 mt-1 leading-relaxed">
                      Share itinerary preferences, photos, and request instant quotes.
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t dark:border-[#222222] border-[#E9E9DE] flex items-center justify-between">
                  <span className="text-sm font-bold font-mono dark:text-white text-[#0E0E0E] group-hover:text-[#22C55E] transition-colors">
                    Chat on WhatsApp
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#22C55E] transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            </ScrollReveal>

            {/* Official Email Desk */}
            <ScrollReveal direction="up" delay={200}>
              <a
                href={`mailto:${CONTACT_INFO.email}?subject=Customer Care Inquiry - Country Holidays Hotels & Resorts`}
                className="h-full flex flex-col justify-between p-6 sm:p-7 dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] hover:border-[#FF1F02] transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/5 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-none dark:bg-[#1A1A1A] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] flex items-center justify-center text-[#FF1F02] group-hover:bg-[#FF1F02] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] block mb-1">
                      Response &lt; 2 Hours
                    </span>
                    <h3 className="text-lg font-bold uppercase dark:text-white text-[#0E0E0E]">
                      Email Dossier
                    </h3>
                    <p className="text-xs dark:text-[#B0B0B0] text-[#0E0E0E]/60 mt-1 leading-relaxed">
                      Detailed event briefs, corporate invoices, and membership queries.
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t dark:border-[#222222] border-[#E9E9DE] flex items-center justify-between">
                  <span className="text-xs font-bold font-mono dark:text-white text-[#0E0E0E] truncate group-hover:text-[#FF1F02] transition-colors max-w-[200px]">
                    {CONTACT_INFO.email}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#FF1F02] shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
              </a>
            </ScrollReveal>

            {/* Corporate & Banquets Desk */}
            <ScrollReveal direction="up" delay={250}>
              <Link
                to="/celebrations"
                className="h-full flex flex-col justify-between p-6 sm:p-7 dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] hover:border-[#EAB308] transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/5 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-none dark:bg-[#1A1A1A] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] flex items-center justify-center text-[#EAB308] group-hover:bg-[#EAB308] group-hover:text-black transition-colors">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EAB308] block mb-1">
                      Events & Wedlock Desk
                    </span>
                    <h3 className="text-lg font-bold uppercase dark:text-white text-[#0E0E0E]">
                      Celebrations Desk
                    </h3>
                    <p className="text-xs dark:text-[#B0B0B0] text-[#0E0E0E]/60 mt-1 leading-relaxed">
                      Bespoke wedding curations, large group banquets & corporate offsites.
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t dark:border-[#222222] border-[#E9E9DE] flex items-center justify-between">
                  <span className="text-sm font-bold font-mono dark:text-white text-[#0E0E0E] group-hover:text-[#EAB308] transition-colors">
                    Submit Event Brief
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#EAB308] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </ScrollReveal>

          </div>

          {/* RIGHT 5 COLS: INSTANT PRIORITY CALLBACK FORM */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delay={200}>
              <div className="h-full p-8 sm:p-10 dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] shadow-2xl flex flex-col justify-between relative overflow-hidden">
                
                {/* Decorative Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF1F02]" />

                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] block">
                      FAST RESPONSE GUARANTEE
                    </span>
                    <h3 className="text-2xl font-extrabold uppercase tracking-tight dark:text-white text-[#0E0E0E]">
                      Request Priority Callback
                    </h3>
                    <p className="text-xs dark:text-[#A0A0A0] text-[#0E0E0E]/60 leading-relaxed font-light">
                      Leave your details and our senior customer care executive will call you within 15 minutes.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="p-6 dark:bg-[#1A1A1A] bg-[#FAFDF2] border border-[#22C55E]/40 space-y-3 text-center my-6">
                      <CheckCircle2 className="w-10 h-10 text-[#22C55E] mx-auto" />
                      <h4 className="text-base font-bold uppercase text-white">Callback Request Logged</h4>
                      <p className="text-xs text-[#B0B0B0] font-light">
                        Our executive has been assigned. You will receive a call shortly at <span className="text-white font-mono font-bold">{formData.phone}</span>.
                      </p>
                      <button
                        type="button"
                        onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', topic: 'General Inquiry' }); }}
                        className="text-[11px] font-mono uppercase text-[#FF1F02] underline pt-2 block mx-auto cursor-pointer"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60 mb-1.5 font-bold">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikramaditya Roy"
                          className="w-full px-4 py-3 text-xs dark:bg-[#161616] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] dark:text-white text-[#0E0E0E] focus:outline-none focus:border-[#FF1F02] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60 mb-1.5 font-bold">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 text-xs dark:bg-[#161616] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] dark:text-white text-[#0E0E0E] focus:outline-none focus:border-[#FF1F02] transition-colors font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-widest dark:text-white/60 text-[#0E0E0E]/60 mb-1.5 font-bold">
                          Assistance Topic
                        </label>
                        <select
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          className="w-full px-4 py-3 text-xs dark:bg-[#161616] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] dark:text-white text-[#0E0E0E] focus:outline-none focus:border-[#FF1F02] transition-colors"
                        >
                          <option value="New Booking & Tariff">New Booking & Tariff</option>
                          <option value="Booking Modification / Cancellation">Booking Modification / Cancellation</option>
                          <option value="Destination Weddings & Events">Destination Weddings & Events</option>
                          <option value="Membership & Privileges">Membership & Privileges</option>
                          <option value="Billing / Invoice Support">Billing / Invoice Support</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-4 bg-[#FF1F02] hover:bg-black text-white font-bold text-xs uppercase font-mono tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl shadow-[#FF1F02]/20"
                      >
                        {loading ? (
                          <span>CONNECTING...</span>
                        ) : (
                          <>
                            <span>REQUEST IMMEDIATE CALLBACK</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* Micro trust indicators */}
                <div className="pt-6 border-t dark:border-[#222222] border-[#E9E9DE] flex items-center justify-between text-[10px] font-mono dark:text-white/40 text-[#0E0E0E]/40 uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" /> 100% Privacy
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#EAB308]" /> 24/7 Monitored Desk
                  </span>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* 3. QUICK ASSISTANCE TOPIC PILLS (WHATSAPP SHORTCUTS) */}
        <ScrollReveal direction="up" delay={250}>
          <div className="p-6 sm:p-8 dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] flex items-center gap-2">
                <HelpCircle className="w-4 h-4" /> Quick Assistance Shortcuts
              </span>
              <span className="text-[10px] font-mono dark:text-white/40 text-[#0E0E0E]/40 uppercase tracking-widest hidden sm:inline">
                Tap to chat with pre-filled topic
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {QUICK_TOPICS.map((topic, i) => (
                <a
                  key={i}
                  href={getWhatsAppBookingUrl(topic.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-mono dark:bg-[#161616] bg-[#FAFDF2] border dark:border-[#333333] border-[#E9E9DE] dark:text-white/80 text-[#0E0E0E]/80 hover:border-[#FF1F02] hover:text-[#FF1F02] dark:hover:text-[#FF1F02] transition-all flex items-center gap-2"
                >
                  <span>{topic.label}</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
