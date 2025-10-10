"use client";

import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../../../components/Layout';
import { 
  User, Camera, Settings, Share2, MapPin, Link as LinkIcon, Github, Linkedin,
  Award, Star, TrendingUp, Flame, Users, Eye, Calendar, ChevronRight,
  BookOpen, Package, Zap, Target, Clock, Heart, MessageCircle, ExternalLink,
  Lock, Unlock, Grid3x3, List, Play, Code, Sparkles, Trophy, Medal,
  Activity, BarChart3, CheckCircle, Circle, Crown, Rocket
} from 'lucide-react';

// Mock data - replace with Supabase queries
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
  { id: '8', name: 'Course Master', icon: '🏆', rarity: 'gold', earned: false },
  { id: '9', name: 'Mentor', icon: '🌟', rarity: 'platinum', earned: false },
  { id: '10', name: 'Xolve Elite', icon: '💫', rarity: 'secret', earned: false }
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'projects', label: 'Projects', icon: Rocket },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'activity', label: 'Activity', icon: Zap }
  ];

  const statCards = [
    { icon: Rocket, label: 'Projects', value: userData.projects_count, color: 'blue' },
    { icon: Package, label: 'Kits Owned', value: userData.kits_owned_count, color: 'green' },
    { icon: BookOpen, label: 'Courses', value: `${userData.courses_completed_count}/${userData.courses_enrolled_count}`, color: 'purple' },
    { icon: Trophy, label: 'Badges', value: userData.badges_earned_count, color: 'orange' }
  ];

  const getRarityColor = (rarity) => {
    const colors = {
      bronze: 'from-amber-700 to-amber-900',
      silver: 'from-gray-400 to-gray-600',
      gold: 'from-yellow-400 to-yellow-600',
      platinum: 'from-slate-300 to-slate-500',
      secret: 'from-purple-500 to-pink-600'
    };
    return colors[rarity] || colors.bronze;
  };

  const getDifficultyColor = (level) => {
    const colors = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-orange-100 text-orange-700',
      advanced: 'bg-red-100 text-red-700'
    };
    return colors[level] || colors.beginner;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pb-8">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg hover:bg-opacity-30 transition">
          <Camera className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Picture */}
            <div className="relative flex-shrink-0 mx-auto md:mx-0">
              <div 
                className="w-32 h-32 rounded-full border-4 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-4xl font-bold"
                style={{ borderColor: userData.rank_color }}
              >
                {userData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition shadow-lg">
                <Camera className="w-5 h-5" />
              </button>
              <div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg whitespace-nowrap"
                style={{ backgroundColor: userData.rank_color }}
              >
                {userData.rank}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{userData.name}</h1>
                  <p className="text-gray-600 mb-2">{userData.tagline}</p>
                  <p className="text-sm text-gray-500 mb-3">{userData.bio}</p>
                  
                  {/* Location and Links */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-gray-600">
                    {userData.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{userData.location}</span>
                      </div>
                    )}
                    {userData.website_url && (
                      <a href={userData.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition">
                        <LinkIcon className="w-4 h-4" />
                        <span>Website</span>
                      </a>
                    )}
                    {userData.github_url && (
                      <a href={userData.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition">
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-row md:flex-col gap-2 items-center md:items-end">
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{userData.followers_count} Followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{userData.profile_views} Views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {userData.date_joined}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statCards.map((card, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-white to-gray-50 rounded-xl shadow border border-gray-200 p-4 flex flex-col items-center`}>
              <card.icon className={`w-7 h-7 mb-2 text-${card.color}-500`} />
              <div className="text-xl font-bold text-gray-800">{card.value}</div>
              <div className="text-xs text-gray-500">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition border-b-2 ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Projects */}
              <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-semibold text-gray-800">
                    <Rocket className="w-5 h-5 text-blue-500" />
                    Recent Projects
                  </div>
                  <button className="text-xs text-blue-600 hover:underline flex items-center gap-1" onClick={() => setActiveTab('projects')}>
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-4">
                  {mockProjects.slice(0, 2).map(project => (
                    <div key={project.id} className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${getDifficultyColor(project.difficulty_level)}`}>
                        {project.title[0]}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{project.title}</div>
                        <div className="text-xs text-gray-500">{project.description}</div>
                        <div className="flex gap-2 mt-1 text-xs text-gray-400">
                          <span>{project.category}</span>
                          <span>· {project.likes_count} Likes</span>
                          <span>· {project.views_count} Views</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Badges */}
              <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-semibold text-gray-800">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Badges
                  </div>
                  <button className="text-xs text-blue-600 hover:underline flex items-center gap-1" onClick={() => setActiveTab('achievements')}>
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mockBadges.slice(0, 6).map(badge => (
                    <div
                      key={badge.id}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold bg-gradient-to-br ${getRarityColor(badge.rarity)} ${badge.earned ? '' : 'opacity-40 grayscale'}`}
                      title={badge.name}
                    >
                      {badge.icon}
                    </div>
                  ))}
                </div>
              </div>
              {/* Courses Progress */}
              <div className="bg-white rounded-xl shadow border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-semibold text-gray-800">
                    <BookOpen className="w-5 h-5 text-purple-500" />
                    Courses Progress
                  </div>
                  <button className="text-xs text-blue-600 hover:underline flex items-center gap-1" onClick={() => setActiveTab('courses')}>
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-3">
                  {mockCourses.slice(0, 2).map(course => (
                    <div key={course.id}>
                      <div className="flex justify-between text-sm font-medium text-gray-700">
                        <span>{course.course_title}</span>
                        <span>{course.completion_percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className={`h-2 rounded-full ${course.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${course.completion_percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Streaks */}
              <div className="bg-white rounded-xl shadow border border-gray-100 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    Streaks
                  </div>
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold text-orange-600">{userData.current_streak}</span>
                      <span className="text-xs text-gray-500">Current</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold text-gray-600">{userData.longest_streak}</span>
                      <span className="text-xs text-gray-500">Longest</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Rocket className="w-5 h-5" /> Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {mockProjects.map(project => (
                  <div key={project.id} className="bg-white rounded-xl shadow border border-gray-100 p-5 flex gap-4">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center font-bold text-2xl ${getDifficultyColor(project.difficulty_level)}`}>
                      {project.title[0]}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{project.title}</div>
                      <div className="text-xs text-gray-500 mb-1">{project.description}</div>
                      <div className="flex gap-2 text-xs text-gray-400">
                        <span>{project.category}</span>
                        <span>· {project.likes_count} Likes</span>
                        <span>· {project.views_count} Views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5" /> Courses</h2>
              <div className="space-y-4">
                {mockCourses.map(course => (
                  <div key={course.id} className="bg-white rounded-xl shadow border border-gray-100 p-5">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold text-gray-800">{course.course_title}</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${course.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {course.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{course.course_description}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${course.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${course.completion_percentage}%` }}></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">XP Earned: {course.xp_earned}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Trophy className="w-5 h-5" /> Achievements & Badges</h2>
              <div className="flex flex-wrap gap-4">
                {mockBadges.map(badge => (
                  <div
                    key={badge.id}
                    className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-3xl font-bold bg-gradient-to-br ${getRarityColor(badge.rarity)} ${badge.earned ? '' : 'opacity-40 grayscale'}`}
                    title={badge.name}
                  >
                    <span>{badge.icon}</span>
                    <span className="text-xs mt-1 text-white font-semibold">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Zap className="w-5 h-5" /> Recent Activity</h2>
              <div className="space-y-4">
                {mockActivities.map(activity => (
                  <div key={activity.id} className="bg-white rounded-xl shadow border border-gray-100 p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{activity.title}</div>
                      <div className="text-xs text-gray-500">{activity.description}</div>
                      <div className="flex gap-2 text-xs text-gray-400 mt-1">
                        <span>{activity.created_at}</span>
                        <span>· {activity.likes_count} Likes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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