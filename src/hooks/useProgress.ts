
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type ProgressData = Database['public']['Tables']['progress_tracking']['Row'];

interface SkillProgress {
  skillArea: string;
  currentScore: number;
  targetScore: number;
  sessionsCompleted: number;
  improvementRate: number;
  lastPractice: string | null;
  achievements: string[];
}

interface OverallStats {
  totalSessions: number;
  averageScore: number;
  hoursSpent: number;
  streakDays: number;
  improvementRate: number;
}

export const useProgress = () => {
  const { user } = useAuth();
  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([]);
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgressData();
    }
  }, [user]);

  const fetchProgressData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Fetch skill progress
      const { data: progressData, error: progressError } = await supabase
        .from('progress_tracking')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) throw progressError;

      // Fetch session stats
      const { data: sessionData, error: sessionError } = await supabase
        .from('interview_sessions')
        .select('overall_score, duration, completed_at, created_at')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false });

      if (sessionError) throw sessionError;

      // Transform progress data
      const skills = progressData.map(item => ({
        skillArea: item.skill_area,
        currentScore: item.current_score,
        targetScore: item.target_score,
        sessionsCompleted: item.sessions_completed,
        improvementRate: item.improvement_rate || 0,
        lastPractice: item.last_practice,
        achievements: item.achievements || []
      }));

      // Calculate overall stats
      const stats: OverallStats = {
        totalSessions: sessionData.length,
        averageScore: sessionData.length > 0 
          ? Math.round(sessionData.reduce((sum, session) => sum + (session.overall_score || 0), 0) / sessionData.length)
          : 0,
        hoursSpent: Math.round(sessionData.reduce((sum, session) => sum + (session.duration || 0), 0) / 60),
        streakDays: calculateStreakDays(sessionData),
        improvementRate: calculateImprovementRate(sessionData)
      };

      setSkillProgress(skills);
      setOverallStats(stats);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSkillProgress = async (skillArea: string, newScore: number) => {
    if (!user) return;

    try {
      const existingSkill = skillProgress.find(s => s.skillArea === skillArea);
      
      if (existingSkill) {
        // Update existing skill
        const improvementRate = newScore > existingSkill.currentScore 
          ? ((newScore - existingSkill.currentScore) / existingSkill.currentScore) * 100
          : 0;

        const { error } = await supabase
          .from('progress_tracking')
          .update({
            current_score: newScore,
            sessions_completed: existingSkill.sessionsCompleted + 1,
            improvement_rate: improvementRate,
            last_practice: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('skill_area', skillArea);

        if (error) throw error;
      } else {
        // Create new skill tracking
        const { error } = await supabase
          .from('progress_tracking')
          .insert({
            user_id: user.id,
            skill_area: skillArea,
            current_score: newScore,
            target_score: 85, // Default target
            sessions_completed: 1,
            last_practice: new Date().toISOString()
          });

        if (error) throw error;
      }

      // Refresh data
      await fetchProgressData();
    } catch (error) {
      console.error('Error updating skill progress:', error);
    }
  };

  const calculateStreakDays = (sessions: any[]): number => {
    if (sessions.length === 0) return 0;

    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);

    for (let i = 0; i < 30; i++) { // Check last 30 days
      const dateStr = currentDate.toISOString().split('T')[0];
      const hasSessionOnDate = sessions.some(session => 
        session.completed_at?.startsWith(dateStr)
      );

      if (hasSessionOnDate) {
        streak++;
      } else if (streak > 0) {
        break;
      }

      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  };

  const calculateImprovementRate = (sessions: any[]): number => {
    if (sessions.length < 2) return 0;

    const recentSessions = sessions.slice(0, 5);
    const olderSessions = sessions.slice(-5);

    const recentAvg = recentSessions.reduce((sum, s) => sum + (s.overall_score || 0), 0) / recentSessions.length;
    const olderAvg = olderSessions.reduce((sum, s) => sum + (s.overall_score || 0), 0) / olderSessions.length;

    return olderAvg > 0 ? Math.round(((recentAvg - olderAvg) / olderAvg) * 100) : 0;
  };

  const addAchievement = async (skillArea: string, achievement: string) => {
    if (!user) return;

    try {
      const skill = skillProgress.find(s => s.skillArea === skillArea);
      if (!skill) return;

      const updatedAchievements = [...skill.achievements, achievement];

      const { error } = await supabase
        .from('progress_tracking')
        .update({
          achievements: updatedAchievements,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('skill_area', skillArea);

      if (error) throw error;

      await fetchProgressData();
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  return {
    skillProgress,
    overallStats,
    isLoading,
    updateSkillProgress,
    addAchievement,
    refetch: fetchProgressData
  };
};
