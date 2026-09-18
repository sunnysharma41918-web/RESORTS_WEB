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

  const filteredInquiries = useMemo(() => {
    if (statusFilter === 'all') return inquiries;
    return inquiries.filter((inq) => (inq.status || 'new') === statusFilter);
  }, [inquiries, statusFilter]);

  const counts = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => (i.status || 'new') === 'new').length;
    const inProgress = inquiries.filter((i) => i.status === 'in-progress').length;
    const resolved = inquiries.filter((i) => i.status === 'resolved').length;
    return { total, newCount, inProgress, resolved };
  }, [inquiries]);

  const columns = [
    {
      header: 'Guest / Lead',
      key: 'guestName',
      render: (inq) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-[#111827]">{inq.guestName}</span>
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[9px] font-semibold rounded-full">
              {inq.source || 'Web Lead'}
            </span>
          </div>
          {inq.city && (
            <div className="text-[11px] text-gray-500">
              📍 {inq.city}
            </div>
          )}
          <div className="text-[10px] text-gray-400">
            {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
          </div>
        </div>
      ),
    },
    {
      header: 'Property & Budget',
      key: 'property',
      render: (inq) => (
        <div className="space-y-1">
          <div className="text-xs text-[#111827] font-semibold">
            {inq.property || 'Stay / Package Booking'}
          </div>
          {inq.budget ? (
            <span className="inline-block px-2 py-0.5 bg-[#EBF5EE] text-[#134E39] text-[10px] font-semibold rounded-md">
              💰 {inq.budget}
            </span>
          ) : (
            <span className="text-[10px] text-gray-400">Standard Inquiry</span>
          )}
        </div>
      ),
    },
    {
      header: 'Contact Info',
      key: 'email',
      render: (inq) => (
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center space-x-1.5">
            <Phone className="w-3 h-3 text-[#134E39]" />
            <a href={`tel:${inq.phone}`} className="hover:text-[#134E39] hover:underline font-semibold text-[#111827]">
              {inq.phone}
            </a>
          </div>
          {inq.email && inq.email !== 'N/A' && (
            <div className="flex items-center space-x-1.5 text-gray-500">
              <Mail className="w-3 h-3 text-gray-400" />
              <a href={`mailto:${inq.email}`} className="hover:underline truncate max-w-[140px]">
                {inq.email}
              </a>
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Notes / Itinerary',
      key: 'message',
      render: (inq) => (
        <div className="max-w-xs md:max-w-md text-xs text-gray-500 leading-relaxed font-normal line-clamp-2">
          {inq.message || inq.itinerary || 'Bespoke resort booking inquiry'}
        </div>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (inq) => (
        <select
          value={inq.status || 'new'}
          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
          className={`px-3 py-1 text-[10px] font-semibold rounded-full border outline-none cursor-pointer ${
            inq.status === 'new'
              ? 'bg-red-50 border-red-200 text-red-700'
              : inq.status === 'in-progress'
              ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}
        >
          <option value="new">● New Lead</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-6 select-none font-manrope text-[#111827]">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Guest Inquiries CRM
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
            Manage incoming guest reservation requests and VIP concierge leads.
          </p>
        </div>
      </div>

      {/* 2. Stats KPI 4-Card Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-[#E5EAE7] rounded-2xl shadow-xs space-y-1">
          <span className="text-xs font-semibold text-gray-500 block">Total Leads</span>
          <span className="text-3xl font-extrabold text-[#111827] block">{counts.total}</span>
        </div>

        <div className="p-5 bg-white border border-red-200/80 rounded-2xl shadow-xs space-y-1">
          <span className="text-xs font-semibold text-red-600 block">● Actionable Leads</span>
          <span className="text-3xl font-extrabold text-red-600 block">{counts.newCount}</span>
        </div>

        <div className="p-5 bg-white border border-amber-200/80 rounded-2xl shadow-xs space-y-1">
          <span className="text-xs font-semibold text-amber-600 block">In Progress</span>
          <span className="text-3xl font-extrabold text-amber-600 block">{counts.inProgress}</span>
        </div>

        <div className="p-5 bg-white border border-emerald-200/80 rounded-2xl shadow-xs space-y-1">
          <span className="text-xs font-semibold text-emerald-600 block">Resolved / Closed</span>
          <span className="text-3xl font-extrabold text-emerald-600 block">{counts.resolved}</span>
        </div>
      </div>

      {/* 3. Filter Tabs */}
      <div className="flex items-center bg-white p-1.5 rounded-2xl border border-[#E5EAE7] shadow-xs gap-1.5 w-fit">
        {[
          { id: 'all', label: `All Leads (${counts.total})` },
          { id: 'new', label: `New (${counts.newCount})` },
          { id: 'in-progress', label: `In Progress (${counts.inProgress})` },
          { id: 'resolved', label: `Resolved (${counts.resolved})` },
        ].map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#134E39] text-white shadow-xs font-bold'
                  : 'text-gray-600 hover:text-[#111827] hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Table */}
      <AdminTable
        columns={columns}
        data={filteredInquiries}
        searchKey="guestName"
        searchPlaceholder="Search by host name..."
        actions={(inq) => (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedInquiry(inq)}
              className="p-2 border border-gray-200 hover:border-[#134E39] hover:bg-[#EBF5EE] text-gray-600 hover:text-[#134E39] transition-colors rounded-lg shadow-2xs cursor-pointer"
              title="Inspect Full Lead Details"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setDeleteTarget(inq)}
              className="p-2 border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors rounded-lg shadow-2xs cursor-pointer"
              title="Delete inquiry"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />

      {/* 5. Lead Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-100 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl rounded-3xl relative text-[#111827]">
            
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 border-b border-gray-100 pb-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#134E39]">
                Lead Specifications & Details
              </span>
              <h2 className="text-xl font-extrabold text-[#111827]">
                {selectedInquiry.guestName}
              </h2>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                {selectedInquiry.city && <span>📍 {selectedInquiry.city}</span>}
                <span>• Submitted: {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString() : 'Recent'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={getWhatsAppBookingUrl(`Hello ${selectedInquiry.guestName}, thank you for contacting Country Holidays Hotels & Resorts regarding ${selectedInquiry.property}. Our concierge team is happy to assist with your booking dates.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#134E39] hover:bg-[#0E3C2B] text-white font-semibold text-xs rounded-full flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${selectedInquiry.phone}`}
                className="py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold text-xs rounded-full flex items-center justify-center gap-2 shadow-2xs"
              >
                <Phone className="w-4 h-4 text-[#134E39]" />
                <span>Call {selectedInquiry.phone}</span>
              </a>
            </div>

            <div className="space-y-3 p-4 bg-[#F4F6F5] rounded-2xl text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-gray-700">
                <div><strong>Source:</strong> <span className="text-[#134E39] font-bold">{selectedInquiry.source || 'Website'}</span></div>
                <div><strong>Destination:</strong> <span className="font-bold">{selectedInquiry.destination || selectedInquiry.city || 'India'}</span></div>
                <div><strong>Property:</strong> {selectedInquiry.property}</div>
                <div><strong>Budget:</strong> <span className="font-bold text-[#134E39]">{selectedInquiry.budget || 'Custom Quote'}</span></div>
                <div><strong>Guests:</strong> {selectedInquiry.travellers || selectedInquiry.guestCount || 'TBD'}</div>
                <div><strong>Travel Date:</strong> {selectedInquiry.eventDate || 'Flexible'}</div>
                <div><strong>Email:</strong> {selectedInquiry.email || 'N/A'}</div>
                <div><strong>Phone:</strong> {selectedInquiry.phone}</div>
              </div>

              {selectedInquiry.conversationSummary && (
                <div className="pt-2 border-t border-gray-200">
                  <strong className="text-[#134E39] block mb-1">Inquiry Conversation / Details:</strong>
                  <div className="p-2.5 bg-white border border-gray-200 rounded-xl text-[11px] text-gray-600 max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {selectedInquiry.conversationSummary}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-gray-200">
                <strong className="block mb-1 text-gray-800">Special Notes:</strong>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message || 'No additional notes provided.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Status:</span>
                <select
                  value={selectedInquiry.status || 'new'}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#F4F6F5] border border-gray-200 outline-none"
                >
                  <option value="new">● New Lead</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-full transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

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
