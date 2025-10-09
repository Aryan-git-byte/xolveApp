"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Header, Footer } from '../../../../../components/Layout';
import { 
  ArrowLeft,
  Heart,
  MessageSquare,
  Eye,
  Share2,
  Flag,
  Pin,
  Lock,
  Star,
  ArrowUp,
  ArrowDown,
  Reply,
  Send,
  MoreHorizontal,
  Clock,
  User,
  CheckCircle
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
  message_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
  is_pinned: boolean;
  is_locked: boolean;
  is_featured: boolean;
  tags: string[];
}

interface Message {
  id: string;
  thread_id: string;
  content: string;
  author: string;
  author_id: string;
  upvotes: number;
  downvotes: number;
  reply_count: number;
  parent_message_id?: string;
  created_at: string;
  updated_at: string;
  is_edited: boolean;
  replies?: Message[];
}

// Mock data
const mockThread: Thread = {
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

const mockMessages: Message[] = [
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
    reply_count: 3,
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
  const router = useRouter();
  const params = useParams();
  const threadId = params.id as string;
  
  const [thread, setThread] = useState<Thread>(mockThread);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const handleVote = (type: 'up' | 'down', messageId?: string) => {
    // TODO: Implement voting logic with Supabase
    console.log(`Voting ${type} on ${messageId ? 'message' : 'thread'}:`, messageId || threadId);
    
    if (!messageId) {
      // Voting on thread
      if (userVote === type) {
        setUserVote(null);
      } else {
        setUserVote(type);
      }
    }
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSubmitting(true);
    
    try {
      // TODO: Submit to Supabase
      console.log('Submitting message:', {
        content: newMessage,
        thread_id: threadId,
        parent_message_id: replyingTo
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setNewMessage('');
      setReplyingTo(null);
      
      // TODO: Refresh messages from Supabase
      
    } catch (error) {
      console.error('Error submitting message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const MessageComponent: React.FC<{ message: Message; isReply?: boolean }> = ({ message, isReply = false }) => (
    <div className={`${isReply ? 'ml-12 border-l-2 border-gray-200 pl-4' : ''}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        {/* Message Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800">{message.author}</span>
                {message.author_id === thread.author_id && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                    OP
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{formatDate(message.created_at)}</span>
                {message.is_edited && <span>• edited</span>}
              </div>
            </div>
          </div>
          
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Message Content */}
        <div className="prose prose-sm max-w-none mb-4">
          <div className="whitespace-pre-wrap text-gray-700">
            {message.content}
          </div>
        </div>

        {/* Message Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <button 
                onClick={() => handleVote('up', message.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ArrowUp className="w-4 h-4 text-gray-500" />
              </button>
              <span className="mx-2 text-sm font-medium text-gray-700">
                {message.upvotes - message.downvotes}
              </span>
              <button 
                onClick={() => handleVote('down', message.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ArrowDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <button
              onClick={() => setReplyingTo(replyingTo === message.id ? null : message.id)}
              className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              <Reply className="w-3 h-3" />
              Reply
            </button>

            <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              <Share2 className="w-3 h-3" />
              Share
            </button>
          </div>
          
          <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
            <Flag className="w-3 h-3" />
            Report
          </button>
        </div>

        {/* Reply Form */}
        {replyingTo === message.id && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <form onSubmit={handleSubmitMessage}>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Reply to ${message.author}...`}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
              />
              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setReplyingTo(null);
                    setNewMessage('');
                  }}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newMessage.trim() || isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Reply
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {message.replies && message.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {message.replies.map(reply => (
            <MessageComponent key={reply.id} message={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Threads
          </button>

          {/* Thread Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {thread.is_pinned && <Pin className="w-4 h-4 text-green-600" />}
                  {thread.is_featured && <Star className="w-4 h-4 text-yellow-500" />}
                  {thread.is_locked && <Lock className="w-4 h-4 text-gray-500" />}
                  
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: thread.category_color }}
                  >
                    {thread.category}
                  </span>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {thread.title}
                </h1>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-blue-600" />
                    </div>
                    <span>by {thread.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(thread.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{thread.view_count} views</span>
                  </div>
                </div>
                
                {/* Tags */}
                {thread.tags && thread.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {thread.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-sm rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Thread Content */}
            <div className="prose prose-sm max-w-none mb-6">
              <div className="whitespace-pre-wrap text-gray-700">
                {thread.content}
              </div>
            </div>

            {/* Thread Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <button 
                    onClick={() => handleVote('up')}
                    className={`p-2 rounded-lg transition-colors ${
                      userVote === 'up' 
                        ? 'bg-green-100 text-green-600' 
                        : 'hover:bg-gray-100 text-gray-500'
                    }`}
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                  <span className="mx-3 text-lg font-semibold text-gray-700">
                    {thread.upvotes - thread.downvotes}
                  </span>
                  <button 
                    onClick={() => handleVote('down')}
                    className={`p-2 rounded-lg transition-colors ${
                      userVote === 'down' 
                        ? 'bg-red-100 text-red-600' 
                        : 'hover:bg-gray-100 text-gray-500'
                    }`}
                  >
                    <ArrowDown className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center gap-1 text-gray-600">
                  <MessageSquare className="w-5 h-5" />
                  <span>{thread.message_count} replies</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Flag className="w-4 h-4" />
                  Report
                </button>
              </div>
            </div>
          </div>

          {/* New Message Form */}
          {!thread.is_locked && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Join the Discussion</h3>
              <form onSubmit={handleSubmitMessage}>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share your thoughts, ask a question, or help solve the problem..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Be respectful and constructive in your response
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || isSubmitting}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
              </form>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {thread.message_count} Replies
              </h2>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="oldest">Oldest First</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
            
            {messages.map(message => (
              <MessageComponent key={message.id} message={message} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThreadDetailPage;