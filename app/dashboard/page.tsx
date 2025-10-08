"use client";

import { useSupabase } from "@/providers/SupabaseProvider";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, loading } = useSupabase();
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Welcome to XolveTech! 🚀</h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
            >
              Sign Out
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-2">User Information</h2>
              <p className="text-blue-100">Email: {user.email}</p>
              <p className="text-blue-100">User ID: {user.id}</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-2">🎉 Authentication Successful!</h2>
              <p className="text-blue-100">
                You've successfully logged in with Supabase Auth. Now you can start building your amazing features!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}