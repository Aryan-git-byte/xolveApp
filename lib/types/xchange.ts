// ============================================
// XChange Community Platform Types
// ============================================

// Base types
export type UUID = string;
export type Timestamp = string;

// ============================================
// User & Profile Types
// ============================================

export interface UserProfile {
  id: UUID;
  name?: string;
  email: string;
  phone?: string;
  nickname?: string;
  grade?: string;
  date_of_birth?: string;
  interests: string[];
  learning_style?: string;
  personal_goal?: string;
  last_login_at?: Timestamp;
  date_joined: Timestamp;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface UserStats {
  user_id: UUID;
  total_xp: number;
  reputation_score: number;
  current_streak: number;
  longest_streak: number;
  threads_created: number;
  messages_posted: number;
  projects_published: number;
  comments_made: number;
  upvotes_given: number;
  upvotes_received: number;
  downvotes_given: number;
  downvotes_received: number;
  followers_count: number;
  following_count: number;
  last_activity_date: string;
  days_active: number;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface EnhancedUserProfile extends UserProfile {
  stats?: UserStats;
  badges?: UserBadge[];
  is_following?: boolean;
  is_followed_by?: boolean;
}

// ============================================
// Thread Types
// ============================================

export interface ThreadCategory {
  id: UUID;
  name: string;
  description?: string;
  icon?: string;
  color: string;
  is_active: boolean;
  created_at: Timestamp;
}

export interface Thread {
  id: UUID;
  title: string;
  content: string;
  author_id: UUID;
  category_id?: UUID;
  upvotes: number;
  downvotes: number;
  message_count: number;
  view_count: number;
  is_pinned: boolean;
  is_locked: boolean;
  is_featured: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
  last_activity_at: Timestamp;
  
  // Joined data
  author?: UserProfile;
  category?: ThreadCategory;
  user_reaction?: 'upvote' | 'downvote' | null;
  recent_messages?: ThreadMessage[];
}

export interface ThreadMessage {
  id: UUID;
  thread_id: UUID;
  author_id: UUID;
  content: string;
  parent_message_id?: UUID;
  reply_count: number;
  upvotes: number;
  downvotes: number;
  is_edited: boolean;
  is_deleted: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
  
  // Joined data
  author?: UserProfile;
  replies?: ThreadMessage[];
  user_reaction?: 'upvote' | 'downvote' | null;
}

export interface CreateThreadRequest {
  title: string;
  content: string;
  category_id?: UUID;
}

export interface CreateMessageRequest {
  thread_id: UUID;
  content: string;
  parent_message_id?: UUID;
}

// ============================================
// Project Types
// ============================================

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Project {
  id: UUID;
  title: string;
  description: string;
  content?: string;
  author_id: UUID;
  difficulty_level?: DifficultyLevel;
  estimated_time?: string;
  tags: string[];
  featured_image_url?: string;
  image_urls: string[];
  video_urls: string[];
  upvotes: number;
  downvotes: number;
  comment_count: number;
  view_count: number;
  fork_count: number;
  forked_from_id?: UUID;
  linked_kit_id?: UUID;
  is_published: boolean;
  is_featured: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
  
  // Joined data
  author?: UserProfile;
  forked_from?: Project;
  user_reaction?: 'upvote' | 'downvote' | null;
  recent_comments?: ProjectComment[];
}

export interface ProjectComment {
  id: UUID;
  project_id: UUID;
  author_id: UUID;
  content: string;
  parent_comment_id?: UUID;
  reply_count: number;
  upvotes: number;
  downvotes: number;
  is_edited: boolean;
  is_deleted: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
  
  // Joined data
  author?: UserProfile;
  replies?: ProjectComment[];
  user_reaction?: 'upvote' | 'downvote' | null;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  content?: string;
  difficulty_level?: DifficultyLevel;
  estimated_time?: string;
  tags: string[];
  featured_image_url?: string;
  image_urls?: string[];
  video_urls?: string[];
  linked_kit_id?: UUID;
}

export interface CreateProjectCommentRequest {
  project_id: UUID;
  content: string;
  parent_comment_id?: UUID;
}

// ============================================
// Social Features Types
// ============================================

export interface UserFollow {
  id: UUID;
  follower_id: UUID;
  following_id: UUID;
  created_at: Timestamp;
  
  // Joined data
  follower?: UserProfile;
  following?: UserProfile;
}

export interface DirectMessage {
  id: UUID;
  sender_id: UUID;
  recipient_id: UUID;
  content: string;
  is_read: boolean;
  is_deleted_by_sender: boolean;
  is_deleted_by_recipient: boolean;
  created_at: Timestamp;
  read_at?: Timestamp;
  
  // Joined data
  sender?: UserProfile;
  recipient?: UserProfile;
}

export interface CreateDirectMessageRequest {
  recipient_id: UUID;
  content: string;
}

export interface ChatConversation {
  other_user: UserProfile;
  latest_message: DirectMessage;
  unread_count: number;
}

// ============================================
// Notification Types
// ============================================

export type NotificationType = 
  | 'follow' 
  | 'thread_reply' 
  | 'project_comment' 
  | 'upvote' 
  | 'mention' 
  | 'direct_message'
  | 'badge_earned';

export interface Notification {
  id: UUID;
  user_id: UUID;
  type: NotificationType;
  title: string;
  content?: string;
  related_user_id?: UUID;
  related_thread_id?: UUID;
  related_project_id?: UUID;
  related_message_id?: UUID;
  is_read: boolean;
  is_dismissed: boolean;
  created_at: Timestamp;
  read_at?: Timestamp;
  
  // Joined data
  related_user?: UserProfile;
  related_thread?: Thread;
  related_project?: Project;
}

export interface CreateNotificationRequest {
  user_id: UUID;
  type: NotificationType;
  title: string;
  content?: string;
  related_user_id?: UUID;
  related_thread_id?: UUID;
  related_project_id?: UUID;
  related_message_id?: UUID;
}

// ============================================
// Gamification Types
// ============================================

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Badge {
  id: UUID;
  name: string;
  description: string;
  icon?: string;
  color: string;
  requirement_type: string;
  requirement_value: number;
  tier: BadgeTier;
  xp_reward: number;
  is_active: boolean;
  created_at: Timestamp;
}

export interface UserBadge {
  id: UUID;
  user_id: UUID;
  badge_id: UUID;
  earned_at: Timestamp;
  
  // Joined data
  badge?: Badge;
}

// ============================================
// Reaction Types
// ============================================

export type ReactionType = 'upvote' | 'downvote';

export interface Reaction {
  id: UUID;
  user_id: UUID;
  thread_id?: UUID;
  message_id?: UUID;
  project_id?: UUID;
  comment_id?: UUID;
  reaction_type: ReactionType;
  created_at: Timestamp;
}

export interface CreateReactionRequest {
  reaction_type: ReactionType;
  thread_id?: UUID;
  message_id?: UUID;
  project_id?: UUID;
  comment_id?: UUID;
}

// ============================================
// Feed & Activity Types
// ============================================

export type FeedItemType = 'thread' | 'project' | 'message' | 'comment' | 'follow' | 'badge';

export interface FeedItem {
  id: UUID;
  type: FeedItemType;
  user: UserProfile;
  created_at: Timestamp;
  
  // Content based on type
  thread?: Thread;
  project?: Project;
  message?: ThreadMessage;
  comment?: ProjectComment;
  followed_user?: UserProfile;
  badge?: Badge;
}

export interface ActivityTimelineItem {
  id: UUID;
  type: 'thread_created' | 'project_published' | 'badge_earned' | 'followed_user';
  title: string;
  description?: string;
  created_at: Timestamp;
  related_id?: UUID;
  
  // Type-specific data
  thread?: Thread;
  project?: Project;
  badge?: Badge;
  user?: UserProfile;
}

// ============================================
// API Response Types
// ============================================

export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// ============================================
// Filter & Search Types
// ============================================

export interface ThreadFilters {
  category_id?: UUID;
  sort_by?: 'newest' | 'oldest' | 'most_upvoted' | 'most_active';
  search?: string;
  author_id?: UUID;
  is_pinned?: boolean;
  time_range?: 'day' | 'week' | 'month' | 'year' | 'all';
}

export interface ProjectFilters {
  difficulty_level?: DifficultyLevel;
  tags?: string[];
  sort_by?: 'newest' | 'oldest' | 'most_upvoted' | 'most_viewed';
  search?: string;
  author_id?: UUID;
  is_featured?: boolean;
  time_range?: 'day' | 'week' | 'month' | 'year' | 'all';
}

export interface UserFilters {
  search?: string;
  sort_by?: 'newest' | 'most_active' | 'highest_reputation';
  min_reputation?: number;
}

// ============================================
// Component Props Types
// ============================================

export interface ThreadCardProps {
  thread: Thread;
  showCategory?: boolean;
  showAuthor?: boolean;
  showStats?: boolean;
  onClick?: () => void;
}

export interface ProjectCardProps {
  project: Project;
  showAuthor?: boolean;
  showStats?: boolean;
  onClick?: () => void;
}

export interface UserProfileCardProps {
  user: EnhancedUserProfile;
  showStats?: boolean;
  showFollowButton?: boolean;
  showChatButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface MessageInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  allowMentions?: boolean;
}

export interface BadgeDisplayProps {
  badges: UserBadge[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
}

// ============================================
// Hook Types
// ============================================

export interface UseInfiniteScrollOptions {
  initialData?: any[];
  hasNextPage?: boolean;
  fetchNextPage: () => Promise<void>;
  isLoading?: boolean;
  threshold?: number;
}

export interface UseReactionsOptions {
  targetId: UUID;
  targetType: 'thread' | 'message' | 'project' | 'comment';
  initialUpvotes?: number;
  initialDownvotes?: number;
  userReaction?: ReactionType | null;
}

export interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: UUID) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  dismiss: (id: UUID) => Promise<void>;
  isLoading: boolean;
  error?: string;
}

// ============================================
// Utility Types
// ============================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Database insert types (without auto-generated fields)
export type InsertThread = Omit<Thread, 'id' | 'upvotes' | 'downvotes' | 'message_count' | 'view_count' | 'is_pinned' | 'is_locked' | 'is_featured' | 'created_at' | 'updated_at' | 'last_activity_at'>;
export type InsertProject = Omit<Project, 'id' | 'upvotes' | 'downvotes' | 'comment_count' | 'view_count' | 'fork_count' | 'is_published' | 'is_featured' | 'created_at' | 'updated_at'>;
export type InsertThreadMessage = Omit<ThreadMessage, 'id' | 'reply_count' | 'upvotes' | 'downvotes' | 'is_edited' | 'is_deleted' | 'created_at' | 'updated_at'>;

// Update types (all fields optional except id)
export type UpdateThread = Partial<Omit<Thread, 'id' | 'author_id' | 'created_at'>> & { id: UUID };
export type UpdateProject = Partial<Omit<Project, 'id' | 'author_id' | 'created_at'>> & { id: UUID };
export type UpdateUserProfile = Partial<Omit<UserProfile, 'id' | 'email' | 'created_at'>> & { id: UUID };

// ============================================
// Constants
// ============================================

export const THREAD_CATEGORIES = [
  'Tech', 'AI', 'Electronics', 'Robotics', 'Programming', '3D Printing', 'IoT', 'General'
] as const;

export const DIFFICULTY_LEVELS: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];

export const BADGE_TIERS: BadgeTier[] = ['bronze', 'silver', 'gold', 'platinum'];

export const NOTIFICATION_TYPES: NotificationType[] = [
  'follow', 'thread_reply', 'project_comment', 'upvote', 'mention', 'direct_message', 'badge_earned'
];

export const REACTION_TYPES: ReactionType[] = ['upvote', 'downvote'];

// ============================================
// Color Scheme
// ============================================

export const XCHANGE_COLORS = {
  primary: '#3b82f6',      // Blue
  accent: '#f97316',       // Orange
  success: '#22c55e',      // Green
  warning: '#fbbf24',      // Yellow
  danger: '#ef4444',       // Red
  info: '#06b6d4',         // Cyan
  purple: '#8b5cf6',       // Purple
  gray: '#6b7280',         // Gray
} as const;

export const BADGE_COLORS = {
  bronze: '#cd7f32',
  silver: '#c0c0c0',
  gold: '#ffd700',
  platinum: '#e5e4e2',
} as const;