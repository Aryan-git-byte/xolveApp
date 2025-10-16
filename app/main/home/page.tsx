"use client";
import React, { useState, useEffect } from 'react';
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
  Bell
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// Home Page Component
const HomePage = () => {
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
    { label: "Courses", value: "12", icon: BookOpen, color: "text-blue-600", bgColor: "bg-blue-100" },
    { label: "XP Earned", value: user.xp.toString(), icon: Star, color: "text-yellow-600", bgColor: "bg-yellow-100" },
    { label: "Streak", value: `${user.streak} days`, icon: Zap, color: "text-orange-600", bgColor: "bg-orange-100" },
    { label: "Level", value: user.level.toString(), icon: Target, color: "text-purple-600", bgColor: "bg-purple-100" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content Area */}
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
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
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <a
                    key={index}
                    href={action.href}
                    className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition group block"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-800 mb-1">{action.label}</div>
                    <div className="text-xs text-gray-500">{action.count}</div>
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
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{stat.label}</h3>
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
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                <a href="/main/profile" className="text-blue-600 text-sm font-medium hover:text-blue-700 transition">
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
                    <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.action}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-blue-600">+{activity.xp} XP</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Upcoming</h2>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition">
                  Calendar
                </button>
              </div>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{deadline.title}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{deadline.date}</span>
                        <span>•</span>
                        <span>{deadline.time}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          {notifications.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {notifications.filter(n => !n.read).length} new
                </span>
              </div>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-lg transition ${
                    !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      !notification.read ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {!notification.read ? (
                        <AlertCircle className="w-4 h-4 text-blue-600" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.created_at}</p>
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