"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function PhoneOtpLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const supabase = createClient();

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
  };

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    if (digitsOnly.length !== 10) {
      setError("Please enter a valid 10-digit Indian mobile number");
      setLoading(false);
      return;
    }

    if (!['6', '7', '8', '9'].includes(digitsOnly[0])) {
      setError("Indian mobile numbers start with 6, 7, 8, or 9");
      setLoading(false);
      return;
    }

    const fullPhoneNumber = `+91${digitsOnly}`;

    const { error } = await supabase.auth.signInWithOtp({ 
      phone: fullPhoneNumber 
    });
    setLoading(false);
    if (error) setError("Failed to send OTP: " + error.message);
    else {
      setSuccess("OTP sent to your phone");
      setStep(2);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const digitsOnly = phoneNumber.replace(/\D/g, '');
    const fullPhoneNumber = `+91${digitsOnly}`;

    const { data, error } = await supabase.auth.verifyOtp({
      phone: fullPhoneNumber,
      token: otp,
      type: "sms",
    });
    setLoading(false);
    if (error) setError("Invalid OTP: " + error.message);
    else {
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => router.push("/main/home"), 1200);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-4">
      <form className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm flex flex-col gap-6 animate-fade-in" onSubmit={step === 1 ? sendOtp : verifyOtp}>
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-2">Sign in with Phone OTP</h2>
        {step === 1 && (
          <>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-blue-700 mb-2">
                📱 Phone Number
              </label>
              <div className="flex items-center gap-2 min-w-0">
                <div className="px-4 py-3 border-2 border-blue-200 rounded-lg font-semibold text-blue-900 whitespace-nowrap">
                  +91
                </div>
                <input
                  type="tel"
                  placeholder="12345 67890"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  required
                  maxLength={11}
                  className="flex-1 min-w-0 px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  disabled={loading}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all disabled:opacity-60"
              disabled={loading || phoneNumber.replace(/\D/g, '').length !== 10}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <p className="text-sm text-blue-600 text-center">
              OTP sent to +91 {phoneNumber}
            </p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              required
              maxLength={6}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 tracking-widest text-center text-lg"
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all disabled:opacity-60"
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              className="w-full py-2 mt-2 text-blue-600 hover:underline text-sm"
              onClick={() => {
                setStep(1);
                setOtp("");
                setError("");
                setSuccess("");
              }}
              disabled={loading}
            >
              Change phone number
            </button>
          </>
        )}
        {error && <div className="text-red-600 text-center font-medium">{error}</div>}
        {success && <div className="text-green-600 text-center font-medium">{success}</div>}
      </form>
    </div>
  );
}
