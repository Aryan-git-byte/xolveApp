"use client";
import React, { useState } from 'react';
import { 
  ArrowLeft, Heart, MessageSquare, Eye, Share2, Flag, Star,
  ArrowUp, ArrowDown, Send, MoreHorizontal, Clock, User,
  CheckCircle, GitFork, Download, ExternalLink, Github,
  Tag, Wrench, Package, Calendar, Trophy, Bookmark, Copy
} from 'lucide-react';

// Mock Data
const mockProject = {
  id: '1',
  title: 'Smart Home Automation System',
  description: 'Complete IoT system using ESP32 and sensors to automate lights, temperature, and security with mobile app control.',
  content: `Smart Home Automation System\n\nThis project demonstrates how to build a comprehensive smart home automation system using ESP32 microcontroller and various sensors. The system can monitor temperature, humidity, motion, and light levels while providing remote control through a mobile application.\n\nOverview:\nThe Smart Home Automation System integrates multiple sensors and actuators to create an intelligent home environment.\n\nFeatures:\n- Temperature & Humidity Monitoring using DHT22 sensor\n- Motion Detection with PIR sensor for security\n- Light Level Detection with LDR sensor\n- Remote Control via web interface and mobile app\n- Real-time Data with MQTT communication`,
  author: 'IoTBuilder',
  author_id: 'user1',
  difficulty_level: 'intermediate',
  estimated_time: '2-3 weeks',
  tags: ['IoT', 'ESP32', 'Automation', 'Sensors', 'Mobile App', 'MQTT', 'Smart Home'],
  materials: [
    'ESP32 Development Board',
    'DHT22 Temperature/Humidity Sensor',
    'PIR Motion Sensor',
    'LDR Light Sensor',
    '2-Channel Relay Module',
    'Breadboard and Jumper Wires',
    'Power Supply (5V/3.3V)',
    'Resistors (10kΩ, 220Ω)',
    'LED Indicators',
    'Enclosure Box'
  ],
  tools: [
    'Soldering Iron and Solder',
    'Wire Strippers',
    'Multimeter',
    'Screwdrivers',
    'Drill with Bits',
    'Hot Glue Gun',
    'Computer with Arduino IDE'
  ],
  images: ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg'],
  upvotes: 45,
  downvotes: 2,
  comments_count: 23,
  views: 324,
  forks: 12,
  downloads: 89,
  github_url: 'https://github.com/iotbuilder/smart-home-automation',
  demo_url: 'https://smarthome-demo.iotbuilder.com',
  created_at: '2024-10-08T10:00:00Z',
  updated_at: '2024-10-08T10:00:00Z',
  is_featured: true
};

const mockComments = [
  {
    id: '1',
    project_id: '1',
    content: 'Amazing project! I built this last month and it works perfectly. The mobile app integration is especially impressive. One suggestion: consider adding temperature alerts when it gets too hot or cold.',
    author: 'TechEnthusiast',
    author_id: 'user2',
    upvotes: 12,
    downvotes: 0,
    created_at: '2024-10-08T14:30:00Z',
    is_edited: false
  },
  {
    id: '2',
    project_id: '1',
    content: 'Great documentation! Quick question: what\'s the power consumption of the entire system? I\'m planning to run this on battery power for a remote cabin.',
    author: 'OffGridBuilder',
    author_id: 'user3',
    upvotes: 8,
    downvotes: 0,
    created_at: '2024-10-08T16:15:00Z',
    is_edited: false
  },
  {
    id: '3',
    project_id: '1',
    content: 'I\'m having trouble with the MQTT connection. The ESP32 connects to WiFi fine but can\'t reach the MQTT broker. Any troubleshooting tips?',
    author: 'BeginnerMaker',
    author_id: 'user4',
    upvotes: 3,
    downvotes: 0,
    created_at: '2024-10-09T09:20:00Z',
    is_edited: false
  }
];

