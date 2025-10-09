"use client";
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Header, Footer } from '../../../../../components/Layout';
import { 
  ArrowLeft,
  Heart,
  MessageSquare,
  Eye,
  Share2,
  Flag,
  Star,
  ArrowUp,
  ArrowDown,
  Send,
  MoreHorizontal,
  Clock,
  User,
  CheckCircle,
  GitFork,
  Download,
  ExternalLink,
  Github,
  Tag,
  Wrench,
  Package,
  Calendar,
  Trophy,
  Bookmark,
  Copy
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
  materials: string[];
  tools: string[];
  images: string[];
  upvotes: number;
  downvotes: number;
  comments_count: number;
  views: number;
  forks: number;
  downloads: number;
  github_url?: string;
  demo_url?: string;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
}

interface Comment {
  id: string;
  project_id: string;
  content: string;
  author: string;
  author_id: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
  updated_at: string;
  is_edited: boolean;
}

// Mock data
const mockProject: Project = {
  id: '1',
  title: 'Smart Home Automation System',
  description: 'Complete IoT system using ESP32 and sensors to automate lights, temperature, and security with mobile app control.',
  content: `# Smart Home Automation System

This project demonstrates how to build a comprehensive smart home automation system using ESP32 microcontroller and various sensors. The system can monitor temperature, humidity, motion, and light levels while providing remote control through a mobile application.

## Overview

The Smart Home Automation System integrates multiple sensors and actuators to create an intelligent home environment. It features:

- **Temperature & Humidity Monitoring**: Using DHT22 sensor for climate control
- **Motion Detection**: PIR sensor for security and automatic lighting
- **Light Level Detection**: LDR sensor for automatic brightness adjustment
- **Remote Control**: Web-based interface and mobile app
- **Real-time Data**: MQTT communication for instant updates

## System Architecture

The system consists of several key components:

1. **ESP32 Microcontroller**: Main processing unit
2. **Sensor Network**: Multiple sensors for environmental monitoring
3. **Actuator Control**: Relays for controlling lights and appliances
4. **Communication**: WiFi and MQTT for remote access
5. **User Interface**: Web dashboard and mobile application

## Hardware Setup

### Wiring Diagram

[Detailed wiring diagram would be shown here with images]

### Circuit Connections

- ESP32 GPIO pins connected to sensors
- Relay modules for controlling AC appliances
- Power supply circuit for stable operation
- LED indicators for system status

## Software Implementation

### Arduino Code

The main Arduino sketch handles sensor readings, WiFi connectivity, and MQTT communication:

\`\`\`cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// Pin definitions
#define DHT_PIN 4
#define PIR_PIN 5
#define LDR_PIN A0
#define RELAY1_PIN 18
#define RELAY2_PIN 19

// Sensor initialization
DHT dht(DHT_PIN, DHT22);
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  
  // Initialize sensors
  dht.begin();
  pinMode(PIR_PIN, INPUT);
  pinMode(RELAY1_PIN, OUTPUT);
  pinMode(RELAY2_PIN, OUTPUT);
  
  // Connect to WiFi
  connectWiFi();
  
  // Setup MQTT
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  // Read sensors
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int motion = digitalRead(PIR_PIN);
  int lightLevel = analogRead(LDR_PIN);
  
  // Process data and send to MQTT
  processAndSend(temperature, humidity, motion, lightLevel);
  
  // Handle MQTT communication
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  
  delay(1000);
}
\`\`\`

### Mobile App Interface

The companion mobile app provides:
- Real-time sensor data display
- Remote control of connected devices
- Automation rules configuration
- Historical data charts
- Push notifications for alerts

## Features

### Automated Lighting
- Motion-activated lights in hallways and bathrooms
- Automatic dimming based on ambient light levels
- Scheduled lighting for energy efficiency

### Climate Control
- Temperature-based fan/AC control
- Humidity monitoring with alerts
- Energy usage optimization

### Security Features
- Motion detection with notifications
- Door/window sensor integration
- Camera integration (optional)

### Energy Management
- Power consumption monitoring
- Automated device scheduling
- Energy usage reports

## Installation Guide

### Step 1: Hardware Assembly
1. Mount the ESP32 on a breadboard or custom PCB
2. Connect all sensors according to the wiring diagram
3. Install relay modules for appliance control
4. Set up power supply and enclosure

### Step 2: Software Setup
1. Install Arduino IDE with ESP32 board package
2. Install required libraries (WiFi, PubSubClient, DHT)
3. Configure WiFi credentials and MQTT settings
4. Upload the code to ESP32

### Step 3: Mobile App Setup
1. Download the companion app from app store
2. Connect to the same WiFi network as ESP32
3. Configure device settings and automation rules
4. Test all functions and sensors

## Troubleshooting

### Common Issues

**WiFi Connection Problems**
- Check network credentials
- Ensure ESP32 is within WiFi range
- Verify network compatibility (2.4GHz)

**Sensor Reading Errors**
- Check wiring connections
- Verify sensor power supply
- Test sensors individually

**MQTT Communication Issues**
- Verify MQTT broker settings
- Check network connectivity
- Monitor serial output for errors

## Future Enhancements

- Voice control integration (Alexa/Google Assistant)
- Machine learning for usage pattern recognition
- Solar panel integration for sustainable power
- Advanced security features with facial recognition
- Integration with existing smart home platforms

## Contributing

This project is open source and welcomes contributions. Please feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Share your modifications and improvements

## License

This project is licensed under the MIT License - see the LICENSE file for details.`,
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
  images: [
    '/placeholder-project1-1.jpg',
    '/placeholder-project1-2.jpg',
    '/placeholder-project1-3.jpg',
    '/placeholder-project1-4.jpg'
  ],
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

const mockComments: Comment[] = [
  {
    id: '1',
    project_id: '1',
    content: 'Amazing project! I built this last month and it works perfectly. The mobile app integration is especially impressive. One suggestion: consider adding temperature alerts when it gets too hot or cold.',
    author: 'TechEnthusiast',
    author_id: 'user2',
    upvotes: 12,
    downvotes: 0,
    created_at: '2024-10-08T14:30:00Z',
    updated_at: '2024-10-08T14:30:00Z',
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
    updated_at: '2024-10-08T16:15:00Z',
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
    updated_at: '2024-10-09T09:20:00Z',
    is_edited: false
  }
];

const ProjectDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project>(mockProject);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
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

  const handleVote = (type: 'up' | 'down') => {
    // TODO: Implement voting logic with Supabase
    console.log(`Voting ${type} on project:`, projectId);
    
    if (userVote === type) {
      setUserVote(null);
    } else {
      setUserVote(type);
    }
  };

  const handleBookmark = () => {
    // TODO: Implement bookmark logic with Supabase
    setIsBookmarked(!isBookmarked);
  };

  const handleFork = () => {
    // TODO: Implement fork logic
    console.log('Forking project:', projectId);
  };

  const handleDownload = () => {
    // TODO: Implement download logic
    console.log('Downloading project:', projectId);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    try {
      // TODO: Submit to Supabase
      console.log('Submitting comment:', {
        content: newComment,
        project_id: projectId
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setNewComment('');
      
      // TODO: Refresh comments from Supabase
      
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Comment Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800">{comment.author}</span>
              {comment.author_id === project.author_id && (
                <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">
                  Author
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{formatDate(comment.created_at)}</span>
              {comment.is_edited && <span>• edited</span>}
            </div>
          </div>
        </div>
        
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Comment Content */}
      <div className="prose prose-sm max-w-none mb-4">
        <p className="text-gray-700">{comment.content}</p>
      </div>

      {/* Comment Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <button className="p-1 hover:bg-gray-100 rounded">
              <ArrowUp className="w-4 h-4 text-gray-500" />
            </button>
            <span className="mx-2 text-sm font-medium text-gray-700">
              {comment.upvotes - comment.downvotes}
            </span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ArrowDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {project.is_featured && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty_level)}`}>
                        {project.difficulty_level}
                      </span>
                      <span className="text-sm text-gray-500">{project.estimated_time}</span>
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                      {project.title}
                    </h1>
                    
                    <p className="text-lg text-gray-600 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span>by <span className="font-medium">{project.author}</span></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(project.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{project.views} views</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Actions */}
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
                        {project.upvotes - project.downvotes}
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
                      <span>{project.comments_count} comments</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBookmark}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        isBookmarked 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                      {isBookmarked ? 'Saved' : 'Save'}
                    </button>
                    
                    <button
                      onClick={handleFork}
                      className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <GitFork className="w-4 h-4" />
                      Fork ({project.forks})
                    </button>
                    
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    
                    <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Project Images */}
              {project.images && project.images.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Gallery</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <div key={index} className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center">
                        <span className="text-blue-400 text-sm">Project Image {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Tabs */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'instructions', label: 'Instructions' },
                      { id: 'materials', label: 'Materials' },
                      { id: 'tools', label: 'Tools' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-gray-700">
                        {project.content.substring(0, 1000)}...
                      </div>
                    </div>
                  )}

                  {activeTab === 'instructions' && (
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-wrap text-gray-700">
                        {project.content}
                      </div>
                    </div>
                  )}

                  {activeTab === 'materials' && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-4">Required Materials</h3>
                      <ul className="space-y-2">
                        {project.materials.map((material, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-700">
                            <Package className="w-4 h-4 text-blue-500" />
                            {material}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'tools' && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-4">Required Tools</h3>
                      <ul className="space-y-2">
                        {project.tools.map((tool, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-700">
                            <Wrench className="w-4 h-4 text-orange-500" />
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">
                  Comments ({project.comments_count})
                </h2>
                
                {/* New Comment Form */}
                <form onSubmit={handleSubmitComment} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts, ask questions, or provide feedback..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-vertical"
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">
                      Be constructive and respectful
                    </div>
                    <button
                      type="submit"
                      disabled={!newComment.trim() || isSubmitting}
                      className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Posting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Post Comment
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map(comment => (
                    <CommentComponent key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-3 py-2 text-left bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View Source Code
                    </a>
                  )}
                  
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-3 py-2 text-left bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-left bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    <Copy className="w-4 h-4" />
                    Copy Project Link
                  </button>
                </div>
              </div>

              {/* Project Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Project Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Upvotes</span>
                    <span className="font-medium text-gray-800">{project.upvotes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Views</span>
                    <span className="font-medium text-gray-800">{project.views}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Forks</span>
                    <span className="font-medium text-gray-800">{project.forks}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Downloads</span>
                    <span className="font-medium text-gray-800">{project.downloads}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Comments</span>
                    <span className="font-medium text-gray-800">{project.comments_count}</span>
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800 mb-4">About the Author</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{project.author}</div>
                    <div className="text-sm text-gray-500">IoT Enthusiast</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Building smart solutions with Arduino and ESP32. Passionate about IoT, automation, and teaching others to create amazing projects.
                </div>
                <button
                  onClick={() => router.push(`/main/xchange/profile/${project.author_id}`)}
                  className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Profile
                </button>
              </div>

              {/* Related Projects */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800 mb-4">Related Projects</h3>
                <div className="space-y-3">
                  {['Home Security System', 'Weather Station', 'Plant Monitor'].map((title, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-200 rounded flex items-center justify-center">
                        <span className="text-xs text-blue-600">#{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800">{title}</div>
                        <div className="text-xs text-gray-500">by Author{index + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;