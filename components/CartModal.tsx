import React from "react";
import { ShoppingCart, X } from "lucide-react";
import type { Product } from "@/lib/types/product";

type CartModalProps = {
  open: boolean;
  onClose: () => void;
  product: Product & { quantity: number };
  onQuantityChange: (newQty: number) => void;
};

export default function CartModal({ open, onClose, product, onQuantityChange }: CartModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <img
            src={product.image_urls?.[0] || ''}
            alt={product.title}
            className="w-40 h-40 object-cover rounded-xl mb-4 border"
          />
          <h2 className="text-xl font-bold mb-2 text-center">{product.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-2 line-clamp-2">{product.description}</p>
          <div className="text-2xl font-bold text-blue-600 mb-4">₹{product.price}</div>
          <div className="flex items-center gap-4">
            <button
              className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => onQuantityChange(Math.max(1, product.quantity - 1))}
            >
              -
            </button>
            <span className="text-lg font-semibold w-8 text-center">{product.quantity}</span>
            <button
              className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => onQuantityChange(product.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
