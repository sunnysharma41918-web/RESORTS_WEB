import React, { useState, useEffect, useMemo } from 'react';
import { Mail, Phone, Trash2, MapPin, Sparkles, MessageSquare, Eye, Calendar, Users, Building2, Clock, CheckCircle2, X } from 'lucide-react';
import { inquiryService } from '../../../services/inquiryService';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { useToast } from '../../../components/admin/ToastNotification';
import { getWhatsAppBookingUrl } from '../../../data/contact';

export default function AdminInquiriesList() {
  const [inquiries, setInquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addToast } = useToast();

  const loadInquiries = async () => {
    const data = await inquiryService.getInquiries();
    setInquiries(data);
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await inquiryService.updateInquiryStatus(id, newStatus);
    addToast(`Inquiry status updated to ${newStatus}.`);
    loadInquiries();
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await inquiryService.deleteInquiry(deleteTarget.id);
    addToast('Inquiry removed.');
    setDeleteTarget(null);
    if (selectedInquiry && selectedInquiry.id === deleteTarget.id) {
      setSelectedInquiry(null);
    }
    loadInquiries();
  };

  // Filtered dataset based on tab
  const filteredInquiries = useMemo(() => {
    if (statusFilter === 'all') return inquiries;
    return inquiries.filter((inq) => (inq.status || 'new') === statusFilter);
  }, [inquiries, statusFilter]);

  // Counts
  const counts = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => (i.status || 'new') === 'new').length;
    const inProgress = inquiries.filter((i) => i.status === 'in-progress').length;
    const resolved = inquiries.filter((i) => i.status === 'resolved').length;
    return { total, newCount, inProgress, resolved };
  }, [inquiries]);

  const columns = [
    {
      header: 'Host & Origin',
      key: 'guestName',
      render: (inq) => (
        <div className="space-y-1">
          <div className="text-sm text-white font-bold">{inq.guestName}</div>
          {inq.city && (
            <div className="text-[11px] text-[#A0A0A0] font-mono">
              📍 {inq.city}
            </div>
          )}
          <div className="text-[10px] text-[#888888] font-mono">
            {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
          </div>
        </div>
      ),
    },
    {
      header: 'Celebration & Budget',
      key: 'property',
      render: (inq) => (
        <div className="space-y-1.5">
          <div className="text-xs text-white font-bold uppercase tracking-tight">
            {inq.property || 'Celebration Booking'}
          </div>
          {inq.budget ? (
            <span className="inline-block px-2 py-0.5 bg-[#FF1F02]/15 border border-[#FF1F02]/50 text-[#FF1F02] text-[10px] font-mono font-bold tracking-wider">
              💰 {inq.budget}
            </span>
          ) : (
            <span className="text-[10px] text-[#888888] font-mono">Standard Inquiry</span>
          )}
        </div>
      ),
    },
    {
      header: 'Direct Contact',
      key: 'email',
      render: (inq) => (
        <div className="space-y-1 text-xs text-[#D0D0D0]">
          <div className="flex items-center space-x-1.5">
            <Phone className="w-3 h-3 text-[#EAB308]" />
            <a href={`tel:${inq.phone}`} className="hover:text-white hover:underline font-mono font-bold">
              {inq.phone}
            </a>
          </div>
          {inq.email && inq.email !== 'N/A' && (
            <div className="flex items-center space-x-1.5">
              <Mail className="w-3 h-3 text-[#FF1F02]" />
              <a href={`mailto:${inq.email}`} className="hover:text-white hover:underline">
                {inq.email}
              </a>
            </div>
          )}
          {inq.preferredContact && (
            <div className="text-[10px] font-mono text-[#EAB308]">
              ⏰ {inq.preferredContact}
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Requirements / Lead Notes',
      key: 'message',
      render: (inq) => (
        <div className="max-w-xs md:max-w-md text-xs text-[#B0B0B0] leading-relaxed font-light line-clamp-2 hover:line-clamp-none transition-all">
          {inq.message || inq.itinerary || 'Bespoke celebration inquiry'}
        </div>
      ),
    },
    {
      header: 'Lead Status',
      key: 'status',
      render: (inq) => (
        <select
          value={inq.status || 'new'}
          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
          className={`px-3 py-1 text-[10px] uppercase font-mono tracking-widest font-bold border outline-none cursor-pointer ${
            inq.status === 'new'
              ? 'bg-[#FF1F02]/20 border-[#FF1F02] text-[#FF1F02] shadow-[0_0_10px_rgba(255,31,2,0.3)]'
              : inq.status === 'in-progress'
              ? 'bg-blue-950/40 border-blue-500/50 text-blue-300'
              : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
          }`}
        >
          <option value="new" className="bg-[#1C1C1C] text-white">● New Lead</option>
          <option value="in-progress" className="bg-[#1C1C1C] text-white">In Progress</option>
          <option value="resolved" className="bg-[#1C1C1C] text-white">Resolved</option>
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-8 select-none font-manrope text-white">
      
      {/* 1. SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#333333]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
            <span>EXECUTIVE CONCIERGE & CRM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            Celebration & Guest Inquiries
          </h1>
        </div>
      </div>

      {/* 2. STATS KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 bg-[#1C1C1C] border border-[#333333] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#A0A0A0] tracking-wider block">Total Leads</span>
          <span className="text-3xl font-mono font-extrabold text-white">{counts.total}</span>
        </div>

        <div className="p-5 bg-[#1C1C1C] border border-[#FF1F02]/40 space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#FF1F02] tracking-wider block font-bold">● New Actionable Leads</span>
          <span className="text-3xl font-mono font-extrabold text-[#FF1F02]">{counts.newCount}</span>
        </div>

        <div className="p-5 bg-[#1C1C1C] border border-blue-500/40 space-y-1">
          <span className="text-[10px] font-mono uppercase text-blue-400 tracking-wider block">In Progress</span>
          <span className="text-3xl font-mono font-extrabold text-blue-400">{counts.inProgress}</span>
        </div>

        <div className="p-5 bg-[#1C1C1C] border border-emerald-500/40 space-y-1">
          <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider block">Resolved / Closed</span>
          <span className="text-3xl font-mono font-extrabold text-emerald-400">{counts.resolved}</span>
        </div>
      </div>

      {/* 3. FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#333333] pb-3">
        {[
          { id: 'all', label: `All Leads (${counts.total})` },
          { id: 'new', label: `New Leads (${counts.newCount})` },
          { id: 'in-progress', label: `In Progress (${counts.inProgress})` },
          { id: 'resolved', label: `Resolved (${counts.resolved})` },
        ].map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#FF1F02] text-white font-bold shadow-md'
                  : 'bg-[#1C1C1C] border border-[#333333] text-[#D0D0D0] hover:border-[#FF1F02] hover:text-[#FF1F02]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. MAIN LEADS TABLE */}
      <AdminTable
        columns={columns}
        data={filteredInquiries}
        searchKey="guestName"
        searchPlaceholder="Search by host name..."
        actions={(inq) => (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedInquiry(inq)}
              className="p-2 border border-[#333333] text-[#D0D0D0] hover:text-white hover:border-white transition-colors cursor-pointer"
              title="Inspect Full Lead Details"
            >
              <Eye className="w-3.5 h-3.5 text-[#EAB308]" />
            </button>

            <button
              onClick={() => setDeleteTarget(inq)}
              className="p-2 border border-[#333333] text-[#888888] hover:text-[#FF1F02] hover:border-[#FF1F02] transition-colors cursor-pointer"
              title="Delete inquiry"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />

      {/* 5. LEAD DETAIL MODAL / DRAWER */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#1C1C1C] border border-[#333333] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-white">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 p-2 text-[#888888] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 border-b border-[#333333] pb-4">
              <span className="text-[10px] font-mono uppercase text-[#FF1F02] font-bold tracking-widest">
                LEAD SPECIFICATIONS & DETAILS
              </span>
              <h2 className="text-2xl font-extrabold uppercase text-white">
                {selectedInquiry.guestName}
              </h2>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-[#D0D0D0]">
                {selectedInquiry.city && <span>📍 {selectedInquiry.city}</span>}
                <span>• Submitted: {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString() : 'Recent'}</span>
              </div>
            </div>

            {/* Direct Action Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={getWhatsAppBookingUrl(`Hello ${selectedInquiry.guestName}, thank you for contacting Country Holidays Hotels & Resorts regarding ${selectedInquiry.property}. Our concierge team is happy to assist with your dates and banquet availability.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#FF1F02] hover:bg-white text-white hover:text-black font-bold text-xs uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${selectedInquiry.phone}`}
                className="py-3 px-4 bg-[#2A2A2A] hover:bg-[#333333] text-white border border-[#444444] font-bold text-xs uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#EAB308]" />
                <span>Call {selectedInquiry.phone}</span>
              </a>
            </div>

            {/* Lead Specifications Breakdown */}
            <div className="space-y-3 p-4 bg-black border border-[#333333] text-xs font-mono">
              <div className="text-[10px] font-bold uppercase text-[#FF1F02] tracking-wider pb-1 border-b border-[#222222]">
                EVENT PROFILE & PARAMETERS:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[#D0D0D0]">
                <div><strong className="text-white">Occasion / Property:</strong> {selectedInquiry.property}</div>
                <div><strong className="text-white">Estimated Budget:</strong> <span className="text-[#FF1F02] font-bold">{selectedInquiry.budget || 'Custom Quote'}</span></div>
                <div><strong className="text-white">Expected Guests:</strong> <span className="text-[#EAB308] font-bold">{selectedInquiry.guestCount || 'TBD'}</span></div>
                <div><strong className="text-white">Rooms / Suites:</strong> <span className="text-[#EAB308] font-bold">{selectedInquiry.roomCount || 'TBD'}</span></div>
                <div><strong className="text-white">Event Duration:</strong> {selectedInquiry.eventDuration || 'Flexible'}</div>
                <div><strong className="text-white">Event Date:</strong> {selectedInquiry.eventDate || 'Tentative / Flexible'}</div>
                <div><strong className="text-white">Host City:</strong> {selectedInquiry.city || 'India'}</div>
                <div><strong className="text-white">Preferred Callback:</strong> {selectedInquiry.preferredContact || 'WhatsApp Priority'}</div>
                <div><strong className="text-white">Email Address:</strong> {selectedInquiry.email || 'N/A'}</div>
                <div><strong className="text-white">Phone / WhatsApp:</strong> {selectedInquiry.phone}</div>
              </div>

              <div className="pt-2 border-t border-[#222222]">
                <strong className="text-white block mb-1">Full Summary / Special Notes & Concept Vision:</strong>
                <p className="text-[#A0A0A0] leading-relaxed whitespace-pre-wrap font-sans text-xs">
                  {selectedInquiry.message || 'No additional notes provided.'}
                </p>
              </div>
            </div>

            {/* Status Update & Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#333333]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#D0D0D0]">Change Status:</span>
                <select
                  value={selectedInquiry.status || 'new'}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                  className="px-3 py-1.5 text-xs font-mono uppercase font-bold bg-black border border-[#444444] text-white cursor-pointer"
                >
                  <option value="new">● New Lead</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-6 py-2 bg-[#333333] hover:bg-white text-white hover:text-black text-xs font-mono uppercase font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 6. DELETE CONFIRMATION DIALOG */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Guest Inquiry"
        message={`Delete inquiry record from ${deleteTarget?.guestName}?`}
      />
    </div>
  );
}

