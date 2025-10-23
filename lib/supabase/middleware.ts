import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          try {
            // Decode base64 session cookies if present
            const all = request.cookies.getAll();
            return all.map((cookie) => {
              if (cookie.name.startsWith('sb-') && cookie.value) {
                try {
                  // Try to decode base64 and parse JSON
                  const decoded = Buffer.from(cookie.value, 'base64').toString('utf-8');
                  JSON.parse(decoded); // will throw if not valid JSON
                  return { ...cookie, value: decoded };
                } catch (e) {
                  // If not base64 or not JSON, fallback to original value
                  return cookie;
                }
              }
              return cookie;
            });
          } catch (error) {
            console.error('Error getting cookies:', error);
            return [];
          }
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              try {
                request.cookies.set(name, value);
              } catch (error) {
                console.error(`Error setting request cookie ${name}:`, error);
              }
            });
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) => {
              try {
                supabaseResponse.cookies.set(name, value, options);
              } catch (error) {
                console.error(`Error setting response cookie ${name}:`, error);
              }
            });
          } catch (error) {
            console.error('Error in setAll cookies:', error);
          }
        },
      },
    }
  );

  // Refresh session if expired
  let user = null
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Error getting user:', error)
    }
    user = data?.user || null
  } catch (error) {
    console.error('Exception getting user:', error)
  }

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/main',
    '/signup',
    '/onboarding/companion',
    '/onboarding/personalize',
    '/auth/callback',
  '/api/auth/callback',
    '/auth/auth-code-error'
  ]

  // Routes that don't require phone verification but do require authentication
  const allowedWithoutPhoneRoutes = [
    '/main',
    '/main/home',
    '/main/courses',
    '/main/profile',
    '/main/shopping',
    '/main/xchange',
    '/verify-phone'
  ]

  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith('/auth/')
  )

  const isAllowedWithoutPhone = allowedWithoutPhoneRoutes.some(route => 
    request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route)
  )

  // If no user and trying to access protected route, redirect to login
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // If user exists but hasn't verified phone, redirect to phone verification
  // EXCEPT when they're on public routes or allowed routes without phone verification
  if (
    user &&
    !user.phone &&
    !isPublicRoute &&
    !isAllowedWithoutPhone
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/verify-phone'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}