"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '@/lib/supabase/client';

export default function AuthCallbackClientPage() {
  const router = useRouter();

  useEffect(() => {
    const handle = async () => {
      try {
        const supabase = createClient();

        // Some providers place the tokens in the URL fragment (hash)
        // Supabase JS v2 provides getSessionFromUrl on the browser client, but
        // if not available we can parse the URL and call supabase.auth.setSession
        // with the returned access/refresh tokens.

        // First try the helper if it exists
        if ((supabase.auth as any).getSessionFromUrl) {
          const result = await (supabase.auth as any).getSessionFromUrl({ storeSession: true });
          console.log('getSessionFromUrl result:', result);
          const session = (result as any)?.data?.session ?? (result as any)?.session ?? null;

          if (session?.user) {
            const isPhoneVerified = session.user.user_metadata?.phone_verified === true;
            const redirectPath = (session.user.phone && isPhoneVerified) ? '/main/home' : '/verify-phone';
            router.replace(redirectPath);
            return;
          }
        }

        // Fallback: parse hash manually (for magic link)
        const hash = window.location.hash;
        if (hash && hash.includes('access_token')) {
          const params = new URLSearchParams(hash.replace(/^#/, ''));
          const access_token = params.get('access_token');
          const refresh_token = params.get('refresh_token');

          if (access_token && refresh_token) {
            // setSession is not public on types, so use any
            await (supabase.auth as any).setSession({ access_token, refresh_token });
            const { data } = await supabase.auth.getUser();
            const user = (data as any)?.user ?? null;
            if (user) {
              const isPhoneVerified = user.user_metadata?.phone_verified === true;
              const redirectPath = (user.phone && isPhoneVerified) ? '/main/home' : '/verify-phone';
              router.replace(redirectPath);
              return;
            }
          }
        }

        // Default to error route
        router.replace('/auth/auth-code-error');
      } catch (e) {
        console.error('Error handling client callback:', e);
        router.replace('/auth/auth-code-error');
      }
    };

    handle();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium">Finalizing sign-in…</p>
      </div>
    </div>
  );
}
