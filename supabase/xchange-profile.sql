-- ============================================
-- XolveHub Enhanced Profile System
-- ============================================

-- ============================================
-- 1. EXTEND USER PROFILES TABLE
-- ============================================
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS 
  bio TEXT,
  tagline VARCHAR(200),
  profile_picture_url TEXT,
  cover_image_url TEXT,
  location VARCHAR(100),
  website_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  privacy_settings JSONB DEFAULT '{"showStats": true, "showActivity": true, "showProjects": true}'::jsonb,
  theme_preference VARCHAR(20) DEFAULT 'light' CHECK (theme_preference IN ('light', 'dark', 'science')),
  
  -- Gamification
  level INTEGER DEFAULT 1,
  total_xp INTEGER DEFAULT 0,
  xp_to_next_level INTEGER DEFAULT 100,
  rank VARCHAR(50) DEFAULT 'Starter' CHECK (rank IN ('Starter', 'Builder', 'Innovator', 'Mentor', 'Xolve Elite')),
  rank_color VARCHAR(20) DEFAULT '#9ca3af',
  
  -- Stats tracking
  projects_count INTEGER DEFAULT 0,
  kits_owned_count INTEGER DEFAULT 0,
  courses_enrolled_count INTEGER DEFAULT 0,
  courses_completed_count INTEGER DEFAULT 0,
  badges_earned_count INTEGER DEFAULT 0,
  
  -- Streaks
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  
  -- Social
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  profile_views INTEGER DEFAULT 0;

