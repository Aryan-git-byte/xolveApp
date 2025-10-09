"use client";
import React, { useState } from 'react';
import { Header, Footer } from '../../../components/Layout';
import { 
  Settings,
  Edit,
  Camera,
  Shield,
  CreditCard,
  Award,
  Activity,
  Star,
  Clock,
  ChevronRight,
  LogOut,
  HelpCircle,
  Moon,
  Smartphone,
  Mail,
  Globe,
  Key,
  BookOpen,
  RefreshCw,
  Bell,
  User
} from 'lucide-react';

// Profile Page Component
const ProfilePage = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@xolvetech.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    level: 15,
    xp: 2450,
    totalCourses: 12,
    completedCourses: 8,
    achievements: 24,
    tradingProfit: 12.5
  });

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const achievements = [
    { name: "First Course", description: "Completed your first course", icon: BookOpen, earned: true },
    { name: "Speed Learner", description: "Finished 3 courses in a week", icon: Activity, earned: true },
    { name: "Trading Pro", description: "Made 10 successful trades", icon: RefreshCw, earned: true },
    { name: "Community Star", description: "Helped 50 fellow learners", icon: Star, earned: false },
    { name: "Knowledge Master", description: "Completed 20 courses", icon: Award, earned: false },
    { name: "Early Adopter", description: "Joined in the first month", icon: Clock, earned: true }
  ];

  const menuItems = [
    {
      category: "Account",
      items: [
        { icon: Edit, label: "Edit Profile", subtitle: "Update your personal information" },
        { icon: Key, label: "Security", subtitle: "Password and authentication" },
        { icon: CreditCard, label: "Payment Methods", subtitle: "Manage your cards and billing" },
        { icon: Smartphone, label: "Connected Devices", subtitle: "Manage device access" }
      ]
    },
    {
      category: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", subtitle: "Customize your alerts", toggle: true, value: notifications },
        { icon: Moon, label: "Dark Mode", subtitle: "Switch to dark theme", toggle: true, value: darkMode },
        { icon: Globe, label: "Language", subtitle: "English", hasArrow: true },
        { icon: Shield, label: "Privacy", subtitle: "Control your data sharing" }
      ]
    },
    {
      category: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", subtitle: "Get help and support" },
        { icon: Mail, label: "Contact Support", subtitle: "Reach out to our team" },
        { icon: Settings, label: "App Settings", subtitle: "Advanced app configuration" },
        { icon: LogOut, label: "Sign Out", subtitle: "Sign out of your account", danger: true }
      ]
    }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content Area */}
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">JD</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h1>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p className="text-sm text-gray-500 mb-4">Member since {user.joinDate}</p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Level {user.level}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Activity className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-700">{user.xp} XP</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                      <Award className="w-3 h-3 text-orange-600" />
                    </div>
                    <span className="text-gray-700">{user.achievements} Achievements</span>
                  </div>
                </div>
              </div>
              
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{user.totalCourses}</div>
              <div className="text-sm text-gray-600">Courses Enrolled</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{user.completedCourses}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">+{user.tradingProfit}%</div>
              <div className="text-sm text-gray-600">Trading Profit</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{user.achievements}</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.slice(0, 6).map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition ${
                      achievement.earned
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                      achievement.earned
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{achievement.name}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Settings Menu */}
          <div className="space-y-4">
            {menuItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{section.category}</h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={itemIndex}
                        className={`w-full flex items-center gap-4 p-3 rounded-lg transition ${
                          (item as any).danger 
                            ? 'hover:bg-red-50 text-red-600' 
                            : 'hover:bg-gray-50 text-gray-800'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          (item as any).danger 
                            ? 'bg-red-100' 
                            : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${(item as any).danger ? 'text-red-600' : 'text-gray-600'}`} />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-sm text-gray-500">{item.subtitle}</div>
                        </div>
                        
                        {(item as any).toggle && (
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={(item as any).value}
                              onChange={() => {
                                if (item.label === 'Notifications') setNotifications(!notifications);
                                if (item.label === 'Dark Mode') setDarkMode(!darkMode);
                              }}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        )}
                        
                        {(item as any).hasArrow && (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;