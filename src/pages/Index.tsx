
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, BarChart3, Mic, FileText, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: "JD-Based Questions",
      description: "Upload job descriptions and get tailored interview questions"
    },
    {
      icon: Target,
      title: "Mock Interviews",
      description: "Practice with AI-powered mock interview sessions"
    },
    {
      icon: Mic,
      title: "Voice Practice",
      description: "Practice speaking with real-time audio feedback"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Track your improvement with detailed analytics"
    },
    {
      icon: Brain,
      title: "STAR Method",
      description: "Learn and practice the STAR interview methodology"
    },
    {
      icon: Play,
      title: "Real-time Feedback",
      description: "Get instant feedback on your interview performance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">InterviewAI</span>
          </div>
          <div className="ml-auto">
            <Link to="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Master Your Next Interview with{" "}
            <span className="text-primary">AI-Powered</span> Practice
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practice interviews with personalized questions, get real-time feedback, 
            and track your progress. Built for job seekers at every level.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8">
                Start Practicing
              </Button>
            </Link>
            <Link to="/setup">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Upload Job Description
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive interview preparation tools powered by AI
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <Card className="p-8 text-center bg-primary/5">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">Ready to Ace Your Interview?</CardTitle>
            <CardDescription className="text-lg">
              Join thousands of job seekers who've improved their interview skills with InterviewAI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8">
                Get Started for Free
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
