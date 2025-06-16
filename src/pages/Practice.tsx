
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  SkipForward, 
  Clock, 
  CheckCircle,
  Target,
  RefreshCw,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useInterviewSession } from "@/hooks/useInterviewSession";
import { useProgress } from "@/hooks/useProgress";
import RecordingComponent from "@/components/interview/RecordingComponent";
import { Link } from "react-router-dom";

const Practice = () => {
  const [answer, setAnswer] = useState("");
  const [sessionTime, setSessionTime] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const { toast } = useToast();

  const {
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
    getProgress
  } = useInterviewSession();

  const { updateSkillProgress } = useProgress();

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentSession?.status === 'in_progress') {
      timer = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentSession?.status]);

  useEffect(() => {
    // Auto-create a practice session if none exists
    if (!currentSession && !isLoading && !hasSession) {
      handleCreateSession();
    }
  }, [currentSession, isLoading, hasSession]);

  const handleCreateSession = async () => {
    try {
      setHasSession(true);
      await createSession({
        type: 'practice',
        title: 'Practice Session',
        duration: 30,
        role: 'Software Engineer',
        industry: 'Technology',
        experienceLevel: 'mid',
        difficulty: 'medium'
      });
    } catch (error) {
      setHasSession(false);
      console.error('Failed to create session:', error);
    }
  };

  const handleStartSession = async () => {
    if (!currentSession) return;
    try {
      await startSession(currentSession.id);
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const handleAnswerSubmit = async () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion || !answer.trim()) {
      toast({
        title: "Error",
        description: "Please provide an answer before submitting",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const feedbackResult = await submitAnswer(
        currentQuestion.id,
        answer,
        Math.floor(Math.random() * 180) + 60 // Mock time taken
      );
      
      setFeedback(feedbackResult);
      
      // Update progress tracking
      await updateSkillProgress(currentQuestion.category, feedbackResult.score);
      
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast({
        title: "Error",
        description: "Failed to analyze answer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRecordingComplete = (result) => {
    setAnswer(result.transcript);
    toast({
      title: "Recording Transcribed",
      description: "Your speech has been converted to text"
    });
  };

  const handleNextQuestion = () => {
    nextQuestion();
    setAnswer("");
    setFeedback(null);
  };

  const handleFinishSession = async () => {
    try {
      const finalScore = await completeSession();
      toast({
        title: "Session Completed!",
        description: `Your final score: ${finalScore}%`
      });
    } catch (error) {
      console.error('Error completing session:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center min-h-96">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Setting up your practice session...</p>
        </div>
      </div>
    );
  }

  if (!currentSession) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Practice Mode</h1>
          <p className="text-muted-foreground mb-8">
            Configure your session to get started with AI-powered interview practice
          </p>
          <Link to="/setup">
            <Button size="lg">
              <Settings className="h-4 w-4 mr-2" />
              Configure Session
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (currentSession.status === 'setup') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Practice Session Ready</h1>
          <p className="text-muted-foreground mb-8">
            Your practice session has been configured with {questions.length} questions
          </p>
          <Button onClick={handleStartSession} size="lg">
            <Play className="h-4 w-4 mr-2" />
            Start Practice Session
          </Button>
        </div>
      </div>
    );
  }

  if (currentSession.status === 'completed') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Practice Session Completed!</h1>
          <p className="text-muted-foreground mb-8">
            Overall Score: {currentSession.overall_score}%
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleCreateSession}>
              <Target className="h-4 w-4 mr-2" />
              Start New Session
            </Button>
            <Link to="/history">
              <Button variant="outline">
                View History
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Practice Mode</h1>
          <p className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-mono">{formatTime(sessionTime)}</span>
          </div>
          <Progress value={progress} className="w-32" />
        </div>
      </div>

      {/* Current Question */}
      {currentQuestion && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Interview Question</CardTitle>
              <Badge variant="outline">{currentQuestion.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-lg font-medium">
              {currentQuestion.question}
            </div>
            {currentQuestion.tips && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-sm font-medium mb-2">💡 Tips:</div>
                <div className="text-sm text-muted-foreground">
                  {currentQuestion.tips}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Answer Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Your Answer
            {currentQuestion?.expected_structure === "STAR" && (
              <Badge variant="secondary">STAR Method Recommended</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type your answer here or use voice recording..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={6}
          />
          
          <RecordingComponent onRecordingComplete={handleRecordingComplete} />
          
          <div className="flex gap-2">
            <Button 
              onClick={handleAnswerSubmit}
              disabled={!answer.trim() || isAnalyzing}
              className="ml-auto"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Get Feedback
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      {feedback && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Feedback & Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Scores */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{feedback.score}%</div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{feedback.starCompliance}%</div>
                <div className="text-sm text-muted-foreground">STAR Method</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{feedback.confidence}%</div>
                <div className="text-sm text-muted-foreground">Confidence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{feedback.clarity}%</div>
                <div className="text-sm text-muted-foreground">Clarity</div>
              </div>
            </div>

            {/* Detailed Feedback */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">✅ Strengths</h4>
                <ul className="space-y-1">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="text-sm">• {strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">🔄 Areas for Improvement</h4>
                <ul className="space-y-1">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm">• {improvement}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-blue-600 mb-2">💡 Suggestions</h4>
              <ul className="space-y-1">
                {feedback.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm">• {suggestion}</li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => {
                  setAnswer("");
                  setFeedback(null);
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              {currentQuestionIndex < questions.length - 1 && (
                <Button onClick={handleNextQuestion}>
                  <SkipForward className="h-4 w-4 mr-2" />
                  Next Question
                </Button>
              )}
              {currentQuestionIndex === questions.length - 1 && (
                <Button onClick={handleFinishSession} className="ml-auto">
                  Finish Session
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Practice;
