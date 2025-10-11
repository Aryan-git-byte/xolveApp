"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();
  const nickname = typeof window !== 'undefined' ? localStorage.getItem('xolve_nickname') || "there" : "there";

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push("/main/home");
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        console.error("Error signing in:", error.message);
        setError("Error signing in. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (data?.user) {
        // Update last login time
        await supabase
          .from('user_profiles')
          .update({ 
            last_login_at: new Date().toISOString() 
          })
          .eq('id', data.user.id);

        // Log the login
        await supabase
          .from('login_history')
          .insert({
            user_id: data.user.id,
            device_type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
            browser: navigator.userAgent.split(' ').pop()?.split('/')[0] || 'unknown',
          });

        // Check if phone is verified
        const isPhoneVerified = data.user.user_metadata?.phone_verified === true;
        if (data.user.phone && isPhoneVerified) {
          router.push("/main/home");
        } else {
          router.push("/verify-phone");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>

      {/* Companion floating in corner */}
      <div className="absolute top-8 right-8 hidden md:block">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl animate-bounce">
            <span className="text-3xl">🤖</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-sm">✨</span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4 md:hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl">
                <span className="text-3xl">🤖</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Welcome Back, {nickname}! 👋
            </h1>
            <p className="text-blue-600">
              Sign in to continue your XolveTech journey
            </p>
          </div>

          {!showEmailForm ? (
            <>
              {/* Google Sign In Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-xl font-semibold text-blue-900 shadow-md transition-all mb-4"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {loading ? "Signing in..." : "Continue with Google"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-blue-500 font-medium">Or sign in with email</span>
                </div>
              </div>

              {/* Email Login Button */}
              <button
                onClick={() => setShowEmailForm(true)}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95 shadow-lg mb-6"
              >
                Sign in with Email
              </button>
            </>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-blue-700 mb-2">
                  ✉️ Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-3 bg-blue-50 text-blue-900 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-blue-700 mb-2">
                  🔒 Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 bg-blue-50 text-blue-900 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95 shadow-lg disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => {
                  setShowEmailForm(false);
                  setError("");
                }}
                className="w-full px-6 py-3 text-blue-600 hover:text-blue-700 font-medium transition"
              >
                ← Back to options
              </button>
            </form>
          )}

          
        </div>

        {/* Bottom Message from Companion */}
        <div className="mt-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 inline-block">
            <p className="text-white text-sm">
              <span className="text-orange-400 font-semibold">🤖 X says:</span> "Welcome back! Ready to continue learning?"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}