import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Sparkles, Flame, Tag, Eye, EyeOff, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { storage } from '../../../services/storage';
import { useToast } from '../../../components/admin/ToastNotification';

const BADGE_COLORS = [
  { label: 'Vermilion Red', value: 'bg-[#FF1F02] text-white' },
  { label: 'Royal Amber Gold', value: 'bg-[#EAB308] text-black' },
  { label: 'Emerald Green', value: 'bg-[#16A34A] text-white' },
  { label: 'Electric Sky Blue', value: 'bg-[#32ACE3] text-black' },
  { label: 'Mystic Purple', value: 'bg-[#9333EA] text-white' },
];

export default function AdminTickerCMS() {
  const { addToast } = useToast();
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState({
    badge: 'FESTIVAL SPECIAL',
    badgeColor: 'bg-[#FF1F02] text-white',
    text: '',
    link: '/offers',
    isActive: true,
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    const data = storage.getTickerOffers();
    setItems(data || []);
  };

  const handleToggleActive = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    setItems(updated);
    storage.saveTickerOffers(updated);
    addToast('Ticker announcement status toggled.');
  };

  const handleDelete = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    storage.saveTickerOffers(updated);
    addToast('Announcement removed from marquee scroller.');
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);
    storage.saveTickerOffers(newItems);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!editingItem.text.trim()) return;

    const newItem = {
      id: `t-${Date.now()}`,
      badge: editingItem.badge.trim().toUpperCase(),
      badgeColor: editingItem.badgeColor,
      text: editingItem.text.trim(),
      link: editingItem.link.trim() || '/offers',
      isActive: true,
    };

    const updated = [newItem, ...items];
    setItems(updated);
    storage.saveTickerOffers(updated);
    setEditingItem({
      badge: 'FESTIVAL OFFER',
      badgeColor: 'bg-[#FF1F02] text-white',
      text: '',
      link: '/offers',
      isActive: true,
    });
    addToast('New announcement added to live public marquee scroller.');
  };

  return (
    <div className="space-y-8 select-none font-manrope">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#333333]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02] animate-pulse" />
            <span>TOP HEADER MARQUEE CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            Offers & Festival Announcements Ticker
          </h1>
          <p className="text-xs text-[#9E9EB3] font-light mt-1">
            Manage live sliding discounts, coupon codes, and festival announcements shown at the very top of the website.
          </p>
        </div>
      </div>

      {/* Live Preview Box */}
      <div className="bg-[#0E0E0E] border border-[#333333] p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#EAB308] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Marquee Preview</span>
          </span>
          <span className="text-[10px] font-mono text-white/50 uppercase">
            Active Items: {items.filter((i) => i.isActive).length} / {items.length}
          </span>
        </div>

        <div className="bg-[#0A0A0A] border border-white/10 p-3 overflow-x-auto flex items-center gap-6 text-xs text-white">
          {items.filter((i) => i.isActive).length === 0 ? (
            <span className="text-xs text-white/40 italic font-mono">No active announcements currently displaying.</span>
          ) : (
            items.filter((i) => i.isActive).map((item) => (
              <div key={item.id} className="inline-flex items-center gap-2 shrink-0">
                <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <span className="text-xs text-white/90">{item.text}</span>
                <span className="text-white/20 pl-2">✦</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add New Announcement Form */}
      <form onSubmit={handleAddItem} className="bg-[#0E0E0E] border border-[#333333] p-6 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-[#222222]">
          <Plus className="w-4 h-4 text-[#FF1F02]" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Add New Live Announcement / Offer
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-4 space-y-1.5">
            <label className="text-xs font-medium text-[#C8C8DC] block">Badge Title</label>
            <input
              type="text"
              required
              placeholder="e.g. DIWALI SPECIAL / 40% OFF"
              value={editingItem.badge}
              onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
              className="w-full px-3 py-2.5 bg-[#1C1C1C] text-white text-xs border border-[#333333] outline-none focus:border-[#FF1F02]"
            />
          </div>

          <div className="sm:col-span-4 space-y-1.5">
            <label className="text-xs font-medium text-[#C8C8DC] block">Badge Color Theme</label>
            <select
              value={editingItem.badgeColor}
              onChange={(e) => setEditingItem({ ...editingItem, badgeColor: e.target.value })}
              className="w-full px-3 py-2.5 bg-[#1C1C1C] text-white text-xs border border-[#333333] outline-none focus:border-[#FF1F02]"
            >
              {BADGE_COLORS.map((col) => (
                <option key={col.value} value={col.value}>
                  {col.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-4 space-y-1.5">
            <label className="text-xs font-medium text-[#C8C8DC] block">Target Link / Page</label>
            <input
              type="text"
              placeholder="/offers or /celebrations#inquiry"
              value={editingItem.link}
              onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
              className="w-full px-3 py-2.5 bg-[#1C1C1C] text-white text-xs border border-[#333333] outline-none focus:border-[#FF1F02]"
            />
          </div>

          <div className="sm:col-span-12 space-y-1.5">
            <label className="text-xs font-medium text-[#C8C8DC] block">Announcement Details & Text</label>
            <input
              type="text"
              required
              placeholder="e.g. Complimentary Luxury Airport Transfers & Free Spa Session on 2+ Nights Reservation"
              value={editingItem.text}
              onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
              className="w-full px-3 py-2.5 bg-[#1C1C1C] text-white text-xs border border-[#333333] outline-none focus:border-[#FF1F02]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#FF1F02] hover:bg-white text-white hover:text-black font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Publish to Top Marquee</span>
        </button>
      </form>

      {/* Announcements List Table */}
      <div className="bg-[#0E0E0E] border border-[#333333] overflow-hidden">
        <div className="p-4 border-b border-[#222222] flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Current Marquee Announcements ({items.length})
          </span>
        </div>

        <div className="divide-y divide-[#222222]">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                item.isActive ? 'bg-[#0E0E0E]' : 'bg-[#141414] opacity-60'
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 shrink-0 ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-semibold text-white truncate">{item.text}</p>
                  <p className="text-[11px] font-mono text-[#7C7C9E] mt-0.5">Link: {item.link}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {/* Reorder Up/Down */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, -1)}
                  className="p-1.5 bg-[#1C1C1C] hover:bg-[#2A2A2A] text-white disabled:opacity-30 border border-[#333333] cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === items.length - 1}
                  onClick={() => handleMove(idx, 1)}
                  className="p-1.5 bg-[#1C1C1C] hover:bg-[#2A2A2A] text-white disabled:opacity-30 border border-[#333333] cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Toggle Active */}
                <button
                  type="button"
                  onClick={() => handleToggleActive(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider border cursor-pointer ${
                    item.isActive
                      ? 'bg-green-950/60 border-green-600 text-green-300'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-400'
                  }`}
                >
                  {item.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{item.isActive ? 'Active' : 'Paused'}</span>
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 bg-red-950/40 hover:bg-red-900 border border-red-800 text-red-300 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
