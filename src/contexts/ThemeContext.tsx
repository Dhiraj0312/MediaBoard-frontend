'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
      setThemeState(storedTheme);
    }
  }, []);

  // Update resolved theme based on theme setting and system preference
  useEffect(() => {
    const updateResolvedTheme = () => {
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        setResolvedTheme(systemTheme);
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateResolvedTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the resolved theme class
    root.classList.add(resolvedTheme);
    
    // Update CSS custom properties for runtime theme switching
    if (resolvedTheme === 'dark') {
      root.style.setProperty('--color-neutral-50', '#0a0a0a');
      root.style.setProperty('--color-neutral-100', '#171717');
      root.style.setProperty('--color-neutral-200', '#262626');
      root.style.setProperty('--color-neutral-300', '#404040');
      root.style.setProperty('--color-neutral-400', '#525252');
      root.style.setProperty('--color-neutral-500', '#737373');
      root.style.setProperty('--color-neutral-600', '#a3a3a3');
      root.style.setProperty('--color-neutral-700', '#d4d4d4');
      root.style.setProperty('--color-neutral-800', '#e5e5e5');
      root.style.setProperty('--color-neutral-900', '#f5f5f5');
      root.style.setProperty('--color-neutral-950', '#fafafa');
    } else {
      root.style.setProperty('--color-neutral-50', '#fafafa');
      root.style.setProperty('--color-neutral-100', '#f5f5f5');
      root.style.setProperty('--color-neutral-200', '#e5e5e5');
      root.style.setProperty('--color-neutral-300', '#d4d4d4');
      root.style.setProperty('--color-neutral-400', '#a3a3a3');
      root.style.setProperty('--color-neutral-500', '#737373');
      root.style.setProperty('--color-neutral-600', '#525252');
      root.style.setProperty('--color-neutral-700', '#404040');
      root.style.setProperty('--color-neutral-800', '#262626');
      root.style.setProperty('--color-neutral-900', '#171717');
      root.style.setProperty('--color-neutral-950', '#0a0a0a');
    }
  }, [resolvedTheme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
