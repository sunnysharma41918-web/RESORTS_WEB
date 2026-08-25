import React, { lazy } from 'react';
import { ROUTES } from '../constants/routes';

// Public routes lazy loading
export const Home = lazy(() => import('../pages/public/Home'));
export const Resorts = lazy(() => import('../pages/public/Resorts'));
export const ResortDetails = lazy(() => import('../pages/public/ResortDetails'));
export const Hotels = lazy(() => import('../pages/public/Hotels'));
export const HotelDetails = lazy(() => import('../pages/public/HotelDetails'));
export const Experiences = lazy(() => import('../pages/public/Experiences'));
export const SanctuaryRituals = lazy(() => import('../pages/public/SanctuaryRituals'));
export const SanctuaryEthos = lazy(() => import('../pages/public/SanctuaryEthos'));
export const Gallery = lazy(() => import('../pages/public/Gallery'));
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
export const AdminInquiriesList = lazy(() => import('../pages/admin/inquiries/AdminInquiriesList'));
export const AdminSettings = lazy(() => import('../pages/admin/settings/AdminSettings'));

export const PUBLIC_ROUTES = [
  { path: ROUTES.HOME, component: Home, exact: true },
  { path: ROUTES.RESORTS, component: Resorts },
  { path: ROUTES.RESORT_DETAILS, component: ResortDetails },
  { path: ROUTES.HOTELS, component: Hotels },
  { path: ROUTES.HOTEL_DETAILS, component: HotelDetails },
  { path: ROUTES.EXPERIENCES, component: Experiences },
  { path: ROUTES.SANCTUARY_RITUALS, component: SanctuaryRituals },
  { path: ROUTES.SANCTUARY_ETHOS, component: SanctuaryEthos },
  { path: ROUTES.ETHOS, component: SanctuaryEthos },
  { path: ROUTES.GALLERY, component: Gallery },
  { path: ROUTES.ABOUT, component: About },
  { path: ROUTES.CONTACT, component: Contact },
  { path: ROUTES.PRIVACY, component: PrivacyPolicy },
  { path: ROUTES.TERMS, component: Terms },
  { path: '*', component: NotFound },
];

export const ADMIN_ROUTES = [
  { path: '', component: AdminDashboard },
  { path: 'resorts', component: AdminResortsList },
  { path: 'resorts/new', component: AdminResortForm },
  { path: 'resorts/edit/:id', component: AdminResortForm },
  { path: 'hotels', component: AdminHotelsList },
  { path: 'hotels/new', component: AdminHotelForm },
  { path: 'hotels/edit/:id', component: AdminHotelForm },
  { path: 'experiences', component: AdminExperiencesList },
  { path: 'experiences/new', component: AdminExperienceForm },
  { path: 'experiences/edit/:id', component: AdminExperienceForm },
  { path: 'gallery', component: AdminGalleryList },
  { path: 'inquiries', component: AdminInquiriesList },
  { path: 'settings', component: AdminSettings },
];
