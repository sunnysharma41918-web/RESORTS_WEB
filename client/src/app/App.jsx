import React, { useState, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Preloader from '../components/layout/Preloader';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollProgress from '../components/common/ScrollProgress';
import ScrollToTop from '../components/layout/ScrollToTop';
import PageTransition from '../components/layout/PageTransition';
import Lightbox from '../components/common/Lightbox';
import Loader from '../components/common/Loader';
import AdminLayout from '../components/admin/AdminLayout';
import AdminAuthGuard from '../components/admin/AdminAuthGuard';
import CustomCursor from '../components/common/CustomCursor';
import { PUBLIC_ROUTES, ADMIN_ROUTES, AdminLogin } from './routes';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  if (isAdminRoute) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#1C1C1C] text-white">
            <Loader text="Loading CMS Control Center..." />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminAuthGuard>
                <AdminLayout />
              </AdminAuthGuard>
            }
          >
            {ADMIN_ROUTES.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="relative min-h-screen bg-brand-dark text-white flex flex-col justify-between selection:bg-brand-orange selection:text-white">
      <CustomCursor />
      {!loadingComplete && <Preloader onComplete={() => setLoadingComplete(true)} />}

      <ScrollProgress />
      <ScrollToTop />
      <Navbar />

      <main className="flex-1 w-full">
        <PageTransition>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-luxury-black">
                <Loader text="Curating experience..." />
              </div>
            }
          >
            <Routes>
              {PUBLIC_ROUTES.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </Suspense>
        </PageTransition>
      </main>

      <Lightbox />
      <Footer />
    </div>
  );
}
