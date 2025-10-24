"use client";

import { CreditCard, Banknote } from "lucide-react";
import { PaymentMethod } from "@/lib/types/order";

interface PaymentChoiceProps {
  totalAmount: number;
  onSelect: (method: PaymentMethod) => void;
  onBack: () => void;
}

export default function PaymentChoice({ 
  totalAmount, 
  onSelect, 
  onBack 
}: PaymentChoiceProps) {
  const partialCODAmount = 50;
  const codAmount = totalAmount - partialCODAmount;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Choose Payment Method
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Total Amount: <span className="text-xl font-bold text-gray-900 dark:text-gray-100">₹{totalAmount}</span>
      </p>

      <div className="space-y-4">
        {/* Partial COD Option */}
        <button
          onClick={() => onSelect("partial_cod")}
          className="w-full group"
        >
          <div className="p-6 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 bg-gradient-to-br from-blue-50 to-white dark:from-gray-700 dark:to-gray-800 transition-all duration-200 hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition">
                <Banknote className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Partial COD
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Pay ₹{partialCODAmount} now and rest on delivery
                </p>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Pay Now:</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">₹{partialCODAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Pay on Delivery:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">₹{codAmount}</span>
                  </div>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  Recommended
                </div>
              </div>
            </div>
          </div>
        </button>

        {/* Full Online Payment Option */}
        <button
          onClick={() => onSelect("full_payment")}
          className="w-full group"
        >
          <div className="p-6 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-500 bg-gradient-to-br from-green-50 to-white dark:from-gray-700 dark:to-gray-800 transition-all duration-200 hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800 transition">
                <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                  Full Online Payment
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Pay the complete amount now
                </p>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Payment:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">₹{totalAmount}</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    Secure Payment
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    Instant Confirmation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="w-full mt-6 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      >
        Back to Details
      </button>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          🔒 Your payment information is secure and encrypted. We never store your card details.
        </p>
      </div>
    </div>
  );
}
