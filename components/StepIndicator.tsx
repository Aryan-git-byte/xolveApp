"use client";

import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: "Fill Info", description: "Enter delivery details" },
  { number: 2, title: "Payment", description: "Review & pay" },
  { number: 3, title: "Confirmation", description: "Order complete" },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8 flex justify-center">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-center max-w-3xl w-full">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep > step.number
                    ? "bg-green-500 text-white"
                    : currentStep === step.number
                    ? "bg-blue-600 text-white ring-4 ring-blue-200 dark:ring-blue-800"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-6 h-6" />
                ) : (
                  step.number
                )}
              </div>
              <div className="mt-2 text-center">
                <div
                  className={`text-sm font-semibold ${
                    currentStep >= step.number
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {step.description}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 relative" style={{ marginTop: "-52px" }}>
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    currentStep > step.number
                      ? "bg-green-500 w-full"
                      : "bg-blue-600 w-0"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  currentStep > step.number
                    ? "bg-green-500 text-white"
                    : currentStep === step.number
                    ? "bg-blue-600 text-white ring-2 ring-blue-200 dark:ring-blue-800"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2">
                  <div className="h-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        currentStep > step.number
                          ? "bg-green-500 w-full"
                          : "bg-blue-600 w-0"
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Current Step Info */}
        <div className="text-center">
          <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {steps[currentStep - 1].title}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {steps[currentStep - 1].description}
          </div>
        </div>
      </div>
    </div>
  );
}
