'use client';

import { useEffect, useState, use } from 'react';
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
import { useToast } from '@/components/Toast';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'contents' | 'learning' | 'assembly'>('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const resolvedParams = use(params);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', resolvedParams.id)
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
  }, [resolvedParams.id, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <main className="pt-20 pb-24 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <main className="pt-20 pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Product not found</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">The product you're looking for doesn't exist</p>
              <button
                onClick={() => router.push('/main/shopping')}
                className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition"
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

  // Add to Cart handler
  const handleAddToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    // Dispatch custom event so Header updates cart count immediately
    window.dispatchEvent(new Event('cart-updated'));
    showToast('Added to cart!', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Back Button */}
          <button
            onClick={() => router.push('/main/shopping')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:text-gray-100 transition group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
            <span className="font-medium">Back to Shopping</span>
          </button>

          {/* Product Main Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Product Image Gallery */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Main Image */}
                <div className="relative h-96">
                  {product.image_urls && product.image_urls.length > 0 ? (
                    <img 
                      src={product.image_urls[selectedImage]} 
                      alt={product.title} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 flex items-center justify-center">
                      <Package className="w-32 h-32 text-white opacity-20 absolute" />
                      <div className="relative z-10">
                        <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                          <Package className="w-32 h-32 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                  
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
                          : 'bg-white/90 text-gray-700 dark:text-gray-300 hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white dark:hover:bg-gray-600 transition">
                      <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="p-4 bg-gray-50">
                  <div className={`grid gap-3 ${product.image_urls && product.image_urls.length > 4 ? 'grid-cols-5' : 'grid-cols-4'}`}>
                    {product.image_urls && product.image_urls.map((url, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative h-20 rounded-lg overflow-hidden border-2 transition ${
                          selectedImage === index
                            ? 'border-blue-600'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        <img src={url} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
              
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400 text-sm px-3 py-1.5 rounded-full font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  {product.category}
                </span>
              </div>

              {/* Title and Description */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">{product.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{product.description}</p>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">4.8</span>
                <span className="text-gray-500 dark:text-gray-400">(124 reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-gray-800 dark:text-gray-100">₹{product.price}</span>
                  {product.on_offer && product.discount_value && (
                    <>
                      <span className="text-xl text-gray-400 line-through">₹{product.price + product.discount_value}</span>
                      <span className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400 text-sm px-3 py-1 rounded-full font-semibold">
                        Save ₹{product.discount_value}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Inclusive of all taxes • Free shipping</p>
              </div>

              {/* Key Features - Simplified */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">STEM Certified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">2-3 Hour Build</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Beginner Friendly</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Interactive</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition font-semibold text-gray-700 dark:text-gray-300 text-lg"
                  >
                    -
                  </button>
                  <div className="w-16 h-11 bg-gray-50 border-2 border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">{quantity}</span>
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition font-semibold text-gray-700 dark:text-gray-300 text-lg"
                  >
                    +
                  </button>
                  <div className="ml-auto text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">₹{product.price * quantity}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons - More Prominent */}
              <div className="space-y-3 mb-6">
                <button onClick={handleAddToCart} className="w-full bg-blue-600 dark:bg-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 text-lg">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="w-full px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition">
                  Buy Now
                </button>
              </div>

              {/* Delivery Info - Simplified */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">Free Delivery by Oct 15, 2025</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Order now for fast shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50">
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition relative ${
                        activeTab === tab.id
                          ? 'text-blue-600 dark:text-blue-400 bg-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600'
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
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Product Overview</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{product.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                      <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-4" />
                      <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Hands-On Learning</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Learn by building real projects</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                      <Award className="w-6 h-6 text-green-600 dark:text-green-400 mb-4" />
                      <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Skill Development</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Build essential STEM skills</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                      <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-4" />
                      <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Track Progress</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Monitor your learning journey</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contents' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">What's in the Box</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.kit_contents?.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition border border-gray-200 dark:border-gray-700">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'learning' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">What You'll Learn</h3>
                  <div className="space-y-4 mb-6">
                    {product.learning_outcomes?.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium pt-1">{outcome}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                    <div className="flex items-start gap-3 mb-4">
                      <Wrench className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Tools Required</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Make sure you have these tools handy</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.tools_required?.map((tool, index) => (
                        <span key={index} className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg text-sm font-medium border border-orange-200 dark:border-orange-800">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'assembly' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Assembly Guide</h3>
                  <div className="space-y-4">
                    {product.assembly_steps?.split('\n\n').map((step, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 text-white rounded-xl flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Customer Reviews - Simplified */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Customer Reviews</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">4.8</span>
                <span className="text-gray-500 dark:text-gray-400">(124 reviews)</span>
              </div>
            </div>
            
            {/* Sample Reviews - Just 2 instead of 3 */}
            <div className="space-y-4">
              {[
                {
                  name: "Rahul Sharma",
                  rating: 5,
                  review: "Excellent kit! My son loved building it. The instructions were clear and all parts were included."
                },
                {
                  name: "Priya Patel",
                  rating: 5,
                  review: "Amazing quality and very educational. Perfect for beginners. Highly recommend!"
                }
              ].map((review, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">{review.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.review}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              View All Reviews
            </button>
          </div>

          {/* Related Products - Simplified */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">You May Also Like</h3>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:text-blue-400 font-medium text-sm">
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer group">
                  <div className="relative h-32 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Package className="w-12 h-12 text-white opacity-30" />
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-400 text-xs px-2 py-1 rounded-full font-medium mb-2">
                      Robotics
                    </span>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:text-blue-400 transition">
                      Advanced Robot Kit
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-800 dark:text-gray-100">₹2,499</span>
                      <button className="px-3 py-1.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition text-sm font-medium">
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