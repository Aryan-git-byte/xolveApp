'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/Layout';
import { 
  ShoppingCart,
  Star,
  Package,
  ChevronLeft,
  Heart,
  Share2,
  CheckCircle,
  Lightbulb,
  Wrench,
  BookOpen,
  Award,
  Clock,
  Shield,
  Truck,
  Sparkles,
  Users,
  TrendingUp,
  Zap,
  Target
} from 'lucide-react';
import type { Product } from '@/lib/types/product';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'contents' | 'learning' | 'assembly'>('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20 pb-24 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20 pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h1>
              <p className="text-gray-600 mb-6">The product you're looking for doesn't exist</p>
              <button
                onClick={() => router.push('/main/shopping')}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Back to Shopping
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'contents', label: 'What\'s Inside', icon: Package },
    { id: 'learning', label: 'You\'ll Learn', icon: Lightbulb },
    { id: 'assembly', label: 'How to Build', icon: Wrench },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Back Button */}
          <button
            onClick={() => router.push('/main/shopping')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
            <span className="font-medium">Back to Shopping</span>
          </button>

          {/* Product Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Product Image Gallery */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Main Image */}
                <div className="relative h-96 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Package className="w-32 h-32 text-white opacity-20 absolute" />
                  <div className="relative z-10">
                    <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                      <Package className="w-32 h-32 text-white" />
                    </div>
                  </div>
                  
                  {/* Offer Badge */}
                  {product.on_offer && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        {product.discount_type === 'percentage' 
                          ? `${product.discount_value}% OFF`
                          : `₹${product.discount_value} OFF`
                        }
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm transition ${
                        isFavorite 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/90 text-gray-700 hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white transition">
                      <Share2 className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative h-20 rounded-lg overflow-hidden border-2 transition ${
                          selectedImage === index
                            ? 'border-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <Package className="w-8 h-8 text-white opacity-50" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Quality Assured</p>
                    <p className="text-xs text-gray-500">STEM Certified</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Free Shipping</p>
                    <p className="text-xs text-gray-500">Delivered in 3-5 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
              
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-sm px-3 py-1.5 rounded-full font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  {product.category}
                </span>
              </div>

              {/* Title and Description */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{product.title}</h1>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">4.8</span>
                <span className="text-sm text-gray-500">(124 reviews)</span>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>342 students</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-gray-800">₹{product.price}</span>
                  {product.on_offer && product.discount_value && (
                    <>
                      <span className="text-xl text-gray-400 line-through">₹{product.price + product.discount_value}</span>
                      <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-semibold">
                        Save ₹{product.discount_value}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500">Inclusive of all taxes • Free shipping</p>
              </div>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">STEM Certified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700 font-medium">2-3 Hour Build</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Skill Level: Beginner</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Interactive Learning</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition font-semibold text-gray-700 text-lg"
                  >
                    -
                  </button>
                  <div className="w-16 h-11 bg-gray-50 border-2 border-gray-200 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-800">{quantity}</span>
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition font-semibold text-gray-700 text-lg"
                  >
                    +
                  </button>
                  <div className="ml-auto text-right">
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="text-2xl font-bold text-gray-800">₹{product.price * quantity}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button className="flex-1 bg-blue-600 text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="px-6 py-3.5 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition">
                  Buy Now
                </button>
              </div>

              {/* Delivery Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Fast & Free Delivery</p>
                    <p className="text-sm text-gray-600">
                      Order now and get it delivered by <span className="font-semibold text-gray-800">Oct 15, 2025</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition relative ${
                        activeTab === tab.id
                          ? 'text-blue-600 bg-white'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 lg:p-8">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Product Overview</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <Lightbulb className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">Hands-On Learning</h4>
                      <p className="text-sm text-gray-600">Learn by building real projects and gain practical experience</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">Skill Development</h4>
                      <p className="text-sm text-gray-600">Build essential STEM skills through guided activities</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">Track Progress</h4>
                      <p className="text-sm text-gray-600">Monitor your learning journey and celebrate milestones</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contents' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">What's in the Box</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.kit_contents?.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition border border-gray-200">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'learning' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">What You'll Learn</h3>
                  <div className="space-y-4 mb-8">
                    {product.learning_outcomes?.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-4 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover:shadow-md transition">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold shadow-lg">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 font-medium pt-2 leading-relaxed">{outcome}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1">Tools Required</h4>
                        <p className="text-sm text-gray-600 mb-3">Make sure you have these tools handy before starting</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.tools_required?.map((tool, index) => (
                        <span key={index} className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-orange-200 shadow-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'assembly' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Assembly Guide</h3>
                  <div className="space-y-4 mb-6">
                    {product.assembly_steps?.split('\n\n').map((step, index) => (
                      <div key={index} className="flex gap-5 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition border border-gray-200">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed font-medium">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Need Help?</h4>
                        <p className="text-gray-600 mb-3">
                          Stuck during assembly? We're here to help! Watch our detailed video tutorials or contact our support team.
                        </p>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                            Watch Video Tutorial
                          </button>
                          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium border border-gray-200">
                            Contact Support
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Customer Reviews</h3>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Write a Review
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-1 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 text-center">
                <div className="text-5xl font-bold text-gray-800 mb-2">4.8</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">Based on 124 reviews</p>
              </div>
              
              <div className="md:col-span-2 space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-12">{stars} star</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: stars === 5 ? '80%' : stars === 4 ? '15%' : '5%' }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">
                      {stars === 5 ? '99' : stars === 4 ? '19' : stars === 3 ? '4' : stars === 2 ? '1' : '1'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-4">
              {[
                {
                  name: "Rahul Sharma",
                  rating: 5,
                  date: "2 days ago",
                  review: "Excellent kit! My son loved building it. The instructions were clear and all parts were included. Great learning experience.",
                  helpful: 12
                },
                {
                  name: "Priya Patel",
                  rating: 5,
                  date: "1 week ago",
                  review: "Amazing quality and very educational. Perfect for beginners. Highly recommend for anyone interested in STEM learning.",
                  helpful: 8
                },
                {
                  name: "Amit Kumar",
                  rating: 4,
                  date: "2 weeks ago",
                  review: "Good kit overall. Assembly took longer than expected but the final result was worth it. Could use better packaging.",
                  helpful: 5
                }
              ].map((review, index) => (
                <div key={index} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{review.name}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">{review.review}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <button className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
                      <span>👍</span>
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 border-2 border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition">
              Load More Reviews
            </button>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Quality Guarantee</h3>
              <p className="text-sm text-gray-600">
                All products are tested and certified for quality and safety standards
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">
                Free delivery on all orders across India with tracking support
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">7-Day Support</h3>
              <p className="text-sm text-gray-600">
                Get expert support for setup, assembly, and troubleshooting
              </p>
            </div>
          </div>

          {/* Related Products */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">You May Also Like</h3>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer group">
                  <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Package className="w-16 h-16 text-white opacity-30" />
                    <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-lg font-bold">
                      20% OFF
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium mb-2">
                      Robotics
                    </span>
                    <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition">
                      Advanced Robot Kit
                    </h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Build your own programmable robot with sensors
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-800">₹2,499</span>
                      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}