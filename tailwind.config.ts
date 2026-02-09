import type { Config } from 'tailwindcss'
import { theme } from './src/styles/theme'

const config: Config = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors from design tokens
      colors: {
        // Neutral palette
        neutral: theme.colors.neutral,
        
        // Primary brand colors
        primary: theme.colors.primary,
        
        // Semantic colors
        success: theme.colors.success,
        warning: theme.colors.warning,
        error: theme.colors.error,
        info: theme.colors.info,
        
        // Legacy gray support
        gray: theme.colors.gray,
        
        // shadcn/ui compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      
      // Spacing from design tokens
      spacing: theme.spacing,
      
      // Typography from design tokens
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize as any, // Type assertion for Tailwind compatibility
      fontWeight: theme.typography.fontWeight,
      letterSpacing: theme.typography.letterSpacing as any,
      
      // Border radius from design tokens
      borderRadius: {
        ...theme.borderRadius,
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      // Shadows from design tokens
      boxShadow: theme.boxShadow,
      
      // Animations from design tokens
      animation: theme.animation,
      
      // Transition durations
      transitionDuration: theme.transitionDuration,
      
      // Transition timing functions
      transitionTimingFunction: theme.transitionTimingFunction,
      
      // Z-index scale
      zIndex: theme.zIndex,
      
      // Keyframes for animations
      keyframes: {
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
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
      },
      
      // Max width for containers
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },
      
      // Min height for touch targets
      minHeight: {
        'touch': '2.75rem', // 44px
      },
      
      // Min width for touch targets
      minWidth: {
        'touch': '2.75rem', // 44px
      },
    },
  },
  plugins: [],
}

export default config