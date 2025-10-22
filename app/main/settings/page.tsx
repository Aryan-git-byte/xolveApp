"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Shield, Globe, HelpCircle, FileText, Lock, ChevronRight } from 'lucide-react';
import { Header, Footer } from '@/components/Layout';

export default function SettingsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  // ...existing code...

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleLogout = async () => {
    // This will be handled by the header component
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Settings</h1>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm rounded-lg p-6 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Profile</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">Edit Profile</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Update your personal information</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">Change Password</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </div>



            {/* Privacy & Security */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Privacy & Security</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">Privacy Settings</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Control your data and privacy</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">Data & Storage</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manage your data and storage</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </div>

            {/* Support & Legal */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Support & Legal</h2>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={() => router.push('/main/help-support')}
                  className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition"
                >
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">Help & Support</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get help and contact support</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </button>
                <button 
                  onClick={() => router.push('/main/terms-conditions')}
                  className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition"
                >
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">Terms & Conditions</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Read our terms of service</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </button>
                <button 
                  onClick={() => router.push('/main/privacy-policy')}
                  className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition"
                >
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">Privacy Policy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Learn how we protect your data</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </button>
              </div>
            </div>



            {/* Account Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Account</h2>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition font-medium"
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
