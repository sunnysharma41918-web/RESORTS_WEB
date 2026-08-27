import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';

export default function PrivacyPolicy() {
  return (
    <div className="w-full pt-32 pb-24 dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] min-h-screen font-manrope transition-colors duration-300">
      <Container className="max-w-4xl space-y-10">
        
        {/* Top Back Link & Badge */}
        <div className="flex items-center justify-between border-b dark:border-[#333333] border-[#E9E9DE] pb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF1F02] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] font-mono dark:text-white/50 text-[#0E0E0E]/50 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>CONFIDENTIALITY PROTOCOL</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF1F02] block">
            Legal & Privacy
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-art-trio">
            PRIVACY POLICY
          </h1>
          <p className="text-xs font-mono dark:text-white/40 text-[#0E0E0E]/40 uppercase tracking-widest">
            Last Updated: January 2026 • Country Holidays Hotels & Resorts (CHHR)
          </p>
        </div>

        {/* Main Content Body */}
        <div className="space-y-8 text-sm sm:text-base dark:text-[#D0D0D0] text-[#0E0E0E]/80 font-light leading-relaxed border-t dark:border-[#333333] border-[#E9E9DE] pt-8">
          <div className="p-6 dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] shadow-sm">
            <p className="font-normal dark:text-white text-[#0E0E0E] leading-relaxed">
              At <strong className="text-[#FF1F02] font-bold">CHHR (Country Holidays Hotels & Resorts)</strong>, the confidentiality and privacy of our guests is paramount. This Privacy Policy outlines our commitment to safeguarding all personal information collected through inquiries and reservations.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold uppercase tracking-tight dark:text-white text-[#0E0E0E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02]" />
              <span>1. Collection of Personal Details</span>
            </h3>
            <p className="pl-4 border-l-2 dark:border-[#333333] border-[#E9E9DE]">
              We collect personal details provided directly by you when you contact our concierge, including your name, contact phone number, email address, and tailored itinerary preferences.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold uppercase tracking-tight dark:text-white text-[#0E0E0E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02]" />
              <span>2. Concierge Use Only</span>
            </h3>
            <p className="pl-4 border-l-2 dark:border-[#333333] border-[#E9E9DE]">
              Your information is exclusively utilized to curate bespoke stays, provide airport transfers, and deliver personalized concierge services. We do not sell or monetize guest data to third parties.
            </p>
          </div>
        </div>

        {/* Heritage Stamp Signoff */}
        <div className="pt-10 flex items-center justify-between border-t dark:border-[#333333] border-[#E9E9DE]">
          <div className="text-xs font-mono dark:text-white/60 text-[#0E0E0E]/60 space-y-1">
            <p className="font-bold dark:text-white text-[#0E0E0E]">CHHR Privacy Desk</p>
            <p>111, Rajiv Gandhi Salai, OMR, Kottivakkam, Chennai, Tamil Nadu 600041</p>
          </div>
          <EditorialHeritageStamp size={90} centerText="CHHR" text="COUNTRY HOLIDAYS • PRIVACY SEAL • " />
        </div>

      </Container>
    </div>
  );
}
