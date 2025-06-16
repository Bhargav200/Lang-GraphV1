
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Clock, 
  Target,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Mock = () => {
  const [sessionState, setSessionState] = useState("setup"); // setup, active, completed
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [isPaused, setIsPaused] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [sessionResults, setSessionResults] = useState(null);
  const { toast } = useToast();

  const mockQuestions = [
    {
      id: 1,
      question: "Tell me about yourself and why you're interested in this position.",
      timeLimit: 300, // 5 minutes
      category: "Introduction"
    },
    {
      id: 2,
      question: "Describe a time when you had to work under pressure. How did you handle it?",
      timeLimit: 300,
      category: "Behavioral"
    },
    {
      id: 3,
      question: "What's your greatest professional achievement and why?",
      timeLimit: 240,
      category: "Experience"
    },
    {
      id: 4,
      question: "How do you handle conflict in a team setting?",
      timeLimit: 240,
      category: "Behavioral"
    },
    {
      id: 5,
      question: "Do you have any questions for us?",
      timeLimit: 180,
      category: "Closing"
    }
  ];

  // Timer effect
  useEffect(() => {
    let timer;
    if (sessionState === "active" && !isPaused && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            endSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sessionState, isPaused, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = () => {
    setSessionState("active");
    toast({
      title: "Mock Interview Started",
      description: "Good luck! Remember to speak clearly and take your time."
    });
  };

  const pauseSession = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? "Session Resumed" : "Session Paused",
      description: isPaused ? "Timer resumed" : "Timer paused"
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      endSession();
    }
  };

  const endSession = () => {
    setSessionState("completed");
    
    // Generate mock results
    const results = {
      totalTime: 1800 - timeRemaining,
      questionsCompleted: currentQuestion + 1,
      overallScore: Math.floor(Math.random() * 20) + 75,
      categoryScores: {
        "Communication": Math.floor(Math.random() * 20) + 75,
        "Technical Knowledge": Math.floor(Math.random() * 20) + 70,
        "Behavioral Responses": Math.floor(Math.random() * 25) + 70,
        "Confidence": Math.floor(Math.random() * 15) + 80
      },
      feedback: [
        "Strong communication skills demonstrated",
        "Good use of specific examples",
        "Could improve on technical explanations",
        "Confident delivery throughout"
      ],
      recommendations: [
        "Practice more technical scenarios",
        "Work on concise explanations",
        "Continue using the STAR method"
      ]
    };
    
    setSessionResults(results);
    toast({
      title: "Mock Interview Completed",
      description: "Review your results below"
    });
  };

  if (sessionState === "setup") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Mock Interview Setup</h1>
          <p className="text-muted-foreground">
            Prepare for a full interview simulation with timing and structured feedback
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Session Overview</CardTitle>
            <CardDescription>
              This mock interview will simulate a real interview experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Duration: 30 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Questions: {mockQuestions.length}</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Interview Structure:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {mockQuestions.map((q, index) => (
                  <li key={index} className="flex justify-between">
                    <span>• {q.category} Question</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.floor(q.timeLimit / 60)} min
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">💡 Tips for Success:</h4>
              <ul className="text-sm space-y-1">
                <li>• Use the STAR method for behavioral questions</li>
                <li>• Speak clearly and at a moderate pace</li>
                <li>• Provide specific examples when possible</li>
                <li>• Take a moment to think before answering</li>
                <li>• Ask clarifying questions if needed</li>
              </ul>
            </div>

            <Button onClick={startSession} size="lg" className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Start Mock Interview
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (sessionState === "active") {
    const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;
    
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Session Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Mock Interview in Progress</h1>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {mockQuestions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
            <Button onClick={pauseSession} variant="outline">
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <Progress value={progress} />

        {/* Current Question */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Interview Question</CardTitle>
              <Badge>{mockQuestions[currentQuestion].category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium mb-4">
              {mockQuestions[currentQuestion].question}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Recommended time: {Math.floor(mockQuestions[currentQuestion].timeLimit / 60)} minutes</span>
            </div>
          </CardContent>
        </Card>

        {/* Recording Area */}
        <Card>
          <CardHeader>
            <CardTitle>Your Response</CardTitle>
            <CardDescription>
              Speak your answer aloud. The AI will analyze your response when you move to the next question.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🎤</div>
              <div className="text-lg font-medium mb-2">Recording in Progress</div>
              <div className="text-sm text-muted-foreground">
                Speak clearly and take your time to provide a comprehensive answer
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}>
                Previous Question
              </Button>
              <Button onClick={nextQuestion}>
                {currentQuestion === mockQuestions.length - 1 ? "Finish Interview" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (sessionState === "completed") {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Results Header */}
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Mock Interview Completed!</h1>
          <p className="text-muted-foreground">
            Great job! Here's your detailed performance analysis.
          </p>
        </div>

        {/* Overall Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Overall Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-green-600 mb-2">
                {sessionResults.overallScore}%
              </div>
              <div className="text-lg text-muted-foreground">Overall Score</div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{formatTime(sessionResults.totalTime)}</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{sessionResults.questionsCompleted}</div>
                <div className="text-sm text-muted-foreground">Questions Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold">A-</div>
                <div className="text-sm text-muted-foreground">Grade</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(sessionResults.categoryScores).map(([category, score]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{category}</span>
                  <span>{score}%</span>
                </div>
                <Progress value={score} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Feedback */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">✅ Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sessionResults.feedback.map((item, index) => (
                  <li key={index} className="text-sm">• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">🎯 Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sessionResults.recommendations.map((item, index) => (
                  <li key={index} className="text-sm">• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={() => {
            setSessionState("setup");
            setCurrentQuestion(0);
            setTimeRemaining(1800);
            setSessionResults(null);
          }}>
            <Target className="h-4 w-4 mr-2" />
            Start New Session
          </Button>
          <Link to="/history">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View History
            </Button>
          </Link>
          <Link to="/analytics">
            <Button variant="outline">
              Detailed Analytics
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default Mock;
