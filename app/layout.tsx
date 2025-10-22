// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SupabaseProvider from "@/providers/SupabaseProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/components/Toast";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XolveTech",
  description: "STEM Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-gray-900`}>
        <ThemeProvider>
          <SupabaseProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </SupabaseProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