-- ============================================
-- 2. USER COURSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  course_title VARCHAR(255) NOT NULL,
  course_description TEXT,
  course_thumbnail_url TEXT,
  
  -- Progress tracking
  total_lessons INTEGER DEFAULT 0,
  completed_lessons INTEGER DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  xp_total INTEGER DEFAULT 0,
  
  -- Status
  status VARCHAR(20) DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'in_progress', 'completed', 'paused')),
  is_locked BOOLEAN DEFAULT false,
  requires_kit_purchase BOOLEAN DEFAULT false,
  linked_kit_id UUID,
  
  -- Timestamps
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. USER PROJECT SHOWCASE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_project_showcase (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  image_urls TEXT[] DEFAULT '{}',
  video_urls TEXT[] DEFAULT '{}',
  
  -- Project details
  components_used TEXT[], -- Array of component names
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  build_time VARCHAR(50),
  category VARCHAR(100),
  tags TEXT[],
  
  -- Links
  github_url TEXT,
  demo_url TEXT,
  documentation_url TEXT,
  linked_kit_id UUID REFERENCES public.products(id),
  
  -- Engagement
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  
  -- Status
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  featured_order INTEGER,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. ACHIEVEMENTS/BADGES SYSTEM
-- ============================================
CREATE TABLE IF NOT EXISTS public.achievement_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon VARCHAR(50), -- Lucide icon name or emoji
  
  -- Badge rarity and design
  rarity VARCHAR(20) CHECK (rarity IN ('bronze', 'silver', 'gold', 'platinum', 'secret')) DEFAULT 'bronze',
  color VARCHAR(20) DEFAULT '#cd7f32',
  gradient_from VARCHAR(20),
  gradient_to VARCHAR(20),
  
  -- Requirements
  requirement_type VARCHAR(50) NOT NULL,
  requirement_value INTEGER NOT NULL,
  requirement_description TEXT,
  
  -- Rewards
  xp_reward INTEGER DEFAULT 0,
  unlock_message TEXT,
  
  -- Metadata
  is_secret BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert comprehensive badges
INSERT INTO public.achievement_badges (name, description, icon, rarity, color, gradient_from, gradient_to, requirement_type, requirement_value, xp_reward, requirement_description) VALUES
-- Bronze Tier
('First Steps', 'Welcome to XolveHub! Your journey begins here', '🎯', 'bronze', '#cd7f32', '#cd7f32', '#b87333', 'profile_created', 1, 10, 'Create your profile'),
('Project Pioneer', 'Uploaded your very first project', '🚀', 'bronze', '#cd7f32', '#cd7f32', '#b87333', 'projects_count', 1, 15, 'Upload 1 project'),
('Course Starter', 'Enrolled in your first course', '📚', 'bronze', '#cd7f32', '#cd7f32', '#b87333', 'courses_enrolled', 1, 10, 'Enroll in 1 course'),
('Kit Collector', 'Purchased your first learning kit', '📦', 'bronze', '#cd7f32', '#cd7f32', '#b87333', 'kits_owned', 1, 15, 'Purchase 1 kit'),

-- Silver Tier
('Builder', 'Built and shared 3 amazing projects', '⚙️', 'silver', '#c0c0c0', '#c0c0c0', '#a8a8a8', 'projects_count', 3, 25, 'Upload 3 projects'),
('Learner', 'Completed your first course successfully', '🎓', 'silver', '#c0c0c0', '#c0c0c0', '#a8a8a8', 'courses_completed', 1, 30, 'Complete 1 course'),
('Week Warrior', 'Stayed active for 7 days straight', '⚡', 'silver', '#c0c0c0', '#c0c0c0', '#a8a8a8', 'current_streak', 7, 20, 'Maintain 7-day streak'),
('Social Star', 'Got 50 likes on your projects', '❤️', 'silver', '#c0c0c0', '#c0c0c0', '#a8a8a8', 'total_likes', 50, 25, 'Receive 50 likes'),

-- Gold Tier
('Innovator', 'Published 10 creative projects', '💡', 'gold', '#ffd700', '#ffd700', '#ffed4e', 'projects_count', 10, 50, 'Upload 10 projects'),
('Course Master', 'Completed 5 courses successfully', '🏆', 'gold', '#ffd700', '#ffd700', '#ffed4e', 'courses_completed', 5, 75, 'Complete 5 courses'),
('Circuit Master', 'Expert in electronics and circuits', '⚡', 'gold', '#ffd700', '#ffd700', '#ffed4e', 'electronics_projects', 5, 60, 'Build 5 electronics projects'),
('Robotics Pro', 'Master of robotic creations', '🤖', 'gold', '#ffd700', '#ffd700', '#ffed4e', 'robotics_projects', 5, 60, 'Build 5 robotics projects'),

-- Platinum Tier
('Mentor', 'Guided 100+ learners in the community', '🌟', 'platinum', '#e5e4e2', '#e5e4e2', '#d4d3d1', 'helps_given', 100, 100, 'Help 100 users'),
('Legend', 'Published 25 groundbreaking projects', '👑', 'platinum', '#e5e4e2', '#e5e4e2', '#d4d3d1', 'projects_count', 25, 150, 'Upload 25 projects'),
('Marathon Runner', 'Maintained a 30-day active streak', '🔥', 'platinum', '#e5e4e2', '#e5e4e2', '#d4d3d1', 'current_streak', 30, 100, 'Maintain 30-day streak'),

-- Secret Badges
('Night Owl', 'Active at midnight consistently', '🦉', 'secret', '#4c1d95', '#4c1d95', '#5b21b6', 'midnight_activity', 5, 50, 'Be active at midnight 5 times'),
('Early Bird', 'Started courses before 6 AM', '🌅', 'secret', '#0891b2', '#0891b2', '#06b6d4', 'early_morning_activity', 5, 50, 'Be active at dawn 5 times'),
('Speedster', 'Completed a course in record time', '⚡', 'secret', '#dc2626', '#dc2626', '#ef4444', 'fast_course_completion', 1, 75, 'Complete course within 24 hours'),
('Xolve Elite', 'Reached the pinnacle of XolveHub', '💫', 'secret', '#a855f7', '#a855f7', '#c084fc', 'elite_status', 1, 500, 'Unlock all achievements');

-- ============================================
-- 5. USER BADGES JUNCTION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_achievement_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.achievement_badges(id) ON DELETE CASCADE,
  
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_showcased BOOLEAN DEFAULT false,
  showcase_order INTEGER,
  
  UNIQUE(user_id, badge_id)
);

-- ============================================
-- 6. ACTIVITY FEED TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_activity_feed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  
  activity_type VARCHAR(50) NOT NULL, -- 'project_uploaded', 'course_completed', 'badge_earned', 'kit_purchased'
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50), -- emoji or lucide icon
  
  -- Related entities
  related_project_id UUID REFERENCES public.user_project_showcase(id) ON DELETE CASCADE,
  related_course_id UUID REFERENCES public.user_courses(id) ON DELETE CASCADE,
  related_badge_id UUID REFERENCES public.achievement_badges(id) ON DELETE CASCADE,
  related_product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  
  -- Engagement
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  
  -- Visibility
  is_public BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. PROFILE VIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.profile_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Analytics
  referrer TEXT,
  device_type VARCHAR(50)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_user_courses_user_id ON public.user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_status ON public.user_courses(status);
