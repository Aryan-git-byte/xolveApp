"use client";

import { Package, MapPin, CreditCard, ArrowLeft } from "lucide-react";
import { OrderFormData, PaymentMethod } from "@/lib/types/order";
import { Product } from "@/lib/types/product";
import { useState } from "react";
import RazorpayButton from "@/components/RazorpayButton";

type CartItem = Product & { quantity: number };

interface OrderReviewProps {
  formData: OrderFormData;
  cartItems: CartItem[];
  totalAmount: number;
  onBack: () => void;
  onProceedToPayment: (paymentMethod: PaymentMethod) => void;
  loading?: boolean;
}

export default function OrderReview({
  formData,
  cartItems,
  totalAmount,
  onBack,
  onProceedToPayment,
  loading = false,
}: OrderReviewProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  
  // Calculate amounts
  const subtotal = totalAmount;
  const shippingCharges = 0; // Free shipping
  const partialCODCharge = 50; // Extra charge for partial COD
  
  // Total depends on payment method
  const totalWithCODCharge = subtotal + shippingCharges + partialCODCharge;
  const regularTotal = subtotal + shippingCharges;
  
  // Display total based on selected payment
  const displayTotal = selectedPayment === "partial_cod" ? totalWithCODCharge : regularTotal;

  const handlePayNow = () => {
    if (selectedPayment) {
      onProceedToPayment(selectedPayment);
    }
  };

  const handleRazorpaySuccess = (paymentData: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => {
    // After successful payment, proceed with order confirmation
    console.log("Payment successful:", paymentData);
    if (selectedPayment) {
      onProceedToPayment(selectedPayment);
    }
  };

  const handleRazorpayError = (error: string) => {
    console.error("Payment error:", error);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Details
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="w-6 h-6" />
            Payment
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start text-sm"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {item.title} <span className="text-gray-500">x{item.quantity}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ₹{item.price} each
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}

              {/* Subtotal and Total */}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                </div>
                {selectedPayment === "partial_cod" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Partial COD Charge:</span>
                    <span className="font-medium text-orange-600 dark:text-orange-400">+₹{partialCODCharge}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-900 dark:text-gray-100">Total:</span>
                  <span className="text-blue-600 dark:text-blue-400">₹{displayTotal}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                {selectedPayment === "partial_cod" 
                  ? "Partial COD includes ₹50 extra charge. MRP + ₹50 charge."
                  : "MRP includes kit price, packaging, and shipping. No extra charges."
                }
              </p>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Shipping Details
            </h3>
            <div className="space-y-1 text-sm">
              <p className="text-gray-900 dark:text-gray-100">
                <span className="font-semibold">Name:</span> {formData.name}
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                <span className="font-semibold">Email:</span> {formData.email}
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                <span className="font-semibold">Phone:</span> {formData.contact}
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                <span className="font-semibold">Address:</span> {formData.address}, {formData.pincode}
              </p>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Secure Payment with Razorpay
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
              Your payment is processed securely through Razorpay. We accept UPI, cards, net banking, and wallets.
            </p>

            <div className="space-y-3">
              {/* Partial COD Option */}
              <label
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPayment === "partial_cod"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                    : "border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="partial_cod"
                  checked={selectedPayment === "partial_cod"}
                  onChange={(e) => setSelectedPayment(e.target.value as PaymentMethod)}
                  className="sr-only"
                />
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === "partial_cod"
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {selectedPayment === "partial_cod" && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Partial COD
                      </span>
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                        Recommended
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-7">
                      Pay ₹50 extra charge online + full amount on delivery
                    </p>
                    <div className="mt-2 ml-7 bg-white dark:bg-gray-700 rounded-lg p-2 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Pay Now (Charge):</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">₹50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Pay on Delivery:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ₹{subtotal}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-gray-200 dark:border-gray-600">
                        <span className="text-gray-600 dark:text-gray-400 font-semibold">Total:</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">
                          ₹{totalWithCODCharge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </label>

              {/* Full Online Payment Option */}
              <label
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPayment === "full_online"
                    ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                    : "border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-700"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="full_online"
                  checked={selectedPayment === "full_online"}
                  onChange={(e) => setSelectedPayment(e.target.value as PaymentMethod)}
                  className="sr-only"
                />
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === "full_online"
                            ? "border-green-500 bg-green-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {selectedPayment === "full_online" && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Full Online Payment
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-7">
                      Pay the complete amount now (No extra charges)
                    </p>
                    <div className="mt-2 ml-7 bg-white dark:bg-gray-700 rounded-lg p-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total Payment:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ₹{regularTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Order Review Process Notice */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-300 text-sm mb-2">
              Order Review Process
            </h4>
            <p className="text-xs text-green-700 dark:text-green-400">
              After successful payment, your order will be "Pending Review". Our team reviews and confirms each order within 24 hours before shipping. Updates sent via email and WhatsApp.
            </p>
          </div>

          {/* Pay Now Button - Using Razorpay */}
          {selectedPayment === "full_online" && (
            <RazorpayButton
              amount={regularTotal}
              orderId={`order_${Date.now()}`}
              customerName={formData.name}
              customerEmail={formData.email}
              customerPhone={formData.contact}
              description={`Order - ${cartItems.map((item) => item.title).join(", ")}`}
              onSuccess={handleRazorpaySuccess}
              onError={handleRazorpayError}
              loading={loading}
            >
              Pay ₹{regularTotal} Now
            </RazorpayButton>
          )}

          {selectedPayment === "partial_cod" && (
            <RazorpayButton
              amount={50}
              orderId={`order_${Date.now()}`}
              customerName={formData.name}
              customerEmail={formData.email}
              customerPhone={formData.contact}
              description="Partial COD - Pay ₹50 now, rest on delivery"
              onSuccess={handleRazorpaySuccess}
              onError={handleRazorpayError}
              loading={loading}
            >
              Pay ₹50 Now (Partial COD)
            </RazorpayButton>
          )}

          {/* Security Notice */}
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              🔒 Your payment information is secure and encrypted. We never store your card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
