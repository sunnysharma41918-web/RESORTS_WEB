import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Sparkles, Flame, Tag, Eye, EyeOff, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { storage } from '../../../services/storage';
import { settingsService } from '../../../services/settingsService';
import { useToast } from '../../../components/admin/ToastNotification';

const BADGE_COLORS = [
  { label: 'Forest Green', value: 'bg-[#134E39] text-white' },
  { label: 'Mint Green', value: 'bg-[#34D399] text-[#08281E]' },
  { label: 'Royal Amber', value: 'bg-[#F59E0B] text-white' },
  { label: 'Sky Blue', value: 'bg-[#38BDF8] text-[#0C4A6E]' },
  { label: 'Rose Red', value: 'bg-[#E11D48] text-white' },
];

export default function AdminTickerCMS() {
  const { addToast } = useToast();
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState({
    badge: 'FESTIVAL SPECIAL',
    badgeColor: 'bg-[#134E39] text-white',
    text: '',
    link: '/offers',
    isActive: true,
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await settingsService.getTickerOffers();
    setItems(data || []);
  };

  const handleToggleActive = async (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    setItems(updated);
    await settingsService.updateTickerOffers(updated);
    addToast('Ticker announcement status updated.');
  };

  const handleDelete = async (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    await settingsService.updateTickerOffers(updated);
    addToast('Announcement removed from marquee scroller.');
  };

  const handleMove = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);
    await settingsService.updateTickerOffers(newItems);
  };

  const handleAddItem = async (e) => {
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
    await settingsService.updateTickerOffers(updated);
    setEditingItem({
      badge: 'FESTIVAL SPECIAL',
      badgeColor: 'bg-[#134E39] text-white',
      text: '',
      link: '/offers',
      isActive: true,
    });
    addToast('New announcement added to live public marquee.');
  };

  return (
    <div className="space-y-6 select-none font-manrope text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Marquee Ticker CMS
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
            Manage live sliding discounts, promo codes, and festival announcements shown at the top of the website.
          </p>
        </div>
      </div>

      {/* Live Preview Box */}
      <div className="bg-white border border-[#E5EAE7] p-5 rounded-2xl shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#134E39] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
            <span>Live Marquee Preview</span>
          </span>
          <span className="text-[10px] text-gray-400 font-medium">
            Active Items: {items.filter((i) => i.isActive).length} / {items.length}
          </span>
        </div>

        <div className="bg-[#F4F6F5] border border-gray-200/80 p-3 rounded-xl overflow-x-auto flex items-center gap-6 text-xs text-[#111827]">
          {items.filter((i) => i.isActive).length === 0 ? (
            <span className="text-xs text-gray-400 italic">No active announcements currently displaying.</span>
          ) : (
            items.filter((i) => i.isActive).map((item) => (
              <div key={item.id} className="inline-flex items-center gap-2 shrink-0">
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shadow-2xs ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <span className="text-xs font-semibold text-gray-800">{item.text}</span>
                <span className="text-gray-300 pl-2">✦</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add New Announcement Form */}
      <form onSubmit={handleAddItem} className="bg-white border border-[#E5EAE7] p-6 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <Plus className="w-4 h-4 text-[#134E39]" />
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Add New Announcement
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-4 space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block">Badge Label</label>
            <input
              type="text"
              required
              placeholder="e.g. DIWALI SPECIAL / 40% OFF"
              value={editingItem.badge}
              onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F6F5] focus:bg-white text-[#111827] text-xs border border-transparent focus:border-[#134E39] outline-none rounded-xl"
            />
          </div>

          <div className="sm:col-span-4 space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block">Badge Theme</label>
            <select
              value={editingItem.badgeColor}
              onChange={(e) => setEditingItem({ ...editingItem, badgeColor: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F6F5] focus:bg-white text-[#111827] text-xs border border-transparent focus:border-[#134E39] outline-none rounded-xl"
            >
              {BADGE_COLORS.map((col) => (
                <option key={col.value} value={col.value}>
                  {col.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-4 space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block">Target Page Link</label>
            <input
              type="text"
              placeholder="/offers"
              value={editingItem.link}
              onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F6F5] focus:bg-white text-[#111827] text-xs border border-transparent focus:border-[#134E39] outline-none rounded-xl"
            />
          </div>

          <div className="sm:col-span-12 space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block">Announcement Text & Benefit</label>
            <input
              type="text"
              required
              placeholder="e.g. Complimentary Luxury Airport Transfers & Free Spa Session on 2+ Nights Reservation"
              value={editingItem.text}
              onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-[#F4F6F5] focus:bg-white text-[#111827] text-xs border border-transparent focus:border-[#134E39] outline-none rounded-xl"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#134E39] hover:bg-[#0E3C2B] text-white font-semibold text-xs rounded-full transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Publish to Marquee</span>
        </button>
      </form>

      {/* Announcements List Table */}
      <div className="bg-white border border-[#E5EAE7] rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Current Marquee Announcements ({items.length})
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                item.isActive ? 'bg-white' : 'bg-[#F9FAFB] opacity-60'
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shrink-0 shadow-2xs ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-bold text-[#111827] truncate">{item.text}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Link: {item.link}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {/* Reorder Up/Down */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, -1)}
                  className="p-2 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-30 border border-gray-200 rounded-lg cursor-pointer shadow-2xs"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === items.length - 1}
                  onClick={() => handleMove(idx, 1)}
                  className="p-2 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-30 border border-gray-200 rounded-lg cursor-pointer shadow-2xs"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                {/* Toggle Active */}
                <button
                  type="button"
                  onClick={() => handleToggleActive(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border cursor-pointer ${
                    item.isActive
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : 'bg-gray-100 border-gray-300 text-gray-500'
                  }`}
                >
                  {item.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{item.isActive ? 'Active' : 'Paused'}</span>
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-300 text-gray-500 hover:text-red-600 rounded-lg transition-colors cursor-pointer shadow-2xs"
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
