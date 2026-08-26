import React, { lazy } from 'react';
import { ROUTES } from '../constants/routes';

// Public routes lazy loading
export const Home = lazy(() => import('../pages/public/Home'));
export const Celebrations = lazy(() => import('../pages/public/Celebrations'));
export const Experiences = lazy(() => import('../pages/public/Celebrations'));
export const Resorts = lazy(() => import('../pages/public/Celebrations'));
export const ResortDetails = lazy(() => import('../pages/public/Celebrations'));
export const Hotels = lazy(() => import('../pages/public/Celebrations'));
export const HotelDetails = lazy(() => import('../pages/public/Celebrations'));
export const SanctuaryRituals = lazy(() => import('../pages/public/SanctuaryRituals'));
export const SanctuaryEthos = lazy(() => import('../pages/public/SanctuaryEthos'));
export const Gallery = lazy(() => import('../pages/public/Gallery'));
export const Offers = lazy(() => import('../pages/public/Offers'));
export const About = lazy(() => import('../pages/public/About'));
export const Contact = lazy(() => import('../pages/public/Contact'));
export const PrivacyPolicy = lazy(() => import('../pages/legal/PrivacyPolicy'));
export const Terms = lazy(() => import('../pages/legal/Terms'));
export const NotFound = lazy(() => import('../pages/public/NotFound'));

// Admin routes lazy loading
export const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
export const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
export const AdminResortsList = lazy(() => import('../pages/admin/resorts/AdminResortsList'));
export const AdminResortForm = lazy(() => import('../pages/admin/resorts/AdminResortForm'));
export const AdminHotelsList = lazy(() => import('../pages/admin/hotels/AdminHotelsList'));
export const AdminHotelForm = lazy(() => import('../pages/admin/hotels/AdminHotelForm'));
export const AdminExperiencesList = lazy(() => import('../pages/admin/experiences/AdminExperiencesList'));
export const AdminExperienceForm = lazy(() => import('../pages/admin/experiences/AdminExperienceForm'));
export const AdminGalleryList = lazy(() => import('../pages/admin/gallery/AdminGalleryList'));
export const AdminOffersList = lazy(() => import('../pages/admin/offers/AdminOffersList'));
export const AdminOfferForm = lazy(() => import('../pages/admin/offers/AdminOfferForm'));
export const AdminInquiriesList = lazy(() => import('../pages/admin/inquiries/AdminInquiriesList'));
export const AdminSettings = lazy(() => import('../pages/admin/settings/AdminSettings'));
export const AdminAccommodationsList = lazy(() => import('../pages/admin/accommodations/AdminAccommodationsList'));
export const AdminAccommodationForm = lazy(() => import('../pages/admin/accommodations/AdminAccommodationForm'));

export const PUBLIC_ROUTES = [
  { path: ROUTES.HOME, component: Home, exact: true },
  { path: ROUTES.ABOUT, component: About },
  { path: ROUTES.CELEBRATIONS, component: Celebrations },
  { path: ROUTES.EXPERIENCES, component: Celebrations },
  { path: ROUTES.RESORTS, component: Celebrations },
  { path: ROUTES.OFFERS, component: Offers },
  { path: ROUTES.PACKAGES, component: Offers },
  { path: ROUTES.GALLERY, component: Gallery },
  { path: ROUTES.CONTACT, component: Contact },
  { path: ROUTES.RESORT_DETAILS, component: ResortDetails },
  { path: ROUTES.HOTELS, component: Hotels },
  { path: ROUTES.HOTEL_DETAILS, component: HotelDetails },
  { path: ROUTES.SANCTUARY_RITUALS, component: SanctuaryRituals },
  { path: ROUTES.SANCTUARY_ETHOS, component: SanctuaryEthos },
  { path: ROUTES.ETHOS, component: SanctuaryEthos },
  { path: ROUTES.PRIVACY, component: PrivacyPolicy },
  { path: ROUTES.TERMS, component: Terms },
  { path: '*', component: NotFound },
];

export const ADMIN_ROUTES = [
  { path: '', component: AdminDashboard },
  { path: 'accommodations', component: AdminAccommodationsList },
  { path: 'accommodations/new', component: AdminAccommodationForm },
  { path: 'accommodations/edit/:id', component: AdminAccommodationForm },
  { path: 'offers', component: AdminOffersList },
  { path: 'offers/new', component: AdminOfferForm },
  { path: 'offers/edit/:id', component: AdminOfferForm },
  { path: 'gallery', component: AdminGalleryList },
  { path: 'inquiries', component: AdminInquiriesList },
  { path: 'settings', component: AdminSettings },
];
