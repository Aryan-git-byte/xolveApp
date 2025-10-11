"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Bell, Shield, Palette, Globe, HelpCircle, FileText, Lock, ChevronRight, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { Header, Footer } from '@/components/Layout';

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: false,
  });
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [sound, setSound] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const handleLogout = async () => {
    // This will be handled by the header component
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-white rounded-lg shadow-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Edit Profile</h3>
                    <p className="text-sm text-gray-600">Update your personal information</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Change Password</h3>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Push Notifications</h3>
                    <p className="text-sm text-gray-600">Receive notifications on your device</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications.push ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    aria-label="Toggle push notifications"
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.push ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications.email ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    aria-label="Toggle email notifications"
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.email ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">SMS Notifications</h3>
                    <p className="text-sm text-gray-600">Receive updates via SMS</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications.sms ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    aria-label="Toggle SMS notifications"
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.sms ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">Appearance</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Theme</h3>
                    <p className="text-sm text-gray-600">Choose your preferred theme</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-2 rounded-lg transition ${
                        theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}
                      aria-label="Set light theme"
                    >
                      <Sun className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-2 rounded-lg transition ${
                        theme === 'dark' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}
                      aria-label="Set dark theme"
                    >
                      <Moon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Language</h3>
                    <p className="text-sm text-gray-600">Choose your preferred language</p>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Select language"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">Privacy & Security</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Privacy Settings</h3>
                    <p className="text-sm text-gray-600">Control your data and privacy</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">Data & Storage</h3>
                    <p className="text-sm text-gray-600">Manage your data and storage</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Support & Legal */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">Support & Legal</h2>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={() => router.push('/main/help-support')}
                  className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">Help & Support</h3>
                    <p className="text-sm text-gray-600">Get help and contact support</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button 
                  onClick={() => router.push('/main/terms-conditions')}
                  className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">Terms & Conditions</h3>
                    <p className="text-sm text-gray-600">Read our terms of service</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                <button 
                  onClick={() => router.push('/main/privacy-policy')}
                  className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">Privacy Policy</h3>
                    <p className="text-sm text-gray-600">Learn how we protect your data</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Sound Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                {sound ? <Volume2 className="w-5 h-5 text-blue-600" /> : <VolumeX className="w-5 h-5 text-blue-600" />}
                <h2 className="text-lg font-semibold text-gray-800">Sound</h2>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Sound Effects</h3>
                  <p className="text-sm text-gray-600">Enable or disable sound effects</p>
                </div>
                <button
                  onClick={() => setSound(!sound)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    sound ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label="Toggle sound effects"
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    sound ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-800">Account</h2>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
                  aria-label="Logout from account"
                >
                  <Lock className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
