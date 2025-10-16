"use client";

import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-blue-100 mb-6">
          Sorry, we couldn't complete your sign-in. This could be due to:
        </p>
        <ul className="text-left text-blue-100 mb-6 space-y-2">
          <li>• Invalid or expired authentication code</li>
          <li>• Session timeout</li>
          <li>• Configuration issue</li>
        </ul>
        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-xl font-semibold transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}