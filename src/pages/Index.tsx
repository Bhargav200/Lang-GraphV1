
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Briefcase, BarChart3, Mic, FileText, Play, Trophy, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: "Smart Job Targeting",
      description: "Upload job descriptions and get AI-powered interview questions tailored to your target role"
    },
    {
      icon: Target,
      title: "Interview Simulator",
      description: "Realistic mock interviews with industry-specific scenarios and professional feedback"
    },
    {
      icon: Mic,
      title: "Voice Mastery Training",
      description: "Perfect your speaking skills with real-time audio analysis and confidence coaching"
    },
    {
      icon: BarChart3,
      title: "Performance Insights",
      description: "Track your progress with detailed analytics and industry benchmark comparisons"
    },
    {
      icon: Trophy,
      title: "Skill Mastery System",
      description: "Master proven interview techniques like STAR methodology with guided practice"
    },
    {
      icon: Award,
      title: "Achievement Tracking",
      description: "Unlock achievements and certifications as you progress toward career success"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-amber-50">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Target className="h-8 w-8 text-blue-600" />
              <TrendingUp className="h-4 w-4 text-amber-500 absolute -top-1 -right-1" />
            </div>
            <div>
              <span className="font-bold text-xl text-blue-900">PrepMaster Pro</span>
              <p className="text-xs text-muted-foreground">Your AI-Powered Career Success Partner</p>
            </div>
          </div>
          <div className="ml-auto">
            <Link to="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700">Launch Career Center</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-blue-900">
              Master Every Interview,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-500">
                Land Your Dream Job
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your interview skills with AI-powered practice sessions, real-time feedback, 
              and industry-specific preparation. Join thousands of professionals who've advanced their careers with PrepMaster Pro.
            </p>
          </div>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
                <Briefcase className="h-5 w-5 mr-2" />
                Start Career Journey
              </Button>
            </Link>
            <Link to="/setup">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-blue-200 hover:bg-blue-50">
                <Target className="h-5 w-5 mr-2" />
                Target Your Dream Job
              </Button>
            </Link>
          </div>
          
          {/* Success Metrics */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">50K+</div>
              <div className="text-sm text-muted-foreground">Interviews Practiced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">3x</div>
              <div className="text-sm text-muted-foreground">Faster Job Placement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-24 bg-gradient-to-r from-blue-50/50 to-amber-50/50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-blue-900">Everything You Need for Career Success</h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Comprehensive interview preparation powered by AI and designed by career experts
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-blue-100 hover:border-blue-200 group">
              <CardHeader className="pb-4">
                <div className="mb-4 p-3 bg-gradient-to-r from-blue-100 to-amber-100 rounded-lg w-fit group-hover:from-blue-200 group-hover:to-amber-200 transition-all">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-blue-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <Card className="p-12 text-center bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
          <CardHeader>
            <CardTitle className="text-4xl mb-6 text-white">Ready to Accelerate Your Career?</CardTitle>
            <CardDescription className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of professionals who've mastered their interviews and landed their dream jobs with PrepMaster Pro
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-blue-50">
                <Trophy className="h-5 w-5 mr-2" />
                Start Your Success Journey
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
