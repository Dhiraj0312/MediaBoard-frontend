'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiClient } from '@/lib/api';
import { useDashboardData } from '@/hooks/usePolling';
import StatsCards from '@/components/dashboard/StatsCards';
import SystemHealth from '@/components/dashboard/SystemHealth';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import QuickActions from '@/components/dashboard/QuickActions';
import TrendsChart from '@/components/dashboard/TrendsChart';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import PollingStatus from '@/components/common/PollingStatus';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, initialized, session, apiToken } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Simple redirect check - if not authenticated after initialization, redirect to login
  useEffect(() => {
    if (initialized && !isAuthenticated) {
      console.log('[Dashboard] Not authenticated, redirecting to login');
      router.push('/login');
    }
  }, [initialized, isAuthenticated, router]);

  // Use the new polling hook for real-time data
  const {
    data: dashboardData,
    error,
    isLoading,
    lastUpdated,
    refresh,
    pause,
    resume,
    getStatus
  } = useDashboardData(apiClient, {
    interval: 300000, // 5 minutes - VERY CONSERVATIVE for production
    onData: (data, meta) => {
      if (meta.hasChanged) {
        console.log('📊 Dashboard data updated');
      }
    },
    onError: (err, meta) => {
      console.error('📊 Dashboard polling error:', err);
      
      // Show user-friendly message for rate limiting
      if (err.response?.status === 429 || err.message?.includes('Too many')) {
        console.warn('🚦 Dashboard polling rate limited - reducing frequency');
      }
      
      // Handle 401 errors
      if (err.status === 401 || err.message?.includes('Unauthorized')) {
        console.error('📊 Dashboard authentication error - redirecting to login');
        router.push('/login');
      }
    },
    onChange: (newData, oldData, meta) => {
      console.log('📊 Dashboard data changed:', meta);
      // Could show a toast notification here
    }
  });

  const handleRefresh = useCallback(() => {
    refresh();
    setRefreshTrigger(prev => prev + 1);
  }, [refresh]);

  const handlePause = useCallback(() => {
    pause();
  }, [pause]);

  const handleResume = useCallback(() => {
    resume();
  }, [resume]);

  // Show loading state while auth initializes
  if (!initialized) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto"></div>
            <p className="text-neutral-600 dark:text-neutral-400">Checking authentication...</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              If this takes too long, try refreshing the page
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Redirect if not authenticated (after initialization)
  if (initialized && !isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <p className="text-neutral-600 dark:text-neutral-400">Redirecting to login...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isLoading && !dashboardData) {
    return (
      <DashboardLayout>
        <div className="py-6">
          <div className="container-responsive">
            <div className="animate-pulse space-section">
              <div className="skeleton-heading w-1/4 mb-6"></div>
              <div className="grid-responsive gap-section mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="card-modern p-5">
                    <div className="skeleton-text w-3/4 mb-2"></div>
                    <div className="skeleton-heading w-1/2"></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-section">
                <div className="lg:col-span-2 card-modern p-6">
                  <div className="skeleton-heading w-1/3 mb-4"></div>
                  <div className="space-group">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="skeleton-text"></div>
                    ))}
                  </div>
                </div>
                <div className="card-modern p-6">
                  <div className="skeleton-heading w-1/2 mb-4"></div>
                  <div className="space-group">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="skeleton-text"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error && !dashboardData) {
    return (
      <DashboardLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Failed to load dashboard data
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error.message || 'An unexpected error occurred'}</p>
                    {error.status === 401 && (
                      <p className="mt-2">
                        Your session may have expired. Please try refreshing or logging in again.
                      </p>
                    )}
                    {error.code === 'ERR_CONNECTION_REFUSED' && (
                      <p className="mt-2">
                        Unable to connect to the backend server. Please ensure it is running.
                      </p>
                    )}
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={handleRefresh}
                      disabled={isLoading}
                      className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200 disabled:opacity-50"
                    >
                      {isLoading ? 'Retrying...' : 'Try Again'}
                    </button>
                    <button
                      onClick={handleResume}
                      className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                    >
                      Resume Polling
                    </button>
                    {error.status === 401 && (
                      <button
                        onClick={() => router.push('/login')}
                        className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                      >
                        Go to Login
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const pollingStatus = getStatus();

  return (
    <DashboardLayout>
      <div className="space-page">
        {/* Modern Header with Gradient */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Dashboard
              </h1>
              {lastUpdated && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Last updated {lastUpdated.toLocaleTimeString()} • Auto-refresh every 5 min
                </p>
              )}
            </div>
            
            {/* Action Buttons - Mobile Optimized */}
            <div className="flex items-center gap-2 flex-wrap">
              <PollingStatus />
              
              {pollingStatus?.isActive && !pollingStatus?.isPaused ? (
                <button
                  onClick={handlePause}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg
                    bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700
                    text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
                    transition-all duration-200 min-h-[44px]"
                  aria-label="Pause auto-refresh"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  </svg>
                  <span className="hidden sm:inline">Pause</span>
                </button>
              ) : (
                <button
                  onClick={handleResume}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg
                    bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700
                    text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
                    transition-all duration-200 min-h-[44px]"
                  aria-label="Resume auto-refresh"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="hidden sm:inline">Resume</span>
                </button>
              )}
              
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg
                  bg-primary-600 hover:bg-primary-700 active:bg-primary-800
                  text-white shadow-sm hover:shadow-md
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 min-h-[44px]"
                aria-label="Refresh dashboard data"
              >
                <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Connection Error Banner - Modern Design */}
        {error && dashboardData && (
          <div className="mb-6 rounded-lg border p-4 bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-warning-600 dark:text-warning-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-warning-800 dark:text-warning-200">
                  {error.response?.status === 429 || error.message?.includes('Too many')
                    ? 'Polling Rate Limited'
                    : 'Connection Issue'
                  }
                </h3>
                <p className="mt-1 text-sm text-warning-700 dark:text-warning-300">
                  {error.response?.status === 429 || error.message?.includes('Too many')
                    ? 'Dashboard updates have been slowed down to prevent server overload. Data will refresh less frequently.'
                    : `Unable to fetch latest data. Showing cached information. ${error.message}`
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards - Enhanced Mobile-First Design */}
        <StatsCards data={dashboardData?.stats?.stats} />

        {/* Main Content Grid - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* System Health - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <SystemHealth data={dashboardData?.health?.health} />
          </div>
          
          {/* Quick Actions - Takes 1 column */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Alerts Panel - Full Width */}
        {dashboardData?.alerts?.alerts && dashboardData.alerts.alerts.length > 0 && (
          <div className="mb-6">
            <AlertsPanel data={dashboardData.alerts} />
          </div>
        )}

        {/* Charts & Activity - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendsChart data={dashboardData?.stats?.trends} />
          <ActivityFeed data={dashboardData?.activity} />
        </div>

        {/* Development Polling Status */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8">
            <PollingStatus showDetails={true} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}