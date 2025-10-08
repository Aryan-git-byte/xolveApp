"use client";
import React, { useState } from 'react';
import { ChevronLeft, Bell, Menu, Home, BookOpen, ShoppingCart, RefreshCw, User } from 'lucide-react';

// Header Component
const Header = () => {
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
const Footer = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'xchange', label: 'Xchange', icon: RefreshCw },
    { id: 'shopping', label: 'Shopping', icon: ShoppingCart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-3 fixed bottom-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-around max-w-7xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'stroke-2' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
};

// Main Layout Component
const XolveTechLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content Area */}
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to XolveTech</h1>
            <p className="text-gray-600 mb-4">
              This is your main content area. The header and footer are separate reusable components
              that remain constant across all pages.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold">250</span>
                  <span className="text-blue-100 mb-1">XP Earned</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Courses</h3>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold">5</span>
                  <span className="text-green-100 mb-1">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional content sections */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Recent Activity</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Course Activity {i}</p>
                    <p className="text-xs text-gray-500">Completed 2 hours ago</p>
                  </div>
                  <span className="text-xs font-semibold text-blue-600">+10 XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default XolveTechLayout;