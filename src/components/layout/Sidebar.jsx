'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Tooltip from '@/components/ui/Tooltip';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import {
  HomeIcon,
  ComputerDesktopIcon,
  PhotoIcon,
  PlayIcon,
  LinkIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
    description: 'System overview and statistics'
  },
  {
    name: 'Screens',
    href: '/screens',
    icon: ComputerDesktopIcon,
    description: 'Manage digital signage displays'
  },
  {
    name: 'Media',
    href: '/media',
    icon: PhotoIcon,
    description: 'Upload and manage media files'
  },
  {
    name: 'Playlists',
    href: '/playlists',
    icon: PlayIcon,
    description: 'Create and manage content playlists'
  },
  {
    name: 'Assignments',
    href: '/assignments',
    icon: LinkIcon,
    description: 'Assign playlists to screens'
  },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';

  return (
    <>
      {/* Mobile sidebar overlay - Modern backdrop with blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"></div>
        </div>
      )}

      {/* Sidebar - Modern design with neutral colors */}
      <div 
        id="sidebar-navigation"
        className={`
          fixed inset-y-0 left-0 z-50 ${sidebarWidth} 
          bg-neutral-900 dark:bg-neutral-950 
          transform transition-all duration-200 ease-in-out 
          lg:translate-x-0 lg:static lg:inset-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          border-r border-neutral-800 dark:border-neutral-900
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header - Modern with rounded corners on toggle */}
        <div className="flex items-center justify-between h-16 bg-neutral-800 dark:bg-neutral-900 px-4 border-b border-neutral-700 dark:border-neutral-800">
          {!isCollapsed && (
            <h1 className="text-white text-lg font-semibold truncate">
              Digital Signage
            </h1>
          )}
          
          {/* Desktop collapse toggle - Modern rounded button */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-150"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? (
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {/* Mobile close button - Modern rounded button */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-150"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation - Modern with 44px touch targets */}
        <nav className="mt-5 px-2 space-y-1" aria-label="Sidebar navigation">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            const linkContent = (
              <Link
                href={item.href}
                className={`
                  group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-150
                  focus:outline-none focus:ring-2 focus:ring-primary-500/20 min-h-[44px]
                  ${isActive
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon 
                  className={`flex-shrink-0 h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`}
                  aria-hidden="true"
                />
                {!isCollapsed && (
                  <span className="truncate">{item.name}</span>
                )}
                {isActive && (
                  <div className="absolute left-0 w-1 h-10 bg-primary-500 rounded-r" aria-hidden="true" />
                )}
              </Link>
            );

            return (
              <div key={item.name}>
                {isCollapsed ? (
                  <Tooltip content={`${item.name} - ${item.description}`} position="right">
                    {linkContent}
                  </Tooltip>
                ) : (
                  linkContent
                )}
              </div>
            );
          })}
        </nav>

        {/* User section - Modern with rounded corners */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-neutral-800 border-t border-neutral-700">
          {/* Theme toggle - positioned above user section */}
          <div className={`mb-3 flex ${isCollapsed ? 'justify-center' : 'justify-end'}`}>
            <ThemeToggle className="min-h-[44px] min-w-[44px]" />
          </div>
          
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            {!isCollapsed && (
              <>
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-sm font-semibold text-white">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate" title={user?.email}>
                    {user?.email}
                  </p>
                  <p className="text-xs text-neutral-400">Administrator</p>
                </div>
              </>
            )}
            
            <Tooltip content="Sign out" position={isCollapsed ? 'right' : 'top'}>
              <button
                onClick={handleLogout}
                className={`
                  flex-shrink-0 p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-all duration-150
                  focus:outline-none focus:ring-2 focus:ring-primary-500/20 min-h-[44px] min-w-[44px]
                  ${isCollapsed ? '' : 'ml-3'}
                `}
                aria-label="Sign out"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}