"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1.5 gap-1">
        <div className="w-20 h-9 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
        <div className="w-20 h-9 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse"></div>
      </div>
    );
  }

  const currentTheme = theme;

  return (
    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1.5 gap-1">
      <button
        onClick={() => setTheme('light')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
          currentTheme === 'light' 
            ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
        aria-label="Light mode"
      >
        <Sun className="w-4 h-4" />
        <span className="hidden sm:inline">Light</span>
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
          currentTheme === 'dark' 
            ? 'bg-gray-600 text-blue-400 shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
        }`}
        aria-label="Dark mode"
      >
        <Moon className="w-4 h-4" />
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  );
}
