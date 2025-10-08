"use client";

import { useSupabase } from "@/providers/SupabaseProvider";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserProfile {
  name: string | null;
  email: string;
  phone: string | null;
  nickname: string | null;
  grade: string | null;
  date_of_birth: string | null;
  interests: string[] | null;
  learning_style: string | null;
  personal_goal: string | null;
  date_joined: string;
  last_login_at: string;
}

export default function DashboardPage() {
  const { user, loading } = useSupabase();
  const supabase = createClient();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          setProfile(data);
        }
        setLoadingProfile(false);
      }
    };

    if (!loading && user) {
      fetchProfile();
    }
  }, [user, loading, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading || loadingProfile) {
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
            <h1 className="text-3xl font-bold">
              Welcome back, {profile?.nickname || profile?.name || "Student"}! 🚀
            </h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
            >
              Sign Out
            </button>
          </div>
          
          <div className="space-y-4">
            {/* User Information */}
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>👤</span> Profile Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
                <div>
                  <p className="text-blue-200 text-sm">Email</p>
                  <p className="font-semibold">{profile?.email}</p>
                </div>
                {profile?.phone && (
                  <div>
                    <p className="text-blue-200 text-sm">Phone</p>
                    <p className="font-semibold">{profile.phone}</p>
                  </div>
                )}
                {profile?.grade && (
                  <div>
                    <p className="text-blue-200 text-sm">Grade</p>
                    <p className="font-semibold">{profile.grade}</p>
                  </div>
                )}
                {profile?.date_of_birth && (
                  <div>
                    <p className="text-blue-200 text-sm">Date of Birth</p>
                    <p className="font-semibold">
                      {new Date(profile.date_of_birth).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Learning Preferences */}
            {(profile?.interests || profile?.learning_style || profile?.personal_goal) && (
              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span>🎯</span> Your Learning Profile
                </h2>
                <div className="space-y-4 text-blue-100">
                  {profile?.interests && profile.interests.length > 0 && (
                    <div>
                      <p className="text-blue-200 text-sm mb-2">Interests</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-orange-500/20 rounded-full text-sm"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {profile?.learning_style && (
                    <div>
                      <p className="text-blue-200 text-sm">Learning Style</p>
                      <p className="font-semibold">{profile.learning_style}</p>
                    </div>
                  )}
                  {profile?.personal_goal && (
                    <div>
                      <p className="text-blue-200 text-sm">Personal Goal</p>
                      <p className="font-semibold">{profile.personal_goal}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activity Stats */}
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>📊</span> Activity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
                <div>
                  <p className="text-blue-200 text-sm">Member Since</p>
                  <p className="font-semibold">
                    {profile?.date_joined 
                      ? new Date(profile.date_joined).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm">Last Login</p>
                  <p className="font-semibold">
                    {profile?.last_login_at 
                      ? new Date(profile.last_login_at).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <span>🎉</span> Authentication Successful!
              </h2>
              <p className="text-blue-100">
                Your profile is set up and your data is securely stored. You're ready to start your XolveTech learning journey!
              </p>
            </div>
          </div>
        </div>

        {/* Companion Message */}
        <div className="mt-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 inline-block">
            <p className="text-white text-sm">
              <span className="text-orange-400 font-semibold">🤖 X says:</span> 
              {' '}"Great to have you back! Let's continue building amazing things together!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}