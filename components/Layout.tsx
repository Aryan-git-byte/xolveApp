"use client";
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronLeft, Bell, Menu, Home, BookOpen, ShoppingCart, RefreshCw, User } from 'lucide-react';

// Header Component
export const Header = () => {
  const [xp, setXp] = useState(250);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Back button */}
        <button className="p-2 hover:bg-gray-100 rounded-full transition">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Center - Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">X</span>
          </div>
          <span className="text-xl font-bold text-gray-800">XolveTech</span>
        </div>

        {/* Right side - Notification, XP, Hamburger */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="bg-blue-50 px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-sm font-semibold text-blue-600">XP</span>
            <span className="text-sm font-bold text-blue-800">{xp}</span>
          </div>

          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48">
          <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition">
            Settings
          </button>
          <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition">
            Help & Support
          </button>
          <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition">
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

// Footer Component
export const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/main/home' },
    { id: 'courses', label: 'Courses', icon: BookOpen, path: '/main/courses' },
    { id: 'xchange', label: 'Xchange', icon: RefreshCw, path: '/main/xchange' },
    { id: 'shopping', label: 'Shopping', icon: ShoppingCart, path: '/main/shopping' },
    { id: 'profile', label: 'Profile', icon: User, path: '/main/profile' },
  ];

  const handleNavigation = (item: any) => {
    if (pathname !== item.path) {
      router.push(item.path);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-1.5 fixed bottom-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-around max-w-7xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-md transition ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-2' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
};