/**
 * Modern Mobile-First Design System Theme Configuration
 * Professional, elegant design tokens for the Digital Signage Platform
 * Following mobile-first approach with neutral palette and subtle accents
 */

export const theme = {
  // Color Palette - Modern Neutral with Subtle Accents
  colors: {
    // Neutral Colors (Primary palette for backgrounds, text, borders)
    neutral: {
      50: '#fafafa',   // Lightest - subtle backgrounds
      100: '#f5f5f5',  // Light backgrounds
      200: '#e5e5e5',  // Borders, dividers
      300: '#d4d4d4',  // Disabled states
      400: '#a3a3a3',  // Placeholder text
      500: '#737373',  // Secondary text
      600: '#525252',  // Body text
      700: '#404040',  // Headings
      800: '#262626',  // Dark text
      900: '#171717',  // Darkest text
      950: '#0a0a0a',  // Maximum contrast
    },
    
    // Primary Brand Colors (Subtle blue accent)
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main brand color
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    // Semantic Status Colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#10b981',  // Main success color
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',  // Main warning color
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',  // Main error color
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    
    info: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',  // Main info color
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    
    // Legacy gray support (maps to neutral)
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    }
  },
  
  // Typography Scale - Modern, Readable
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px / 16px
      sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px / 20px
      base: ['1rem', { lineHeight: '1.5rem' }],     // 16px / 24px
      lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px / 28px
      xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px / 28px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px / 32px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px / 36px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px / 40px
      '5xl': ['3rem', { lineHeight: '1.2' }],         // 48px
      '6xl': ['3.75rem', { lineHeight: '1.1' }],      // 60px
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    
    letterSpacing: {
      tight: '-0.01em',  // For headings
      normal: '0em',     // For body text
      wide: '0.025em',   // For uppercase text
    },
  },
  
  // Spacing Scale - 4px base grid
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',  // 2px
    1: '0.25rem',     // 4px
    1.5: '0.375rem',  // 6px
    2: '0.5rem',      // 8px
    2.5: '0.625rem',  // 10px
    3: '0.75rem',     // 12px
    3.5: '0.875rem',  // 14px
    4: '1rem',        // 16px
    5: '1.25rem',     // 20px
    6: '1.5rem',      // 24px
    7: '1.75rem',     // 28px
    8: '2rem',        // 32px
    9: '2.25rem',     // 36px
    10: '2.5rem',     // 40px
    11: '2.75rem',    // 44px (touch target)
    12: '3rem',       // 48px
    14: '3.5rem',     // 56px
    16: '4rem',       // 64px
    20: '5rem',       // 80px
    24: '6rem',       // 96px
    28: '7rem',       // 112px
    32: '8rem',       // 128px
    36: '9rem',       // 144px
    40: '10rem',      // 160px
    44: '11rem',      // 176px
    48: '12rem',      // 192px
    52: '13rem',      // 208px
    56: '14rem',      // 224px
    60: '15rem',      // 240px
    64: '16rem',      // 256px
    72: '18rem',      // 288px
    80: '20rem',      // 320px
    96: '24rem',      // 384px
  },
  
  // Border Radius - Soft, Modern Corners
  borderRadius: {
    none: '0px',
    sm: '0.25rem',    // 4px - badges, tags
    DEFAULT: '0.5rem', // 8px - buttons, inputs
    md: '0.5rem',     // 8px - same as default
    lg: '0.75rem',    // 12px - cards, panels
    xl: '1rem',       // 16px - modals, large containers
    '2xl': '1.5rem',  // 24px - hero sections
    '3xl': '2rem',    // 32px - extra large
    full: '9999px',   // Pills, avatars
  },
  
  // Shadows - Soft, Subtle Elevation
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
  },
  
  // Breakpoints - Mobile-First Responsive
  screens: {
    sm: '640px',   // Large phones
    md: '768px',   // Tablets
    lg: '1024px',  // Laptops
    xl: '1280px',  // Desktops
    '2xl': '1536px', // Large desktops
  },
  
  // Animation & Transitions - Smooth, Subtle
  animation: {
    none: 'none',
    spin: 'spin 1s linear infinite',
    ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite',
    fadeIn: 'fadeIn 0.2s ease-in-out',
    slideIn: 'slideIn 0.3s ease-out',
    slideUp: 'slideUp 0.3s ease-out',
    scaleIn: 'scaleIn 0.2s ease-out',
  },
  
  // Transition Durations - Fast, Responsive
  transitionDuration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  
  // Transition Timing Functions
  transitionTimingFunction: {
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
    'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Z-Index Scale - Layering System
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modal: '1040',
    popover: '1050',
    tooltip: '1060',
    toast: '1070',
  }
};

