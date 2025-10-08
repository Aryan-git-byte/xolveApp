"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSupabase } from "@/providers/SupabaseProvider";

export default function VerifyPhonePage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();
  const supabase = createClient();
  const { user, loading: authLoading } = useSupabase();
  const nickname = typeof window !== 'undefined' ? localStorage.getItem('xolve_nickname') || "there" : "there";

  useEffect(() => {
    const checkUserAuth = async () => {
      // Wait for auth to finish loading
      if (authLoading) {
        return;
      }

      // Redirect if not authenticated
      if (!user) {
        router.push("/login");
        return;
      }

      // Check if phone is already verified
      // Check if user has phone and it's marked as verified in metadata
      const hasPhone = !!user.phone;
      const isPhoneVerified = user.user_metadata?.phone_verified === true;
      
      console.log("User phone status:", {
        phone: user.phone,
        hasPhone,
        isPhoneVerified,
        user_metadata: user.user_metadata
      });

      if (hasPhone && isPhoneVerified) {
        router.push("/main");
      } else {
        console.log("Phone not verified, staying on verify page");
        setCheckingAuth(false);
      }
    };

    checkUserAuth();
  }, [user, authLoading, router]);

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
      
      const { error } = await supabase.auth.updateUser({
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
      } else {
        // Update user metadata to mark phone as verified
        await supabase.auth.updateUser({
          data: { phone_verified: true }
        });
        
        // Update phone in user_profiles table
        if (user) {
          await supabase
            .from('user_profiles')
            .update({ 
              phone: fullPhoneNumber,
              last_login_at: new Date().toISOString()
            })
            .eq('id', user.id);
        }
        
        // Phone verified successfully
        router.push("/main");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to verify OTP. Please try again.");
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    setOtp("");
    setOtpSent(false);
    handleSendOTP();
  };

  const handleSkip = () => {
    // Allow users to skip for now
    router.push("/main");
  };

  // Show loading state while checking authentication
  if (authLoading || checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

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
                <span className="text-3xl">📱</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Verify Your Phone Number
            </h1>
            <p className="text-blue-600">
              Hey {nickname}! Let's secure your account with your Indian mobile number
            </p>
          </div>

          {!otpSent ? (
            <>
              {/* Phone Number Input */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-blue-700 mb-2">
                    📱 Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-4 py-3 bg-blue-100 border-2 border-blue-200 rounded-xl font-semibold text-blue-900">
                      +91
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="12345 67890"
                      maxLength={11}
                      className="flex-1 px-4 py-3 bg-blue-50 text-blue-900 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-mono text-lg"
                    />
                  </div>
                  <p className="text-xs text-blue-500 mt-2">
                    Indian mobile numbers only (10 digits)
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {/* Send OTP Button */}
                <button
                  onClick={handleSendOTP}
                  disabled={loading || phoneNumber.replace(/\D/g, '').length !== 10}
                  className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>

                {/* Skip Button */}
                <button
                  onClick={handleSkip}
                  className="w-full px-6 py-3 text-blue-600 hover:text-blue-700 font-medium transition"
                >
                  Skip for now →
                </button>
              </div>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-blue-700 text-center">
                    📲 OTP sent to <span className="font-bold">+91 {phoneNumber}</span>
                  </p>
                </div>

                <div>
                  <label htmlFor="otp" className="block text-sm font-semibold text-blue-700 mb-2">
                    🔒 Enter 6-Digit OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(value);
                      setError("");
                    }}
                    placeholder="123456"
                    maxLength={6}
                    className="w-full px-4 py-4 bg-blue-50 text-blue-900 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-center font-mono text-2xl tracking-widest"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {/* Verify Button */}
                <button
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.length !== 6}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                {/* Resend OTP */}
                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-blue-600">
                      Resend OTP in <span className="font-bold">{resendTimer}s</span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResendOTP}
                      disabled={loading}
                      className="text-sm text-orange-600 hover:text-orange-700 font-semibold underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                {/* Change Number */}
                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setError("");
                  }}
                  className="w-full px-6 py-3 text-blue-600 hover:text-blue-700 font-medium transition"
                >
                  ← Change number
                </button>
              </div>
            </>
          )}
        </div>

        {/* Bottom Message from Companion */}
        <div className="mt-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 inline-block">
            <p className="text-white text-sm">
              <span className="text-orange-400 font-semibold">🤖 X says:</span> 
              {!otpSent 
                ? " Phone verification helps keep your account secure!"
                : " Check your messages for the OTP code!"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}