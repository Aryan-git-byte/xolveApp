'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import type { Product } from '@/lib/types/product';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          {product.image_urls && product.image_urls[0] && (
            <div className="relative w-full h-[400px]">
              <Image
                src={product.image_urls[0]}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <div className="grid grid-cols-4 gap-2">
            {product.image_urls?.slice(1).map((url, index) => (
              <div key={index} className="relative h-20">
                <Image
                  src={url}
                  alt={`${product.title} ${index + 2}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold">₹{product.price}</span>
            {product.on_offer && product.discount_value && (
              <span className="text-green-500">
                {product.discount_type === 'percentage' ? `${product.discount_value}% OFF` : `₹${product.discount_value} OFF`}
              </span>
            )}
          </div>

          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>

          {/* Kit Contents */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Kit Contents</h2>
            <ul className="list-disc list-inside space-y-1">
              {product.kit_contents?.map((item, index) => (
                <li key={index} className="text-gray-600">{item}</li>
              ))}
            </ul>
          </div>

          {/* Learning Outcomes */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Learning Outcomes</h2>
            <ul className="list-disc list-inside space-y-1">
              {product.learning_outcomes?.map((outcome, index) => (
                <li key={index} className="text-gray-600">{outcome}</li>
              ))}
            </ul>
          </div>

          {/* Tools Required */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Tools Required</h2>
            <ul className="list-disc list-inside space-y-1">
              {product.tools_required?.map((tool, index) => (
                <li key={index} className="text-gray-600">{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Assembly Steps */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Assembly Steps</h2>
        <div className="prose max-w-none">
          {product.assembly_steps?.split('\n\n').map((step, index) => (
            <p key={index} className="mb-4">{step}</p>
          ))}
        </div>
      </div>
    </div>
  );
}