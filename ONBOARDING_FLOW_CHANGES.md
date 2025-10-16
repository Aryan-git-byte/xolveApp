# Onboarding Flow Implementation

## Overview
Implemented a complete onboarding flow that ensures first-time users must sign up and complete the onboarding process before they can access the app. Both Google OAuth and Phone OTP authentication now require users to complete onboarding on their first visit.

## Changes Made

### 1. Database Schema Update
**File: `supabase/add-onboarding-flag.sql`**
- Added `has_completed_onboarding` boolean field to `user_profiles` table (default: `false`)
- Created index on the new field for better query performance
- Included migration script to update existing users with preferences as having completed onboarding

### 2. API Authentication Callback
**File: `app/api/auth/callback/route.ts`**
- Added logic to set `has_completed_onboarding = true` when preferences are provided during signup
- Checks onboarding status after profile creation/update
- Redirects users to `/onboarding/companion` if they haven't completed onboarding
- Only redirects to `/verify-phone` or `/main/home` if onboarding is complete

### 3. Client-Side Authentication Callback
**File: `app/auth/callback/page.tsx`**
- Added database query to check `has_completed_onboarding` status
- Redirects to `/onboarding/companion` if onboarding is not complete
- Only proceeds to phone verification or home page after onboarding is confirmed

### 4. Signup Page Updates
**File: `app/signup/page.tsx`**
- Modified `saveUserProfile()` to check if onboarding data exists in localStorage
- Sets `has_completed_onboarding` based on presence of onboarding data
- After OTP verification, checks onboarding status and redirects accordingly:
  - To `/onboarding/companion` if not completed
  - To `/main/home` if already completed

### 5. Onboarding Personalize Page
**File: `app/onboarding/personalize/page.tsx`**
- Added Supabase client import
- Created `updateOnboardingStatus()` function to mark onboarding as complete
- Updates `has_completed_onboarding = true` when user finishes all onboarding questions
- Called automatically when user completes the last question

### 6. Login Page Updates
**File: `app/login/page.tsx`**
- **Google Sign-In**: Added error handling to detect non-existent users and redirect to signup
- **Phone OTP Verification**: 
  - Checks if user profile exists in database
  - If no profile found, shows error and redirects to signup page
  - If profile exists but onboarding not complete, redirects to onboarding
  - Only redirects to home if profile exists AND onboarding is complete

## Authentication Flow

### First-Time User (Google OAuth)
1. User clicks "Continue with Google" on login page
2. Google authenticates the user
3. Callback checks if user profile exists
4. If no profile → Redirects to `/onboarding/companion`
5. User completes companion intro and personalization
6. After personalization → Redirects to `/signup` to complete phone verification
7. After phone verification → User can access `/main/home`

### First-Time User (Phone OTP)
1. User enters phone number on login page
2. System checks if user profile exists after OTP verification
3. If no profile → Shows error and redirects to `/signup`
4. On signup page, user goes through same OTP process
5. After OTP verification, system checks onboarding status
6. If not completed → Redirects to `/onboarding/companion`
7. User completes onboarding flow
8. Then redirects back to signup/home

### Returning User
1. User signs in via Google or Phone OTP
2. System checks `has_completed_onboarding` flag
3. If `true` → Redirects directly to `/main/home`
4. If `false` → Redirects to `/onboarding/companion` to complete onboarding

## Key Features

✅ **Prevents Direct Login**: First-time users cannot bypass signup and onboarding
✅ **Unified Experience**: Both Google and Phone authentication follow the same onboarding flow
✅ **Database-Driven**: Uses `has_completed_onboarding` flag for reliable state management
✅ **Graceful Handling**: Shows appropriate error messages when users try to login without an account
✅ **Backward Compatible**: Existing users with preferences are automatically marked as having completed onboarding

## Testing Checklist

- [ ] Run database migration: `supabase/add-onboarding-flag.sql`
- [ ] Test Google OAuth for new user
- [ ] Test Phone OTP for new user  
- [ ] Test login page redirects to signup for non-existent users
- [ ] Test that existing users with preferences can still login
- [ ] Test onboarding completion updates the database flag
- [ ] Test that users who complete onboarding can access the app

## Database Migration

Before deploying, run the SQL migration:

```sql
-- Run this in your Supabase SQL Editor
-- File: supabase/add-onboarding-flag.sql
```

This will:
1. Add the `has_completed_onboarding` column
2. Create the necessary index
3. Update existing users with preferences to have completed onboarding
