-- ============================================
-- XolveTech Database Schema (Simplified)
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USER PROFILES TABLE
-- ============================================
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Information
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  nickname VARCHAR(100),
  
  -- Educational Information (from onboarding)
  grade VARCHAR(50),
  date_of_birth DATE,
  interests TEXT[], -- Array of interests ["🤖 Robotics", "💻 Coding", etc.]
  learning_style VARCHAR(100), -- "📺 Videos", "🔧 Hands-on building", etc.
  personal_goal TEXT,
  
  -- Activity Tracking
  last_login_at TIMESTAMP WITH TIME ZONE,
  date_joined TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" 
  ON public.user_profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.user_profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" 
  ON public.user_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- ============================================
-- 2. LOGIN HISTORY TABLE
-- ============================================
CREATE TABLE public.login_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  
  login_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  logout_timestamp TIMESTAMP WITH TIME ZONE,
  session_duration_minutes INTEGER,
  
  -- Device & Location Info (optional)
  device_type VARCHAR(50), -- mobile, desktop, tablet
  browser VARCHAR(100),
  ip_address INET,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.login_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own login history" 
  ON public.login_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own login history" 
  ON public.login_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- INDEXES for Performance
-- ============================================
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_nickname ON public.user_profiles(nickname);
CREATE INDEX idx_login_history_user_id ON public.login_history(user_id);
CREATE INDEX idx_login_history_login_timestamp ON public.login_history(login_timestamp);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to user_profiles
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON public.user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, date_joined, last_login_at)
  VALUES (NEW.id, NEW.email, NOW(), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile for new auth users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- Function to log user login
-- ============================================
CREATE OR REPLACE FUNCTION public.log_user_login(
  p_user_id UUID,
  p_device_type VARCHAR DEFAULT NULL,
  p_browser VARCHAR DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_login_id UUID;
BEGIN
  -- Update last_login_at in user_profiles
  UPDATE public.user_profiles 
  SET last_login_at = NOW()
  WHERE id = p_user_id;
  
  -- Insert login record
  INSERT INTO public.login_history (user_id, device_type, browser)
  VALUES (p_user_id, p_device_type, p_browser)
  RETURNING id INTO v_login_id;
  
  RETURN v_login_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;