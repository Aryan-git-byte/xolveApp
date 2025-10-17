"use client";
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Header, Footer } from '../../../components/Layout';
import { 
  TrendingUp,
  Award,
  Clock,
  Calendar,
  Play,
  Star,
  ArrowRight,
  Activity,
  BookOpen,
  ShoppingCart,
  RefreshCw,
  Target,
  Users,
  Zap,
  CheckCircle,
  AlertCircle,
  Bell,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// Home Page Component
const HomePage = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState({
    name: "User",
    level: 1,
    xp: 0,
    xpToNext: 100,
    streak: 0
  });
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const supabase = createClient();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Force a re-render when theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          // Theme changed, force update
          setMounted(true);
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          // Fetch user profile
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (profile) {
            setUser({
              name: profile.nickname || profile.name || "User",
              level: Math.floor((profile.xp || 0) / 100) + 1,
              xp: profile.xp || 0,
              xpToNext: 100 - ((profile.xp || 0) % 100),
              streak: profile.streak || 0
            });
          }

          // Fetch notifications
          const { data: userNotifications } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', authUser.id)
            .order('created_at', { ascending: false })
            .limit(5);

          setNotifications(userNotifications || []);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [supabase]);

  const quickActions = [
    { 
      icon: BookOpen, 
      label: "Continue Learning", 
      color: "bg-blue-500", 
      count: "3 active courses",
      href: "/main/courses"
    },
    { 
      icon: ShoppingCart, 
      label: "Browse Store", 
      color: "bg-green-500", 
      count: "New items",
      href: "/main/shopping"
    },
    { 
      icon: RefreshCw, 
      label: "Xchange", 
      color: "bg-purple-500", 
      count: "Active discussions",
      href: "/main/xchange"
    },
    { 
      icon: Award, 
      label: "Achievements", 
      color: "bg-orange-500", 
      count: "2 unlocked",
      href: "/main/profile"
    }
  ];

  const recentActivity = [
    { type: "course", title: "JavaScript Fundamentals", action: "Completed Chapter 3", time: "2 hours ago", xp: 25 },
    { type: "achievement", title: "Speed Learner", action: "Achievement unlocked", time: "1 day ago", xp: 50 },
    { type: "xchange", title: "Arduino Project", action: "New reply received", time: "2 days ago", xp: 15 },
    { type: "purchase", title: "Premium Course", action: "Purchased successfully", time: "3 days ago", xp: 10 }
  ];

  const upcomingDeadlines = [
    { title: "React Advanced Quiz", date: "Tomorrow", time: "2:00 PM", type: "course" },
    { title: "Xchange Contest", date: "Oct 12", time: "9:00 AM", type: "xchange" },
    { title: "Course Assignment", date: "Oct 15", time: "11:59 PM", type: "course" }
  ];

  const stats = [
    { label: "Courses", value: "12", icon: BookOpen, color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-100 dark:bg-blue-900/30" },
    { label: "XP Earned", value: user.xp.toString(), icon: Star, color: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-100 dark:bg-yellow-900/30" },
    { label: "Streak", value: `${user.streak} days`, icon: Zap, color: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-100 dark:bg-orange-900/30" },
    { label: "Level", value: user.level.toString(), icon: Target, color: "text-purple-600 dark:text-purple-400", bgColor: "bg-purple-100 dark:bg-purple-900/30" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      {/* Main Content Area */}
      <main className="min-h-screen w-full pt-20 pb-24 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Theme Toggle Section */}
          {mounted && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm transition-colors">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    {theme === 'light' && <Sun className="w-5 h-5 text-white" />}
                    {theme === 'dark' && <Moon className="w-5 h-5 text-white" />}
                    {theme === 'system' && <Monitor className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Theme Settings</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Current: <span className="font-medium capitalize">{theme || 'loading...'}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1.5 gap-1">
                  <button
                    onClick={() => {
                      setTheme('light');
                      setTimeout(() => setMounted(true), 100);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                      theme === 'light' 
                        ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span className="hidden sm:inline">Light</span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme('dark');
                      setTimeout(() => setMounted(true), 100);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                      theme === 'dark' 
                        ? 'bg-gray-600 text-blue-400 shadow-sm' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    <span className="hidden sm:inline">Dark</span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme('system');
                      setTimeout(() => setMounted(true), 100);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                      theme === 'system' 
                        ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    <span className="hidden sm:inline">System</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-xl p-6 text-white shadow-lg transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
                <p className="text-blue-100 mb-4">Ready to continue your learning journey?</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">{user.streak} day streak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">Level {user.level}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{user.xp}</div>
                <div className="text-blue-200 text-sm">XP Points</div>
                <div className="w-24 bg-blue-500 rounded-full h-2 mt-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{ width: `${Math.min((user.xp % 100) / 100 * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <a
                    key={index}
                    href={action.href}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition group block bg-white dark:bg-gray-900"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-1">{action.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{action.count}</div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{stat.label}</h3>
                      <div className="flex items-end gap-2 mt-2">
                        <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Recent Activity</h2>
                <a href="/main/profile" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-500 transition">
                  View All
                </a>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const getIcon = (type: string) => {
                    switch (type) {
                      case 'course': return BookOpen;
                      case 'achievement': return Award;
                      case 'xchange': return RefreshCw;
                      case 'purchase': return ShoppingCart;
                      default: return Activity;
                    }
                  };
                  const Icon = getIcon(activity.type);
                  
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{activity.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.action}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">+{activity.xp} XP</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Upcoming</h2>
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-500 transition">
                  Calendar
                </button>
              </div>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{deadline.title}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{deadline.date}</span>
                        <span>•</span>
                        <span>{deadline.time}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          {notifications.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Notifications</h2>
                </div>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {notifications.filter(n => !n.read).length} new
                </span>
              </div>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-lg transition ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400' : 'bg-gray-50 dark:bg-gray-700'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      !notification.read ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-gray-100 dark:bg-gray-600'
                    }`}>
                      {!notification.read ? (
                        <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{notification.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.created_at}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;