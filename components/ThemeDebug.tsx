"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeDebug() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [htmlClasses, setHtmlClasses] = useState('');

  useEffect(() => {
    setMounted(true);
    
    // Update HTML classes every 500ms to show real-time changes
    const interval = setInterval(() => {
      if (typeof document !== 'undefined') {
        setHtmlClasses(document.documentElement.className);
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-lg z-50 max-w-xs">
      <h3 className="font-bold text-sm mb-2 text-gray-900 dark:text-gray-100">Theme Debug</h3>
      <div className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
        <p><strong>Current theme:</strong> {theme}</p>
        <p><strong>System theme:</strong> {systemTheme}</p>
        <p><strong>Resolved theme:</strong> {resolvedTheme}</p>
        <p><strong>HTML classes:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{htmlClasses || 'none'}</code></p>
      </div>
      
      {/* Test element to verify dark mode works */}
      <div className="mt-3 p-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 text-xs">
        This box should change color with theme
      </div>
      
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setTheme('light')}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Dark
        </button>
        <button
          onClick={() => setTheme('system')}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          System
        </button>
      </div>
    </div>
  );
}
