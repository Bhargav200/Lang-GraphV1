import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { aiService } from '@/services/aiService';
import { useToast } from '@/hooks/use-toast';

type Session = Database['public']['Tables']['interview_sessions']['Row'];
type Question = Database['public']['Tables']['interview_questions']['Row'];

interface SessionConfig {
  type: 'practice' | 'mock';
  title: string;
  role?: string;
  industry?: string;
  experienceLevel?: 'entry' | 'mid' | 'senior';
  difficulty?: 'easy' | 'medium' | 'hard';
  duration: number;
  jobDescription?: string;
}

export const useInterviewSession = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const createSession = async (config: SessionConfig): Promise<Session> => {
    if (!user) throw new Error('User not authenticated');
    
    if (!isSupabaseConfigured) {
      toast({
        title: "Supabase Not Connected",
        description: "Please connect to Supabase to create interview sessions.",
        variant: "destructive"
      });
      throw new Error('Supabase not configured');
    }

    setIsLoading(true);
    try {
      // Create session in database
      const { data: session, error } = await supabase
        .from('interview_sessions')
        .insert({
          user_id: user.id,
          type: config.type,
          title: config.title,
          role: config.role,
          industry: config.industry,
          experience_level: config.experienceLevel,
          difficulty: config.difficulty || 'medium',
          duration: config.duration,
          job_description: config.jobDescription,
          status: 'setup'
        })
        .select()
        .single();

      if (error) throw error;

      // Generate questions based on configuration
      const questionData = await aiService.generateQuestions(
        config.role || 'General',
        config.industry || 'General',
        config.experienceLevel || 'mid',
        config.difficulty || 'medium',
        Math.floor(config.duration / 6) // Approximately 6 minutes per question
      );

      // Insert questions into database
      const questionsToInsert = questionData.questions.map((q, index) => ({
        session_id: session.id,
        question: q.question,
        category: q.category,
        difficulty: q.difficulty,
        expected_structure: q.expectedStructure,
        tips: q.tips,
        order_index: index
      }));

      const { data: insertedQuestions, error: questionsError } = await supabase
        .from('interview_questions')
        .insert(questionsToInsert)
        .select();

      if (questionsError) throw questionsError;

      setCurrentSession(session);
      setQuestions(insertedQuestions);
      setCurrentQuestionIndex(0);

      toast({
        title: "Session Created",
        description: `${config.type === 'practice' ? 'Practice' : 'Mock'} session ready to start!`
      });

      return session;
    } catch (error) {
      console.error('Error creating session:', error);
      toast({
        title: "Error",
        description: "Failed to create session. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const startSession = async (sessionId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('interview_sessions')
        .update({ 
          status: 'in_progress',
          started_at: new Date().toISOString()
        })
        .eq('id', sessionId);

      if (error) throw error;

      if (currentSession) {
        setCurrentSession({
          ...currentSession,
          status: 'in_progress',
          started_at: new Date().toISOString()
        });
      }

      toast({
        title: "Session Started",
        description: "Good luck with your interview!"
      });
    } catch (error) {
      console.error('Error starting session:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (questionId: string, answer: string, timeTaken: number) => {
    if (!currentSession) throw new Error('No active session');

    setIsLoading(true);
    try {
      const question = questions.find(q => q.id === questionId);
      if (!question) throw new Error('Question not found');

      // Get AI feedback
      const feedback = await aiService.analyzeAnswer(
        question.question,
        answer,
        question.category
      );

      // Update question with answer and feedback
      const { error } = await supabase
        .from('interview_questions')
        .update({
          answer,
          score: feedback.score,
          feedback: feedback,
          time_taken: timeTaken
        })
        .eq('id', questionId);

      if (error) throw error;

      // Update local state
      setQuestions(prev => prev.map(q => 
        q.id === questionId 
          ? { ...q, answer, score: feedback.score, feedback, time_taken: timeTaken }
          : q
      ));

      toast({
        title: "Answer Submitted",
        description: "Your answer has been analyzed!"
      });

      return feedback;
    } catch (error) {
      console.error('Error submitting answer:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const completeSession = async () => {
    if (!currentSession) throw new Error('No active session');

    setIsLoading(true);
    try {
      // Calculate overall score
      const answeredQuestions = questions.filter(q => q.score !== null);
      const overallScore = answeredQuestions.length > 0
        ? Math.round(answeredQuestions.reduce((sum, q) => sum + (q.score || 0), 0) / answeredQuestions.length)
        : 0;

      // Update session status
      const { error } = await supabase
        .from('interview_sessions')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          overall_score: overallScore
        })
        .eq('id', currentSession.id);

      if (error) throw error;

      setCurrentSession({
        ...currentSession,
        status: 'completed',
        completed_at: new Date().toISOString(),
        overall_score: overallScore
      });

      toast({
        title: "Session Completed",
        description: `Your overall score: ${overallScore}%`
      });

      return overallScore;
    } catch (error) {
      console.error('Error completing session:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestionIndex] || null;
  };

  const getProgress = () => {
    return questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  };

  return {
    currentSession,
    questions,
    currentQuestionIndex,
    isLoading,
    createSession,
    startSession,
    submitAnswer,
    completeSession,
    nextQuestion,
    previousQuestion,
    getCurrentQuestion,
    getProgress,
    isConfigured: isSupabaseConfigured
  };
};
