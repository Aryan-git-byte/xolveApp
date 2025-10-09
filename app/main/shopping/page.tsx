'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
// Update the import path below if your Layout component is in a different location
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
  TrendingUp,
  Shield,
  Truck
} from 'lucide-react';
import type { Product } from '@/lib/types/product';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'contents' | 'learning' | 'assembly'>('overview');
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
    { id: 'contents', label: 'Kit Contents', icon: Package },
    { id: 'learning', label: 'Learning', icon: Lightbulb },
    { id: 'assembly', label: 'Assembly', icon: Wrench },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Shopping</span>
          </button>

          {/* Product Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Product Image */}
              <div className="relative h-80 lg:h-auto bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8">
                <Package className="w-32 h-32 text-white opacity-30 absolute" />
                <div className="relative z-10 text-center">
                  <div className="w-48 h-48 mx-auto bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                    <Package className="w-24 h-24 text-white" />
                  </div>
                </div>
                
                {product.on_offer && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                      {product.discount_type === 'percentage' 
                        ? `${product.discount_value}% OFF`
                        : `₹${product.discount_value} OFF`
                      }
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 lg:p-8">
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium mb-3">
                    {product.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.title}</h1>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.8 rating • 124 reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl font-bold text-gray-800">₹{product.price}</span>
                    {product.on_offer && product.discount_value && (
                      <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-semibold">
                        Save ₹{product.discount_value}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span>Quality Assured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>STEM Certified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>7-Day Support</span>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition font-semibold text-gray-700"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-gray-800 w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition font-semibold text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition ${
                        activeTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Product Overview</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Lightbulb className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">Learn by Doing</h4>
                      <p className="text-sm text-gray-600">Hands-on experience</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">Skill Building</h4>
                      <p className="text-sm text-gray-600">Develop practical skills</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">Progress Tracking</h4>
                      <p className="text-sm text-gray-600">Monitor your growth</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contents' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">What's in the Box</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.kit_contents?.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'learning' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Learning Outcomes</h3>
                  <div className="space-y-3">
                    {product.learning_outcomes?.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 pt-1">{outcome}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Tools Required</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tools_required?.map((tool, index) => (
                        <span key={index} className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'assembly' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Assembly Guide</h3>
                  <div className="space-y-4">
                    {product.assembly_steps?.split('\n\n').map((step, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-start gap-3">
                      <Wrench className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Need Help?</h4>
                        <p className="text-sm text-gray-600">
                          Watch our video tutorials or contact our support team for assembly assistance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Quality Guarantee</h3>
              <p className="text-sm text-gray-600">
                All products tested and certified for quality and safety
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">
                Free delivery on all orders across India
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">7-Day Support</h3>
              <p className="text-sm text-gray-600">
                Get expert support for setup and troubleshooting
              </p>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}