import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Upload,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Eye,
  RefreshCw,
  Search,
  Filter,
  ToggleLeft,
  ToggleRight,
  Database,
  Layers,
  Sparkles,
  Shield,
  X,
} from 'lucide-react';
import knowledgeBaseService from '../../../services/knowledgeBaseService';
import AdminTable from '../../../components/admin/AdminTable';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { useToast } from '../../../components/admin/ToastNotification';

export default function AdminKnowledgeBase() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalChunks, setTotalChunks] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'general',
    destination: '',
    visibility: 'public',
    file: null,
  });

  const [textForm, setTextForm] = useState({
    title: '',
    category: 'general',
    destination: '',
    visibility: 'public',
    content: '',
  });

  const { addToast } = useToast();

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await knowledgeBaseService.getDocuments();
      setDocuments(data || []);
      const chunksSum = (data || []).reduce((acc, curr) => acc + (curr.chunksCount || 0), 0);
      setTotalChunks(chunksSum);
    } catch (err) {
      addToast('Failed to load knowledge documents', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
    const interval = setInterval(loadDocuments, 15000); // Poll status updates
    return () => clearInterval(interval);
  }, []);

  const handleToggleActive = async (id) => {
    try {
      const res = await knowledgeBaseService.toggleActive(id);
      addToast(res.message || 'Updated status successfully.');
      loadDocuments();
    } catch (err) {
      addToast(err.message || 'Failed to toggle status', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await knowledgeBaseService.deleteDocument(deleteTarget.id || deleteTarget._id);
      addToast('Knowledge document and vector embeddings removed.');
      setDeleteTarget(null);
      if (selectedDoc && (selectedDoc._id === deleteTarget._id || selectedDoc.id === deleteTarget.id)) {
        setSelectedDoc(null);
      }
      loadDocuments();
    } catch (err) {
      addToast(err.message || 'Failed to delete document', 'error');
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadForm.file || !uploadForm.title.trim()) {
      addToast('Please provide a document title and select a file', 'error');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('title', uploadForm.title);
    formData.append('category', uploadForm.category);
    formData.append('destination', uploadForm.destination);
    formData.append('visibility', uploadForm.visibility);
    formData.append('file', uploadForm.file);

    try {
      await knowledgeBaseService.uploadDocument(formData);
      addToast('Document uploaded and queued for AI vector ingestion! 🚀');
      setIsUploadModalOpen(false);
      setUploadForm({ title: '', category: 'general', destination: '', visibility: 'public', file: null });
      loadDocuments();
    } catch (err) {
      addToast(err.message || 'Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!textForm.title.trim() || !textForm.content.trim()) {
      addToast('Please fill in title and knowledge content', 'error');
      return;
    }

    setUploading(true);
    try {
      await knowledgeBaseService.createTextKnowledge(textForm);
      addToast('Knowledge entry created and queued for vector embedding! ✨');
      setIsTextModalOpen(false);
      setTextForm({ title: '', category: 'general', destination: '', visibility: 'public', content: '' });
      loadDocuments();
    } catch (err) {
      addToast(err.message || 'Creation failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleViewDoc = async (doc) => {
    try {
      const res = await knowledgeBaseService.getDocumentById(doc._id || doc.id);
      setSelectedDoc(res?.data || doc);
    } catch (err) {
      setSelectedDoc(doc);
    }
  };

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      if (categoryFilter !== 'all' && doc.category !== categoryFilter) return false;
      if (statusFilter !== 'all' && doc.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (doc.title || '').toLowerCase().includes(q);
        const matchDest = (doc.destination || '').toLowerCase().includes(q);
        const matchFile = (doc.originalFilename || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDest && !matchFile) return false;
      }
      return true;
    });
  }, [documents, categoryFilter, statusFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = documents.length;
    const ready = documents.filter((d) => d.status === 'READY').length;
    const processing = documents.filter((d) => d.status === 'PROCESSING' || d.status === 'UPLOADING').length;
    const failed = documents.filter((d) => d.status === 'FAILED').length;
    const activeInRAG = documents.filter((d) => d.isActive && d.status === 'READY').length;
    return { total, ready, processing, failed, activeInRAG };
  }, [documents]);

  const columns = [
    {
      header: 'Knowledge Item',
      key: 'title',
      render: (doc) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-[#111827]">{doc.title}</span>
            <span className="text-[9px] font-semibold px-1.5 py-0.5 bg-[#F4F6F5] text-gray-700 rounded uppercase">
              {doc.fileType}
            </span>
          </div>
          {doc.originalFilename && (
            <div className="text-[11px] text-gray-500 flex items-center space-x-1">
              <FileText className="w-3 h-3 text-[#134E39]" />
              <span>{doc.originalFilename}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Category & Destination',
      key: 'category',
      render: (doc) => (
        <div className="space-y-1">
          <span className="inline-block px-2 py-0.5 bg-[#EBF5EE] text-[#134E39] text-xs font-semibold rounded-md">
            {doc.category}
          </span>
          {doc.destination && (
            <div className="text-[11px] text-gray-500 font-semibold">
              📍 {doc.destination}
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Status & Chunks',
      key: 'status',
      render: (doc) => {
        let statusBadge = null;
        if (doc.status === 'READY') {
          statusBadge = (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold rounded-full">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>READY</span>
            </span>
          );
        } else if (doc.status === 'PROCESSING' || doc.status === 'UPLOADING') {
          statusBadge = (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold rounded-full animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin text-amber-600" />
              <span>{doc.status}</span>
            </span>
          );
        } else {
          statusBadge = (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 text-[10px] font-semibold rounded-full">
              <AlertCircle className="w-3 h-3 text-red-600" />
              <span>FAILED</span>
            </span>
          );
        }

        return (
          <div className="space-y-1">
            {statusBadge}
            <div className="text-[10px] text-gray-400">
              {doc.chunksCount || 0} Chunks (v{doc.version || 1})
            </div>
          </div>
        );
      },
    },
    {
      header: 'RAG Retrieval',
      key: 'isActive',
      render: (doc) => (
        <button
          onClick={() => handleToggleActive(doc._id || doc.id)}
          className={`flex items-center space-x-1.5 px-2.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer border ${
            doc.isActive
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'bg-gray-100 border-gray-300 text-gray-500'
          }`}
        >
          {doc.isActive ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-gray-400" />}
          <span>{doc.isActive ? 'Active' : 'Disabled'}</span>
        </button>
      ),
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (doc) => (
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => handleViewDoc(doc)}
            className="p-1.5 bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#134E39] text-gray-600 hover:text-[#134E39] rounded-lg shadow-2xs transition-all cursor-pointer"
            title="View Details & Chunks"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeleteTarget(doc)}
            className="p-1.5 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-300 text-gray-500 hover:text-red-600 rounded-lg shadow-2xs transition-all cursor-pointer"
            title="Delete Document"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6 select-none font-manrope text-[#111827]">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            AI Concierge Knowledge Base (RAG)
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
            Manage packages, itineraries, FAQs, and resort policies for the guest travel assistant.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsTextModalOpen(true)}
            className="px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-full transition-all flex items-center space-x-2 cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4 text-[#134E39]" />
            <span>Add Text</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-5 py-2.5 bg-[#134E39] hover:bg-[#0E3C2B] text-white text-xs font-semibold rounded-full transition-all flex items-center space-x-2 cursor-pointer shadow-xs"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Telemetry Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-[#E5EAE7] rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Total Documents</span>
            <BookOpen className="w-4 h-4 text-[#134E39]" />
          </div>
          <div className="text-2xl font-extrabold text-[#111827]">{stats.total}</div>
          <div className="text-[10px] text-gray-400">{totalChunks} Embeddings in Vector Store</div>
        </div>

        <div className="p-5 bg-white border border-emerald-200/80 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-semibold">Active In RAG</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700">{stats.activeInRAG}</div>
          <div className="text-[10px] text-emerald-600">Live in Guest Chat Grounding</div>
        </div>

        <div className="p-5 bg-white border border-amber-200/80 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-semibold">Processing</span>
            <RefreshCw className={`w-4 h-4 text-amber-600 ${stats.processing > 0 ? 'animate-spin' : ''}`} />
          </div>
          <div className="text-2xl font-extrabold text-amber-700">{stats.processing}</div>
          <div className="text-[10px] text-amber-600">Vectorizing</div>
        </div>

        <div className="p-5 bg-white border border-red-200/80 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-red-600">
            <span className="text-xs font-semibold">Failed</span>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-extrabold text-red-700">{stats.failed}</div>
          <div className="text-[10px] text-red-500">Requires Re-upload</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5EAE7] shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents, destinations, filenames..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-[#111827] text-xs placeholder:text-gray-400 rounded-xl outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3.5 py-2 bg-[#F4F6F5] border border-transparent focus:border-[#134E39] text-[#111827] text-xs font-semibold rounded-xl outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="packages">Packages & Deals</option>
            <option value="destinations">Destinations</option>
            <option value="itineraries">Itineraries & Tours</option>
            <option value="policies">Policies & Terms</option>
            <option value="faq">FAQ</option>
            <option value="hotels">Hotels & Villas</option>
            <option value="general">General</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-[#F4F6F5] border border-transparent focus:border-[#134E39] text-[#111827] text-xs font-semibold rounded-xl outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="READY">Ready</option>
            <option value="PROCESSING">Processing</option>
            <option value="FAILED">Failed</option>
          </select>

          <button
            onClick={loadDocuments}
            className="p-2 bg-[#F4F6F5] hover:bg-gray-200 border border-gray-200 rounded-xl text-gray-700 transition-all cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <AdminTable
        columns={columns}
        data={filteredDocs}
        loading={loading}
        emptyMessage="No knowledge documents found. Click 'Upload Document' or 'Add Text' to expand chatbot intelligence."
      />

      {/* Upload File Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-gray-100 max-w-lg w-full p-6 space-y-5 shadow-2xl rounded-3xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-[#134E39]" />
                <h3 className="text-base font-bold text-[#111827]">Upload Knowledge File</h3>
              </div>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kashmir 5N/6D Tour Guide & Pricing"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-[#111827] text-xs rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F4F6F5] border border-transparent focus:border-[#134E39] text-[#111827] text-xs rounded-xl outline-none"
                  >
                    <option value="packages">Packages</option>
                    <option value="destinations">Destinations</option>
                    <option value="itineraries">Itineraries</option>
                    <option value="policies">Policies</option>
                    <option value="faq">FAQ</option>
                    <option value="hotels">Hotels</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Destination (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kashmir, Manali"
                    value={uploadForm.destination}
                    onChange={(e) => setUploadForm({ ...uploadForm, destination: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-[#111827] text-xs rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Select Document (PDF, DOCX, TXT, CSV) *
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.docx,.txt,.csv"
                  onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files[0] })}
                  className="w-full px-3 py-2 bg-[#F4F6F5] border border-gray-200 text-gray-700 text-xs rounded-xl"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2.5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 bg-[#134E39] hover:bg-[#0E3C2B] text-white text-xs font-semibold rounded-full transition-all disabled:opacity-50 flex items-center space-x-2"
                >
                  {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>{uploading ? 'Processing...' : 'Upload & Vectorize'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Direct Text Knowledge Modal */}
      {isTextModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-gray-100 max-w-xl w-full p-6 space-y-5 shadow-2xl rounded-3xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#134E39]" />
                <h3 className="text-base font-bold text-[#111827]">Add Direct Knowledge Text</h3>
              </div>
              <button onClick={() => setIsTextModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTextSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Knowledge Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Manali Package Details & Inclusions"
                  value={textForm.title}
                  onChange={(e) => setTextForm({ ...textForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-[#111827] text-xs rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={textForm.category}
                    onChange={(e) => setTextForm({ ...textForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F4F6F5] border border-transparent focus:border-[#134E39] text-[#111827] text-xs rounded-xl outline-none"
                  >
                    <option value="packages">Packages</option>
                    <option value="destinations">Destinations</option>
                    <option value="itineraries">Itineraries</option>
                    <option value="policies">Policies</option>
                    <option value="faq">FAQ</option>
                    <option value="hotels">Hotels</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Manali, Goa"
                    value={textForm.destination}
                    onChange={(e) => setTextForm({ ...textForm, destination: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-[#111827] text-xs rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Knowledge Content / Notes *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Paste package itineraries, FAQs, inclusions, pricing details, or policies here..."
                  value={textForm.content}
                  onChange={(e) => setTextForm({ ...textForm, content: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F4F6F5] focus:bg-white border border-transparent focus:border-[#134E39] text-[#111827] text-xs rounded-xl outline-none resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2.5 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsTextModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 bg-[#134E39] hover:bg-[#0E3C2B] text-white text-xs font-semibold rounded-full transition-all disabled:opacity-50 flex items-center space-x-2"
                >
                  {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span>{uploading ? 'Embedding...' : 'Save & Vectorize'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Details Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white border border-gray-100 max-w-2xl w-full p-6 space-y-4 shadow-2xl rounded-3xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#134E39] uppercase tracking-wider">
                  Document Vector Details
                </span>
                <h3 className="text-base font-bold text-[#111827]">{selectedDoc.title}</h3>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-[#F4F6F5] rounded-xl text-gray-700">
                <div>
                  <span className="text-gray-400 block text-[10px]">Category</span>
                  <span className="font-bold">{selectedDoc.category}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Destination</span>
                  <span className="font-bold text-[#134E39]">{selectedDoc.destination || 'Global'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Status</span>
                  <span className="font-bold text-emerald-700">{selectedDoc.status}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Chunks Count</span>
                  <span className="font-bold">{selectedDoc.chunksCount || 0}</span>
                </div>
              </div>

              {selectedDoc.rawContent && (
                <div className="space-y-1">
                  <span className="text-gray-500 font-semibold block">Raw Content Snapshot:</span>
                  <div className="p-3 bg-[#F4F6F5] rounded-xl text-gray-700 whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
                    {selectedDoc.rawContent}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-3 flex justify-end">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-full"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Remove Knowledge Document?"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? All associated vector embeddings will be erased from RAG retrieval.`}
        confirmText="Delete Knowledge"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        danger={true}
      />
    </div>
  );
}
