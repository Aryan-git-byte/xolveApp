"use client";

import React, { useState } from 'react';
import { Header, Footer } from '../../../components/Layout';
import { 
  Camera, Settings, Share2, MapPin, Link as LinkIcon, Github,
  Users, Eye, Calendar, BookOpen, Flame, 
  Trophy, Rocket, X, Package
} from 'lucide-react';

// Mock data
const mockUserData = {
  id: '123',
  name: 'Aryan Kumar',
  email: 'aryan@xolvehub.com',
  bio: 'Passionate about robotics and IoT. Love building things that solve real-world problems! 🚀',
  tagline: 'Robotics Enthusiast | Built 5 projects | Level 12 Innovator',
  profile_picture_url: null,
  cover_image_url: null,
  location: 'Mumbai, India',
  website_url: 'https://aryan.dev',
  github_url: 'https://github.com/aryan',
  level: 12,
  total_xp: 4350,
  xp_to_next_level: 650,
  rank: 'Innovator',
  rank_color: '#ffd700',
  projects_count: 5,
  kits_owned_count: 3,
  courses_enrolled_count: 4,
  courses_completed_count: 2,
  badges_earned_count: 8,
  current_streak: 7,
  longest_streak: 15,
  followers_count: 234,
  following_count: 89,
  profile_views: 1234,
  date_joined: '2024-01-15'
};

const mockProjects = [
  {
    id: '1',
    title: 'Smart Home Automation',
    description: 'IoT-based home automation system with ESP32',
    thumbnail_url: null,
    category: 'IoT',
    difficulty_level: 'intermediate',
    likes_count: 45,
    comments_count: 12,
    views_count: 234,
    created_at: '2024-10-01'
  },
  {
    id: '2',
    title: 'Obstacle Avoiding Robot',
    description: 'Autonomous robot using ultrasonic sensors',
    thumbnail_url: null,
    category: 'Robotics',
    difficulty_level: 'beginner',
    likes_count: 67,
    comments_count: 18,
    views_count: 456,
    created_at: '2024-09-15'
  }
];

const mockCourses = [
  {
    id: '1',
    course_title: 'Arduino Basics',
    course_description: 'Master the fundamentals of Arduino programming',
    completion_percentage: 100,
    xp_earned: 250,
    status: 'completed'
  },
  {
    id: '2',
    course_title: 'IoT with ESP32',
    course_description: 'Build internet-connected devices',
    completion_percentage: 65,
    xp_earned: 180,
    status: 'in_progress'
  },
  {
    id: '3',
    course_title: 'Robotics Fundamentals',
    course_description: 'Learn robotics from scratch',
    completion_percentage: 30,
    xp_earned: 80,
    status: 'in_progress'
  }
];

const mockBadges = [
  { id: '1', name: 'First Steps', icon: '🎯', rarity: 'bronze', earned: true },
  { id: '2', name: 'Project Pioneer', icon: '🚀', rarity: 'bronze', earned: true },
  { id: '3', name: 'Builder', icon: '⚙️', rarity: 'silver', earned: true },
  { id: '4', name: 'Learner', icon: '🎓', rarity: 'silver', earned: true },
  { id: '5', name: 'Week Warrior', icon: '⚡', rarity: 'silver', earned: true },
  { id: '6', name: 'Innovator', icon: '💡', rarity: 'gold', earned: true },
  { id: '7', name: 'Circuit Master', icon: '⚡', rarity: 'gold', earned: false },
  { id: '8', name: 'Course Master', icon: '🏆', rarity: 'gold', earned: false }
];

