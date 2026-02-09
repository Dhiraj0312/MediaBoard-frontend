'use client';

import { 
  ComputerDesktopIcon, 
  CheckCircleIcon, 
  PhotoIcon, 
  PlayIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

export default function StatsCards({ data }) {
  if (!data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card-modern p-5 sm:p-6 animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24 mb-3"></div>
                <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-16 mb-2"></div>
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-32"></div>
              </div>
              <div className="h-12 w-12 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const { screens, media, playlists, assignments } = data;

  const stats = [
    {
      name: 'Total Screens',
      value: screens?.total || 0,
      change: screens?.newThisWeek || 0,
      changeType: screens?.newThisWeek > 0 ? 'increase' : 'neutral',
      icon: ComputerDesktopIcon,
      iconColor: 'text-primary-600 dark:text-primary-400',
      iconBg: 'bg-primary-100 dark:bg-primary-900/30',
      subtitle: `${screens?.online || 0} online • ${screens?.offline || 0} offline`,
      progress: screens?.connectivityRate || 0,
      progressColor: screens?.connectivityRate >= 80 ? 'bg-success-500' : screens?.connectivityRate >= 60 ? 'bg-warning-500' : 'bg-error-500'
    },
    {
      name: 'Online Screens',
      value: screens?.online || 0,
      change: screens?.recentlyActive || 0,
      changeType: 'neutral',
      icon: CheckCircleIcon,
      iconColor: 'text-success-600 dark:text-success-400',
      iconBg: 'bg-success-100 dark:bg-success-900/30',
      subtitle: `${screens?.connectivityRate || 0}% connectivity`,
      progress: screens?.connectivityRate || 0,
      progressColor: 'bg-success-500'
    },
    {
      name: 'Media Files',
      value: media?.total || 0,
      change: media?.uploadTrend?.thisWeek || 0,
      changeType: (media?.uploadTrend?.thisWeek || 0) > (media?.uploadTrend?.lastWeek || 0) ? 'increase' : 'decrease',
      icon: PhotoIcon,
      iconColor: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      subtitle: media?.totalSizeFormatted || '0 B',
      progress: Math.min(((media?.total || 0) / 100) * 100, 100),
      progressColor: 'bg-purple-500'
    },
    {
      name: 'Active Playlists',
      value: playlists?.withContent || 0,
      change: playlists?.newThisWeek || 0,
      changeType: playlists?.newThisWeek > 0 ? 'increase' : 'neutral',
      icon: PlayIcon,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
      subtitle: `${assignments?.total || 0} assignments`,
      progress: assignments?.assignmentRate || 0,
      progressColor: 'bg-indigo-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div 
            key={stat.name} 
            className="card-modern p-5 sm:p-6 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 truncate">
                  {stat.name}
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {stat.value.toLocaleString()}
                  </p>
                  {stat.change > 0 && (
                    <div className="flex items-center gap-1">
                      {stat.changeType === 'increase' ? (
                        <ArrowTrendingUpIcon className="w-4 h-4 text-success-600 dark:text-success-400" />
                      ) : stat.changeType === 'decrease' ? (
                        <ArrowTrendingDownIcon className="w-4 h-4 text-error-600 dark:text-error-400" />
                      ) : null}
                      <span className={`text-sm font-semibold ${
                        stat.changeType === 'increase' ? 'text-success-600 dark:text-success-400' :
                        stat.changeType === 'decrease' ? 'text-error-600 dark:text-error-400' :
                        'text-neutral-600 dark:text-neutral-400'
                      }`}>
                        +{stat.change}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className={`p-3 rounded-lg ${stat.iconBg} group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} aria-hidden="true" />
              </div>
            </div>
            
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              {stat.subtitle}
            </p>
            
            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-600 dark:text-neutral-400">Status</span>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {Math.round(stat.progress)}%
                </span>
              </div>
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${stat.progressColor}`}
                  style={{ width: `${Math.min(stat.progress, 100)}%` }}
                  role="progressbar"
                  aria-valuenow={stat.progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
