
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
  Mic, 
  MicOff,
  CheckCircle,
  AlertCircle,
  Target,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Practice = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Mock questions - in real app, these would be generated based on job description
  const questions = [
    {
      id: 1,
      question: "Tell me about yourself and your background.",
      category: "General",
      expectedStructure: "STAR",
      tips: "Focus on relevant experience and skills that align with the role."
    },
    {
      id: 2,
      question: "Describe a challenging project you worked on. How did you handle it?",
      category: "Behavioral",
      expectedStructure: "STAR",
      tips: "Use the STAR method: Situation, Task, Action, Result."
    },
    {
      id: 3,
      question: "What are your greatest strengths and how do they apply to this role?",
      category: "General",
      expectedStructure: "Examples",
      tips: "Provide specific examples that demonstrate your strengths in action."
    },
    {
      id: 4,
      question: "Where do you see yourself in 5 years?",
      category: "Career Goals",
      expectedStructure: "Vision",
      tips: "Show ambition while staying relevant to the role and company."
    }
  ];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSubmit = async () => {
    if (!answer.trim()) {
      toast({
        title: "Error",
        description: "Please provide an answer before submitting",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockFeedback = generateMockFeedback(answer, questions[currentQuestion]);
      setFeedback(mockFeedback);
      setIsAnalyzing(false);
      
      toast({
        title: "Answer Analyzed",
        description: "Feedback is ready!"
      });
    }, 2000);
  };

  const generateMockFeedback = (answer, question) => {
    const score = Math.floor(Math.random() * 30) + 70; // 70-100
    const hasSTAR = answer.toLowerCase().includes('situation') || 
                   answer.toLowerCase().includes('task') ||
                   answer.toLowerCase().includes('action') ||
                   answer.toLowerCase().includes('result');
    
    return {
      score,
      starCompliance: hasSTAR ? 85 : 45,
      confidence: Math.floor(Math.random() * 20) + 75,
      clarity: Math.floor(Math.random() * 15) + 80,
      strengths: [
        "Good structure and flow",
        "Relevant examples provided",
        "Clear communication"
      ],
      improvements: [
        "Could include more specific metrics",
        "Consider using the STAR method more explicitly",
        "Expand on the impact of your actions"
      ],
      suggestions: [
        "Try to quantify your achievements with numbers",
        "Include the outcome or result of your actions",
        "Practice speaking with more confidence"
      ]
    };
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setAnswer("");
      setFeedback(null);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Speak your answer now"
      });
      
      // In a real app, you would implement actual speech recognition here
      setTimeout(() => {
        setIsRecording(false);
        setAnswer("This is a mock transcription of your spoken answer. In the real app, this would be actual speech-to-text conversion.");
        toast({
          title: "Recording Stopped",
          description: "Your answer has been transcribed"
        });
      }, 5000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Practice Mode</h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Interview Question</CardTitle>
            <Badge variant="outline">{questions[currentQuestion].category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-lg font-medium">
            {questions[currentQuestion].question}
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="text-sm font-medium mb-2">💡 Tips:</div>
            <div className="text-sm text-muted-foreground">
              {questions[currentQuestion].tips}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answer Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Your Answer
            {questions[currentQuestion].expectedStructure === "STAR" && (
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
            disabled={isRecording}
          />
          
          <div className="flex gap-2">
            {!isRecording ? (
              <Button onClick={startRecording} variant="outline">
                <Mic className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            ) : (
              <Button onClick={stopRecording} variant="destructive">
                <MicOff className="h-4 w-4 mr-2" />
                Stop Recording
              </Button>
            )}
            
            <Button 
              onClick={handleAnswerSubmit}
              disabled={!answer.trim() || isAnalyzing || isRecording}
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
              {currentQuestion < questions.length - 1 && (
                <Button onClick={nextQuestion}>
                  <SkipForward className="h-4 w-4 mr-2" />
                  Next Question
                </Button>
              )}
              {currentQuestion === questions.length - 1 && (
                <Button className="ml-auto">
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
