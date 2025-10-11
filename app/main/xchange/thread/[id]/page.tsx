"use client";
import React, { useState } from 'react';
import { 
  ArrowLeft, Heart, MessageSquare, Eye, Share2, Flag, Pin, Lock, Star,
  ArrowUp, ArrowDown, Reply, Send, MoreHorizontal, Clock, User,
  CheckCircle, Bookmark, TrendingUp
} from 'lucide-react';

// Mock Data
const mockThread = {
  id: '1',
  title: 'Best Arduino sensors for beginners?',
  content: `I'm just starting with Arduino and I'm wondering what sensors are most useful for learning electronics and programming. I've been looking at various starter kits but I'm not sure which sensors would give me the best learning experience.

Here's what I'm considering:
- Temperature sensors (DHT22, DS18B20)
- Motion sensors (PIR, ultrasonic)
- Light sensors (LDR, photodiode)
- Humidity sensors

I'm particularly interested in sensors that can be used for multiple projects and aren't too expensive. Any recommendations for a beginner who wants to build practical projects?

Also, are there any sensors I should avoid as a beginner due to complexity or cost?`,
  author: 'TechExplorer',
  author_id: 'user1',
  category: 'Electronics',
  category_color: '#f59e0b',
  upvotes: 24,
  downvotes: 2,
  message_count: 8,
  view_count: 156,
  created_at: '2024-10-09T10:00:00Z',
  updated_at: '2024-10-09T10:00:00Z',
  is_pinned: true,
  is_locked: false,
  is_featured: false,
  tags: ['arduino', 'sensors', 'beginner', 'electronics']
};

const mockMessages = [
  {
    id: '1',
    thread_id: '1',
    content: `Great question! For beginners, I'd highly recommend starting with these sensors:

**Essential Sensors:**
1. **DHT22** - Temperature & humidity in one package, very reliable
2. **HC-SR04** - Ultrasonic distance sensor, great for robotics projects
3. **PIR Motion Sensor** - Super easy to use, perfect for security projects
4. **LDR (Light Dependent Resistor)** - Simple light sensor, good for learning analog readings

**Why these are perfect for beginners:**
- Well-documented with tons of tutorials
- Affordable (under $5 each)
- Work with simple code
- Can be combined for more complex projects

I'd avoid gas sensors and complex IMU sensors initially - they require more calibration and understanding.`,
    author: 'SensorGuru',
    author_id: 'user2',
    upvotes: 18,
    downvotes: 0,
    reply_count: 2,
    created_at: '2024-10-09T10:30:00Z',
    updated_at: '2024-10-09T10:30:00Z',
    is_edited: false,
    replies: [
      {
        id: '2',
        thread_id: '1',
        content: 'Thanks for the detailed response! The DHT22 looks perfect for my first project. Do you have any specific project ideas that combine multiple sensors?',
        author: 'TechExplorer',
        author_id: 'user1',
        upvotes: 5,
        downvotes: 0,
        reply_count: 0,
        parent_message_id: '1',
        created_at: '2024-10-09T11:00:00Z',
        updated_at: '2024-10-09T11:00:00Z',
        is_edited: false
      },
      {
        id: '3',
        thread_id: '1',
        content: 'You could build a smart home monitor! Combine DHT22 for temperature/humidity, PIR for motion detection, and LDR for light levels. Perfect starter project!',
        author: 'SensorGuru',
        author_id: 'user2',
        upvotes: 12,
        downvotes: 0,
        reply_count: 0,
        parent_message_id: '1',
        created_at: '2024-10-09T11:15:00Z',
        updated_at: '2024-10-09T11:15:00Z',
        is_edited: false
      }
    ]
  },
  {
    id: '4',
    thread_id: '1',
    content: `I'd add the **MQ-2 gas sensor** to the list - it's great for learning about analog sensors and safety applications. Super cheap too!

Also, consider getting a **soil moisture sensor** if you're interested in plant monitoring projects. Very satisfying to see immediate results.`,
    author: 'ElectronicsHobbyist',
    author_id: 'user3',
    upvotes: 8,
    downvotes: 1,
    reply_count: 0,
    created_at: '2024-10-09T12:00:00Z',
    updated_at: '2024-10-09T12:00:00Z',
    is_edited: false
  }
];

