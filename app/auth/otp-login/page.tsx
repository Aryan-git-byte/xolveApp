"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function EmailOtpLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) setError("Failed to send OTP: " + error.message);
    else {
      setSuccess("OTP sent to your email");
      setStep(2);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
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
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-2">Sign in with Email OTP</h2>
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all disabled:opacity-60"
              disabled={loading || !email}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
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
              onClick={() => setStep(1)}
              disabled={loading}
            >
              Change email
            </button>
          </>
        )}
        {error && <div className="text-red-600 text-center font-medium">{error}</div>}
        {success && <div className="text-green-600 text-center font-medium">{success}</div>}
      </form>
    </div>
  );
}
