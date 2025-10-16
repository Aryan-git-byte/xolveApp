-- ============================================
-- XChange Community Platform Schema
-- ============================================

-- ============================================
-- 1. THREAD CATEGORIES TABLE
-- ============================================
CREATE TABLE public.thread_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50), -- Lucide icon name
  color VARCHAR(20) DEFAULT '#3b82f6', -- Hex color
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO public.thread_categories (name, description, icon, color) VALUES
('Tech', 'General technology discussions', 'cpu', '#3b82f6'),
('AI', 'Artificial Intelligence and Machine Learning', 'brain', '#8b5cf6'),
('Electronics', 'Electronics projects and circuits', 'zap', '#f59e0b'),
('Robotics', 'Robotics projects and automation', 'bot', '#10b981'),
('Programming', 'Coding, software development', 'code', '#ef4444'),
('3D Printing', '3D printing and design', 'box', '#f97316'),
('IoT', 'Internet of Things projects', 'wifi', '#06b6d4'),
('General', 'General discussions and questions', 'message-circle', '#6b7280');

-- ============================================
-- 2. THREADS TABLE
-- ============================================
CREATE TABLE public.threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.thread_categories(id),
  
  -- Engagement metrics
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  message_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  
  -- Status
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. THREAD MESSAGES TABLE
-- ============================================
CREATE TABLE public.thread_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES public.threads(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  
  -- Reply system
  parent_message_id UUID REFERENCES public.thread_messages(id) ON DELETE SET NULL,
  reply_count INTEGER DEFAULT 0,
  
  -- Engagement
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  
  -- Status
  is_edited BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. PROJECTS TABLE
-- ============================================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT, -- Detailed project content/instructions
  author_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  
  -- Project details
  difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_time VARCHAR(50), -- "2-3 hours", "1 week", etc.
  tags TEXT[], -- Array of tags
  
  -- Media
  featured_image_url TEXT,
  image_urls TEXT[], -- Array of project images
  video_urls TEXT[], -- Array of project videos
  
  -- Engagement
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  fork_count INTEGER DEFAULT 0,
  
  -- Relations
  forked_from_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  linked_kit_id UUID, -- Reference to purchased kit (future integration)
  
  -- Status
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. PROJECT COMMENTS TABLE
-- ============================================
CREATE TABLE public.project_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  
  -- Reply system
  parent_comment_id UUID REFERENCES public.project_comments(id) ON DELETE SET NULL,
  reply_count INTEGER DEFAULT 0,
  
  -- Engagement
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  
  -- Status
  is_edited BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. USER FOLLOWS TABLE (Social Features)
-- ============================================
CREATE TABLE public.user_follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- ============================================
-- 7. DIRECT MESSAGES TABLE
-- ============================================
CREATE TABLE public.direct_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  is_deleted_by_sender BOOLEAN DEFAULT false,
  is_deleted_by_recipient BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- 8. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'follow', 'thread_reply', 'project_comment', 'upvote', 'mention', 'direct_message'
  title VARCHAR(255) NOT NULL,
  content TEXT,
  
  -- Related entities
  related_user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  related_thread_id UUID REFERENCES public.threads(id) ON DELETE CASCADE,
  related_project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  related_message_id UUID REFERENCES public.thread_messages(id) ON DELETE CASCADE,
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- 9. BADGES TABLE (Gamification)
-- ============================================
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon VARCHAR(50), -- Lucide icon name
  color VARCHAR(20) DEFAULT '#f59e0b',
  
  -- Requirements
  requirement_type VARCHAR(50) NOT NULL, -- 'thread_count', 'project_count', 'upvotes_received', 'days_active', etc.
  requirement_value INTEGER NOT NULL,
  
  -- Metadata
  tier VARCHAR(20) CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')) DEFAULT 'bronze',
  xp_reward INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default badges
INSERT INTO public.badges (name, description, icon, color, requirement_type, requirement_value, tier, xp_reward) VALUES
('First Steps', 'Created your first thread', 'message-square', '#22c55e', 'thread_count', 1, 'bronze', 10),
('Project Pioneer', 'Published your first project', 'lightbulb', '#f59e0b', 'project_count', 1, 'bronze', 15),
('Speed Learner', 'Active for 7 consecutive days', 'zap', '#3b82f6', 'days_active', 7, 'silver', 25),
('Community Helper', 'Received 50 upvotes total', 'heart', '#ef4444', 'upvotes_received', 50, 'silver', 30),
('Thread Master', 'Created 10 threads', 'messages', '#8b5cf6', 'thread_count', 10, 'gold', 50),
('Innovation Leader', 'Published 5 projects', 'trophy', '#f97316', 'project_count', 5, 'gold', 75),
('Community Legend', 'Received 500 upvotes total', 'crown', '#fbbf24', 'upvotes_received', 500, 'platinum', 100);

-- ============================================
-- 10. USER BADGES TABLE (Junction)
-- ============================================
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, badge_id)
);

