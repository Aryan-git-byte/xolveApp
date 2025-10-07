"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompanionPage() {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!nickname.trim()) {
      setError("Please enter a nickname!");
      return;
    }

    // Save nickname to localStorage (replace with your state/store later)
    localStorage.setItem("nickname", nickname.trim());

    // Navigate to next onboarding page (personalization)
    router.push("/onboarding/personalize");
  };

  return (
    <div className="relative h-screen w-screen flex flex-col justify-between items-center text-white overflow-hidden bg-gradient-to-b from-blue-500 to-purple-600 p-6">
      {/* Companion illustration */}
      <div className="relative mt-16 flex flex-col items-center">
        <img
          src="https://images.unsplash.com/photo-1612831455541-2b624b6f5d13?auto=format&fit=crop&w=300&q=80"
          alt="Companion X"
          className="w-40 h-40 rounded-full border-4 border-white shadow-lg mb-6"
        />
        <h1 className="text-2xl font-bold text-center">Hey there!</h1>
        <p className="mt-2 text-center text-white/90">
          I'm X, your personal companion through XolveTech.
        </p>
      </div>

      {/* Nickname input */}
      <div className="w-full max-w-xs">
        <label className="block mb-2 font-semibold">What should I call you?</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Choose a nickname..."
          className="w-full px-4 py-3 rounded-xl text-black font-medium focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        {error && <p className="text-red-400 mt-2">{error}</p>}

        <button
          onClick={handleContinue}
          className="w-full mt-6 py-3 bg-orange-500 rounded-xl font-semibold text-white hover:bg-orange-600 transition active:scale-95"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
