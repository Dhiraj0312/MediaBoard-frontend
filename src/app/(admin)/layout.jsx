import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <div id="root" className="min-h-screen">
          {children}
        </div>
        
        {/* Accessibility announcements region */}
        <div 
          id="a11y-announcements" 
          aria-live="polite" 
          aria-atomic="true" 
          className="sr-only"
        />
        
        {/* Skip to main content for screen readers */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[9999] focus:p-4 focus:bg-blue-600 focus:text-white focus:no-underline"
        >
          Skip to main content
        </a>
      </ToastProvider>
    </AuthProvider>
  );
}
