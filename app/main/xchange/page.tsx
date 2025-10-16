"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '../../../components/Layout';
import { 
  MessageCircle, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Trophy, 
  Plus,
  Search,
  Filter,
  Heart,
  MessageSquare,
  Eye,
  ChevronRight,
  X
} from 'lucide-react';

// Mock data
const mockTrendingThreads = [
  {
    id: '1',
    title: 'Best Arduino sensors for beginners?',
    author: 'TechExplorer',
    category: 'Electronics',
    upvotes: 24,
    replies: 12,
    views: 156,
    created_at: '2h',
    category_color: '#f59e0b'
  },
  {
    id: '2',
    title: 'My first AI chatbot project - need feedback!',
    author: 'AIStudent',
    category: 'AI',
    upvotes: 18,
    replies: 8,
    views: 89,
    created_at: '4h',
    category_color: '#8b5cf6'
  },
  {
    id: '3',
    title: 'How to optimize Python code for machine learning?',
    author: 'CodeMaster',
    category: 'Programming',
    upvotes: 31,
    replies: 15,
    views: 203,
    created_at: '6h',
    category_color: '#ef4444'
  },
  {
    id: '4',
    title: 'IoT security best practices in 2025',
    author: 'SecureDevs',
    category: 'IoT',
    upvotes: 27,
    replies: 10,
    views: 145,
    created_at: '8h',
    category_color: '#10b981'
  }
];

const mockFeaturedProjects = [
  {
    id: '1',
    title: 'Smart Home Automation System',
    author: 'IoTBuilder',
    description: 'Complete IoT system using ESP32 and sensors to automate lights, temperature, and security.',
    upvotes: 45,
    comments: 23,
    difficulty: 'intermediate',
    tags: ['IoT', 'ESP32', 'Automation']
  },
  {
    id: '2',
    title: 'Voice-Controlled Robot Car',
    author: 'RoboticsGuru',
    description: 'Build a robot car that responds to voice commands using Arduino and speech recognition.',
    upvotes: 38,
    comments: 16,
    difficulty: 'advanced',
    tags: ['Robotics', 'Arduino', 'Voice Control']
  }
];

const XChangePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  type StatCardProps = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    value: string;
    gradient: string;
  };

  const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, gradient }) => (
    <div className={`${gradient} rounded-lg p-3 sm:p-4 text-white shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs opacity-90 mb-0.5">{title}</p>
          <p className="text-xl sm:text-2xl font-bold">{value}</p>
        </div>
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 opacity-80" />
      </div>
    </div>
  );

  type Thread = {
    id: string;
    title: string;
    author: string;
    category: string;
    upvotes: number;
    replies: number;
    views: number;
    created_at: string;
    category_color: string;
  };

  const ThreadCard: React.FC<{ thread: Thread }> = ({ thread }) => (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-4 active:bg-gray-50 transition"
      onClick={() => router.push(`/main/xchange/thread/${thread.id}`)}
    >
      <div className="flex items-start gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span 
              className="px-2 py-0.5 rounded-full text-xs font-medium text-white shrink-0"
              style={{ backgroundColor: thread.category_color }}
            >
              {thread.category}
            </span>
            <span className="text-xs text-gray-500 truncate">{thread.author}</span>
            <span className="text-xs text-gray-400">• {thread.created_at}</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base leading-snug">
            {thread.title}
          </h3>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{thread.upvotes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{thread.replies}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{thread.views}</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );

  type Project = {
    id: string;
    title: string;
    author: string;
    description: string;
    upvotes: number;
    comments: number;
    difficulty: string;
    tags: string[];
  };

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden active:bg-gray-50 transition"
      onClick={() => router.push(`/main/xchange/project/${project.id}`)}
    >
      <div className="h-32 sm:h-40 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 flex items-center justify-center">
        <Lightbulb className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            project.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {project.difficulty}
          </span>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              <span>{project.upvotes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{project.comments}</span>
            </div>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base mb-1.5 line-clamp-2">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-600 dark:text-blue-400 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500 truncate">by {project.author}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      {/* Hero Section - Mobile Optimized */}
      <div className="pt-16 pb-4 sm:pt-20 sm:pb-6 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">XChange</h1>
            <p className="text-sm sm:text-base md:text-lg opacity-90 mb-4 sm:mb-6">Connect, Learn & Build Together</p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto">
              <StatCard icon={Users} title="Members" value="1.2K" gradient="bg-gradient-to-br from-blue-500 to-blue-600" />
              <StatCard icon={MessageCircle} title="Threads" value="856" gradient="bg-gradient-to-br from-green-500 to-green-600" />
              <StatCard icon={Lightbulb} title="Projects" value="423" gradient="bg-gradient-to-br from-orange-500 to-orange-600" />
              <StatCard icon={Trophy} title="Badges" value="2.3K" gradient="bg-gradient-to-br from-purple-500 to-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <main className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Tabs - Mobile Optimized */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4 -mt-2 sticky top-16 z-40">
            <div className="p-2 sm:p-3">
              {/* Search Bar - Mobile First */}
              <div className="mb-2 sm:mb-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search community..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  />
                  <button 
                    className="p-1.5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                    aria-label="Filter"
                    title="Filter"
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tabs - Horizontal Scroll on Mobile */}
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                {[
                  { id: 'feed', label: 'Feed', icon: TrendingUp },
                  { id: 'threads', label: 'Threads', icon: MessageCircle },
                  { id: 'projects', label: 'Projects', icon: Lightbulb },
                  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-blue-100 text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden xs:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'feed' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Create Actions - Mobile Optimized */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => router.push('/main/xchange/create-thread')}
                  className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 transition-colors text-sm sm:text-base font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Thread</span>
                </button>
                <button
                  onClick={() => router.push('/main/xchange/create-project')}
                  className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 active:bg-orange-800 transition-colors text-sm sm:text-base font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Project</span>
                </button>
              </div>

              {/* Trending Threads */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">Trending Discussions</h2>
                  <button 
                    onClick={() => router.push('/main/xchange/threads')}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:text-blue-400 font-medium text-xs sm:text-sm"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {mockTrendingThreads.map(thread => (
                    <ThreadCard key={thread.id} thread={thread} />
                  ))}
                </div>
              </div>

              {/* Featured Projects */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">Featured Projects</h2>
                  <button 
                    onClick={() => router.push('/main/xchange/projects')}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:text-blue-400 font-medium text-xs sm:text-sm"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {mockFeaturedProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>

              {/* Community Guidelines - Mobile Optimized */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100 p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">Community Guidelines</h3>
                <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1.5">
                  <li>• Be respectful and constructive</li>
                  <li>• Share knowledge and help others</li>
                  <li>• Keep discussions relevant</li>
                  <li>• No spam or self-promotion</li>
                </ul>
              </div>
            </div>
          )}

          {/* Other tabs content */}
          {activeTab !== 'feed' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'threads' && <MessageCircle className="w-8 h-8 text-gray-400" />}
                {activeTab === 'projects' && <Lightbulb className="w-8 h-8 text-gray-400" />}
                {activeTab === 'leaderboard' && <Trophy className="w-8 h-8 text-gray-400" />}
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">This section is under development.</p>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button - Mobile Only */}
      <button 
        onClick={() => setShowCreateMenu(!showCreateMenu)}
        className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white active:scale-95 transition-transform z-40"
      >
        {showCreateMenu ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>

      {/* Create Menu - Mobile */}
      {showCreateMenu && (
        <div className="md:hidden fixed bottom-36 right-4 bg-white rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 z-40">
          <button 
            onClick={() => {
              setShowCreateMenu(false);
              router.push('/main/xchange/create-thread');
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg active:bg-gray-100 text-left"
          >
            <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">New Thread</span>
          </button>
          <button 
            onClick={() => {
              setShowCreateMenu(false);
              router.push('/main/xchange/create-project');
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg active:bg-gray-100 text-left"
          >
            <Lightbulb className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">New Project</span>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default XChangePage;