const ProjectDetailPage = () => {
  const [project] = useState(mockProject);
  const [comments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullContent, setShowFullContent] = useState(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDifficultyColor = (difficulty: string): string => {
    const colors: { [key: string]: string } = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-yellow-100 text-yellow-700',
      advanced: 'bg-red-100 text-red-700'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700 dark:text-gray-300';
  };

  const handleVote = (type: 'up' | 'down'): void => {
    setUserVote(userVote === type ? null : type);
  };

  const handleSubmitComment = (): void => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setNewComment('');
      setIsSubmitting(false);
    }, 1000);
  };

  const Comment = ({ comment }: { comment: typeof mockComments[0] }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4 last:border-b-0">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-gray-800 dark:text-gray-100 text-sm truncate">{comment.author}</span>
              {comment.author_id === project.author_id && (
                <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-xs rounded flex-shrink-0">
                  Author
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {formatDate(comment.created_at)} {comment.is_edited && '• edited'}
            </div>
          </div>
        </div>
        <button className="p-1 text-gray-400 flex-shrink-0">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="ml-10 mb-3">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{comment.content}</p>
      </div>

      <div className="ml-10 flex items-center gap-4">
        <div className="flex items-center">
          <button className="p-1 text-gray-500 active:text-green-600">
            <ArrowUp className="w-4 h-4" />
          </button>
          <span className="mx-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            {comment.upvotes - comment.downvotes}
          </span>
          <button className="p-1 text-gray-500 active:text-red-600">
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
        
        <button className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 active:text-gray-800 dark:text-gray-100">
          <Share2 className="w-3 h-3" />
          Share
        </button>
        
        <button className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 active:text-gray-800 dark:text-gray-100">
          <Flag className="w-3 h-3" />
          Report
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => window.history.back()}
            className="p-2 -ml-2 text-gray-600 dark:text-gray-400 active:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate flex-1 mx-3">
            {project.title}
          </h1>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 -mr-2 rounded-lg active:bg-gray-100 transition-colors ${isBookmarked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}
          >
            <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 pb-20">
        {/* Hero Image Gallery */}
        <div className="bg-white">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <div className="text-center">
              <Package className="w-12 h-12 text-blue-400 mx-auto mb-2" />
              <span className="text-blue-400 text-sm">Project Image</span>
            </div>
          </div>
          <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
            {project.images.slice(1).map((img, idx) => (
              <div key={idx} className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-xs font-medium">#{idx + 2}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4">
          {/* Project Header */}
          <div className="py-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {project.is_featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty_level)}`}>
                {project.difficulty_level}
              </span>
              <span className="text-xs text-gray-500">⏱ {project.estimated_time}</span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 leading-tight">
              {project.title}
            </h2>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-medium">{project.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatDate(project.created_at)}</span>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{project.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{project.comments_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5" />
                <span>{project.forks}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>{project.downloads}</span>
              </div>
            </div>
            
            {/* Tags - Horizontal Scroll */}
            <div className="flex gap-2 overflow-x-auto py-3 -mx-1 px-1 scrollbar-hide">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="flex-shrink-0 px-3 py-1 bg-blue-50 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sticky Vote Bar */}
          <div className="sticky top-14 z-40 bg-white border-y border-gray-200 dark:border-gray-700 -mx-4 px-4 py-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={() => handleVote('up')}
                  className={`p-2.5 rounded-lg transition-colors ${
                    userVote === 'up' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 dark:text-gray-400 active:bg-gray-200'
                  }`}
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
                <span className="mx-3 text-lg font-bold text-gray-800 dark:text-gray-100">
                  {project.upvotes - project.downvotes}
                </span>
                <button 
                  onClick={() => handleVote('down')}
                  className={`p-2.5 rounded-lg transition-colors ${
                    userVote === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 dark:text-gray-400 active:bg-gray-200'
                  }`}
                >
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2.5 text-gray-600 dark:text-gray-400 bg-gray-100 rounded-lg active:bg-gray-200 transition-colors">
                  <GitFork className="w-5 h-5" />
                </button>
                <button className="p-2.5 text-gray-600 dark:text-gray-400 bg-gray-100 rounded-lg active:bg-gray-200 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2.5 text-gray-600 dark:text-gray-400 bg-gray-100 rounded-lg active:bg-gray-200 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          {(project.github_url || project.demo_url) && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-gray-900 text-white rounded-lg active:bg-gray-800 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg active:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          )}

          {/* Project Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
            <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide">
              <nav className="flex">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'instructions', label: 'Instructions' },
                  { id: 'materials', label: 'Materials' },
                  { id: 'tools', label: 'Tools' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600 bg-orange-50'
                        : 'border-transparent text-gray-600 dark:text-gray-400 active:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4">
              {activeTab === 'overview' && (
                <div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    <div className={`whitespace-pre-wrap ${!showFullContent && 'line-clamp-6'}`}>
                      {project.content}
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowFullContent(!showFullContent)}
                    className="mt-3 text-orange-600 text-sm font-medium active:text-orange-700"
                  >
                    {showFullContent ? 'Show Less' : 'Read More'}
                  </button>
                </div>
              )}

              {activeTab === 'instructions' && (
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <div className="whitespace-pre-wrap">{project.content}</div>
                </div>
              )}

              {activeTab === 'materials' && (
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-sm">Required Materials</h3>
                  <ul className="space-y-2.5">
                    {project.materials.map((material, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                        <Package className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="flex-1">{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'tools' && (
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-sm">Required Tools</h3>
                  <ul className="space-y-2.5">
                    {project.tools.map((tool, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                        <Wrench className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="flex-1">{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Author Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{project.author}</div>
                  <div className="text-xs text-gray-500">IoT Enthusiast</div>
                </div>
              </div>
              <button className="px-4 py-1.5 text-xs font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg active:bg-blue-700 transition-colors">
                Follow
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Building smart solutions with Arduino and ESP32. Passionate about IoT and automation.
            </p>
          </div>

          {/* Comments Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                Comments ({project.comments_count})
              </h2>
            </div>

            {/* New Comment Form */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts or ask a question..."
                rows={3}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none bg-white"
              />
              <div className="flex items-center justify-end mt-3">
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isSubmitting}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-orange-600 text-white rounded-lg disabled:opacity-50 active:bg-orange-700 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Post
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="divide-y divide-gray-200">
              {comments.length > 0 ? (
                <div className="p-4">
                  {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>

            {comments.length >= 3 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full py-2.5 text-sm font-medium text-orange-600 active:text-orange-700">
                  Load More Comments
                </button>
              </div>
            )}
          </div>

          {/* Related Projects */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 text-sm">Related Projects</h3>
            <div className="space-y-2">
              {['Home Security System', 'Weather Station', 'Plant Monitor'].map((title, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg active:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">#{idx + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-800 dark:text-gray-100 truncate">{title}</div>
                    <div className="text-xs text-gray-500">by Author{idx + 1}</div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-around px-4 py-2">
          <button className="flex flex-col items-center gap-1 py-1.5 text-gray-600 dark:text-gray-400 active:text-gray-800 dark:text-gray-100 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-medium">Comment</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-1.5 text-gray-600 dark:text-gray-400 active:text-gray-800 dark:text-gray-100 transition-colors">
            <GitFork className="w-5 h-5" />
            <span className="text-xs font-medium">Fork</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-1.5 text-gray-600 dark:text-gray-400 active:text-gray-800 dark:text-gray-100 transition-colors">
            <Download className="w-5 h-5" />
            <span className="text-xs font-medium">Download</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-1.5 text-gray-600 dark:text-gray-400 active:text-gray-800 dark:text-gray-100 transition-colors">
            <Share2 className="w-5 h-5" />
            <span className="text-xs font-medium">Share</span>
          </button>
        </div>
      </nav>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetailPage;