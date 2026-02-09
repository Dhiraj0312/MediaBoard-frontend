'use client';

import { forwardRef } from 'react';
import { components } from '@/styles/theme';

/**
 * Modern Card Component - Mobile-First, Responsive Padding
 * 
 * Features:
 * - Responsive padding (16px mobile, 20px tablet, 24px desktop)
 * - Multiple variants (base, elevated, bordered, flat)
 * - Optional hover effect with lift and shadow
 * - Loading state with spinner
 * - Rounded corners (12px) for modern look
 * - Soft shadows for subtle elevation
 * - Composable sub-components (Header, Body, Footer, Title, Description)
 */
const Card = forwardRef(({
  children,
  variant = 'base',
  className = '',
  hover = false,
  loading = false,
  ...props
}, ref) => {
  const baseClasses = components.card.base;
  const variantClasses = components.card[variant] || components.card.base;
  
  const cardClasses = `
    ${variantClasses}
    ${hover ? 'hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer' : ''}
    ${loading ? 'opacity-50 pointer-events-none' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div ref={ref} className={cardClasses} {...props}>
      {loading && (
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"></div>
        </div>
      )}
      {children}
    </div>
  );
});

Card.displayName = 'Card';

/**
 * Card Header - Top section with border
 * Responsive padding: 16px mobile, 20px tablet, 24px desktop
 */
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`px-4 py-4 sm:px-5 sm:py-4 lg:px-6 lg:py-5 border-b border-neutral-200 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Body - Main content area
 * Responsive padding based on size prop
 */
const CardBody = ({ children, className = '', padding = 'default', ...props }) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3 sm:p-4',                          // 12px mobile, 16px tablet+
    default: 'p-4 sm:p-5 lg:p-6',              // 16px mobile, 20px tablet, 24px desktop
    lg: 'p-6 sm:p-7 lg:p-8',                   // 24px mobile, 28px tablet, 32px desktop
  };
  
  return (
    <div className={`${paddingClasses[padding]} ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Footer - Bottom section with border and subtle background
 * Responsive padding: 16px mobile, 20px tablet, 24px desktop
 */
const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`px-4 py-4 sm:px-5 sm:py-4 lg:px-6 lg:py-5 border-t border-neutral-200 bg-neutral-50 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card Title - Heading for card content
 */
const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-neutral-900 ${className}`} {...props}>
    {children}
  </h3>
);

/**
 * Card Description - Subtitle or description text
 */
const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-neutral-600 mt-1 ${className}`} {...props}>
    {children}
  </p>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Description = CardDescription;

export default Card;