import React from 'react';
import { RotateCcw, ArrowLeft, Clock, AlertCircle, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import EditorialHeritageStamp from '../../components/common/EditorialHeritageStamp';
import { CONTACT_INFO } from '../../data/contact';

export default function CancellationPolicy() {
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
            <RotateCcw className="w-4 h-4 text-[#FF1F02]" />
            <span>CANCELLATION & REFUND PROTOCOL</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FF1F02] block">
            Customer Assurance & Policies
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-art-trio">
            CANCELLATION & REFUND POLICY
          </h1>
          <p className="text-xs font-mono dark:text-white/40 text-[#0E0E0E]/40 uppercase tracking-widest">
            COUNTRY HOLIDAYS HOTELS and RESORTS PRIVATE LIMITED • Customer Protection Protocol
          </p>
        </div>

        {/* Main Content Body */}
        <div className="space-y-8 text-sm sm:text-base dark:text-[#D0D0D0] text-[#0E0E0E]/80 font-light leading-relaxed border-t dark:border-[#333333] border-[#E9E9DE] pt-8">
          
          {/* Principle Intro Box */}
          <div className="p-6 rounded-xl dark:bg-[#0E0E0E] bg-white border dark:border-[#333333] border-[#E9E9DE] shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-[#FF1F02] font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Liberal Customer Care Commitment</span>
            </div>
            <p className="font-normal dark:text-white text-[#0E0E0E] leading-relaxed">
              <strong className="text-[#FF1F02] font-bold">COUNTRY HOLIDAYS HOTELS and RESORTS PRIVATE LIMITED</strong> believes in helping its customers as far as possible, and has therefore established a liberal and transparent cancellation policy for all patrons, bookings, and curated orders.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold uppercase tracking-tight dark:text-white text-[#0E0E0E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02]" />
              <span>1. Immediate Cancellation Requests</span>
            </h3>
            <p className="pl-4 border-l-2 dark:border-[#333333] border-[#E9E9DE]">
              Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping or fulfilling them.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold uppercase tracking-tight dark:text-white text-[#0E0E0E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02]" />
              <span>2. Perishable Items & Bespoke Curations</span>
            </h3>
            <p className="pl-4 border-l-2 dark:border-[#333333] border-[#E9E9DE]">
              <strong>COUNTRY HOLIDAYS HOTELS and RESORTS PRIVATE LIMITED</strong> does not accept cancellation requests for perishable items like flowers, eatables, culinary platters, etc. However, a refund or replacement can be made if the customer establishes that the quality of the product delivered is not good or unsatisfactory.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold uppercase tracking-tight dark:text-white text-[#0E0E0E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02]" />
              <span>3. Damaged, Defective or Discrepant Deliveries (7-Day Reporting)</span>
            </h3>
            <div className="pl-4 border-l-2 dark:border-[#333333] border-[#E9E9DE] space-y-2">
              <p>
                In case of receipt of damaged or defective items, please report the same to our Customer Service team immediately. The request will, however, be entertained once the merchant has checked and determined the same at their own end. This must be reported within <strong>7 Days</strong> of receipt of the products.
              </p>
              <p>
                In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within <strong>7 Days</strong> of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold uppercase tracking-tight dark:text-white text-[#0E0E0E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02]" />
              <span>4. Manufacturer Warranty & Refund Timeline (16–30 Days)</span>
            </h3>
            <div className="pl-4 border-l-2 dark:border-[#333333] border-[#E9E9DE] space-y-2">
              <p>
                In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue directly to them.
              </p>
              <div className="p-4 rounded-lg bg-[#FAF6F0] dark:bg-[#14110E] border border-[#B38738]/25 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold dark:text-[#E8C97E] text-[#8F6B2E] mb-1 font-mono uppercase">
                  <Clock className="w-4 h-4" />
                  <span>Refund Processing Window</span>
                </div>
                <p>
                  In case of any Refunds approved by <strong>COUNTRY HOLIDAYS HOTELS and RESORTS PRIVATE LIMITED</strong>, it will take <strong>16-30 Days</strong> for the refund to be processed to the end customer via original payment mode or bank transfer.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Official Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold uppercase tracking-tight dark:text-white text-[#0E0E0E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF1F02]" />
              <span>5. Customer Support & Refund Assistance Desk</span>
            </h3>
            <div className="pl-4 border-l-2 dark:border-[#333333] border-[#E9E9DE] space-y-1.5 text-xs sm:text-sm">
              <p><strong>Merchant Legal Entity:</strong> {CONTACT_INFO.legalEntityName}</p>
              <p><strong>Registered & Operational Address:</strong> {CONTACT_INFO.address}</p>
              <p><strong>Telephone / WhatsApp:</strong> <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="text-[#FF1F02] hover:underline font-mono">{CONTACT_INFO.phone}</a></p>
              <p><strong>Official Customer Service Email:</strong> <a href={`mailto:${CONTACT_INFO.email}`} className="text-[#FF1F02] hover:underline font-mono">{CONTACT_INFO.email}</a></p>
              <p className="text-[11px] text-[#6E5D4F] dark:text-[#B8A89A] pt-1 font-mono">
                Support Hours: 24/7 Global Luxury Concierge & Customer Care Desk
              </p>
            </div>
          </div>

        </div>

        {/* Heritage Stamp Signoff */}
        <div className="pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t dark:border-[#333333] border-[#E9E9DE]">
          <div className="text-xs font-mono dark:text-white/60 text-[#0E0E0E]/60 space-y-1">
            <p className="font-bold dark:text-white text-[#0E0E0E]">{CONTACT_INFO.legalEntityName}</p>
            <p>{CONTACT_INFO.address}</p>
            <p>Tel: {CONTACT_INFO.phone} | Email: {CONTACT_INFO.email}</p>
          </div>
          <EditorialHeritageStamp size={90} centerText="CHHR" text="COUNTRY HOLIDAYS • CANCELLATION SEAL • " />
        </div>

      </Container>
    </div>
  );
}
