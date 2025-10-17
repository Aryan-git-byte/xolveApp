"use client";

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export function ThemeSync() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // Force sync the HTML class with the resolved theme
    const html = document.documentElement;
    const body = document.body;
    
    console.log('ThemeSync - theme:', theme, 'resolvedTheme:', resolvedTheme);
    console.log('HTML classes:', html.className);
    
    // Remove both classes first
    html.classList.remove('dark', 'light');
    body.classList.remove('dark', 'light');
    
    // Add the correct class
    if (resolvedTheme === 'dark') {
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.classList.add('light');
      body.classList.add('light');
    }
    
    console.log('HTML classes after update:', html.className);
    
    // Force a reflow
    void html.offsetHeight;
  }, [theme, resolvedTheme]);

  return null;
}
