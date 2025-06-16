
// Common types used across the application

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface AnalysisResult {
  role: string;
  industry: string;
  skills: string[];
  requirements: string[];
  experienceLevel: 'entry' | 'mid' | 'senior';
}

export interface InterviewConfig {
  role: string;
  industry: string;
  experience: 'entry' | 'mid' | 'senior';
  duration: '15' | '30' | '45' | '60';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SkillProgress {
  skillArea: string;
  currentScore: number;
  targetScore: number;
  sessionsCompleted: number;
  improvementRate: number;
  lastPractice: string | null;
  achievements: string[];
}

export interface OverallStats {
  totalSessions: number;
  averageScore: number;
  hoursSpent: number;
  streakDays: number;
  improvementRate: number;
}

export interface InterviewSession {
  id: string;
  user_id: string;
  session_type: 'practice' | 'mock';
  status: 'in_progress' | 'completed' | 'cancelled';
  overall_score?: number;
  duration?: number;
  completed_at?: string;
  created_at: string;
  questions?: InterviewQuestion[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  answer?: string;
  score?: number;
  feedback?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Utility types for better type safety
export type ExperienceLevel = 'entry' | 'mid' | 'senior';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type SessionType = 'practice' | 'mock';
export type SessionStatus = 'in_progress' | 'completed' | 'cancelled';