// Component-specific design tokens - Modern, Minimal Aesthetic
export const components = {
  // Button variants - Clean, Professional
  button: {
    base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg',
    
    variants: {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-500 shadow-sm hover:shadow-md',
      secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 focus:ring-neutral-500 border border-neutral-300',
      tertiary: 'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus:ring-neutral-500',
      success: 'bg-success-600 text-white hover:bg-success-700 active:bg-success-800 focus:ring-success-500 shadow-sm',
      warning: 'bg-warning-600 text-white hover:bg-warning-700 active:bg-warning-800 focus:ring-warning-500 shadow-sm',
      error: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800 focus:ring-error-500 shadow-sm',
      outline: 'border-2 border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 focus:ring-primary-500',
      ghost: 'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus:ring-neutral-400',
    },
    
    sizes: {
      sm: 'h-8 px-3 text-sm',      // 32px height
      md: 'h-10 px-4 text-base',   // 40px height
      lg: 'h-12 px-6 text-lg',     // 48px height
    }
  },
  
  // Input variants - Clean, Accessible
  input: {
    base: 'block w-full h-10 px-3 border border-neutral-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-150 text-base placeholder:text-neutral-400',
    error: 'border-error-500 focus:ring-error-500/20 focus:border-error-500 text-error-900 placeholder:text-error-300',
    success: 'border-success-500 focus:ring-success-500/20 focus:border-success-500',
    disabled: 'bg-neutral-100 cursor-not-allowed opacity-60',
  },
  
  // Card variants - Soft, Elevated
  card: {
    base: 'bg-white overflow-hidden shadow-sm rounded-lg border border-neutral-200 transition-shadow duration-200',
    elevated: 'bg-white overflow-hidden shadow-md rounded-lg border border-neutral-200 hover:shadow-lg transition-shadow duration-200',
    bordered: 'bg-white overflow-hidden border-2 border-neutral-200 rounded-lg',
    flat: 'bg-white overflow-hidden border border-neutral-200 rounded-lg',
  },
  
  // Badge variants - Subtle, Informative
  badge: {
    base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    
    variants: {
      primary: 'bg-primary-100 text-primary-800 border border-primary-200',
      secondary: 'bg-neutral-100 text-neutral-800 border border-neutral-200',
      success: 'bg-success-100 text-success-800 border border-success-200',
      warning: 'bg-warning-100 text-warning-800 border border-warning-200',
      error: 'bg-error-100 text-error-800 border border-error-200',
      info: 'bg-info-100 text-info-800 border border-info-200',
    }
  },
  
  // Alert variants - Clear, Actionable
  alert: {
    base: 'rounded-lg p-4 border',
    
    variants: {
      success: 'bg-success-50 border-success-200 text-success-900',
      warning: 'bg-warning-50 border-warning-200 text-warning-900',
      error: 'bg-error-50 border-error-200 text-error-900',
      info: 'bg-info-50 border-info-200 text-info-900',
    }
  }
};

// Layout constants - Responsive, Mobile-First
export const layout = {
  sidebar: {
    width: '16rem',         // 256px
    collapsedWidth: '4rem', // 64px
  },
  
  header: {
    height: '4rem',         // 64px
  },
  
  container: {
    maxWidth: '80rem',      // 1280px (7xl)
    padding: {
      mobile: '1rem',       // 16px
      tablet: '1.5rem',     // 24px
      desktop: '2rem',      // 32px
    }
  },
  
  touchTarget: {
    minimum: '2.75rem',     // 44px minimum touch target
  }
};

