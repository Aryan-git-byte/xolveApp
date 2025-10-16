import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/verify-phone'
  
  // Get onboarding data from query params (we'll pass these during OAuth)
  const nickname = searchParams.get('nickname')
  const preferences = searchParams.get('preferences')

  if (code) {
    const supabase = await createClient()
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // Get user details
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Check if profile exists
        const { data: existingProfile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        // Parse preferences if available
        let profileData: any = {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || null,
          last_login_at: new Date().toISOString(),
        }

        // Add nickname if provided
        if (nickname) {
          profileData.nickname = decodeURIComponent(nickname)
        }

        // Add preferences if provided
        if (preferences) {
          try {
            const prefs = JSON.parse(decodeURIComponent(preferences))
            profileData.grade = prefs[1] || null
            profileData.date_of_birth = prefs[2] || null
            profileData.interests = prefs[3] || []
            profileData.personal_goal = prefs[4] || null
            profileData.learning_style = prefs[5] || null
          } catch (e) {
            console.error('Error parsing preferences:', e)
          }
        }

        // If profile doesn't exist, create it
        if (!existingProfile) {
          await supabase
            .from('user_profiles')
            .insert(profileData)
        } else {
          // Update existing profile with new data (only if we have onboarding data)
          if (nickname || preferences) {
            await supabase
              .from('user_profiles')
              .update(profileData)
              .eq('id', user.id)
          } else {
            // Just update last login
            await supabase
              .from('user_profiles')
              .update({ 
                last_login_at: new Date().toISOString() 
              })
              .eq('id', user.id)
          }
        }

        // Log the login
        await supabase
          .from('login_history')
          .insert({
            user_id: user.id,
            device_type: request.headers.get('user-agent')?.includes('Mobile') ? 'mobile' : 'desktop',
            browser: request.headers.get('user-agent')?.split(' ').pop()?.split('/')[0] || 'unknown',
          })

        // Check if user already has phone verified
        const isPhoneVerified = user.user_metadata?.phone_verified === true
        const redirectPath = (user.phone && isPhoneVerified) ? '/main/home' : '/verify-phone'
        
        const forwardedHost = request.headers.get('x-forwarded-host')
        const isLocalEnv = process.env.NODE_ENV === 'development'
        
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${redirectPath}`)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${redirectPath}`)
        } else {
          return NextResponse.redirect(`${origin}${redirectPath}`)
        }
      }
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
