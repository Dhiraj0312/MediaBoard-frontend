'use client';

import { ThemeToggle, ThemeToggleDropdown } from '@/components/ui/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeTestPage() {
  const { theme, resolvedTheme } = useTheme();

  return (
    <div className="min-h-screen p-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Theme Switching Test</h1>
          <div className="flex gap-4">
            <ThemeToggle showLabel />
            <ThemeToggleDropdown />
          </div>
        </div>

        <div className="card-modern p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Current Theme</h2>
          <p>
            <strong>Selected Theme:</strong> {theme}
          </p>
          <p>
            <strong>Resolved Theme:</strong> {resolvedTheme}
          </p>
        </div>

        <div className="card-modern p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Color Palette Test</h2>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Neutral Colors</h3>
            <div className="grid grid-cols-5 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                <div key={shade} className="space-y-1">
                  <div
                    className={`h-16 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-${shade}`}
                  />
                  <p className="text-xs text-center">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Primary Colors</h3>
            <div className="grid grid-cols-5 gap-2">
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="space-y-1">
                  <div
                    className={`h-16 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-primary-${shade}`}
                  />
                  <p className="text-xs text-center">{shade}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-modern p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Typography Test</h2>
          <h1 className="text-4xl">Heading 1</h1>
          <h2 className="text-3xl">Heading 2</h2>
          <h3 className="text-2xl">Heading 3</h3>
          <h4 className="text-xl">Heading 4</h4>
          <p className="text-base">
            This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            This is secondary text with reduced emphasis.
          </p>
          <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
            This is a link
          </a>
        </div>

        <div className="card-modern p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Component Test</h2>
          
          <div className="space-y-4">
            <button className="btn-modern bg-primary-600 text-white hover:bg-primary-700 px-4 py-2">
              Primary Button
            </button>
            
            <input
              type="text"
              placeholder="Enter text..."
              className="input-modern"
            />
            
            <div className="flex gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success-100 dark:bg-success-900 text-success-800 dark:text-success-200">
                Success
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-warning-100 dark:bg-warning-900 text-warning-800 dark:text-warning-200">
                Warning
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-200">
                Error
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-info-100 dark:bg-info-900 text-info-800 dark:text-info-200">
                Info
              </span>
            </div>
          </div>
        </div>

        <div className="card-modern p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Contrast Requirements</h2>
          <p>
            All text-to-background combinations should meet WCAG 2.1 AA standards:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Normal text (16px): 4.5:1 contrast ratio</li>
            <li>Large text (18px+ or 14px+ bold): 3:1 contrast ratio</li>
            <li>Interactive elements: 3:1 contrast ratio</li>
          </ul>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            The dark mode palette has been carefully adjusted to maintain these contrast requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
