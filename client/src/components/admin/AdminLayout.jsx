import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { ToastProvider } from './ToastNotification';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen w-full bg-[#F4F6F5] text-[#111827] flex font-manrope antialiased select-none">
        
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Floating / Integrated Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area - Full 100% Width */}
        <div className="flex-1 flex flex-col min-w-0 w-full min-h-screen overflow-x-hidden">
          
          {/* Top Modern Header Bar */}
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

          {/* Main Body - 100% Screen Width */}
          <main className="flex-1 w-full p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
          
        </div>

      </div>
    </ToastProvider>
  );
}
