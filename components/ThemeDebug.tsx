"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeDebug() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-lg z-50 max-w-xs">
      <h3 className="font-bold text-sm mb-2 text-gray-900 dark:text-gray-100">Theme Debug</h3>
      <div className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
        <p><strong>Current theme:</strong> {theme}</p>
        <p><strong>System theme:</strong> {systemTheme}</p>
        <p><strong>Resolved theme:</strong> {resolvedTheme}</p>
        <p><strong>HTML class:</strong> {typeof document !== 'undefined' ? document.documentElement.className : 'N/A'}</p>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setTheme('light')}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs"
        >
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs"
        >
          Dark
        </button>
        <button
          onClick={() => setTheme('system')}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs"
        >
          System
        </button>
      </div>
    </div>
  );
}
