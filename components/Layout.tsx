"use client";
import React, { useState, useEffect } from 'react';
// Utility to get cart count from localStorage
function getCartCount() {
  if (typeof window === 'undefined') return 0;
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  } catch {
    return 0;
  }
}
import { useRouter, usePathname } from 'next/navigation';
import { ChevronLeft, Bell, Menu, Home, BookOpen, ShoppingCart, RefreshCw, User, X, Settings, HelpCircle, LogOut, Trophy, Flame } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// Header Component
export const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const [xp, setXp] = useState(250);
  const [streak, setStreak] = useState(7);
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showXpDetails, setShowXpDetails] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Handle back navigation
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/main/home');
    }
  };

  // Handle home navigation
  const handleHome = () => {
    router.push('/main/home');
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Cart count listener effect
  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartCount());
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart-updated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  // Fetch user data and notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch user profile for XP and streak
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('total_xp, current_streak')
            .eq('id', user.id)
            .single();

          if (profile) {
            setXp(profile.total_xp || 0);
            setStreak(profile.current_streak || 0);
          }

          // Fetch notifications
          const { data: userNotifications } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false})
            .limit(10);

          setNotifications(userNotifications || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [supabase]);

  // Mark notification as read
  const markAsRead = async (id: number) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Don't close if clicking on dropdown content
      if (target.closest('.dropdown-content')) return;
      
      if (showMenu || showNotifications || showXpDetails) {
        setShowMenu(false);
        setShowNotifications(false);
        setShowXpDetails(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu, showNotifications, showXpDetails]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-3 fixed top-0 left-0 right-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
        {/* Left side - Back button */}
        <div className="flex items-center justify-start flex-shrink-0">
          <button 
            onClick={handleBack}
            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Center - Logo and Brand */}
        <div className="flex items-center justify-start flex-1 min-w-0 -ml-2">
          <button 
            onClick={handleHome}
            className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-base sm:text-lg">X</span>
            </div>
            <span className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">XolveTech</span>
          </button>
        </div>

        {/* Right side - Notification, XP, Hamburger */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">

          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition relative"
            >
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="dropdown-content fixed sm:absolute top-14 sm:top-12 right-2 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 w-[calc(100vw-1rem)] sm:w-80 max-h-96 overflow-y-auto z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
                </div>
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 dark:text-gray-100 text-sm">{notification.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {new Date(notification.created_at).toLocaleDateString()} {new Date(notification.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No notifications yet
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon Notification Style */}
          <div className="relative">
            <button
              onClick={() => router.push('/main/shopping/cart')}
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition relative"
              aria-label="View cart"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white min-w-[16px] min-h-[16px] px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* XP Button (not on shopping) */}
          {!pathname.startsWith('/main/shopping') && (
            <div className="relative">
              <button 
                onClick={() => setShowXpDetails(!showXpDetails)}
                className="bg-blue-50 dark:bg-blue-900/30 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
              >
                <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hidden sm:inline">XP</span>
                <span className="text-xs sm:text-sm font-bold text-blue-800 dark:text-blue-300">{xp}</span>
              </button>
              {/* XP Details Dropdown */}
              {showXpDetails && (
                <div className="dropdown-content fixed sm:absolute top-14 sm:top-12 right-2 sm:right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-3 w-[calc(100vw-1rem)] sm:w-64 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Your Stats</h3>
                  </div>
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total XP</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{xp}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Streak</span>
                      </div>
                      <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{streak} days</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Keep participating to earn more XP and maintain your streak!
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hamburger Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200" />
            </button>
            {/* Menu Dropdown */}
            {showMenu && (
              <div className="dropdown-content fixed sm:absolute top-14 sm:top-12 right-2 sm:right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 w-[calc(100vw-1rem)] sm:w-48 z-50">
                {/* ...existing code... */}
                <button 
                  onClick={() => router.push('/main/help-support')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2 text-gray-800 dark:text-gray-100"
                >
                  <HelpCircle className="w-4 h-4" />
                  Help & Support
                </button>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2 text-red-600 dark:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
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
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-1.5 fixed bottom-0 left-0 right-0 z-50 transition-colors">
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
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
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
