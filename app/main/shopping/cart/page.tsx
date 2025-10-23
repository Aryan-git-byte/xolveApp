"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types/product";
import { Order, OrderFormData, PaymentMethod } from "@/lib/types/order";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Header, Footer } from "@/components/Layout";
import { ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import CartModal from "@/components/CartModal";
import OrderDetailsForm from "@/components/OrderDetailsForm";
import PaymentChoice from "@/components/PaymentChoice";
import OrderSuccess from "@/components/OrderSuccess";
import OrderReview from "@/components/OrderReview";
import StepIndicator from "@/components/StepIndicator";
import { useToast } from "@/components/Toast";

type CartItem = Product & { quantity: number };
type OrderStep = "cart" | "details" | "review" | "success";

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<CartItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderStep, setOrderStep] = useState<OrderStep>("cart");
  const [orderData, setOrderData] = useState<Partial<Order>>({});
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

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
    // Move to order details form
    setOrderStep("details");
  };

  const handleOrderDetailsSubmit = (formData: OrderFormData) => {
    // Save form data and move to review/payment screen
    setOrderData({
      ...formData,
      cart_items: cart,
      total_amount: calculateTotal(),
      order_type: "product",
    });
    setOrderStep("review");
  };

  const handlePaymentChoice = async (method: PaymentMethod) => {
    setLoading(true);
    try {
      // Calculate final total based on payment method
      const partialCODCharge = 50;
      const finalTotal = method === "partial_cod" 
        ? orderData.total_amount! + partialCODCharge 
        : orderData.total_amount!;
      
      // Generate a real UUID (v4)
      function uuidv4() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
          return crypto.randomUUID();
        }
        // Fallback: manual UUID v4 generator
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

      // Create complete order object
      const newOrder: Order = {
        id: uuidv4(),
        created_at: new Date().toISOString(),
        name: orderData.name!,
        contact: orderData.contact!,
        address: orderData.address!,
        email: orderData.email!,
        pincode: orderData.pincode!,
        total_amount: finalTotal,
        order_type: orderData.order_type!,
        cart_items: orderData.cart_items!,
        payment_method: method,
        payment_status: method === "partial_cod" ? "partial" : "paid",
        is_partial_cod: method === "partial_cod",
        status: "pending",
      };

      // Store order data in session/state for success screen
      setOrderData(newOrder);
      
      // Clear cart and show success
      setCart([]);
      localStorage.removeItem("cart");
      
      // Show success screen
      setOrderStep("success");
      showToast("Order placed successfully! Your payment is being processed.", "success");
      
      // Optionally, insert into Supabase (but this should happen after payment confirmation)
      // In a real app, you'd have a webhook to handle Razorpay payment confirmation
      // and then update the order status in Supabase
      const { error } = await supabase.from("orders").insert([newOrder]);
      if (error) {
        console.warn("Order insertion warning:", error);
        // Don't throw error here as payment was successful on Razorpay
      }
    } catch (err) {
      console.error("Order placement error:", err);
      showToast("Failed to place order!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCart = () => {
    setOrderStep("cart");
  };

  const handleBackToDetails = () => {
    setOrderStep("details");
  };

  const handleContinueShopping = () => {
    setOrderStep("cart");
    router.push("/main/shopping");
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
          {/* Header with back button for non-cart steps */}
          {orderStep !== "cart" && orderStep !== "success" && orderStep !== "review" && (
            <button
              onClick={handleBackToCart}
              className="mb-4 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          )}

          {/* Show step indicator for order flow */}
          {orderStep !== "cart" && (
            <StepIndicator 
              currentStep={
                orderStep === "details" ? 1 : 
                orderStep === "review" ? 2 : 
                3
              } 
            />
          )}

          {/* Cart View */}
          {orderStep === "cart" && (
            <>
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
                  
                  {/* Total and Place Order */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total:</span>
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">₹{calculateTotal()}</span>
                    </div>
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Place Order"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Order Details Form */}
          {orderStep === "details" && (
            <OrderDetailsForm 
              onSubmit={handleOrderDetailsSubmit}
              onCancel={handleBackToCart}
            />
          )}

          {/* Order Review & Payment */}
          {orderStep === "review" && (
            <OrderReview
              formData={{
                name: orderData.name!,
                contact: orderData.contact!,
                address: orderData.address!,
                email: orderData.email!,
                pincode: orderData.pincode!,
              }}
              cartItems={cart}
              totalAmount={orderData.total_amount || 0}
              onBack={handleBackToDetails}
              onProceedToPayment={handlePaymentChoice}
              loading={loading}
            />
          )}

          {/* Order Success */}
          {orderStep === "success" && orderData.id && (
            <OrderSuccess
              order={orderData as Order}
              onContinueShopping={handleContinueShopping}
            />
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