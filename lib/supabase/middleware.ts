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
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  const { data: { user } } = await supabase.auth.getUser()

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