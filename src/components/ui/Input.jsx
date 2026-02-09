'use client';

import { forwardRef } from 'react';
import { components } from '@/styles/theme';

/**
 * Modern Input Component - Mobile-First, Touch-Friendly
 * 
 * Features:
 * - 40px height for touch-friendly interaction
 * - Clear focus states with ring effect
 * - Error and success validation states
 * - Optional label, helper text, and icons
 * - Smooth transitions (150ms)
 * - Accessible with proper ARIA attributes
 * - Rounded corners (8px) for modern look
 */
const Input = forwardRef(({
  label,
  error,
  success,
  helperText,
  required = false,
  className = '',
  containerClassName = '',
  leftIcon,
  rightIcon,
  disabled = false,
  ...props
}, ref) => {
  const baseClasses = components.input.base;
  const errorClasses = error ? components.input.error : '';
  const successClasses = success ? components.input.success : '';
  const disabledClasses = disabled ? components.input.disabled : '';
  
  const inputClasses = `
    ${baseClasses}
    ${errorClasses}
    ${successClasses}
    ${disabledClasses}
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const inputId = props.id || props.name;

  return (
    <div className={containerClassName}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          {label}
          {required && (
            <span className="text-error-500 ml-1" aria-label="required">*</span>
          )}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-neutral-400" aria-hidden="true">
              {leftIcon}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required}
          aria-describedby={
            error ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className={error ? 'text-error-400' : success ? 'text-success-400' : 'text-neutral-400'} aria-hidden="true">
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {(error || success || helperText) && (
        <div className="mt-2">
          {error && (
            <p id={`${inputId}-error`} className="text-sm text-error-600 flex items-start gap-1" role="alert">
              <svg className="h-4 w-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </p>
          )}
          
          {success && !error && (
            <p className="text-sm text-success-600 flex items-start gap-1">
              <svg className="h-4 w-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{success}</span>
            </p>
          )}
          
          {helperText && !error && !success && (
            <p id={`${inputId}-helper`} className="text-sm text-neutral-500">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;