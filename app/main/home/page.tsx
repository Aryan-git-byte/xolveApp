"use client";
import React, { useState } from 'react';
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
  RefreshCw
} from 'lucide-react';

// Home Page Component
const HomePage = () => {
  const [user] = useState({
    name: "John Doe",
    level: 15,
    xp: 2450,
    xpToNext: 3000,
    streak: 7
  });

  const quickActions = [
    { icon: BookOpen, label: "Continue Course", color: "bg-blue-500", count: "3 active" },
    { icon: ShoppingCart, label: "Browse Store", color: "bg-green-500", count: "5 new" },
    { icon: RefreshCw, label: "Quick Trade", color: "bg-purple-500", count: "Live" },
    { icon: Award, label: "Achievements", color: "bg-orange-500", count: "2 unlocked" }
  ];

  const recentActivity = [
    { type: "course", title: "JavaScript Fundamentals", action: "Completed Chapter 3", time: "2 hours ago", xp: 25 },
    { type: "achievement", title: "Speed Learner", action: "Achievement unlocked", time: "1 day ago", xp: 50 },
    { type: "trade", title: "BTC/USDT", action: "Successful trade", time: "2 days ago", xp: 15 },
    { type: "purchase", title: "Premium Course", action: "Purchased successfully", time: "3 days ago", xp: 10 }
  ];

  const upcomingDeadlines = [
    { title: "React Advanced Quiz", date: "Tomorrow", time: "2:00 PM" },
    { title: "Trading Contest", date: "Oct 12", time: "9:00 AM" },
    { title: "Course Assignment", date: "Oct 15", time: "11:59 PM" }
  ];

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
                    <Activity className="w-4 h-4" />
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
                    style={{ width: `${(user.xp / user.xpToNext) * 100}%` }}
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
                  <button
                    key={index}
                    className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition group"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm font-medium text-gray-800 mb-1">{action.label}</div>
                    <div className="text-xs text-gray-500">{action.count}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Courses</h3>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-3xl font-bold text-blue-600">12</span>
                    <span className="text-gray-500 text-sm mb-1">enrolled</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Trading</h3>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-3xl font-bold text-green-600">+12.5%</span>
                    <span className="text-gray-500 text-sm mb-1">this week</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Achievements</h3>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-3xl font-bold text-orange-600">24</span>
                    <span className="text-gray-500 text-sm mb-1">unlocked</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const getIcon = (type: string) => {
                    switch (type) {
                      case 'course': return BookOpen;
                      case 'achievement': return Award;
                      case 'trade': return RefreshCw;
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

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;