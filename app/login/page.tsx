"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
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

  useEffect(() => {
    // Countdown timer for resend OTP
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = digits.slice(0, 10);
    
    // Format as: 12345 67890
    if (limited.length <= 5) {
      return limited;
    }
    return `${limited.slice(0, 5)} ${limited.slice(5)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setError("");
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // Redirect to server-side callback which exchanges code for session
          redirectTo: `${window.location.origin}/api/auth/callback`,
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

  const handleSendOTP = async () => {
    // Validate phone number
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    if (digitsOnly.length !== 10) {
      setError("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    // Check if number starts with valid digits (6-9)
    if (!['6', '7', '8', '9'].includes(digitsOnly[0])) {
      setError("Indian mobile numbers start with 6, 7, 8, or 9");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fullPhoneNumber = `+91${digitsOnly}`;
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: fullPhoneNumber,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setOtpSent(true);
        setResendTimer(60); // 60 seconds countdown
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to send OTP. Please try again.");
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const digitsOnly = phoneNumber.replace(/\D/g, '');
      const fullPhoneNumber = `+91${digitsOnly}`;

      const { error, data } = await supabase.auth.verifyOtp({
        phone: fullPhoneNumber,
        token: otp,
        type: 'sms',
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (data?.user) {
        // Update last login time
        await supabase
          .from('user_profiles')
          .update({ 
            last_login_at: new Date().toISOString(),
            phone: fullPhoneNumber
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

        // Phone verified, redirect to home
        router.push("/main/home");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to verify OTP. Please try again.");
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    setOtp("");
    handleSendOTP();
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

          {!showPhoneForm ? (
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
                  <span className="px-4 bg-white text-blue-500 font-medium">Or sign in with phone</span>
                </div>
              </div>

              {/* Phone Login Button */}
              <button
                onClick={() => setShowPhoneForm(true)}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95 shadow-lg mb-6"
              >
                Sign in with Phone Number
              </button>
            </>
          ) : (
            <div className="space-y-4 mb-6">
              {!otpSent ? (
                <>
                  {/* Phone Number Input */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-blue-700 mb-2">
                      📱 Phone Number
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="px-4 py-3 bg-blue-50 text-blue-900 rounded-xl border-2 border-blue-200 font-semibold">
                        +91
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="12345 67890"
                        required
                        maxLength={11}
                        className="flex-1 px-4 py-3 bg-blue-50 text-blue-900 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  {/* Send OTP Button */}
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={loading || phoneNumber.replace(/\D/g, '').length !== 10}
                    className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95 shadow-lg disabled:opacity-50"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>

                  {/* Back Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowPhoneForm(false);
                      setError("");
                    }}
                    className="w-full px-6 py-3 text-blue-600 hover:text-blue-700 font-medium transition"
                  >
                    ← Back to options
                  </button>
                </>
              ) : (
                <>
                  {/* OTP Input */}
                  <div>
                    <label htmlFor="otp" className="block text-sm font-semibold text-blue-700 mb-2">
                      � Enter OTP
                    </label>
                    <p className="text-sm text-blue-600 mb-3">
                      OTP sent to +91 {phoneNumber}
                    </p>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit OTP"
                      required
                      maxLength={6}
                      className="w-full px-4 py-3 bg-blue-50 text-blue-900 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-center text-lg tracking-widest"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  {/* Verify OTP Button */}
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.length !== 6}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all active:scale-95 shadow-lg disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>

                  {/* Resend OTP */}
                  <div className="text-center">
                    {resendTimer > 0 ? (
                      <p className="text-sm text-blue-600">
                        Resend OTP in {resendTimer}s
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={loading}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  {/* Back Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowPhoneForm(false);
                      setOtpSent(false);
                      setOtp("");
                      setPhoneNumber("");
                      setError("");
                    }}
                    className="w-full px-6 py-3 text-blue-600 hover:text-blue-700 font-medium transition"
                  >
                    ← Back to options
                  </button>
                </>
              )}
            </div>
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