const mockActivities = [
  {
    id: '1',
    activity_type: 'project_uploaded',
    title: 'Uploaded a new project',
    description: 'Smart Home Automation',
    icon: '🚀',
    likes_count: 12,
    created_at: '2 hours ago'
  },
  {
    id: '2',
    activity_type: 'badge_earned',
    title: 'Earned a new badge',
    description: 'Innovator Badge 💡',
    icon: '🏆',
    likes_count: 24,
    created_at: '1 day ago'
  },
  {
    id: '3',
    activity_type: 'course_completed',
    title: 'Completed a course',
    description: 'Arduino Basics',
    icon: '🎓',
    likes_count: 18,
    created_at: '3 days ago'
  }
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData] = useState(mockUserData);
  const [showSettings, setShowSettings] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'activity', label: 'Activity', icon: '⚡' }
  ];

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      bronze: 'from-amber-700 to-amber-900',
      silver: 'from-gray-400 to-gray-600',
      gold: 'from-yellow-400 to-yellow-600',
      platinum: 'from-slate-300 to-slate-500',
      secret: 'from-purple-500 to-pink-600'
    };
    return colors[rarity] || colors.bronze;
  };

  const getDifficultyColor = (level: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-orange-100 text-orange-700',
      advanced: 'bg-red-100 text-red-700'
    };
    return colors[level] || colors.beginner;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${userData.name}'s Profile`,
        text: userData.bio,
        url: window.location.href,
      }).catch(() => setShowShareMenu(true));
    } else {
      setShowShareMenu(true);
    }
  };

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Profile link copied!');
    setShowShareMenu(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-700 dark:bg-gray-900 transition-colors">
        {/* Cover Image */}
        <div className="relative h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700">
          <button 
            className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-40 backdrop-blur-sm rounded-lg"
            aria-label="Upload cover image"
            onClick={() => alert('Cover upload')}
          >
            <Camera className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="px-4 pb-20">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow -mt-16 p-4 mb-4 transition-colors">
            {/* Profile Picture */}
            <div className="flex flex-col items-center -mt-12 mb-4">
              <div className="relative">
                <div 
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white text-3xl font-bold shadow-lg"
                >
                  AK
                </div>
                <button 
                  className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  aria-label="Upload profile picture"
                  onClick={() => alert('Photo upload')}
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div 
                className="mt-2 px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: userData.rank_color }}
              >
                {userData.rank}
              </div>
            </div>

            {/* Name & Bio */}
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">{userData.name}</h1>
              <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">{userData.tagline}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{userData.bio}</p>
              
              {/* Location & Links */}
              <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600 dark:text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>Mumbai, India</span>
                </div>
                <a href={userData.website_url} className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <LinkIcon className="w-3 h-3" />
                  <span>Website</span>
                </a>
                <a href={userData.github_url} className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <Github className="w-3 h-3" />
                  <span>GitHub</span>
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-center mb-3">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </button>
                <button 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white font-medium text-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>234 Followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>1234 Views</span>
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3" />
                Joined 2024-01-15
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100">Edit Profile</h3>
                  <button onClick={() => setShowSettings(false)}>
                    <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                <div className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
                  <button className="w-full text-left p-2 hover:bg-white dark:hover:bg-gray-600 rounded transition">Edit Bio</button>
                  <button className="w-full text-left p-2 hover:bg-white dark:hover:bg-gray-600 rounded transition">Update Links</button>
                  <button className="w-full text-left p-2 hover:bg-white dark:hover:bg-gray-600 rounded transition">Privacy Settings</button>
                </div>
              </div>
            )}

            {/* Share Menu */}
            {showShareMenu && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100">Share Profile</h3>
                  <button onClick={() => setShowShareMenu(false)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <button onClick={copyProfileLink} className="w-full text-left p-2 hover:bg-white dark:hover:bg-gray-600 rounded flex items-center gap-2 text-sm text-gray-800 dark:text-gray-100">
                  <LinkIcon className="w-4 h-4" />
                  Copy Link
                </button>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 text-center">
              <Rocket className="w-6 h-6 mx-auto mb-1 text-blue-500" />
              <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{userData.projects_count}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 text-center">
              <Package className="w-6 h-6 mx-auto mb-1 text-green-500" />
              <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{userData.kits_owned_count}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Kits Owned</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-1 text-purple-500" />
              <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{userData.courses_completed_count}/{userData.courses_enrolled_count}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Courses</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-1 text-orange-500" />
              <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{userData.badges_earned_count}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Badges</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex flex-col items-center px-4 py-2 rounded-lg font-medium text-xs whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-800 dark:text-gray-100'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="text-lg mb-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Recent Projects */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <div className="flex justify-between mb-3">
                    <h3 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                      <Rocket className="w-4 h-4 text-blue-500" />
                      Recent Projects
                    </h3>
                    <button className="text-xs text-blue-600 font-medium" onClick={() => setActiveTab('projects')}>
                      View All →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {mockProjects.slice(0, 2).map(project => (
                      <div key={project.id} className="flex gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${getDifficultyColor(project.difficulty_level)}`}>
                          {project.title[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-gray-800 dark:text-gray-100">{project.title}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{project.description}</div>
                          <div className="flex gap-2 mt-1 text-xs text-gray-600 dark:text-gray-400">
                            <span>{project.category}</span>
                            <span>· {project.likes_count} ❤️</span>
                            <span>· {project.views_count} 👁️</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <div className="flex justify-between mb-3">
                    <h3 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      Badges
                    </h3>
                    <button className="text-xs text-blue-600 font-medium" onClick={() => setActiveTab('achievements')}>
                      View All →
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockBadges.slice(0, 6).map(badge => (
                      <div
                        key={badge.id}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-gradient-to-br ${getRarityColor(badge.rarity)} ${badge.earned ? '' : 'opacity-40 grayscale'}`}
                      >
                        {badge.icon}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Courses */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <div className="flex justify-between mb-3">
                    <h3 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      Courses Progress
                    </h3>
                    <button className="text-xs text-blue-600 font-medium" onClick={() => setActiveTab('courses')}>
                      View All →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {mockCourses.slice(0, 2).map(course => (
                      <div key={course.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-800 dark:text-gray-100">{course.course_title}</span>
                          <span className="text-gray-600 dark:text-gray-400">{course.completion_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${course.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`} 
                            style={{ width: `${course.completion_percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Streaks */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-3 text-gray-800 dark:text-gray-100">
                    <Flame className="w-4 h-4 text-orange-500" />
                    Streaks
                  </h3>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">{userData.current_streak}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Current</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">{userData.longest_streak}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Longest</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                {mockProjects.map(project => (
                  <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex gap-3">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-bold text-xl ${getDifficultyColor(project.difficulty_level)}`}>
                      {project.title[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{project.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{project.description}</p>
                      <div className="flex gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>{project.category}</span>
                        <span>· {project.likes_count} ❤️</span>
                        <span>· {project.views_count} 👁️</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-4">
                {mockCourses.map(course => (
                  <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100">{course.course_title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        course.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {course.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{course.course_description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div 
                        className={`h-2 rounded-full ${course.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`} 
                        style={{ width: `${course.completion_percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>{course.completion_percentage}%</span>
                      <span>XP: {course.xp_earned}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid grid-cols-4 gap-3">
                {mockBadges.map(badge => (
                  <div key={badge.id} className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-gradient-to-br ${getRarityColor(badge.rarity)} ${badge.earned ? '' : 'opacity-40 grayscale'}`}>
                      {badge.icon}
                    </div>
                    <span className="text-xs text-center mt-1 text-gray-800 dark:text-gray-100">{badge.name}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-3">
                {mockActivities.map(activity => (
                  <div key={activity.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100">{activity.title}</h3>
                      <p className="text-xs text-gray-800 dark:text-gray-100">{activity.description}</p>
                      <div className="flex gap-2 text-xs text-gray-800 dark:text-gray-100 mt-1">
                        <span>{activity.created_at}</span>
                        <span>· {activity.likes_count} ❤️</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
