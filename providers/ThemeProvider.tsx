"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Wait until mounted to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function ThemeSync() {
    const { theme, setTheme } = useTheme();
    const hasInitialized = useRef(false);
    
    useEffect(() => {
      // Force theme to never be 'system' on mount
      if (!hasInitialized.current && theme === 'system') {
        setTheme('light');
        hasInitialized.current = true;
        return;
      }
      hasInitialized.current = true;

      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
      } else if (theme === "light") {
        root.classList.remove("dark");
        root.classList.add("light");
      }
    }, [theme, setTheme]);
    return null;
  }

  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      enableColorScheme={false}
      disableTransitionOnChange={false}
      storageKey="xolvetech-theme"
      forcedTheme={undefined}
    >
      {mounted && <ThemeSync />}
      {mounted ? children : null}
    </NextThemesProvider>
  );
}
