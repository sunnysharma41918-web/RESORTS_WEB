import React, { useState, useEffect } from 'react';
import { settingsService } from '../../../services/settingsService';
import { storage } from '../../../services/storage';
import { FormField, FormInput, FormTextarea } from '../../../components/admin/AdminFormField';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';
import { useToast } from '../../../components/admin/ToastNotification';
import { RotateCcw, Save, Sparkles } from 'lucide-react';

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
    address: 'Country Holidays Corporate Pavilion, Ocean Avenue, Goa, India',
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
    <form onSubmit={handleSave} className="space-y-10 max-w-5xl select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-luxury-border">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-orange-400 font-bold block mb-1">
            Global Configuration
          </span>
          <h1 className="text-3xl font-display font-bold text-white">Website CMS Settings</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsResetDialogOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-luxury-border text-white text-xs uppercase tracking-luxury font-medium transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
            <span>Reset All Seeds</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs uppercase tracking-luxury transition-all shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Brand & Editorial Copy */}
        <div className="bg-luxury-card border border-luxury-border/80 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl">
          <h3 className="text-base font-display font-bold text-white border-b border-luxury-border/60 pb-3 uppercase tracking-tight">
            Brand Identity & SEO
          </h3>

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
        <div className="bg-luxury-card border border-luxury-border/80 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl">
          <h3 className="text-base font-display font-bold text-white border-b border-luxury-border/60 pb-3 uppercase tracking-tight">
            Global Concierge Contact
          </h3>

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
