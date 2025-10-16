"use client";
import React, { useState } from 'react';
import { Header, Footer } from '../../../components/Layout';
import { 
  Search,
  Filter,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  BarChart3,
  Award,
  TrendingUp,
  Calendar,
  BookOpenCheck,
  PlayCircle,
  FileText,
  BookOpen
} from 'lucide-react';

// Courses Page Component
const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('all'); // all, enrolled, completed

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'programming', name: 'Programming' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'data-science', name: 'Data Science' }
  ];

  const courses = [
    {
      id: 1,
      title: "Complete React Development",
      instructor: "John Smith",
      duration: "12 hours",
      lessons: 45,
      students: 12500,
      rating: 4.8,
      reviews: 2341,
      price: 99.99,
      level: "Intermediate",
      category: "programming",
      progress: 65,
      enrolled: true,
      completed: false,
      description: "Master React from basics to advanced concepts including hooks, context, and performance optimization.",
      tags: ["React", "JavaScript", "Frontend"],
      lastWatched: "Chapter 8: State Management"
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Sarah Johnson",
      duration: "8 hours",
      lessons: 32,
      students: 8900,
      rating: 4.9,
      reviews: 1876,
      price: 79.99,
      level: "Beginner",
      category: "design",
      progress: 100,
      enrolled: true,
      completed: true,
      description: "Learn the principles of user interface and user experience design with hands-on projects.",
      tags: ["UI", "UX", "Design", "Figma"],
      completedDate: "Sept 15, 2024"
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      instructor: "Mike Chen",
      duration: "15 hours",
      lessons: 58,
      students: 15600,
      rating: 4.7,
      reviews: 3245,
      price: 129.99,
      level: "Advanced",
      category: "marketing",
      progress: 0,
      enrolled: false,
      completed: false,
      description: "Comprehensive guide to digital marketing including SEO, social media, and paid advertising.",
      tags: ["Marketing", "SEO", "Social Media"]
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "Dr. Emily Davis",
      duration: "20 hours",
      lessons: 67,
      students: 9800,
      rating: 4.8,
      reviews: 1654,
      price: 149.99,
      level: "Intermediate",
      category: "data-science",
      progress: 25,
      enrolled: true,
      completed: false,
      description: "Learn Python programming specifically for data analysis, visualization, and machine learning.",
      tags: ["Python", "Data Science", "ML"],
      lastWatched: "Chapter 3: Data Visualization"
    },
    {
      id: 5,
      title: "Business Strategy & Leadership",
      instructor: "Robert Wilson",
      duration: "10 hours",
      lessons: 38,
      students: 6700,
      rating: 4.6,
      reviews: 892,
      price: 199.99,
      level: "Advanced",
      category: "business",
      progress: 0,
      enrolled: false,
      completed: false,
      description: "Develop strategic thinking and leadership skills for modern business environments.",
      tags: ["Leadership", "Strategy", "Management"]
    },
    {
      id: 6,
      title: "Node.js Backend Development",
      instructor: "Alex Rodriguez",
      duration: "16 hours",
      lessons: 52,
      students: 11200,
      rating: 4.7,
      reviews: 2156,
      price: 119.99,
      level: "Intermediate",
      category: "programming",
      progress: 100,
      enrolled: true,
      completed: true,
      description: "Build scalable backend applications with Node.js, Express, and MongoDB.",
      tags: ["Node.js", "Backend", "JavaScript"],
      completedDate: "Aug 22, 2024"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesView = viewMode === 'all' || 
                       (viewMode === 'enrolled' && course.enrolled) ||
                       (viewMode === 'completed' && course.completed);
    return matchesCategory && matchesSearch && matchesView;
  });

  const stats = {
    totalEnrolled: courses.filter(c => c.enrolled).length,
    completed: courses.filter(c => c.completed).length,
    inProgress: courses.filter(c => c.enrolled && !c.completed).length,
    totalHours: courses.filter(c => c.enrolled).reduce((sum, c) => sum + parseInt(c.duration), 0)
  };

  const CourseCard = ({ course }: { course: any }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group">
      <div className="relative">
        <div className="w-full h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-white" />
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
            {course.level}
          </span>
          {course.enrolled && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              Enrolled
            </span>
          )}
          {course.completed && (
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              ✓ Completed
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-white rounded-full p-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <PlayCircle className="w-4 h-4" />
            <span>{course.lessons} lessons</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{course.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({course.reviews})</span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500">{course.students.toLocaleString()} students</span>
        </div>

        {course.enrolled && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-800">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            {course.lastWatched && (
              <p className="text-xs text-gray-500 mt-1">Last: {course.lastWatched}</p>
            )}
            {course.completedDate && (
              <p className="text-xs text-green-600 mt-1">Completed on {course.completedDate}</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 2).map((tag: string, index: number) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-800">${course.price}</div>
            {course.enrolled ? (
              <button className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2 justify-center">
                <Play className="w-4 h-4" />
                {course.completed ? 'Review' : 'Continue'}
              </button>
            ) : (
              <button className="mt-2 w-full bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition">
                Enroll Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content Area */}
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Learning</h1>
            <p className="text-gray-600">Continue your learning journey and explore new courses</p>
          </div>

          {/* Learning Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats.totalEnrolled}</div>
              <div className="text-sm text-gray-600">Enrolled</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stats.totalHours}</div>
              <div className="text-sm text-gray-600">Hours</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* View Mode Filter */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { id: 'all', label: 'All Courses' },
                  { id: 'enrolled', label: 'Enrolled' },
                  { id: 'completed', label: 'Completed' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                      viewMode === mode.id 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Continue Learning Section */}
          {stats.inProgress > 0 && viewMode === 'all' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Continue Learning</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.filter(c => c.enrolled && !c.completed).slice(0, 3).map(course => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                    <h3 className="font-medium text-gray-800 mb-2">{course.title}</h3>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-800">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2 justify-center">
                      <Play className="w-4 h-4" />
                      Continue
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Sort by: Relevance</option>
              <option>Most Popular</option>
              <option>Highest Rated</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpenCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CoursesPage;