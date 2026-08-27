import React, { useState, useEffect } from 'react';
import { settingsService } from '../../../services/settingsService';
import { storage } from '../../../services/storage';
import { FormField, FormInput, FormTextarea } from '../../../components/admin/AdminFormField';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { useToast } from '../../../components/admin/ToastNotification';
import { RotateCcw, Save, Sparkles, Sliders } from 'lucide-react';

export default function AdminSettings() {
  const { addToast } = useToast();
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const [settings, setSettings] = useState({
    siteName: 'Country Holidays Travel Resorts',
    tagline: 'Sanctuaries of Distinction & Wonder',
    description: 'An international collection of world-class architectural resorts, tranquil nature escapes, and boutique hotels.',
    phone: '+91 98765 43210',
    phoneRaw: '+919876543210',
    whatsapp: '+919876543210',
    whatsappMessage: 'Hello Country Holidays Concierge, I would like to enquire about your luxury stays.',
    email: 'concierge@countryholidays-resorts.com',
    enquiriesEmail: 'reservations@countryholidays-resorts.com',
    address: '111, Rajiv Gandhi Salai, OMR, Kottivakkam, Chennai, Tamil Nadu 600041',
    hours: '24/7 Global Luxury Concierge',
  });

  useEffect(() => {
    async function load() {
      const data = await settingsService.getSettings();
      if (data) {
        setSettings({
          siteName: data.siteConfig?.name || 'Country Holidays Travel Resorts',
          tagline: data.siteConfig?.tagline || '',
          description: data.siteConfig?.description || '',
          phone: data.contactInfo?.phone || '',
          phoneRaw: data.contactInfo?.phoneRaw || '',
          whatsapp: data.contactInfo?.whatsapp || '',
          whatsappMessage: data.contactInfo?.whatsappMessage || '',
          email: data.contactInfo?.email || '',
          enquiriesEmail: data.contactInfo?.enquiriesEmail || '',
          address: data.contactInfo?.address || '',
          hours: data.contactInfo?.hours || '',
        });
      }
    }
    load();
  }, []);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      siteConfig: {
        name: settings.siteName,
        tagline: settings.tagline,
        description: settings.description,
        url: 'https://countryholidays-resorts.example.com',
        author: 'Country Holidays Travel Resorts Group',
      },
      contactInfo: {
        companyName: 'Country Holidays Travel Resorts Group',
        phone: settings.phone,
        phoneRaw: settings.phoneRaw || settings.phone.replace(/[^\d+]/g, ''),
        whatsapp: settings.whatsapp,
        whatsappMessage: settings.whatsappMessage,
        email: settings.email,
        enquiriesEmail: settings.enquiriesEmail,
        address: settings.address,
        hours: settings.hours,
        socials: {
          instagram: 'https://instagram.com',
          facebook: 'https://facebook.com',
          linkedin: 'https://linkedin.com',
          pinterest: 'https://pinterest.com',
        },
      },
    };

    await settingsService.updateSettings(payload);
    addToast('Site configuration updated successfully. Public website updated.');
  };

  const handleReset = () => {
    storage.resetAllToDefault();
    addToast('All collections and settings restored to default seeds.');
    window.location.reload();
  };

  return (
    <form onSubmit={handleSave} className="space-y-10 max-w-6xl select-none font-manrope">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#333333]">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF1F02] mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1F02]" />
            <span>GLOBAL SYSTEM CONTROLS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            Website CMS Settings
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsResetDialogOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#1C1C1C] hover:bg-[#2A2A2A] border border-[#333333] text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Reset Demo Seeds</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#FF1F02] hover:bg-white text-white hover:text-[#0E0E0E] font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Brand & Editorial Copy */}
        <div className="bg-[#0E0E0E] border border-[#333333] p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-[#222222]">
            <Sliders className="w-4 h-4 text-[#FF1F02]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Brand Identity & SEO
            </h3>
          </div>

          <FormField label="Brand Name" required>
            <FormInput
              required
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
            />
          </FormField>

          <FormField label="Header Tagline" required>
            <FormInput
              required
              value={settings.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
            />
          </FormField>

          <FormField label="Global Meta Description" required>
            <FormTextarea
              rows={4}
              required
              value={settings.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </FormField>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="bg-[#0E0E0E] border border-[#333333] p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-[#222222]">
            <Sparkles className="w-4 h-4 text-[#EAB308]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Global Concierge Contact
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Display Phone" required>
              <FormInput
                required
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </FormField>

            <FormField label="Raw Phone (tel:)" helperText="Digits with country code">
              <FormInput
                value={settings.phoneRaw}
                onChange={(e) => handleChange('phoneRaw', e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="WhatsApp Direct" required>
              <FormInput
                required
                value={settings.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
              />
            </FormField>

            <FormField label="Concierge Email" required>
              <FormInput
                type="email"
                required
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </FormField>
          </div>

          <FormField label="Physical Pavilion Address" required>
            <FormTextarea
              rows={2}
              required
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </FormField>

          <FormField label="Operating Hours">
            <FormInput
              value={settings.hours}
              onChange={(e) => handleChange('hours', e.target.value)}
            />
          </FormField>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
        onConfirm={handleReset}
        title="Reset All CMS Collections to Initial Seed"
        message="This will reset all resorts, hotels, experiences, gallery images, and settings back to their default state."
        confirmText="Reset to Defaults"
      />
    </form>
  );
}
