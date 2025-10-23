"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayPaymentProps {
  amount: number; // Amount in rupees (will be converted to paise)
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description?: string;
  onSuccess: (paymentData: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onError: (error: string) => void;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function RazorpayButton({
  amount,
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  description = "Order Payment",
  onSuccess,
  onError,
  loading = false,
  disabled = false,
  children,
}: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { showToast } = useToast();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    script.onerror = () => {
      showToast("Failed to load payment gateway. Please try again.", "error");
      setScriptLoaded(false);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [showToast]);

  const handlePayment = async () => {
    if (!scriptLoaded) {
      showToast("Payment gateway is loading. Please wait...", "error");
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Create order on backend
      const createOrderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          orderId,
          customerName,
          customerEmail,
          customerPhone,
          description,
        }),
      });

      if (!createOrderResponse.ok) {
        const error = await createOrderResponse.json();
        throw new Error(error.error || "Failed to create order");
      }

      const orderData = await createOrderResponse.json();
      // Step 2: Open Razorpay checkout (all payment methods enabled)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Xolvetech",
        description: description,
        customer_notification: 1,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: "#2563eb",
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          // Step 3: Verify payment on backend
          try {
            const verifyResponse = await fetch("/api/payment/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              const error = await verifyResponse.json();
              throw new Error(error.error || "Payment verification failed");
            }

            // Payment successful
            showToast("Payment successful!", "success");
            onSuccess(response);
          } catch (error) {
            console.error("Payment verification error:", error);
            showToast(
              error instanceof Error
                ? error.message
                : "Payment verification failed",
              "error"
            );
            onError(
              error instanceof Error ? error.message : "Verification failed"
            );
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            showToast("Payment cancelled", "error");
            onError("Payment cancelled by user");
            setIsLoading(false);
          },
        },
      };

      const razorpayWindow = new window.Razorpay(options);
      try {
        razorpayWindow.open();
      } catch (err) {
        showToast("Failed to launch payment window.", "error");
      }
    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Payment failed";
      showToast(errorMessage, "error");
      onError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || isLoading || loading || !scriptLoaded}
      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
    >
      {isLoading || loading ? "Processing..." : children || "Pay with Razorpay"}
    </button>
  );
}