-- ============================================
-- 11. REACTIONS TABLE (Upvotes/Downvotes tracking)
-- ============================================
CREATE TABLE public.reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  
  -- What was reacted to (only one should be set)
  thread_id UUID REFERENCES public.threads(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.thread_messages(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES public.project_comments(id) ON DELETE CASCADE,
  
  reaction_type VARCHAR(20) CHECK (reaction_type IN ('upvote', 'downvote')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure user can only react once per item
  UNIQUE(user_id, thread_id),
  UNIQUE(user_id, message_id),
  UNIQUE(user_id, project_id),
  UNIQUE(user_id, comment_id),
  
  -- Ensure only one target is set
  CHECK (
    (thread_id IS NOT NULL)::integer + 
    (message_id IS NOT NULL)::integer + 
    (project_id IS NOT NULL)::integer + 
    (comment_id IS NOT NULL)::integer = 1
  )
);

-- ============================================
-- 12. USER STATS TABLE (Enhanced for XChange)
-- ============================================
CREATE TABLE public.user_stats (
  user_id UUID PRIMARY KEY REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  
  -- XChange specific stats
  total_xp INTEGER DEFAULT 0,
  reputation_score INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  
  -- Content stats
  threads_created INTEGER DEFAULT 0,
  messages_posted INTEGER DEFAULT 0,
  projects_published INTEGER DEFAULT 0,
  comments_made INTEGER DEFAULT 0,
  
  -- Engagement stats
  upvotes_given INTEGER DEFAULT 0,
  upvotes_received INTEGER DEFAULT 0,
  downvotes_given INTEGER DEFAULT 0,
  downvotes_received INTEGER DEFAULT 0,
  
  -- Social stats
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  
  -- Activity
  last_activity_date DATE DEFAULT CURRENT_DATE,
  days_active INTEGER DEFAULT 1,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES for Performance
-- ============================================

-- Threads indexes
CREATE INDEX idx_threads_author_id ON public.threads(author_id);
CREATE INDEX idx_threads_category_id ON public.threads(category_id);
CREATE INDEX idx_threads_created_at ON public.threads(created_at DESC);
CREATE INDEX idx_threads_last_activity ON public.threads(last_activity_at DESC);
CREATE INDEX idx_threads_upvotes ON public.threads(upvotes DESC);

-- Messages indexes
CREATE INDEX idx_thread_messages_thread_id ON public.thread_messages(thread_id);
CREATE INDEX idx_thread_messages_author_id ON public.thread_messages(author_id);
CREATE INDEX idx_thread_messages_created_at ON public.thread_messages(created_at);

-- Projects indexes
CREATE INDEX idx_projects_author_id ON public.projects(author_id);
CREATE INDEX idx_projects_created_at ON public.projects(created_at DESC);
CREATE INDEX idx_projects_upvotes ON public.projects(upvotes DESC);
CREATE INDEX idx_projects_tags ON public.projects USING GIN(tags);

-- Comments indexes
CREATE INDEX idx_project_comments_project_id ON public.project_comments(project_id);
CREATE INDEX idx_project_comments_author_id ON public.project_comments(author_id);

-- Social indexes
CREATE INDEX idx_user_follows_follower ON public.user_follows(follower_id);
CREATE INDEX idx_user_follows_following ON public.user_follows(following_id);

-- Messages indexes
CREATE INDEX idx_direct_messages_sender ON public.direct_messages(sender_id);
CREATE INDEX idx_direct_messages_recipient ON public.direct_messages(recipient_id);
CREATE INDEX idx_direct_messages_created_at ON public.direct_messages(created_at DESC);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);

-- Reactions indexes
CREATE INDEX idx_reactions_user_id ON public.reactions(user_id);
CREATE INDEX idx_reactions_thread_id ON public.reactions(thread_id);
CREATE INDEX idx_reactions_message_id ON public.reactions(message_id);
CREATE INDEX idx_reactions_project_id ON public.reactions(project_id);

-- ============================================
-- RLS POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.thread_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thread_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Thread Categories (public read)
CREATE POLICY "Anyone can view thread categories" ON public.thread_categories FOR SELECT USING (true);

-- Threads policies
CREATE POLICY "Anyone can view published threads" ON public.threads FOR SELECT USING (true);
CREATE POLICY "Users can create threads" ON public.threads FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own threads" ON public.threads FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own threads" ON public.threads FOR DELETE USING (auth.uid() = author_id);

-- Thread Messages policies
CREATE POLICY "Anyone can view thread messages" ON public.thread_messages FOR SELECT USING (NOT is_deleted);
CREATE POLICY "Users can create messages" ON public.thread_messages FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own messages" ON public.thread_messages FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own messages" ON public.thread_messages FOR DELETE USING (auth.uid() = author_id);

-- Projects policies
CREATE POLICY "Anyone can view published projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Users can create projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = author_id);

-- Project Comments policies
CREATE POLICY "Anyone can view comments" ON public.project_comments FOR SELECT USING (NOT is_deleted);
CREATE POLICY "Users can create comments" ON public.project_comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update own comments" ON public.project_comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete own comments" ON public.project_comments FOR DELETE USING (auth.uid() = author_id);

-- User Follows policies
CREATE POLICY "Users can view all follows" ON public.user_follows FOR SELECT USING (true);
CREATE POLICY "Users can manage own follows" ON public.user_follows FOR ALL USING (auth.uid() = follower_id);

-- Direct Messages policies
CREATE POLICY "Users can view own messages" ON public.direct_messages 
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can send messages" ON public.direct_messages 
  FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update own sent messages" ON public.direct_messages 
  FOR UPDATE USING (auth.uid() = sender_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Badges policies (public read)
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (is_active = true);

-- User Badges policies
CREATE POLICY "Anyone can view user badges" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "System can award badges" ON public.user_badges FOR INSERT WITH CHECK (true); -- Controlled by functions

-- Reactions policies
CREATE POLICY "Users can view all reactions" ON public.reactions FOR SELECT USING (true);
CREATE POLICY "Users can manage own reactions" ON public.reactions FOR ALL USING (auth.uid() = user_id);

-- User Stats policies
CREATE POLICY "Anyone can view user stats" ON public.user_stats FOR SELECT USING (true);
CREATE POLICY "Users can update own stats" ON public.user_stats FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can create user stats" ON public.user_stats FOR INSERT WITH CHECK (true);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Updated trigger for user_profiles
CREATE TRIGGER update_threads_updated_at BEFORE UPDATE ON public.threads 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_thread_messages_updated_at BEFORE UPDATE ON public.thread_messages 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_comments_updated_at BEFORE UPDATE ON public.project_comments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON public.user_stats 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to initialize user stats for new users
CREATE OR REPLACE FUNCTION public.initialize_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_stats (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user stats when user profile is created
CREATE TRIGGER on_user_profile_created
  AFTER INSERT ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.initialize_user_stats();

-- Function to update thread activity
CREATE OR REPLACE FUNCTION public.update_thread_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.threads 
  SET last_activity_at = NOW(),
      message_count = message_count + 1
  WHERE id = NEW.thread_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update thread activity on new message
CREATE TRIGGER on_thread_message_created
  AFTER INSERT ON public.thread_messages
  FOR EACH ROW EXECUTE FUNCTION public.update_thread_activity();

-- Function to update project comment count
CREATE OR REPLACE FUNCTION public.update_project_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.projects 
  SET comment_count = comment_count + 1
  WHERE id = NEW.project_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update project comment count
CREATE TRIGGER on_project_comment_created
  AFTER INSERT ON public.project_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_project_comment_count();

-- Function to update follower counts
CREATE OR REPLACE FUNCTION public.update_follow_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment follower count for followed user
    UPDATE public.user_stats 
    SET followers_count = followers_count + 1 
    WHERE user_id = NEW.following_id;
    
    -- Increment following count for follower
    UPDATE public.user_stats 
    SET following_count = following_count + 1 
    WHERE user_id = NEW.follower_id;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrement follower count
    UPDATE public.user_stats 
    SET followers_count = followers_count - 1 
    WHERE user_id = OLD.following_id;
    
    -- Decrement following count
    UPDATE public.user_stats 
    SET following_count = following_count - 1 
    WHERE user_id = OLD.follower_id;
    
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for follow counts
CREATE TRIGGER on_user_follow_change
  AFTER INSERT OR DELETE ON public.user_follows
  FOR EACH ROW EXECUTE FUNCTION public.update_follow_counts();

-- Function to handle reactions and update counts
CREATE OR REPLACE FUNCTION public.handle_reaction_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update the target item's vote counts
    IF NEW.thread_id IS NOT NULL THEN
      IF NEW.reaction_type = 'upvote' THEN
        UPDATE public.threads SET upvotes = upvotes + 1 WHERE id = NEW.thread_id;
      ELSE
        UPDATE public.threads SET downvotes = downvotes + 1 WHERE id = NEW.thread_id;
      END IF;
    ELSIF NEW.message_id IS NOT NULL THEN
      IF NEW.reaction_type = 'upvote' THEN
        UPDATE public.thread_messages SET upvotes = upvotes + 1 WHERE id = NEW.message_id;
      ELSE
        UPDATE public.thread_messages SET downvotes = downvotes + 1 WHERE id = NEW.message_id;
      END IF;
    ELSIF NEW.project_id IS NOT NULL THEN
      IF NEW.reaction_type = 'upvote' THEN
        UPDATE public.projects SET upvotes = upvotes + 1 WHERE id = NEW.project_id;
      ELSE
        UPDATE public.projects SET downvotes = downvotes + 1 WHERE id = NEW.project_id;
      END IF;
    ELSIF NEW.comment_id IS NOT NULL THEN
      IF NEW.reaction_type = 'upvote' THEN
        UPDATE public.project_comments SET upvotes = upvotes + 1 WHERE id = NEW.comment_id;
      ELSE
        UPDATE public.project_comments SET downvotes = downvotes + 1 WHERE id = NEW.comment_id;
      END IF;
    END IF;
    RETURN NEW;
    
  ELSIF TG_OP = 'DELETE' THEN
    -- Reverse the vote counts
    IF OLD.thread_id IS NOT NULL THEN
      IF OLD.reaction_type = 'upvote' THEN
        UPDATE public.threads SET upvotes = upvotes - 1 WHERE id = OLD.thread_id;
      ELSE
        UPDATE public.threads SET downvotes = downvotes - 1 WHERE id = OLD.thread_id;
      END IF;
    ELSIF OLD.message_id IS NOT NULL THEN
      IF OLD.reaction_type = 'upvote' THEN
        UPDATE public.thread_messages SET upvotes = upvotes - 1 WHERE id = OLD.message_id;
      ELSE
        UPDATE public.thread_messages SET downvotes = downvotes - 1 WHERE id = OLD.message_id;
      END IF;
    ELSIF OLD.project_id IS NOT NULL THEN
      IF OLD.reaction_type = 'upvote' THEN
        UPDATE public.projects SET upvotes = upvotes - 1 WHERE id = OLD.project_id;
      ELSE
        UPDATE public.projects SET downvotes = downvotes - 1 WHERE id = OLD.project_id;
      END IF;
    ELSIF OLD.comment_id IS NOT NULL THEN
      IF OLD.reaction_type = 'upvote' THEN
        UPDATE public.project_comments SET upvotes = upvotes - 1 WHERE id = OLD.comment_id;
      ELSE
        UPDATE public.project_comments SET downvotes = downvotes - 1 WHERE id = OLD.comment_id;
      END IF;
    END IF;
    RETURN OLD;
    
  ELSIF TG_OP = 'UPDATE' THEN
    -- Handle reaction type change (upvote <-> downvote)
    IF OLD.reaction_type != NEW.reaction_type THEN
      IF NEW.thread_id IS NOT NULL THEN
        IF OLD.reaction_type = 'upvote' THEN
          UPDATE public.threads SET upvotes = upvotes - 1, downvotes = downvotes + 1 WHERE id = NEW.thread_id;
        ELSE
          UPDATE public.threads SET downvotes = downvotes - 1, upvotes = upvotes + 1 WHERE id = NEW.thread_id;
        END IF;
      -- Similar logic for other entities...
      END IF;
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for reaction changes
CREATE TRIGGER on_reaction_change
  AFTER INSERT OR UPDATE OR DELETE ON public.reactions
  FOR EACH ROW EXECUTE FUNCTION public.handle_reaction_change();

-- Enable Realtime for real-time features
ALTER PUBLICATION supabase_realtime ADD TABLE public.thread_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.direct_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;