"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle Component
 * Provides a toggle interface for switching between light and dark themes
 * - Persists user selection to localStorage
 * - Shows loading state during hydration
 * - Visually indicates active theme
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show skeleton loader during hydration
  if (!mounted) {
    return (
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1.5 gap-1">
        <div className="w-20 h-9 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
        <div className="w-20 h-9 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
      </div>
    );
  }

  // Use resolvedTheme as fallback to ensure we always have a valid theme
  const currentTheme = theme || resolvedTheme || 'light';

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    // Explicitly set theme in both next-themes and localStorage
    setTheme(newTheme);
    
    // Force update localStorage to ensure persistence
    try {
      localStorage.setItem('xolvetech-theme', newTheme);
      
      // Also update the DOM immediately for instant feedback
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch (e) {
      console.error('Failed to save theme preference:', e);
    }
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1.5 gap-1">
      <button
        onClick={() => handleThemeChange('light')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
          currentTheme === 'light' 
            ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
        aria-label="Light mode"
        aria-pressed={currentTheme === 'light'}
      >
        <Sun className="w-4 h-4" />
        <span className="hidden sm:inline">Light</span>
      </button>
      
      <button
        onClick={() => handleThemeChange('dark')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
          currentTheme === 'dark' 
            ? 'bg-gray-600 text-blue-400 shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
        aria-label="Dark mode"
        aria-pressed={currentTheme === 'dark'}
      >
        <Moon className="w-4 h-4" />
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  );
}
