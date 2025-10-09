"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '../../components/Layout';
import { BookOpen } from 'lucide-react';

// Main Layout Component
const XolveTechLayout = () => {
  const router = useRouter();

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