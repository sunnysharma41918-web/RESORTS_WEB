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
    email: 'info@countryholidaysresorts.com',
    enquiriesEmail: 'info@countryholidaysresorts.com',
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
    <form onSubmit={handleSave} className="w-full space-y-6 select-none font-manrope text-[#111827]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            System Settings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
            Configure global website identity, contact channels, and concierge details.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsResetDialogOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-full transition-all cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>Reset Demo Seeds</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-[#134E39] hover:bg-[#0E3C2B] text-white font-semibold text-xs rounded-full transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand & Editorial Copy */}
        <div className="bg-white border border-[#E5EAE7] p-6 rounded-2xl space-y-5 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Sliders className="w-4 h-4 text-[#134E39]" />
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
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
        <div className="bg-white border border-[#E5EAE7] p-6 rounded-2xl space-y-5 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Sparkles className="w-4 h-4 text-[#134E39]" />
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Concierge Contact Channels
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

          <FormField label="Physical Address" required>
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
