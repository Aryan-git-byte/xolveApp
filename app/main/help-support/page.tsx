"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, MessageCircle, Phone, Mail, HelpCircle, BookOpen, Bug, Lightbulb, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Header, Footer } from '@/components/Layout';

export default function HelpSupportPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleBack = () => {
    router.back();
  };

  const faqData = [
    {
      id: 1,
      question: "How do I create a new thread?",
      answer: "To create a new thread, go to the Xchange section and click the 'Create Thread' button. Fill in your question or topic, add relevant tags, and select the appropriate category. Make sure to provide a clear and descriptive title.",
      category: "threads"
    },
    {
      id: 2,
      question: "How do I earn XP points?",
      answer: "You can earn XP points by participating in discussions, helping other users, creating quality content, and maintaining an active streak. Each helpful reply, upvoted content, and daily activity contributes to your XP.",
      category: "xp"
    },
    {
      id: 3,
      question: "How do I change my profile settings?",
      answer: "Go to Settings from the hamburger menu in the header, then select 'Profile' to update your personal information, change your password, or modify your preferences.",
      category: "profile"
    },
    {
      id: 4,
      question: "How do I report inappropriate content?",
      answer: "You can report inappropriate content by clicking the flag icon on any post or comment. Our moderation team will review the report and take appropriate action if necessary.",
      category: "moderation"
    },
    {
      id: 5,
      question: "How do I enable notifications?",
      answer: "Go to Settings > Notifications to customize your notification preferences. You can enable/disable push notifications, email notifications, and SMS notifications.",
      category: "notifications"
    },
    {
      id: 6,
      question: "How do I delete my account?",
      answer: "To delete your account, go to Settings > Account and select 'Delete Account'. Please note that this action is irreversible and all your data will be permanently removed.",
      category: "account"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'threads', name: 'Threads & Posts', icon: MessageCircle },
    { id: 'xp', name: 'XP & Rewards', icon: Lightbulb },
    { id: 'profile', name: 'Profile & Settings', icon: HelpCircle },
    { id: 'moderation', name: 'Reporting & Moderation', icon: Bug },
    { id: 'notifications', name: 'Notifications', icon: MessageCircle },
    { id: 'account', name: 'Account Management', icon: HelpCircle }
  ];

  const filteredFaq = faqData.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (searchQuery === '' || faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
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
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Help & Support</h1>
          </div>

          {/* Search Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition text-left">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Live Chat</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get instant help from our support team</p>
            </button>
            
            <button className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition text-left">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Call Support</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Speak directly with our support team</p>
            </button>
            
            <button className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition text-left">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Email Support</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Send us an email and we'll get back to you</p>
            </button>
          </div>

          {/* Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-3 rounded-lg border transition ${
                      selectedCategory === category.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:text-blue-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {filteredFaq.map((faq) => (
                <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-100">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
              {filteredFaq.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No results found for your search.</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Still need help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>📧 Email: support@xolvetech.com</p>
                  <p>📞 Phone: +1 (555) 123-4567</p>
                  <p>🕒 Hours: Mon-Fri 9AM-6PM EST</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Additional Resources</h3>
                <div className="space-y-2">
                  <button className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:text-blue-400 transition">
                    <ExternalLink className="w-4 h-4" />
                    Community Guidelines
                  </button>
                  <button className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:text-blue-400 transition">
                    <ExternalLink className="w-4 h-4" />
                    Video Tutorials
                  </button>
                  <button className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:text-blue-400 transition">
                    <ExternalLink className="w-4 h-4" />
                    User Manual
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
