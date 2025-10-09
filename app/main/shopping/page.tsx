"use client";
import React, { useState } from 'react';
import { Header, Footer } from '../../../components/Layout';
import { 
  Search,
  Filter,
  Grid,
  List,
  Star,
  Heart,
  Plus,
  Minus,
  ShoppingBag,
  BookOpen
} from 'lucide-react';

// Shopping Page Component
const ShoppingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'courses', name: 'Courses' },
    { id: 'books', name: 'E-Books' },
    { id: 'tools', name: 'Dev Tools' },
    { id: 'templates', name: 'Templates' },
    { id: 'subscriptions', name: 'Subscriptions' }
  ];

  const products = [
    {
      id: 1,
      name: "Advanced React Course",
      category: "courses",
      price: 99.99,
      originalPrice: 149.99,
      rating: 4.8,
      reviews: 1204,
      image: "/api/placeholder/300/200",
      tag: "Bestseller",
      description: "Master React with hooks, context, and performance optimization"
    },
    {
      id: 2,
      name: "JavaScript Complete Guide",
      category: "books",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.9,
      reviews: 892,
      image: "/api/placeholder/300/200",
      tag: "New",
      description: "Comprehensive guide to modern JavaScript development"
    },
    {
      id: 3,
      name: "VS Code Pro Extensions Pack",
      category: "tools",
      price: 19.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 567,
      image: "/api/placeholder/300/200",
      tag: "Popular",
      description: "Essential extensions for professional development"
    },
    {
      id: 4,
      name: "Mobile App UI Kit",
      category: "templates",
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.6,
      reviews: 342,
      image: "/api/placeholder/300/200",
      tag: "Sale",
      description: "200+ mobile UI components and screens"
    },
    {
      id: 5,
      name: "Premium Learning Subscription",
      category: "subscriptions",
      price: 14.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 2156,
      image: "/api/placeholder/300/200",
      tag: "Monthly",
      description: "Access to all courses and premium content"
    },
    {
      id: 6,
      name: "Node.js Masterclass",
      category: "courses",
      price: 79.99,
      originalPrice: 119.99,
      rating: 4.7,
      reviews: 976,
      image: "/api/placeholder/300/200",
      tag: "Hot",
      description: "Build scalable backend applications with Node.js"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: number) => {
    // Add to cart logic here
    console.log('Added to cart:', productId);
  };

  const toggleWishlist = (productId: number) => {
    // Toggle wishlist logic here
    console.log('Toggled wishlist:', productId);
  };

  const ProductCard = ({ product }: { product: any }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group">
      <div className="relative">
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-gray-400" />
        </div>
        {product.tag && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {product.tag}
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition"
        >
          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content Area */}
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop</h1>
            <p className="text-gray-600">Discover courses, tools, and resources to boost your skills</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <div className="flex items-center gap-4">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Sort by: Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="p-2 hover:bg-gray-100 rounded-full transition"
                          >
                            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition" />
                          </button>
                          <button
                            onClick={() => addToCart(product.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-800">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                        {product.tag && (
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                            {product.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShoppingPage;