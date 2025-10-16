-- ============================================
-- Add has_completed_onboarding field
-- ============================================

-- Add the has_completed_onboarding column to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS has_completed_onboarding BOOLEAN DEFAULT false;

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_onboarding 
ON public.user_profiles(has_completed_onboarding);

-- Update existing users to have completed onboarding if they have preferences set
-- This ensures existing users don't get forced back to onboarding
UPDATE public.user_profiles 
SET has_completed_onboarding = true 
WHERE 
  (grade IS NOT NULL OR interests IS NOT NULL OR learning_style IS NOT NULL)
  AND has_completed_onboarding = false;
