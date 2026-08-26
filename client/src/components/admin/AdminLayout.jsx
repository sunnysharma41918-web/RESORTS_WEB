import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { ToastProvider } from './ToastNotification';
import { Menu } from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#1C1C1C] text-white flex select-none font-manrope antialiased p-3 sm:p-5 lg:p-6">
        
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/80 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Outer App Frame with Editorial Dark Styling */}
        <div className="w-full max-w-[1600px] mx-auto bg-[#000000] border border-[#333333] flex overflow-hidden min-h-[calc(100vh-3rem)] shadow-2xl">
          
          {/* Sidebar */}
          <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Main Content Body */}
          <div className="flex-1 flex flex-col min-w-0 p-6 sm:p-8 lg:p-10 overflow-y-auto max-h-[calc(100vh-3rem)] bg-[#000000]">
            
            {/* Mobile Header Toggle */}
            <div className="lg:hidden flex items-center justify-between pb-4 border-b border-[#333333] mb-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2.5 bg-[#1C1C1C] border border-[#333333] text-white hover:border-[#FF1F02] transition-colors"
                aria-label="Open Sidebar Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
                <span className="w-2 h-2 rounded-full bg-[#FF1F02]" />
                <span>CHHR Control Center</span>
              </div>
            </div>

            <main className="flex-1 w-full">
              <Outlet />
            </main>
          </div>

        </div>

      </div>
    </ToastProvider>
  );
}