const ThreadDetailPage = () => {
  const [thread] = useState(mockThread);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [sortBy, setSortBy] = useState('oldest');

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleVote = (type: 'up' | 'down'): void => {
    setUserVote(userVote === type ? null : type);
  };

  const handleSubmitMessage = (): void => {
    if (!newMessage.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setNewMessage('');
      setReplyingTo(null);
      setIsSubmitting(false);
    }, 1000);
  };

  const MessageComponent = ({ message, isReply = false }: { message: any; isReply?: boolean }) => {
    const [showReplies, setShowReplies] = useState(true);
    
    return (
      <div className={`${isReply ? 'ml-8 border-l-2 border-gray-200 pl-3' : ''}`}>
        <div className="bg-white border-b border-gray-200 py-4 last:border-b-0">
          {/* Message Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-800 text-sm truncate">{message.author}</span>
                  {message.author_id === thread.author_id && (
                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded flex-shrink-0">
                      OP
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(message.created_at)} {message.is_edited && '• edited'}
                </div>
              </div>
            </div>
            <button className="p-1 text-gray-400 flex-shrink-0">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Message Content */}
          <div className="mb-3">
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>

          {/* Message Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <button className="p-1.5 text-gray-500 active:text-green-600 rounded">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <span className="mx-1 text-sm font-medium text-gray-700">
                  {message.upvotes - message.downvotes}
                </span>
                <button className="p-1.5 text-gray-500 active:text-red-600 rounded">
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={() => setReplyingTo(replyingTo === message.id ? null : message.id)}
                className="flex items-center gap-1 text-xs text-gray-600 active:text-gray-800 px-2 py-1"
              >
                <Reply className="w-3.5 h-3.5" />
                Reply
              </button>

              <button className="flex items-center gap-1 text-xs text-gray-600 active:text-gray-800 px-2 py-1">
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <button className="p-1 text-gray-400 active:text-gray-600">
              <Flag className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reply Form */}
          {replyingTo === message.id && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Reply to ${message.author}...`}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="flex items-center justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setNewMessage('');
                  }}
                  className="px-3 py-1.5 text-xs text-gray-600 active:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitMessage}
                  disabled={!newMessage.trim() || isSubmitting}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg disabled:opacity-50 active:bg-blue-700"
                >
                  {isSubmitting ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Nested Replies */}
        {message.replies && message.replies.length > 0 && (
          <div className="mt-2">
            {!isReply && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs text-blue-600 font-medium ml-10 mb-2 active:text-blue-700"
              >
                {showReplies ? '▼' : '▶'} {message.replies.length} {message.replies.length === 1 ? 'reply' : 'replies'}
              </button>
            )}
            {showReplies && message.replies.map((reply: any) => (
              <MessageComponent key={reply.id} message={reply} isReply={true} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => window.history.back()}
            className="p-2 -ml-2 text-gray-600 active:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-semibold text-gray-800 truncate flex-1 mx-3">
            Discussion
          </h1>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg ${isBookmarked ? 'text-blue-600' : 'text-gray-600'} active:bg-gray-100`}
            >
              <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
            </button>
            <button className="p-2 -mr-2 text-gray-600 active:bg-gray-100 rounded-lg">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 pb-20">
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-4">
            {/* Thread Badges */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {thread.is_pinned && (
                <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  <Pin className="w-3 h-3" />
                  Pinned
                </span>
              )}
              {thread.is_featured && (
                <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                  <Star className="w-3 h-3" />
                  Featured
                </span>
              )}
              <span 
                className="px-2 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: thread.category_color }}
              >
                {thread.category}
              </span>
            </div>
            
            {/* Thread Title */}
            <h2 className="text-lg font-bold text-gray-800 mb-3 leading-tight">
              {thread.title}
            </h2>
            
            {/* Thread Meta */}
            <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-blue-600" />
                </div>
                <span className="font-medium">{thread.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatDate(thread.created_at)}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-gray-600 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{thread.view_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{thread.message_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{thread.upvotes - thread.downvotes}</span>
              </div>
            </div>

            {/* Tags */}
            {thread.tags && thread.tags.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-3 -mx-1 px-1 scrollbar-hide">
                {thread.tags.map((tag, idx) => (
                  <span key={idx} className="flex-shrink-0 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Thread Content */}
            <div className="pt-3">
              <div className={`text-sm text-gray-700 leading-relaxed whitespace-pre-wrap ${!showFullContent && 'line-clamp-6'}`}>
                {thread.content}
              </div>
              {thread.content.length > 300 && (
                <button 
                  onClick={() => setShowFullContent(!showFullContent)}
                  className="mt-2 text-blue-600 text-sm font-medium active:text-blue-700"
                >
                  {showFullContent ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>

          {/* Sticky Vote Bar */}
          <div className="sticky top-14 z-40 bg-white border-t border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={() => handleVote('up')}
                  className={`p-2 rounded-lg transition-colors ${
                    userVote === 'up' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 active:bg-gray-200'
                  }`}
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
                <span className="mx-3 text-base font-bold text-gray-800">
                  {thread.upvotes - thread.downvotes}
                </span>
                <button 
                  onClick={() => handleVote('down')}
                  className={`p-2 rounded-lg transition-colors ${
                    userVote === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 active:bg-gray-200'
                  }`}
                >
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 bg-gray-100 rounded-lg active:bg-gray-200">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 bg-gray-100 rounded-lg active:bg-gray-200">
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* New Message Form */}
        {!thread.is_locked && !replyingTo && (
          <div className="bg-white border-b border-gray-200 p-4">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Join the Discussion</h3>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex items-center justify-end mt-3">
              <button
                onClick={handleSubmitMessage}
                disabled={!newMessage.trim() || isSubmitting}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg disabled:opacity-50 active:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post Reply
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Thread Locked Message */}
        {thread.is_locked && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
            <div className="flex items-center gap-2 text-yellow-800 text-sm">
              <Lock className="w-4 h-4" />
              <span>This thread is locked. No new replies can be added.</span>
            </div>
          </div>
        )}

        {/* Messages Section */}
        <div className="bg-white">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 text-sm">
              {thread.message_count} Replies
            </h3>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="oldest">Oldest</option>
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
            </select>
          </div>
          
          <div>
            {messages.map(message => (
              <MessageComponent key={message.id} message={message} />
            ))}
          </div>

          {messages.length >= 3 && (
            <div className="p-4 border-t border-gray-200">
              <button className="w-full py-2.5 text-sm font-medium text-blue-600 active:text-blue-700">
                Load More Replies
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around px-4 py-2">
          <button 
            onClick={() => !thread.is_locked && document.querySelector('textarea')?.focus()}
            className="flex flex-col items-center gap-1 py-1.5 text-gray-600 active:text-gray-800"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-medium">Reply</span>
          </button>
          <button 
            onClick={() => handleVote('up')}
            className={`flex flex-col items-center gap-1 py-1.5 ${
              userVote === 'up' ? 'text-green-600' : 'text-gray-600 active:text-gray-800'
            }`}
          >
            <ArrowUp className="w-5 h-5" />
            <span className="text-xs font-medium">Upvote</span>
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex flex-col items-center gap-1 py-1.5 ${
              isBookmarked ? 'text-blue-600' : 'text-gray-600 active:text-gray-800'
            }`}
          >
            <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
            <span className="text-xs font-medium">Save</span>
          </button>
          <button className="flex flex-col items-center gap-1 py-1.5 text-gray-600 active:text-gray-800">
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

export default ThreadDetailPage;