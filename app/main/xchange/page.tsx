"use client";
import React, { useState, useEffect } from 'react';
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
  Clock,
  Heart,
  MessageSquare,
  Eye,
  ChevronRight,
  LucideIcon
} from 'lucide-react';

// Types
interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  color?: string;
}

interface Thread {
  id: string;
  title: string;
  author: string;
  category: string;
  upvotes: number;
  replies: number;
  views: number;
  created_at: string;
  category_color: string;
}

interface Project {
  id: string;
  title: string;
  author: string;
  description: string;
  featured_image: string;
  upvotes: number;
  comments: number;
  difficulty: string;
  tags: string[];
}

// Mock data - replace with real data from Supabase
const mockTrendingThreads = [
  {
    id: '1',
    title: 'Best Arduino sensors for beginners?',
    author: 'TechExplorer',
    category: 'Electronics',
    upvotes: 24,
    replies: 12,
    views: 156,
    created_at: '2 hours ago',
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
    created_at: '4 hours ago',
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
    created_at: '6 hours ago',
    category_color: '#ef4444'
  }
];

const mockFeaturedProjects = [
  {
    id: '1',
    title: 'Smart Home Automation System',
    author: 'IoTBuilder',
    description: 'Complete IoT system using ESP32 and sensors to automate lights, temperature, and security.',
    featured_image: '/placeholder-project1.jpg',
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
    featured_image: '/placeholder-project2.jpg',
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

  const handleCreateThread = () => {
    router.push('/main/xchange/create-thread');
  };

  const handleCreateProject = () => {
    router.push('/main/xchange/create-project');
  };

  const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, color = "blue" }) => (
    <div className={`bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-lg p-4 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </div>
  );

  const ThreadCard: React.FC<{ thread: Thread }> = ({ thread }) => (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/main/xchange/thread/${thread.id}`)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span 
              className="px-2 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: thread.category_color }}
            >
              {thread.category}
            </span>
            <span className="text-sm text-gray-500">by {thread.author}</span>
            <span className="text-sm text-gray-400">• {thread.created_at}</span>
          </div>
          <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {thread.title}
          </h3>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
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
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/main/xchange/project/${project.id}`)}
    >
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <Lightbulb className="w-12 h-12 text-gray-400" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {project.difficulty}
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{project.upvotes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{project.comments}</span>
            </div>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 2).map((tag: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                {tag}
              </span>
            ))}
            {project.tags.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{project.tags.length - 2}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">by {project.author}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-20 pb-8 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to XChange</h1>
            <p className="text-xl opacity-90 mb-8">Connect, Learn, and Build with the XolveTech Community</p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <StatCard icon={Users} title="Members" value="1,245" color="blue" />
              <StatCard icon={MessageCircle} title="Threads" value="856" color="green" />
              <StatCard icon={Lightbulb} title="Projects" value="423" color="orange" />
              <StatCard icon={Trophy} title="Achievements" value="2,341" color="purple" />
            </div>
          </div>
        </div>
      </div>

      <main className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 -mt-4 relative z-10">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-1">
                {[
                  { id: 'feed', label: 'Feed', icon: TrendingUp },
                  { id: 'threads', label: 'Threads', icon: MessageCircle },
                  { id: 'projects', label: 'Projects', icon: Lightbulb },
                  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search community..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'feed' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                {/* Create Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex gap-3">
                    <button
                      onClick={handleCreateThread}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Start Discussion
                    </button>
                    <button
                      onClick={handleCreateProject}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Share Project
                    </button>
                  </div>
                </div>

                {/* Trending Threads */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Trending Discussions</h2>
                    <button 
                      onClick={() => router.push('/main/xchange/threads')}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {mockTrendingThreads.map(thread => (
                      <ThreadCard key={thread.id} thread={thread} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Featured Projects */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Featured Projects</h3>
                    <button 
                      onClick={() => router.push('/main/xchange/projects')}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {mockFeaturedProjects.map(project => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>

                {/* Community Guidelines */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Community Guidelines</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Be respectful and constructive</li>
                    <li>• Share knowledge and help others</li>
                    <li>• Keep discussions relevant</li>
                    <li>• No spam or self-promotion</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content - placeholder for now */}
          {activeTab !== 'feed' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
              </h2>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default XChangePage;