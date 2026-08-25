import React, { useState, useEffect } from 'react';
import { Mail, Phone, Trash2, CheckCircle2, Clock, AlertCircle, MessageSquare } from 'lucide-react';
import { inquiryService } from '../../../services/inquiryService';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { useToast } from '../../../components/admin/ToastNotification';

export default function AdminInquiriesList() {
  const [inquiries, setInquiries] = useState([]);
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
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await inquiryService.deleteInquiry(deleteTarget.id);
    addToast('Inquiry removed.');
    setDeleteTarget(null);
    loadInquiries();
  };

  const columns = [
    {
      header: 'Guest & Destination',
      key: 'guestName',
      render: (inq) => (
        <div className="space-y-1">
          <div className="font-display text-sm text-white font-bold">{inq.guestName}</div>
          <div className="text-[11px] text-orange-400 uppercase tracking-wider font-semibold">{inq.property}</div>
        </div>
      ),
    },
    {
      header: 'Contact Info',
      key: 'email',
      render: (inq) => (
        <div className="space-y-1 text-xs text-luxury-muted">
          <div className="flex items-center space-x-1.5">
            <Mail className="w-3 h-3 text-orange-400" />
            <a href={`mailto:${inq.email}`} className="hover:text-white">
              {inq.email}
            </a>
          </div>
          <div className="flex items-center space-x-1.5">
            <Phone className="w-3 h-3 text-orange-400" />
            <a href={`tel:${inq.phone}`} className="hover:text-white">
              {inq.phone}
            </a>
          </div>
        </div>
      ),
    },
    {
      header: 'Itinerary / Message',
      key: 'message',
      render: (inq) => (
        <div className="max-w-xs md:max-w-md text-xs text-luxury-sand leading-relaxed font-light">
          {inq.message}
        </div>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (inq) => (
        <select
          value={inq.status}
          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
          className={`px-3 py-1 text-[10px] uppercase tracking-luxury font-bold rounded-full border outline-none cursor-pointer ${
            inq.status === 'new'
              ? 'bg-orange-500/20 border-orange-500/40 text-orange-400 shadow-[0_0_10px_rgba(255,107,0,0.3)]'
              : inq.status === 'in-progress'
              ? 'bg-blue-950/40 border-blue-500/40 text-blue-300'
              : 'bg-green-950/40 border-green-500/40 text-green-300'
          }`}
        >
          <option value="new" className="bg-luxury-stone text-white">New</option>
          <option value="in-progress" className="bg-luxury-stone text-white">In Progress</option>
          <option value="resolved" className="bg-luxury-stone text-white">Resolved</option>
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-8 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-luxury-border">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-orange-400 font-bold block mb-1">
            Guest Concierge Requests
          </span>
          <h1 className="text-3xl font-display font-bold text-white">Concierge Inquiries & Leads</h1>
        </div>
      </div>

      <AdminTable
        columns={columns}
        data={inquiries}
        searchKey="guestName"
        searchPlaceholder="Search by guest name..."
        actions={(inq) => (
          <button
            onClick={() => setDeleteTarget(inq)}
            className="p-2 rounded-xl border border-luxury-border text-luxury-muted hover:text-red-400 hover:border-red-400/50 transition-colors"
            title="Delete inquiry"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      />

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
