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

  // For magic links and some OAuth flows the tokens are in the URL fragment
  // Use the browser helper to parse and set session from the URL
  // The auth helper may not be present on the typed client in some envs,
  // so cast to any to call the URL parsing helper without a type error.
  const result = await (supabase.auth as any).getSessionFromUrl?.({ storeSession: true });
        console.log('getSessionFromUrl result:', result);

        const session = (result as any)?.data?.session ?? (result as any)?.session ?? null;

        if (session?.user) {
          // Redirect depending on whether phone is verified
          const isPhoneVerified = session.user.user_metadata?.phone_verified === true;
          const redirectPath = (session.user.phone && isPhoneVerified) ? '/main/home' : '/verify-phone';
          router.replace(redirectPath);
        } else {
          // If no session, show error route which explains the cause
          router.replace('/auth/auth-code-error');
        }
      } catch (e) {
        console.error('Error handling callback:', e);
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
