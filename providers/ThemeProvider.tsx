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
    const { theme, systemTheme, setTheme } = useTheme();
    const coercedOnce = useRef(false);

    useEffect(() => {
      if (!coercedOnce.current && theme === "system") {
        const sys = systemTheme ?? "light";
        setTheme(sys);
        coercedOnce.current = true;
      }
      const resolved = theme === "system" ? systemTheme : theme;
      const root = document.documentElement;
      if (resolved === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
      }
    }, [theme, systemTheme, setTheme]);
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
    >
      {mounted && <ThemeSync />}
      {mounted ? children : null}
    </NextThemesProvider>
  );
}
