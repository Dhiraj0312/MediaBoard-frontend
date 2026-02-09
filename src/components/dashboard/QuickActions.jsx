'use client';

import { useRouter } from 'next/navigation';
import { 
  PlusIcon, 
  ComputerDesktopIcon, 
  PhotoIcon, 
  PlayIcon,
  LinkIcon,
  ArrowPathIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      name: 'Add Screen',
      description: 'Register new display',
      icon: ComputerDesktopIcon,
      color: 'text-primary-600 dark:text-primary-400',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30',
      onClick: () => router.push('/screens?action=add')
    },
    {
      name: 'Upload Media',
      description: 'Add images/videos',
      icon: PhotoIcon,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30',
      onClick: () => router.push('/media?action=upload')
    },
    {
      name: 'Create Playlist',
      description: 'Build content list',
      icon: PlayIcon,
      color: 'text-success-600 dark:text-success-400',
      bgColor: 'bg-success-50 dark:bg-success-900/20 hover:bg-success-100 dark:hover:bg-success-900/30',
      onClick: () => router.push('/playlists?action=create')
    },
    {
      name: 'Assignments',
      description: 'Link playlists',
      icon: LinkIcon,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30',
      onClick: () => router.push('/assignments')
    }
  ];

  const handleRefreshAll = () => {
    window.location.reload();
  };

  return (
    <div className="card-modern p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <SparklesIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Quick Actions
        </h3>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 mb-6">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.name}
              onClick={action.onClick}
              className={`w-full p-4 rounded-lg border border-transparent transition-all duration-200 text-left group ${action.bgColor}`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-neutral-900 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
                  <Icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {action.name}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {action.description}
                  </p>
                </div>
                <PlusIcon className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
              </div>
            </button>
          );
        })}
      </div>

      {/* System Actions */}
      <div className="pt-5 border-t border-neutral-200 dark:border-neutral-700">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          System
        </h4>
        <button
          onClick={handleRefreshAll}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
            bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700
            text-neutral-700 dark:text-neutral-200 text-sm font-medium
            transition-all duration-200 min-h-[44px]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Refresh Dashboard
        </button>
      </div>

      {/* Getting Started Guide */}
      <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          Getting Started
        </h4>
        <div className="space-y-3">
          {[
            'Add your first screen using device code',
            'Upload media files (images/videos)',
            'Create playlists with your media',
            'Assign playlists to screens'
          ].map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-semibold flex items-center justify-center">
                {index + 1}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 pt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
