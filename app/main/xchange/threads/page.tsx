"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '../../../../components/Layout';
import { 
  MessageCircle, 
  Plus,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Heart,
  MessageSquare,
  Eye,
  ChevronRight,
  Pin,
  Lock,
  Star,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

// Types
interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  author_id: string;
  category: string;
  category_color: string;
  upvotes: number;
  downvotes: number;
  replies: number;
  views: number;
  created_at: string;
  updated_at: string;
  is_pinned: boolean;
  is_locked: boolean;
  is_featured: boolean;
  last_activity_at: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  thread_count: number;
}

// Mock data - replace with real Supabase data
const mockCategories: Category[] = [
  { id: '1', name: 'All', description: 'All discussions', icon: 'message-circle', color: '#6b7280', thread_count: 156 },
  { id: '2', name: 'Tech', description: 'General technology discussions', icon: 'cpu', color: '#3b82f6', thread_count: 45 },
  { id: '3', name: 'AI', description: 'Artificial Intelligence and Machine Learning', icon: 'brain', color: '#8b5cf6', thread_count: 32 },
  { id: '4', name: 'Electronics', description: 'Electronics projects and circuits', icon: 'zap', color: '#f59e0b', thread_count: 28 },
  { id: '5', name: 'Robotics', description: 'Robotics projects and automation', icon: 'bot', color: '#10b981', thread_count: 21 },
  { id: '6', name: 'Programming', description: 'Coding, software development', icon: 'code', color: '#ef4444', thread_count: 18 },
  { id: '7', name: '3D Printing', description: '3D printing and design', icon: 'box', color: '#f97316', thread_count: 12 }
];

const mockThreads: Thread[] = [
  {
    id: '1',
    title: 'Best Arduino sensors for beginners?',
    content: 'I\'m just starting with Arduino and wondering what sensors are most useful for learning...',
    author: 'TechExplorer',
    author_id: 'user1',
    category: 'Electronics',
    category_color: '#f59e0b',
    upvotes: 24,
    downvotes: 2,
    replies: 12,
    views: 156,
    created_at: '2 hours ago',
    updated_at: '1 hour ago',
    last_activity_at: '30 minutes ago',
    is_pinned: true,
    is_locked: false,
    is_featured: false
  },
  {
    id: '2',
    title: 'My first AI chatbot project - need feedback!',
    content: 'Just finished my first chatbot using Python and TensorFlow. Would love some feedback...',
    author: 'AIStudent',
    author_id: 'user2',
    category: 'AI',
    category_color: '#8b5cf6',
    upvotes: 18,
    downvotes: 0,
    replies: 8,
    views: 89,
    created_at: '4 hours ago',
    updated_at: '3 hours ago',
    last_activity_at: '1 hour ago',
    is_pinned: false,
    is_locked: false,
    is_featured: true
  },
  {
    id: '3',
    title: 'How to optimize Python code for machine learning?',
    content: 'Working on a large dataset and my code is running very slowly. Any optimization tips?',
    author: 'CodeMaster',
    author_id: 'user3',
    category: 'Programming',
    category_color: '#ef4444',
    upvotes: 31,
    downvotes: 1,
    replies: 15,
    views: 203,
    created_at: '6 hours ago',
    updated_at: '5 hours ago',
    last_activity_at: '2 hours ago',
    is_pinned: false,
    is_locked: false,
    is_featured: false
  },
  {
    id: '4',
    title: 'Robot arm control with servo motors',
    content: 'Building a 6-DOF robot arm and having issues with servo control precision...',
    author: 'RobotBuilder',
    author_id: 'user4',
    category: 'Robotics',
    category_color: '#10b981',
    upvotes: 12,
    downvotes: 0,
    replies: 6,
    views: 78,
    created_at: '8 hours ago',
    updated_at: '7 hours ago',
    last_activity_at: '3 hours ago',
    is_pinned: false,
    is_locked: false,
    is_featured: false
  }
];

const ThreadsPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredThreads = mockThreads.filter(thread => {
    const matchesCategory = selectedCategory === 'All' || thread.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.upvotes - a.upvotes;
      case 'replies':
        return b.replies - a.replies;
      case 'views':
        return b.views - a.views;
      default: // latest
        return new Date(b.last_activity_at).getTime() - new Date(a.last_activity_at).getTime();
    }
  });

  const ThreadCard: React.FC<{ thread: Thread }> = ({ thread }) => (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/main/xchange/thread/${thread.id}`)}
    >
      {/* Thread Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {thread.is_pinned && <Pin className="w-4 h-4 text-green-600" />}
            {thread.is_featured && <Star className="w-4 h-4 text-yellow-500" />}
            {thread.is_locked && <Lock className="w-4 h-4 text-gray-500" />}
            
            <span 
              className="px-2 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: thread.category_color }}
            >
              {thread.category}
            </span>
            <span className="text-sm text-gray-500">by {thread.author}</span>
            <span className="text-sm text-gray-400">• {thread.created_at}</span>
          </div>
          
          <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-2">
            {thread.title}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {thread.content}
          </p>
        </div>
      </div>
      
      {/* Thread Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ArrowUp className="w-3 h-3" />
              </button>
              <span className="mx-1 font-medium">{thread.upvotes - thread.downvotes}</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{thread.replies}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{thread.views}</span>
          </div>
          <div className="text-xs">
            Last activity {thread.last_activity_at}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Community Discussions</h1>
              <p className="text-gray-600">Join the conversation and share your knowledge</p>
            </div>
            <button
              onClick={() => router.push('/main/xchange/create-thread')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Thread
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
                <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-1">
                  {mockCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.name
                          ? 'bg-blue-50 text-blue-600 border-blue-200'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {category.thread_count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Thread Stats */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Stats</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Total Threads</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Today</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Members Online</span>
                      <span className="font-medium text-green-600">47</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filters and Search */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search threads..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="latest">Latest Activity</option>
                      <option value="popular">Most Popular</option>
                      <option value="replies">Most Replies</option>
                      <option value="views">Most Viewed</option>
                    </select>
                    
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Threads List */}
              <div className="space-y-4">
                {sortedThreads.length > 0 ? (
                  sortedThreads.map(thread => (
                    <ThreadCard key={thread.id} thread={thread} />
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No threads found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchQuery ? 
                        `No threads match your search for "${searchQuery}"` :
                        `No threads in the ${selectedCategory} category yet`
                      }
                    </p>
                    <button
                      onClick={() => router.push('/main/xchange/create-thread')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Start a Discussion
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThreadsPage;