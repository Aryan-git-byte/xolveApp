"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CompanionIntroPage() {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!nickname.trim()) {
      setError("Please enter a nickname!");
      return;
    }
    
    // Save nickname to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('xolve_nickname', nickname);
    }
    
    router.push("/onboarding/personalize");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow w-full max-w-md">
        {/* Welcome section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Hey!</h1>
          <h2 className="text-2xl font-semibold text-blue-100 mb-6">I'm Your Learning Companion</h2>
          
          {/* Character/Avatar */}
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
              <div className="text-6xl">🤖</div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">✨</span>
            </div>
          </div>
          
          <p className="text-lg text-blue-100 leading-relaxed max-w-sm mx-auto">
            I'm going to be your personal companion through Xolvetech. What do I call you?
          </p>
        </div>

        {/* Input section */}
        <div className="w-full max-w-sm">
          <div className="relative">
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setError("");
              }}
              placeholder="Choose a nickname..."
              className="w-full px-6 py-4 bg-white/95 backdrop-blur-sm text-blue-900 rounded-2xl font-medium focus:outline-none focus:ring-4 focus:ring-orange-500/50 shadow-xl placeholder-blue-400 transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button
                onClick={handleContinue}
                className="px-8 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95 shadow-lg"
              >
                →
              </button>
            </div>
          </div>
          
          {error && (
            <p className="text-orange-300 mt-3 text-sm font-medium flex items-center gap-2">
              <span>⚠️</span> {error}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center mt-8 space-y-4">
        {/* Sign In Link */}
        <div>
          <p className="text-white text-base">
            Already have an account?{" "}
            <Link 
              href="/login"
              className="text-orange-400 underline hover:text-orange-300 transition font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
        
        {/* Terms & Conditions */}
        <p className="text-blue-200 text-sm">
          By continuing, you agree to our{" "}
          <button className="text-orange-400 underline hover:text-orange-300 transition">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-orange-400 underline hover:text-orange-300 transition">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
}