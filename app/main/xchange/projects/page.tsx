"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '../../../../components/Layout';
import { 
  Lightbulb, 
  Plus,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Heart,
  MessageSquare,
  Eye,
  ChevronRight,
  Star,
  User,
  Tag,
  Award,
  GitFork,
  Download
} from 'lucide-react';

// Types
interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  author_id: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  estimated_time: string;
  tags: string[];
  featured_image_url: string;
  upvotes: number;
  downvotes: number;
  comments_count: number;
  views: number;
  forks: number;
  downloads: number;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Smart Home Automation System',
    description: 'Complete IoT system using ESP32 and sensors to automate lights, temperature, and security with mobile app control.',
    content: 'Detailed build instructions...',
    author: 'IoTBuilder',
    author_id: 'user1',
    difficulty_level: 'intermediate',
    estimated_time: '2-3 weeks',
    tags: ['IoT', 'ESP32', 'Automation', 'Sensors', 'Mobile App'],
    featured_image_url: '/placeholder-project1.jpg',
    upvotes: 45,
    downvotes: 2,
    comments_count: 23,
    views: 324,
    forks: 12,
    downloads: 89,
    created_at: '2024-10-08T10:00:00Z',
    updated_at: '2024-10-08T10:00:00Z',
    is_featured: true
  },
  {
    id: '2',
    title: 'Voice-Controlled Robot Car',
    description: 'Build a robot car that responds to voice commands using Arduino, speech recognition module, and motor drivers.',
    content: 'Step by step guide...',
    author: 'RoboticsGuru',
    author_id: 'user2',
    difficulty_level: 'advanced',
    estimated_time: '1-2 weeks',
    tags: ['Robotics', 'Arduino', 'Voice Control', 'Motors', 'AI'],
    featured_image_url: '/placeholder-project2.jpg',
    upvotes: 38,
    downvotes: 1,
    comments_count: 16,
    views: 278,
    forks: 8,
    downloads: 67,
    created_at: '2024-10-07T14:30:00Z',
    updated_at: '2024-10-07T14:30:00Z',
    is_featured: false
  },
  {
    id: '3',
    title: 'LED Matrix Display with Animations',
    description: 'Create stunning visual effects and text scrolling using an 8x8 LED matrix and Arduino with custom animations.',
    content: 'Build instructions and code...',
    author: 'LEDMaster',
    author_id: 'user3',
    difficulty_level: 'beginner',
    estimated_time: '3-5 days',
    tags: ['LED', 'Arduino', 'Display', 'Animation', 'Electronics'],
    featured_image_url: '/placeholder-project3.jpg',
    upvotes: 29,
    downvotes: 0,
    comments_count: 12,
    views: 198,
    forks: 15,
    downloads: 124,
    created_at: '2024-10-06T09:15:00Z',
    updated_at: '2024-10-06T09:15:00Z',
    is_featured: false
  },
  {
    id: '4',
    title: 'AI-Powered Plant Monitoring System',
    description: 'Monitor plant health using sensors and machine learning to predict watering needs and growth patterns.',
    content: 'Complete AI project guide...',
    author: 'PlantAI',
    author_id: 'user4',
    difficulty_level: 'advanced',
    estimated_time: '3-4 weeks',
    tags: ['AI', 'Machine Learning', 'IoT', 'Plants', 'Sensors', 'Python'],
    featured_image_url: '/placeholder-project4.jpg',
    upvotes: 52,
    downvotes: 3,
    comments_count: 31,
    views: 456,
    forks: 18,
    downloads: 93,
    created_at: '2024-10-05T16:45:00Z',
    updated_at: '2024-10-05T16:45:00Z',
    is_featured: true
  }
];

const ProjectsPage = () => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState('latest');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = mockProjects.filter(project => {
    const matchesDifficulty = difficultyFilter === 'all' || project.difficulty_level === difficultyFilter;
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDifficulty && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.upvotes - a.upvotes;
      case 'comments':
        return b.comments_count - a.comments_count;
      case 'views':
        return b.views - a.views;
      case 'forks':
        return b.forks - a.forks;
      default: // latest
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/main/xchange/project/${project.id}`)}
    >
      {/* Project Image */}
      <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center relative">
        <Lightbulb className="w-16 h-16 text-blue-400" />
        {project.is_featured && (
          <div className="absolute top-3 left-3">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
        )}
        <div className="absolute top-3 right-3 flex items-center gap-1 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
          <Eye className="w-3 h-3" />
          <span className="text-xs">{project.views}</span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty_level)}`}>
                {project.difficulty_level}
              </span>
              <span className="text-xs text-gray-500">{project.estimated_time}</span>
            </div>
            <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-2 line-clamp-2">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3 mb-3">
              {project.description}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{project.upvotes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{project.comments_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>{project.forks}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{project.downloads}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" />
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">by {project.author}</span>
          </div>
          <span className="text-xs text-gray-500">{formatDate(project.created_at)}</span>
        </div>
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
              <h1 className="text-2xl font-bold text-gray-800">Project Showcase</h1>
              <p className="text-gray-600">Discover and share amazing projects from the community</p>
            </div>
            <button
              onClick={() => router.push('/main/xchange/create-project')}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Share Project
            </button>
          </div>

          {/* Stats Bar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-blue-600">127</div>
                <div className="text-sm text-gray-600">Total Projects</div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-green-600">89</div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-orange-600">234</div>
                <div className="text-sm text-gray-600">Total Forks</div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-purple-600">1.2k</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
                <h3 className="font-semibold text-gray-800 mb-4">Filters</h3>
                
                {/* Difficulty Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                {/* Popular Tags */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-800 mb-3">Popular Tags</h4>
                  <div className="space-y-2">
                    {['Arduino', 'ESP32', 'IoT', 'AI', 'Robotics', '3D Printing', 'Sensors'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Stats */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Community Stats</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Projects Today</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Builders</span>
                      <span className="font-medium text-green-600">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Upvotes</span>
                      <span className="font-medium">1,847</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search and Sort */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search projects, tags, or authors..."
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
                      <option value="latest">Latest</option>
                      <option value="popular">Most Popular</option>
                      <option value="comments">Most Discussed</option>
                      <option value="views">Most Viewed</option>
                      <option value="forks">Most Forked</option>
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

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedProjects.length > 0 ? (
                  sortedProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))
                ) : (
                  <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No projects found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchQuery ? 
                        `No projects match your search for "${searchQuery}"` :
                        `No projects match the current filters`
                      }
                    </p>
                    <button
                      onClick={() => router.push('/main/xchange/create-project')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Share Your Project
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

export default ProjectsPage;