// Animation keyframes - Smooth, Subtle
export const keyframes = {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' }
  },
  
  slideIn: {
    '0%': { transform: 'translateX(-100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' }
  },
  
  slideUp: {
    '0%': { transform: 'translateY(100%)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' }
  },
  
  scaleIn: {
    '0%': { transform: 'scale(0.95)', opacity: '0' },
    '100%': { transform: 'scale(1)', opacity: '1' }
  },
  
  spin: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' }
  },
  
  bounce: {
    '0%, 100%': { 
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
    },
    '50%': { 
      transform: 'translateY(0)',
      animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
    }
  }
};

// Dark mode color palette - Task 17.2
export const darkTheme = {
  colors: {
    // Neutral Colors (Inverted for dark mode)
    neutral: {
      50: '#0a0a0a',   // Darkest - backgrounds
      100: '#171717',  // Dark backgrounds
      200: '#262626',  // Borders, dividers
      300: '#404040',  // Disabled states
      400: '#525252',  // Placeholder text
      500: '#737373',  // Secondary text
      600: '#a3a3a3',  // Body text
      700: '#d4d4d4',  // Headings
      800: '#e5e5e5',  // Light text
      900: '#f5f5f5',  // Lightest text
      950: '#fafafa',  // Maximum contrast
    },
    
    // Primary Brand Colors (Adjusted for dark mode - lighter shades)
    primary: {
      50: '#1e3a8a',
      100: '#1e40af',
      200: '#1d4ed8',
      300: '#2563eb',
      400: '#3b82f6',
      500: '#60a5fa', // Main brand color (lighter for dark mode)
      600: '#93c5fd',
      700: '#bfdbfe',
      800: '#dbeafe',
      900: '#eff6ff',
    },
    
    // Semantic Status Colors (Adjusted for dark mode)
    success: {
      50: '#14532d',
      100: '#166534',
      200: '#15803d',
      300: '#16a34a',
      400: '#10b981',
      500: '#4ade80',  // Main success color (lighter)
      600: '#86efac',
      700: '#bbf7d0',
      800: '#dcfce7',
      900: '#f0fdf4',
    },
    
    warning: {
      50: '#78350f',
      100: '#92400e',
      200: '#b45309',
      300: '#d97706',
      400: '#f59e0b',
      500: '#fbbf24',  // Main warning color (lighter)
      600: '#fcd34d',
      700: '#fde68a',
      800: '#fef3c7',
      900: '#fffbeb',
    },
    
    error: {
      50: '#7f1d1d',
      100: '#991b1b',
      200: '#b91c1c',
      300: '#dc2626',
      400: '#ef4444',
      500: '#f87171',  // Main error color (lighter)
      600: '#fca5a5',
      700: '#fecaca',
      800: '#fee2e2',
      900: '#fef2f2',
    },
    
    info: {
      50: '#0c4a6e',
      100: '#075985',
      200: '#0369a1',
      300: '#0284c7',
      400: '#0ea5e9',
      500: '#38bdf8',  // Main info color (lighter)
      600: '#7dd3fc',
      700: '#bae6fd',
      800: '#e0f2fe',
      900: '#f0f9ff',
    },
  },
  
  // Shadows for dark mode (lighter, more subtle)
  boxShadow: {
    sm: '0 1px 2px 0 rgb(255 255 255 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(255 255 255 / 0.1), 0 1px 2px -1px rgb(255 255 255 / 0.1)',
    md: '0 4px 6px -1px rgb(255 255 255 / 0.1), 0 2px 4px -2px rgb(255 255 255 / 0.1)',
    lg: '0 10px 15px -3px rgb(255 255 255 / 0.1), 0 4px 6px -4px rgb(255 255 255 / 0.1)',
    xl: '0 20px 25px -5px rgb(255 255 255 / 0.1), 0 8px 10px -6px rgb(255 255 255 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(255 255 255 / 0.15)',
    inner: 'inset 0 2px 4px 0 rgb(255 255 255 / 0.05)',
    none: 'none',
  },
};

export default theme;