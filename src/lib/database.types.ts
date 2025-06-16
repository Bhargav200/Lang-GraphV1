
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      interview_sessions: {
        Row: {
          id: string;
          user_id: string;
          type: 'practice' | 'mock';
          title: string;
          job_description: string | null;
          industry: string | null;
          role: string | null;
          experience_level: string | null;
          duration: number;
          status: 'setup' | 'in_progress' | 'completed';
          overall_score: number | null;
          feedback: any | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'practice' | 'mock';
          title: string;
          job_description?: string | null;
          industry?: string | null;
          role?: string | null;
          experience_level?: string | null;
          duration: number;
          status?: 'setup' | 'in_progress' | 'completed';
          overall_score?: number | null;
          feedback?: any | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'practice' | 'mock';
          title?: string;
          job_description?: string | null;
          industry?: string | null;
          role?: string | null;
          experience_level?: string | null;
          duration?: number;
          status?: 'setup' | 'in_progress' | 'completed';
          overall_score?: number | null;
          feedback?: any | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      interview_questions: {
        Row: {
          id: string;
          session_id: string;
          question: string;
          category: string;
          answer: string | null;
          score: number | null;
          feedback: any | null;
          time_taken: number | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          question: string;
          category: string;
          answer?: string | null;
          score?: number | null;
          feedback?: any | null;
          time_taken?: number | null;
          order_index: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          question?: string;
          category?: string;
          answer?: string | null;
          score?: number | null;
          feedback?: any | null;
          time_taken?: number | null;
          order_index?: number;
          created_at?: string;
        };
      };
    };
  };
}
