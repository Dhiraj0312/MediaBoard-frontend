'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SkipLinks from '@/components/ui/SkipLinks';
import { useScreenReader } from '@/hooks/useAccessibility';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { LiveRegion } = useScreenReader();

  return (
    <ProtectedRoute>
      <div className="h-screen flex overflow-hidden bg-neutral-50 dark:bg-neutral-950">
        {/* Skip Links for keyboard navigation */}
        <SkipLinks />
        
        {/* Live region for screen reader announcements */}
        <LiveRegion />
        
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          {/* Mobile header - Modern design */}
          <div className="lg:hidden sticky top-0 z-10">
            <div className="flex items-center justify-between bg-white dark:bg-neutral-900 px-4 py-3 shadow-sm border-b border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 
                  rounded-lg p-2 transition-all duration-150 min-h-[44px] min-w-[44px]"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar navigation"
                aria-expanded={sidebarOpen}
                aria-controls="sidebar-navigation"
              >
                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
              </button>
              
              <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Digital Signage
              </h1>
              
              <ThemeToggle className="min-h-[44px] min-w-[44px]" />
            </div>
          </div>

          {/* Main content */}
          <main 
            id="main-content"
            className="flex-1 relative overflow-y-auto focus:outline-none bg-neutral-50 dark:bg-neutral-950"
            role="main"
            aria-label="Main content"
            tabIndex="-1"
          >
            <div className="container-responsive py-4 sm:py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}