CREATE INDEX IF NOT EXISTS idx_user_project_showcase_user_id ON public.user_project_showcase(user_id);
CREATE INDEX IF NOT EXISTS idx_user_project_showcase_published ON public.user_project_showcase(is_published);
CREATE INDEX IF NOT EXISTS idx_user_project_showcase_featured ON public.user_project_showcase(is_featured, featured_order);
CREATE INDEX IF NOT EXISTS idx_user_achievement_badges_user_id ON public.user_achievement_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_feed_user_id ON public.user_activity_feed(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_feed_created_at ON public.user_activity_feed(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profile_views_profile_id ON public.profile_views(profile_id);

-- ============================================
-- RLS POLICIES
-- ============================================

-- User Courses
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own courses" ON public.user_courses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own courses" ON public.user_courses FOR ALL USING (auth.uid() = user_id);

-- User Project Showcase
ALTER TABLE public.user_project_showcase ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published projects" ON public.user_project_showcase FOR SELECT USING (is_published = true);
CREATE POLICY "Users can manage own projects" ON public.user_project_showcase FOR ALL USING (auth.uid() = user_id);

-- Achievement Badges
ALTER TABLE public.achievement_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view non-secret badges" ON public.achievement_badges FOR SELECT USING (is_secret = false OR is_active = true);

-- User Achievement Badges
ALTER TABLE public.user_achievement_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view user badges" ON public.user_achievement_badges FOR SELECT USING (true);
CREATE POLICY "System can award badges" ON public.user_achievement_badges FOR INSERT WITH CHECK (true);

-- Activity Feed
ALTER TABLE public.user_activity_feed ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view public activities" ON public.user_activity_feed FOR SELECT USING (is_public = true);
CREATE POLICY "Users can manage own activities" ON public.user_activity_feed FOR ALL USING (auth.uid() = user_id);

-- Profile Views
ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile views" ON public.profile_views FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Anyone can log profile views" ON public.profile_views FOR INSERT WITH CHECK (true);

-- ============================================
-- TRIGGERS
-- ============================================

CREATE TRIGGER update_user_courses_updated_at BEFORE UPDATE ON public.user_courses 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_project_showcase_updated_at BEFORE UPDATE ON public.user_project_showcase 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to calculate XP to next level
CREATE OR REPLACE FUNCTION calculate_xp_to_next_level(current_level INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN 100 + (current_level * 50);
END;
$$ LANGUAGE plpgsql;

-- Function to update user level based on XP
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
DECLARE
  new_level INTEGER;
  new_rank VARCHAR(50);
  rank_color VARCHAR(20);
BEGIN
  -- Calculate new level
  new_level := FLOOR(NEW.total_xp / 100) + 1;
  
  -- Determine rank based on level
  IF new_level >= 50 THEN
    new_rank := 'Xolve Elite';
    rank_color := '#a855f7';
  ELSIF new_level >= 30 THEN
    new_rank := 'Mentor';
    rank_color := '#e5e4e2';
  ELSIF new_level >= 15 THEN
    new_rank := 'Innovator';
    rank_color := '#ffd700';
  ELSIF new_level >= 5 THEN
    new_rank := 'Builder';
    rank_color := '#c0c0c0';
  ELSE
    new_rank := 'Starter';
    rank_color := '#9ca3af';
  END IF;
  
  NEW.level := new_level;
  NEW.rank := new_rank;
  NEW.rank_color := rank_color;
  NEW.xp_to_next_level := calculate_xp_to_next_level(new_level);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_xp_change
  BEFORE UPDATE OF total_xp ON public.user_profiles
  FOR EACH ROW 
  WHEN (OLD.total_xp IS DISTINCT FROM NEW.total_xp)
  EXECUTE FUNCTION update_user_level();

-- Function to record profile view
CREATE OR REPLACE FUNCTION record_profile_view(
  p_profile_id UUID,
  p_viewer_id UUID DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO public.profile_views (profile_id, viewer_id)
  VALUES (p_profile_id, p_viewer_id);
  
  UPDATE public.user_profiles
  SET profile_views = profile_views + 1
  WHERE id = p_profile_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- STORAGE BUCKET FOR PROFILE PICTURES
-- ============================================
-- Run this in Supabase Storage section:
-- CREATE BUCKET profile_pictures WITH (public = true);
-- CREATE BUCKET cover_images WITH (public = true);
-- CREATE BUCKET project_images WITH (public = true);