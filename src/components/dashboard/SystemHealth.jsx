'use client';

import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon,
  ServerIcon,
  CloudIcon,
  ComputerDesktopIcon,
  DocumentIcon,
  SignalIcon
} from '@heroicons/react/24/outline';

export default function SystemHealth({ data }) {
  if (!data) {
    return (
      <div className="card-modern p-5 sm:p-6 animate-pulse">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-700 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-32"></div>
                </div>
              </div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircleIcon className="w-5 h-5 text-success-600 dark:text-success-400" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-warning-600 dark:text-warning-400" />;
      case 'critical':
      case 'error':
        return <XCircleIcon className="w-5 h-5 text-error-600 dark:text-error-400" />;
      default:
        return <SignalIcon className="w-5 h-5 text-neutral-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return {
          bg: 'bg-success-100 dark:bg-success-900/30',
          text: 'text-success-700 dark:text-success-300',
          badge: 'bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-300 border-success-200 dark:border-success-800'
        };
      case 'warning':
        return {
          bg: 'bg-warning-100 dark:bg-warning-900/30',
          text: 'text-warning-700 dark:text-warning-300',
          badge: 'bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-300 border-warning-200 dark:border-warning-800'
        };
      case 'critical':
      case 'error':
        return {
          bg: 'bg-error-100 dark:bg-error-900/30',
          text: 'text-error-700 dark:text-error-300',
          badge: 'bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-300 border-error-200 dark:border-error-800'
        };
      default:
        return {
          bg: 'bg-neutral-100 dark:bg-neutral-800',
          text: 'text-neutral-700 dark:text-neutral-300',
          badge: 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
        };
    }
  };

  const components = [
    {
      name: 'Database',
      status: data.components?.database?.status || 'unknown',
      icon: ServerIcon,
      details: data.components?.database?.responseTime ? 
        `${data.components.database.responseTime}ms` : 'No data',
      metric: data.components?.database?.responseTime,
      error: data.components?.database?.error
    },
    {
      name: 'Storage',
      status: data.components?.storage?.status || 'unknown',
      icon: CloudIcon,
      details: data.components?.storage?.responseTime ? 
        `${data.components.storage.responseTime}ms` : 'No data',
      metric: data.components?.storage?.responseTime,
      error: data.components?.storage?.error
    },
    {
      name: 'Screens',
      status: data.components?.screens?.status || 'unknown',
      icon: ComputerDesktopIcon,
      details: data.components?.screens?.metrics ? 
        `${data.components.screens.metrics.online}/${data.components.screens.metrics.total} online` : 'No data',
      metric: data.components?.screens?.connectivityRate,
      showPercentage: true
    },
    {
      name: 'Content',
      status: data.components?.content?.status || 'unknown',
      icon: DocumentIcon,
      details: data.components?.content?.metrics ? 
        `${data.components.content.metrics.activeAssignments} active` : 'No data',
      metric: data.components?.content?.assignmentRate,
      showPercentage: true
    }
  ];

  const overallColor = getStatusColor(data.overall);

  return (
    <div className="card-modern p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${overallColor.bg}`}>
            {getStatusIcon(data.overall)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              System Health
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Overall status: <span className={`font-medium capitalize ${overallColor.text}`}>
                {data.overall}
              </span>
            </p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full border ${overallColor.badge}`}>
          <span className="text-sm font-semibold">
            {data.healthScore || 0}%
          </span>
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {components.map((component) => {
          const Icon = component.icon;
          const colors = getStatusColor(component.status);
          
          return (
            <div 
              key={component.name}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${colors.bg} border-transparent`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-neutral-900 rounded-lg shadow-sm">
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {component.name}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                      {component.details}
                    </p>
                  </div>
                </div>
                
                {getStatusIcon(component.status)}
              </div>
              
              {component.metric !== undefined && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-600 dark:text-neutral-400">Performance</span>
                  <span className={`font-semibold ${colors.text}`}>
                    {component.showPercentage ? `${component.metric}%` : `${component.metric}ms`}
                  </span>
                </div>
              )}
              
              {component.error && (
                <p className="text-xs text-error-600 dark:text-error-400 mt-2 font-medium">
                  {component.error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Alerts Section */}
      {data.alerts && data.alerts.length > 0 && (
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3 flex items-center gap-2">
            <ExclamationTriangleIcon className="w-4 h-4 text-warning-600 dark:text-warning-400" />
            Active Alerts ({data.alerts.length})
          </h4>
          <div className="space-y-2">
            {data.alerts.slice(0, 3).map((alert, index) => {
              const alertColors = getStatusColor(alert.type);
              return (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border ${alertColors.badge}`}
                >
                  <div className="flex items-start gap-2">
                    {getStatusIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {alert.component}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Performance Metrics */}
      {data.metrics && (
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Performance Metrics
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {data.metrics.performance && (
              <>
                <div className="text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Avg Response</span>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
                    {data.metrics.performance.averageResponseTime}ms
                  </p>
                </div>
                <div className="text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Database</span>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
                    {data.metrics.performance.databaseResponseTime}ms
                  </p>
                </div>
              </>
            )}
            {data.metrics.system && (
              <>
                <div className="text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Uptime</span>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
                    {Math.round(data.metrics.system.uptime / 3600)}h
                  </p>
                </div>
                <div className="text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Memory</span>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
                    {Math.round((data.metrics.system.memoryUsage.heapUsed / data.metrics.system.memoryUsage.heapTotal) * 100)}%
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
