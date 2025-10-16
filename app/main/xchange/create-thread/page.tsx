"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '../../../../components/Layout';
import { 
  ArrowLeft,
  Send,
  Image,
  Link,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Types
interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

// Mock categories
const mockCategories: Category[] = [
  { id: '1', name: 'Tech', description: 'General technology discussions', icon: 'cpu', color: '#3b82f6' },
  { id: '2', name: 'AI', description: 'Artificial Intelligence and Machine Learning', icon: 'brain', color: '#8b5cf6' },
  { id: '3', name: 'Electronics', description: 'Electronics projects and circuits', icon: 'zap', color: '#f59e0b' },
  { id: '4', name: 'Robotics', description: 'Robotics projects and automation', icon: 'bot', color: '#10b981' },
  { id: '5', name: 'Programming', description: 'Coding, software development', icon: 'code', color: '#ef4444' },
  { id: '6', name: '3D Printing', description: '3D printing and design', icon: 'box', color: '#f97316' },
  { id: '7', name: 'IoT', description: 'Internet of Things projects', icon: 'wifi', color: '#06b6d4' },
  { id: '8', name: 'General', description: 'General discussions and questions', icon: 'message-circle', color: '#6b7280' }
];

const CreateThreadPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters long';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 20) {
      newErrors.content = 'Content must be at least 20 characters long';
    }

    if (!formData.category_id) {
      newErrors.category_id = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual Supabase API call
      console.log('Creating thread:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to the threads page or the new thread
      router.push('/main/xchange/threads');
    } catch (error) {
      console.error('Error creating thread:', error);
      setErrors({ submit: 'Failed to create thread. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectedCategory = mockCategories.find(cat => cat.id === formData.category_id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Start a New Discussion</h1>
              <p className="text-gray-600 dark:text-gray-400">Share your question or idea with the community</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thread Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="What's your question or topic?"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                  errors.title ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                }`}
                maxLength={255}
              />
              {errors.title && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title}
                </div>
              )}
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.title.length}/255 characters
              </div>
            </div>

            {/* Category Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mockCategories.map(category => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleInputChange('category_id', category.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      formData.category_id === category.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:text-blue-400'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {category.description}
                    </div>
                  </button>
                ))}
              </div>
              {errors.category_id && (
                <div className="flex items-center gap-2 mt-3 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.category_id}
                </div>
              )}
              {selectedCategory && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: selectedCategory.color }}
                    />
                    <span className="font-medium text-sm">Selected: {selectedCategory.name}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{selectedCategory.description}</p>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Describe your question, share your thoughts, or start a discussion..."
                rows={8}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-vertical ${
                  errors.content ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.content && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errors.content}
                </div>
              )}
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    disabled
                  >
                    <Image className="w-4 h-4" />
                    Add Image (Coming Soon)
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    disabled
                  >
                    <Link className="w-4 h-4" />
                    Add Link (Coming Soon)
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {formData.content.length} characters
                </div>
              </div>
            </div>

            {/* Tags (Optional) */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (Optional)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="e.g. arduino, sensors, beginner (comma-separated)"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <p className="text-sm text-gray-500 mt-2">
                Add relevant tags to help others find your thread. Separate multiple tags with commas.
              </p>
            </div>

            {/* Submit Errors */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Error</span>
                </div>
                <p className="text-red-600 text-sm mt-1">{errors.submit}</p>
              </div>
            )}

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Community Guidelines</span>
              </div>
              <ul className="text-blue-700 dark:text-blue-400 text-sm space-y-1">
                <li>• Be respectful and constructive in your discussions</li>
                <li>• Provide clear, detailed descriptions of your questions</li>
                <li>• Search existing threads before creating new ones</li>
                <li>• Choose the most appropriate category for your topic</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Create Thread
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateThreadPage;