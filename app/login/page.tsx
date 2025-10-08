"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome to XolveTech</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-xl text-lg font-semibold shadow-lg transition-all"
      >
        Continue with Google
      </button>
    </div>
  );
}
