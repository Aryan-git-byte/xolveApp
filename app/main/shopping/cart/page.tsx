"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types/product";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Header, Footer } from "@/components/Layout";
import { ShoppingCart, Trash2 } from "lucide-react";
import CartModal from "@/components/CartModal";
import { useToast } from "@/components/Toast";

type CartItem = Product & { quantity: number };

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<CartItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const handleRemove = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      showToast("Cart is empty!", "error");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("orders").insert([
        {
          items: cart,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      showToast("Order placed successfully!", "success");
      setCart([]);
      localStorage.removeItem("cart");
      router.push("/main/shopping");
    } catch (err) {
      showToast("Failed to place order!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item: CartItem) => {
    setModalProduct(item);
    setModalOpen(true);
  };

  const handleQuantityChange = (newQty: number) => {
    if (!modalProduct) return;
    const updatedCart = cart.map((item) =>
      item.id === modalProduct.id ? { ...item, quantity: newQty } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setModalProduct({ ...modalProduct, quantity: newQty });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="pt-20 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <ShoppingCart className="w-7 h-7" /> Cart
          </h1>
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              Your cart is empty.
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row"
                >
                  {/* Product Image */}
                  <div className="md:w-40 w-full h-40 md:h-auto flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    {item.image_urls && item.image_urls.length > 0 ? (
                      <img
                        src={item.image_urls[0]}
                        alt={item.title}
                        className="object-cover w-full h-full rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingCart className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                  </div>
                  {/* Product Info */}
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <span className="inline-block bg-blue-100 text-blue-700 dark:text-blue-400 text-xs px-2 py-1 rounded-full font-medium mb-2">
                        {item.category}
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{item.description}</p>
                      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">₹{item.price}</div>
                    </div>
                    <div className="flex items-center justify-between mt-4 gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <button
                          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                          onClick={() => {
                            if (item.quantity > 1) {
                              const newQty = item.quantity - 1;
                              const updatedCart = cart.map((ci) => ci.id === item.id ? { ...ci, quantity: newQty } : ci);
                              setCart(updatedCart);
                              localStorage.setItem("cart", JSON.stringify(updatedCart));
                            }
                          }}
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                          onClick={() => {
                            const newQty = item.quantity + 1;
                            const updatedCart = cart.map((ci) => ci.id === item.id ? { ...ci, quantity: newQty } : ci);
                            setCart(updatedCart);
                            localStorage.setItem("cart", JSON.stringify(updatedCart));
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/main/shopping/${item.id}`)}
                          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm font-medium"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                          title="Remove"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          )}
        </div>
        <CartModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          product={modalProduct as CartItem}
          onQuantityChange={handleQuantityChange}
        />
      </main>
      <Footer />
    </div>
  );
}
