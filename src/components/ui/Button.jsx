'use client';

import { forwardRef } from 'react';
import { components } from '@/styles/theme';
import LoadingSpinner from './LoadingSpinner';

/**
 * Modern Button Component - Mobile-First, Touch-Friendly
 * 
 * Features:
 * - Multiple variants (primary, secondary, tertiary, outline, ghost)
 * - Three sizes (sm: 32px, md: 40px, lg: 48px) - all touch-friendly
 * - Loading and disabled states
 * - Smooth transitions (200ms)
 * - Accessible with proper ARIA attributes
 * - Support for icons (left/right)
 * - Full width option
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...props
}, ref) => {
  const baseClasses = components.button.base;
  const variantClasses = components.button.variants[variant] || components.button.variants.primary;
  const sizeClasses = components.button.sizes[size] || components.button.sizes.md;
  
  const isDisabled = disabled || loading;
  
  // Build button classes with modern styling
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses}
    ${sizeClasses}
    ${fullWidth ? 'w-full' : ''}
    ${isDisabled ? '' : 'hover:scale-[1.02] active:scale-[0.98]'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={buttonClasses}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <LoadingSpinner size="sm" />
          <span>Loading...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {leftIcon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <span className={fullWidth ? 'flex-1' : ''}>{children}</span>
          {rightIcon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;